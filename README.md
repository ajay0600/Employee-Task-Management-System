# Employee Task Management System

A Full Stack Employee Task Management System developed using **ASP.NET Core Web API**, **React.js**, **MySQL**, and **JWT Authentication**.

This application allows administrators to manage employees and assign tasks, while employees can securely log in, view only their assigned tasks, and update their task status.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization (Admin & Employee)
- Remember Me
- Secure Logout

---

## Admin Features

### Dashboard

- Total Employees
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks

### Employee Management

- Add Employee
- Edit Employee
- Delete Employee
- Search Employees
- Sort Employees
- Pagination

### Task Management

- Add Task
- Edit Task
- Delete Task
- Assign Task to Employee
- Search Tasks
- Sort Tasks
- Pagination

---

## Employee Features

- Secure Login
- Personal Dashboard
- View Assigned Tasks
- Update Task Status
- Search Tasks
- Sort Tasks
- Pagination

---

## Security

- JWT Authentication
- Role-Based Authorization
- Protected API Endpoints
- Employees can access only their assigned tasks

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5

## Backend

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- JWT Authentication

## Database

- MySQL

---

# Project Structure

```
Employee-Task-Management-System
│
├── EmployeeTaskManagement.API
│   ├── Controllers
│   ├── DTOs
│   ├── Models
│   ├── Data
│   ├── Migrations
│   └── Program.cs
│
├── EmployeeTaskManagement.UI
│   ├── components
│   ├── pages
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── Database
│   └── EmployeeTaskManagement.sql
│
├── Documentation
│   ├── Project_Documentation.docx
│   ├── ArchitectureDiagram.pdf
│   └── FlowDiagram.pdf
│
├── README.md
└── .gitignore
```

---

# Prerequisites

Install the following software before running the project:

- Visual Studio 2022
- Visual Studio Code
- .NET 8 SDK
- Node.js (Latest LTS)
- MySQL Server
- MySQL Workbench
- Git

---

# Backend Setup

## Navigate to API Project

```bash
cd EmployeeTaskManagement.API
```

## Restore Packages

```bash
dotnet restore
```

## Update Database

```bash
dotnet ef database update
```

## Run API

```bash
dotnet run
```

Backend URL

```
http://localhost:5096
```

Swagger

```
http://localhost:5096/swagger
```

---

# Frontend Setup

## Navigate to UI Project

```bash
cd EmployeeTaskManagement.UI
```

## Install Packages

```bash
npm install
```

## Run Project

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Database Setup

1. Open MySQL Workbench.
2. Create a database named:

```
EmployeeTaskManagement
```

3. Import the SQL file:

```
Database/EmployeeTaskManagement.sql
```

4. Update the connection string in:

```
EmployeeTaskManagement.API/appsettings.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=EmployeeTaskManagement;user=root;password=YOUR_PASSWORD;"
}
```

---

# Default Login Credentials

## Admin

Email

```
admin@test.com
```

Password

```
Admin@123
```

---

## Employee

Email

```
ajay@test.com
```

Password

```
Employee@123
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/Auth/register |
| POST | /api/Auth/login |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/Dashboard |

---

## Employees

| Method | Endpoint |
|---------|----------|
| GET | /api/Employees |
| GET | /api/Employees/{id} |
| POST | /api/Employees |
| PUT | /api/Employees/{id} |
| DELETE | /api/Employees/{id} |

---

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/Tasks |
| GET | /api/Tasks/{id} |
| POST | /api/Tasks |
| PUT | /api/Tasks/{id} |
| DELETE | /api/Tasks/{id} |
| PUT | /api/Tasks/{id}/status |

---

# Business Rules

- Only Admin can manage employees.
- Only Admin can create, edit and delete tasks.
- Employees can view only their assigned tasks.
- Employees can update only the status of their assigned tasks.
- Completed tasks cannot be edited.
- Due Date cannot be earlier than Start Date.
- JWT Authentication is required for protected APIs.

---

# Screenshots

Add screenshots of the following:

- Login Page
- Admin Dashboard
- Employee Dashboard
- Employee Management
- Task Management
- Swagger API

---

# Future Enhancements

- Email Notifications
- File Upload
- Reports
- Excel Export
- CSV Export
- Docker Deployment
- Unit Testing

---

# Author

**Ajay Pal Saran**

---

# License

This project was developed as part of a Full Stack Developer Assignment.
