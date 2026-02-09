📚 Online Book Store (Catalog Management System)
🚀 Project Overview
The Online Book Store is a full-stack catalog management system developed to manage and display books available in a store.
The application allows:
👤 Users to browse and search books
👨‍💼 Admins to add, update, and delete book records
The frontend is developed using Angular, and the backend is built with Spring Boot REST APIs.
The application is containerized using Docker and deployed on Microsoft Azure for cloud availability.

🎯 Key Objectives
Maintain an organized and scalable book catalog
Enable fast search and efficient book management
Implement secure role-based access
Deploy a cloud-ready containerized application

✨ Core Functionalities
📖 User Features
View all books
Search books by title or author
View book details (price, stock availability)

🔐 Admin Features
Add new books
Update existing books
Delete book records
Manage stock and pricing

⚙️ System Features
RESTful API integration
Data validation
Global exception handling
Secure authentication (JWT-based)
Docker containerization
Azure cloud deployment

🛠️ Technology Stack
Frontend
Angular (Standalone Components)
TypeScript
HTML5 & CSS3
HTTP Client & Interceptors

Backend
Spring Boot
Spring Security (JWT Authentication)
Spring Data JPA
Hibernate
Database
MySQL / PostgreSQL

DevOps & Cloud
Docker
Docker Compose
Microsoft Azure App Service

🔐 Authentication & Authorization
JWT-based stateless authentication
Role-Based Access Control (USER / ADMIN)
Secured endpoints using @PreAuthorize
Admin-only access to catalog management APIs

📂 Project Structure

online-book-store/
│
├── frontend/          # Angular application
├── backend/           # Spring Boot application
├── docker-compose.yml
├── README.md
└── azure-deployment.md

▶️ How to Run Locally

1️⃣ Backend
cd backend
mvn spring-boot:run
Runs on: http://localhost:8080

2️⃣ Frontend
cd frontend
npm install
ng serve
Runs on: http://localhost:4200

🐳 Run Using Docker
docker-compose up --build

☁️ Azure Deployment
The application is containerized using Docker and deployed to Microsoft Azure App Service, ensuring:
High availability
Cloud scalability
Production-ready deployment

📌 Conclusion
This project demonstrates real-world full-stack development using Angular and Spring Boot with secure REST APIs, database integration, Docker containerization, and Azure cloud deployment.
It showcases backend security, role-based access control, API design, and cloud deployment practices suitable for enterprise-level applications.
