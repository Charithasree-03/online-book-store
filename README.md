📚 Online Book Store – Catalog Management System
📌 Overview

The Online Book Store is a full-stack Catalog Management System developed using Angular and Spring Boot.
It allows administrators to manage book records (add, update, delete) and enables users to browse and search books efficiently.

The application is containerized using Docker and deployed on Azure for scalability and high availability.

Features:
Add new books
Update book details
Delete books
Search books by title or author
View price and stock availability
Data validation and error handling
RESTful API integration
Docker-based deployment

deployment

🛠 Technology Stack
Frontend
Angular
TypeScript
HTML
CSS

Backend
Spring Boot
Spring Data JPA
Hibernate
REST APIs

Database
MySQL / PostgreSQL

DevOps & Deployment
Docker

Service

📂 Project Structure
online-book-store/
│
├── frontend/        # Angular Application
├── backend/         # Spring Boot Application
├── docker-compose.yml
├── Dockerfile
└── README.md

⚙️ Running the Application Locally
1️⃣ Run Backend
cd backend
mvn spring-boot:run


Backend runs on:

http://localhost:8080

2️⃣ Run Frontend
cd frontend
npm install
ng serve


Frontend runs on:

http://localhost:4200

🐳 Run Using Docker

Make sure Docker is installed and running.

docker-compose up --build


To stop containers:

docker-compose down

🗄 Database Setup

Create database:

CREATE DATABASE onlinebookstore;


Update backend configuration in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/onlinebookstore
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

☁ Cloud Deployment

The application is containerized using Docker and deployed on Azure App Service, ensuring scalability, reliability, and high availability.
