# Azure Deployment Guide - Online Book Store

This guide covers deploying the Online Book Store application to Azure using containers.

## Prerequisites

- Azure CLI installed (`az --version`)
- Docker Desktop installed and running
- Azure subscription with appropriate permissions

## Quick Start

### 1. Login to Azure

```powershell
az login
az account set --subscription "<your-subscription-id>"
```

### 2. Create Resource Group

```powershell
az group create --name bookstore-rg --location eastus
```

### 3. Create Azure Container Registry (ACR)

```powershell
az acr create --resource-group bookstore-rg --name bookstoreacr --sku Basic
az acr login --name bookstoreacr
```

### 4. Build and Push Images

```powershell
# From project root
cd "c:\Users\chari\Downloads\New folder"

# Build images
docker-compose build

# Tag for ACR
docker tag bookstore-backend bookstoreacr.azurecr.io/bookstore-backend:latest
docker tag bookstore-frontend bookstoreacr.azurecr.io/bookstore-frontend:latest

# Push to ACR
docker push bookstoreacr.azurecr.io/bookstore-backend:latest
docker push bookstoreacr.azurecr.io/bookstore-frontend:latest
```

### 5. Create Azure Database for MySQL

```powershell
az mysql flexible-server create \
  --resource-group bookstore-rg \
  --name bookstore-mysql-server \
  --admin-user adminuser \
  --admin-password "YourSecurePassword123!" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 8.0.21

# Create database
az mysql flexible-server db create \
  --resource-group bookstore-rg \
  --server-name bookstore-mysql-server \
  --database-name bookstore
```

### 6. Create App Service for Backend

```powershell
# Create App Service Plan
az appservice plan create \
  --name bookstore-plan \
  --resource-group bookstore-rg \
  --sku B1 \
  --is-linux

# Create Backend Web App
az webapp create \
  --resource-group bookstore-rg \
  --plan bookstore-plan \
  --name bookstore-backend-app \
  --deployment-container-image-name bookstoreacr.azurecr.io/bookstore-backend:latest

# Configure environment variables
az webapp config appsettings set \
  --resource-group bookstore-rg \
  --name bookstore-backend-app \
  --settings \
    SPRING_PROFILES_ACTIVE=azure \
    SPRING_DATASOURCE_URL="jdbc:mysql://bookstore-mysql-server.mysql.database.azure.com:3306/bookstore?useSSL=true&requireSSL=true" \
    SPRING_DATASOURCE_USERNAME="adminuser" \
    SPRING_DATASOURCE_PASSWORD="YourSecurePassword123!"
```

### 7. Create App Service for Frontend

```powershell
az webapp create \
  --resource-group bookstore-rg \
  --plan bookstore-plan \
  --name bookstore-frontend-app \
  --deployment-container-image-name bookstoreacr.azurecr.io/bookstore-frontend:latest
```

## High Availability Configuration

For production with high availability:

```powershell
# Scale to 2 instances
az webapp update \
  --resource-group bookstore-rg \
  --name bookstore-backend-app \
  --set siteConfig.numberOfWorkers=2

# Enable auto-scaling (Premium tier required)
az appservice plan update \
  --name bookstore-plan \
  --resource-group bookstore-rg \
  --sku P1V2
```

## Verify Deployment

| Service | URL |
|---------|-----|
| Frontend | `https://bookstore-frontend-app.azurewebsites.net` |
| Backend API | `https://bookstore-backend-app.azurewebsites.net/swagger-ui.html` |
| Health Check | `https://bookstore-backend-app.azurewebsites.net/actuator/health` |

## Cleanup

```powershell
az group delete --name bookstore-rg --yes --no-wait
```
