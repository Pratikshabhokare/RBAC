# Full Stack Authentication & Role-Based Access Control (RBAC) System

This is a Full Stack Web Application that demonstrates JWT-based authentication and role-based authorization. 

The application is built using a Java Spring Boot backend and a React + TypeScript frontend.

## Features

- **Authentication:**
  - User registration with functional validation (Name, Email, Password, Role).
  - Login system utilizing JSON Web Tokens (JWT).
  - Secure storage of JWT in localStorage on the client side.

- **Authorization (RBAC):**
  - Roles implemented: `USER`, `ADMIN`.
  - Roles control the pages you can see and the APIs you can access on the backend.
  - Endpoints:
    - `/api/public`: Unprotected, access for all users.
    - `/api/user`: Protected, accessible by `USER` and `ADMIN` roles.
    - `/api/admin`: Protected, accessible only by the `ADMIN` role.

- **Frontend Pages:**
  - Registration Page
  - Login Page
  - Public Home Page
  - Dashboard Page (Shows User Content)
  - Admin Control Panel (Shows strict Admin-only Content)

- **Optional Bonuses Implemented:**
  - Logout functionality 
  - Dynamic Navigation Links
  - Basic Responsive UI designed with TailwindCSS.

## Technologies Used

**Backend:**
- Java 17
- Spring Boot 3
- Spring Security + JWT (jjwt)
- Spring Data JPA + Hibernate
- H2 Database (In-Memory Database, easy testing and setup without configurations)
- MapStruct & Lombok
- Maven wrapper

**Frontend:**
- React 19 + TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- Axios for API requests
- Tailwind CSS via Tailwind Vite plugin

---

## Setup & Running Instructions

### 1. Backend (Spring Boot)

The Backend uses an H2 in-memory Database, so there's no need to install or maintain a MySQL/PostgreSQL server on your machine during evaluation! It uses port `8080`.

1. Open your terminal and navigate to the `Backend/RoleBackend` folder:
    ```bash
    cd Backend/RoleBackend
    ```

2. Run the application using the Maven wrapper:
    - **On Windows:**
        ```cmd
        .\mvnw spring-boot:run
        ```
    - **On macOS/Linux:**
        ```bash
        ./mvnw spring-boot:run
        ```

*(Note: DataSeeder automatically seeds the `ROLE_USER` and `ROLE_ADMIN` into the H2 database on initialization.)*

### 2. Frontend (React + Vite)

The frontend uses Vite and TailwindCSS v4, running on port `5173`.

1. Open a new terminal window or tab and navigate into the `Frontend` folder:
    ```bash
    cd Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Go to `http://localhost:5173` in your browser.

---

## Swagger API Documentation

When the backend application is running, you can access the Swagger API documentation easily via:

- **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI Schema:** `http://localhost:8080/v3/api-docs`

---
