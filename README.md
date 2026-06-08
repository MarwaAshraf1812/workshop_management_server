# 🛠️ Workshop Management System - Backend

A professional, secure, and robust RESTful API backend for managing workshops, students, progress, assignments, quizzes, and leaderboards. Built using **Node.js**, **Express.js**, **Prisma ORM**, **PostgreSQL**, and **Socket.io** for real-time notifications.

---

## 🚀 Key Features

- **🔐 Robust User Authentication & AuthZ**: 
  - Register, Login, and Role-Based Access Control (RBAC) supporting **STUDENT**, **INSTRUCTOR**, **MODERATOR**, and **ADMIN** roles.
  - Secured using JSON Web Tokens (JWT) with login rate-limiting.
- **📚 Workshop Administration**: 
  - Manage workshop details (CRUD operations), add users/students to workshops, and handle instructor assignments.
- **📁 Course Materials & Uploads**:
  - Upload learning materials (documents, slides, videos, PDFs) using custom file validation middleware with **Multer**.
- **📝 Assignments & Quizzes**:
  - Instructors can create assignments and quizzes. Students can submit their assignment links and receive grades and feedback.
- **📈 Progress Tracking**:
  - Automatically calculates students' attendances, quiz results, and assignment scores to yield total workshop points.
- **🏆 Live Leaderboard**:
  - Ranks students based on their accumulated total points, encouraging healthy academic competition.
- **⚡ Real-Time Notifications**:
  - Enabled via WebSockets (**Socket.io**) to instantly broadcast system updates, assignments, and grades to students.
- **🛡️ High Security & Performance**:
  - Protected against common web vulnerabilities via **Helmet** security headers, **CORS**, request rate-limiting, and **XSS-clean** payload sanitization.

---

## 🛠️ Tech Stack

- **Runtime Environment**: [Node.js](https://nodejs.org/) (v18+)
- **Web Framework**: [Express.js](https://expressjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Real-Time Communication**: [Socket.io](https://socket.io/)
- **Validation**: [Joi](https://joi.dev/)
- **File Upload**: [Multer](https://github.com/expressjs/multer)
- **Deployment**: Ready for [Vercel](https://vercel.com/) and [Docker](https://www.docker.com/)

---

## 📂 Directory Structure

```text
├── config/                  # Socket.io and Prisma client initializers
├── controllers/             # Express controllers (business logic implementation)
├── daos/                    # Data Access Objects (direct database interaction)
├── dtos/                    # Data Transfer Objects (request/response formatters)
├── middlewares/             # Auth, upload, and input-validation middlewares
├── prisma/                  # Prisma schema definition and database migrations
├── public/                  # Publicly served assets (favicons, etc.)
├── routes/                  # Express routing files
├── services/                # Business logic services
├── utils/                   # Constant utilities, roles, and error handlers
├── validations/             # Joi input validation schemas
├── Dockerfile               # Production container build instructions
├── docker-compose.yml       # Docker container orchestration configurations
├── vercel.json              # Vercel serverless functions configuration
├── app.js                   # Application bootstrap and middleware setup
└── package.json             # NPM dependencies and project scripts
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 18 or above)
- PostgreSQL database
- Git (optional, for cloning)

### 💻 Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MarwaAshraf1812/workshop_management_server.git
   cd workshop_management_server
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and define the following variables:
   ```env
   # App Settings
   PORT=5000

   # Database Settings
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/workshop_db?schema=public"

   # JWT Security Key
   JWT_KEY="your_super_secret_jwt_sign_key"

   # Docker Compose Specific (Optional)
   DB_NAME=workshop_db
   DB_USER=postgres
   DB_PASSWORD=your_secure_password
   ```

4. **Initialize Database Schema (Prisma migrations):**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start Development Server:**
   ```bash
   npm run start
   ```
   The backend API will run on `http://localhost:5000` (or the PORT configured in `.env`).

---

## 🐳 Docker Deployment

The application includes fully configured multi-container Docker support.

To spin up both the **PostgreSQL** database and the **NodeJS server** in isolated Docker containers:

1. Ensure Docker and Docker Compose are installed.
2. Build and run containers:
   ```bash
   docker-compose up --build
   ```
3. The server will launch and listen on port `3000` as mapped in `docker-compose.yml`.

---

## 🔗 API Endpoints Summary

Here is a mapping of the available API routes:

| HTTP Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/` | Register a new user | Public |
| **POST** | `/auth/login` | Log in user (returns JWT token) | Public |
| **GET** | `/api/workshop` | Get all workshops | Yes |
| **POST** | `/api/workshop` | Create a new workshop | Yes (Admin/Moderator) |
| **PUT** | `/api/workshop/:id` | Update workshop info | Yes (Admin) |
| **DELETE** | `/api/workshop/:id` | Remove a workshop | Yes (Admin) |
| **POST** | `/api/workshop/:id/users` | Add user to a workshop | Yes (Admin/Moderator) |
| **GET** | `/api/workshop/materials` | Fetch learning materials | Yes |
| **POST** | `/api/assignment` | Create workshop assignment | Yes (Instructor/Admin) |
| **POST** | `/api/submissions` | Student submits an assignment link | Yes (Student) |
| **GET** | `/api/quiz` | Retrieve workshop quizzes | Yes |
| **GET** | `/api/progress` | Get student progress report | Yes |
| **GET** | `/api/leaderboard` | Get student ranks & leaderboards | Yes |
| **GET** | `/api/notification` | Fetch user notification logs | Yes |

---

## 🔌 WebSockets (Socket.io)

Real-time connection is configured on the root HTTP server. 

### Supported Socket Events:
- **Connection**: `connection`
- **Clients publish**: `notify` sends user-triggered notifications
- **Clients listen**: `notification` receives live broadcast notifications
