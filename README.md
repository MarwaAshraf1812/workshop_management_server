# Workshop Management System

## Overview

The **Workshop Management System** is designed to streamline the organization of workshops, presentations, quizzes, and assignments for student activities. It enables students to upload assignments, track progress, and receive feedback, while HR and Admin can monitor student performance, manage workshops, and assign points based on attendance, quizzes, and assignments.

## Features

### Core Features
1. **User Management & Authentication**
    - JWT-based authentication
    - Role-based access control (RBAC)
    - User roles: Student, HR, Admin

2. **Workshop Management**
    - CRUD operations: Create, Read, Update, Delete workshops
    - Assign students to workshops
    - Schedule workshops with date & time
    - Add workshop details: title, description, instructor, materials

3. **Presentation Management**
    - Upload & view presentations (PDFs, slides, videos)
    - Link presentations to specific workshops

4. **Quiz & Assignment Management**
    - Create quizzes with multiple-choice & open-ended questions
    - Assign deadlines for quizzes & assignments
    - Allow students to submit assignments
    - Automatic grading for quizzes (MCQs)
    - Manual grading for assignments

5. **Student Progress Tracking**
    - HR dashboard to track student performance
    - View submitted assignments & quiz scores
    - Assign points to students based on progress

6. **Notification & Communication**
    - Email or in-app notifications for deadlines, new materials, and feedback
    - Announcements for upcoming workshops

7. **Points & Evaluation System**
    - Assign points based on attendance, quiz scores, and assignment submissions
    - Track student leaderboard for engagement

---

## Installation

### Prerequisites
- Node.js (version 14 or later)
- PostgreSQL (or your preferred database)
- Prisma ORM for database migrations

### Steps to Get Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/workshop-management-system.git
    cd workshop-management-system
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the environment variables**:
    Copy the `.env.example` file to `.env` and update the variables as needed:
    ```bash
    cp .env.example .env
    ```

    Example `.env` file:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/workshop_management"
    JWT_SECRET="your_jwt_secret"
    ```

4. **Set up the database**:
    Run the Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev
    ```

5. **Run the application**:
    ```bash
    npm run dev
    ```

6. **Access the API**:
    - Open `http://localhost:3000` to interact with the API.
    - Use Postman, Apidog, or any API testing tool to test the endpoints.

---

## API Endpoints

### User Authentication
- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login a user and receive a JWT token

### Workshop Management
- **GET /workshops**: List all workshops
- **POST /workshops**: Create a new workshop
- **PUT /workshops/:id**: Update a workshop
- **DELETE /workshops/:id**: Delete a workshop

### Presentation Management
- **POST /presentations**: Upload a presentation
- **GET /presentations/:id**: View a presentation

### Quiz & Assignment Management
- **POST /quizzes**: Create a new quiz
- **POST /assignments**: Create a new assignment
- **POST /assignments/submit**: Submit an assignment

### Progress Tracking
- **GET /progress/:studentId**: View student progress
- **POST /progress/update**: Update student progress (HR only)

### Leaderboard
- **GET /leaderboard/list_all**: List all students' ranks

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Postman/Apidog

---

## Contributing

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/workshop-management-system.git`
3. Create a new branch: `git checkout -b feature-name`
4. Make changes and commit: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Create a pull request
