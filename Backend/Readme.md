# ERP Backend API Documentation

This document provides a detailed overview of the APIs implemented for the ERP backend. The APIs are focused on authentication and user management for different roles: Student, Faculty, Driver, and Admin.

---

## Base URL

All APIs are mounted under:

```
http://localhost:5000/api/auth
```

Adjust host/port according to your server configuration.

---

## Prerequisites

- Node.js and npm installed.
- MongoDB connection string configured in `.env`.
- Environment variables:
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — secret for signing JWTs
  - `PORT` — server port (default 5000)
  - `NODE_ENV` — e.g. `production`
- Ensure Express body parsing middleware is enabled before route mounting:
  ```js
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  ```

---

## Common Notes

- Requests with JSON bodies must include header:
  ```
  Content-Type: application/json
  ```
- Successful auth responses set an httpOnly cookie named `token`.
- JWT payload typically contains `id` and `role` (and sometimes `college`).
- Error responses use appropriate HTTP status codes (400, 401, 500).
- Check server logs when debugging controllers.

---

## Routes (prefix: `/api/auth`)

Each section below lists endpoint, purpose, request body and typical responses.

### 1) Student

- POST `/student/register`
  - Purpose: Register a new student and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"John Doe",
      "email":"john@example.edu",
      "rollNo":"ROLL123",
      "password":"password123",
      "branch":"CSE",
      "semester":3,
      "studentType":"Regular",
      "programLevel":"Undergraduate",
      "programName":"B.Tech"
    }
    ```
  - Success: `201 Created`
    ```json
    {
      "message":"Student registered successfully",
      "student": { "_id":"...", "name":"...", "email":"...", "college":"...", "rollNo":"...", ... }
    }
    ```
  - Errors: `400` for missing/duplicate fields, `500` for server errors.

- POST `/student/login`
  - Purpose: Login student and set auth cookie.
  - Body:
    ```json
    { "email":"john@example.edu", "password":"password123" }
    ```
  - Success: `200 OK` with student object and cookie.
  - Errors: `400` invalid credentials.

---

### 2) Faculty

- POST `/faculty/register`
  - Purpose: Register faculty and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"Dr. Smith",
      "email":"smith@faculty.edu",
      "employeeId":"EMP1001",
      "password":"password123",
      "department":"CSE",
      "designation":"Professor",
      "coursesHandled":["CS101","CS102"]
    }
    ```
  - Success: `201 Created` returns faculty object.
  - Errors: `400` for missing/duplicate fields.

- POST `/faculty/login`
  - Body:
    ```json
    { "email":"smith@faculty.edu", "password":"password123" }
    ```
  - Success: `200 OK`, sets cookie.
  - Errors: `400` invalid credentials.

---

### 3) Driver

- POST `/driver/register`
  - Purpose: Register driver and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"Rajesh Kumar",
      "email":"rajesh.driver@abc.edu",
      "driverId":"DRV1001",
      "password":"driver123",
      "licenseNumber":"RJ14LIC12345",
      "busNumber":"BUS-12",
      "route":"City Center - Campus",
      "contactNumber":"9876543210"
    }
    ```
  - Success: `201 Created` with driver object.
  - Errors: `400` for missing/duplicates; `500` server error.
  - Troubleshooting: if `req.body` is undefined, ensure `express.json()` middleware and `Content-Type: application/json` header.

- POST `/driver/login`
  - Body:
    ```json
    { "email":"rajesh.driver@abc.edu", "password":"driver123" }
    ```
  - Success: `200 OK` with driver data and cookie.
  - Errors: `400` invalid credentials.

---

### 4) Admin

- POST `/admin/register`
  - Purpose: Register admin and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"Admin Name",
      "email":"admin@college.edu",
      "employeeId":"EMP1002",
      "password":"admin123",
      "role":"SuperAdmin",
      "permissions":["Manage Students","View Reports"]
    }
    ```
  - Notes: `role` must be one of:
    - `SuperAdmin`, `ExamAdmin`, `TransportAdmin`, `AccountsAdmin`
  - Success: `201 Created` with admin object.
  - Errors: `400` for missing/invalid/duplicate fields.

- POST `/admin/login`
  - Body:
    ```json
    { "email":"admin@college.edu", "password":"admin123" }
    ```
  - Success: `200 OK` with admin object and cookie.
  - Errors: `400` invalid credentials.

---

## Response Examples

- Successful registration (driver example):
  ```json
  {
    "message":"Driver registered successfully",
    "driver": {
      "_id":"...",
      "name":"Rajesh Kumar",
      "email":"rajesh.driver@abc.edu",
      "driverId":"DRV1001",
      "licenseNumber":"RJ14LIC12345",
      "busNumber":"BUS-12",
      "route":"City Center - Campus",
      "contactNumber":"9876543210",
      "college":"<collegeId>"
    }
  }
  ```

- Successful login:
  ```json
  {
    "message":"Admin logged in successfully",
    "admin": { "_id":"...", "name":"...", "email":"...", "role":"SuperAdmin", "college":"..." }
  }
  ```

---

## Error Handling

- `400 Bad Request` — missing or invalid fields, duplicates.
- `401 Unauthorized` — invalid credentials (if used).
- `500 Internal Server Error` — unexpected server exception.

Controller tips:
- Always guard against `req.body` being undefined:
  ```js
  const body = req.body || {};
  ```
- Log request headers/body when debugging:
  ```js
  console.log("headers:", req.headers);
  console.log("body:", req.body);
  ```

---

## Testing

Use Postman / curl. Example curl for driver registration:

```bash
curl -X POST http://localhost:5000/api/auth/driver/register \
  -H "Content-Type: application/json" \
  -d '{
    "college":"66f2a0e8a12bcd4567891234",
    "name":"Rajesh Kumar",
    "email":"rajesh.driver@abc.edu",
    "driverId":"DRV1001",
    "password":"driver123",
    "licenseNumber":"RJ14LIC12345",
    "busNumber":"BUS-12",
    "route":"City Center - Campus",
    "contactNumber":"9876543210"
  }'
```

---

## Models referenced

- Student: college (ObjectId), name, email, rollNo, password, branch, semester, studentType, programLevel, programName
- Faculty: college, name, email, employeeId, password, department, designation, coursesHandled
- Driver: college, name, email, driverId, password, licenseNumber, busNumber, route, contactNumber
- Admin: college, name, email, employeeId, password, role, permissions

---

## Security / Deployment Notes

- Use strong `JWT_SECRET` and secure cookies in production.
- Set `secure: true` for cookies when serving over HTTPS.
- Validate ObjectId formats for `college` references.
- Rate-limit login endpoints to mitigate brute-force attacks.

---

## Contact

For updates or issues, modify controllers/routes accordingly and update this README.
```// filepath: c:\Users\suir\Desktop\ERP\Backend\README.md
# ERP Backend API Documentation

This document provides a detailed overview of the APIs implemented for the ERP backend. The APIs are focused on authentication and user management for different roles: Student, Faculty, Driver, and Admin.

---

## Base URL

All APIs are mounted under:

```
http://localhost:5000/api/auth
```

Adjust host/port according to your server configuration.

---

## Prerequisites

- Node.js and npm installed.
- MongoDB connection string configured in `.env`.
- Environment variables:
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — secret for signing JWTs
  - `PORT` — server port (default 5000)
  - `NODE_ENV` — e.g. `production`
- Ensure Express body parsing middleware is enabled before route mounting:
  ```js
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  ```

---

## Common Notes

- Requests with JSON bodies must include header:
  ```
  Content-Type: application/json
  ```
- Successful auth responses set an httpOnly cookie named `token`.
- JWT payload typically contains `id` and `role` (and sometimes `college`).
- Error responses use appropriate HTTP status codes (400, 401, 500).
- Check server logs when debugging controllers.

---

## Routes (prefix: `/api/auth`)

Each section below lists endpoint, purpose, request body and typical responses.

### 1) Student

- POST `/student/register`
  - Purpose: Register a new student and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"John Doe",
      "email":"john@example.edu",
      "rollNo":"ROLL123",
      "password":"password123",
      "branch":"CSE",
      "semester":3,
      "studentType":"Regular",
      "programLevel":"Undergraduate",
      "programName":"B.Tech"
    }
    ```
  - Success: `201 Created`
    ```json
    {
      "message":"Student registered successfully",
      "student": { "_id":"...", "name":"...", "email":"...", "college":"...", "rollNo":"...", ... }
    }
    ```
  - Errors: `400` for missing/duplicate fields, `500` for server errors.

- POST `/student/login`
  - Purpose: Login student and set auth cookie.
  - Body:
    ```json
    { "email":"john@example.edu", "password":"password123" }
    ```
  - Success: `200 OK` with student object and cookie.
  - Errors: `400` invalid credentials.

---

### 2) Faculty

- POST `/faculty/register`
  - Purpose: Register faculty and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"Dr. Smith",
      "email":"smith@faculty.edu",
      "employeeId":"EMP1001",
      "password":"password123",
      "department":"CSE",
      "designation":"Professor",
      "coursesHandled":["CS101","CS102"]
    }
    ```
  - Success: `201 Created` returns faculty object.
  - Errors: `400` for missing/duplicate fields.

- POST `/faculty/login`
  - Body:
    ```json
    { "email":"smith@faculty.edu", "password":"password123" }
    ```
  - Success: `200 OK`, sets cookie.
  - Errors: `400` invalid credentials.

---

### 3) Driver

- POST `/driver/register`
  - Purpose: Register driver and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"Rajesh Kumar",
      "email":"rajesh.driver@abc.edu",
      "driverId":"DRV1001",
      "password":"driver123",
      "licenseNumber":"RJ14LIC12345",
      "busNumber":"BUS-12",
      "route":"City Center - Campus",
      "contactNumber":"9876543210"
    }
    ```
  - Success: `201 Created` with driver object.
  - Errors: `400` for missing/duplicates; `500` server error.
  - Troubleshooting: if `req.body` is undefined, ensure `express.json()` middleware and `Content-Type: application/json` header.

- POST `/driver/login`
  - Body:
    ```json
    { "email":"rajesh.driver@abc.edu", "password":"driver123" }
    ```
  - Success: `200 OK` with driver data and cookie.
  - Errors: `400` invalid credentials.

---

### 4) Admin

- POST `/admin/register`
  - Purpose: Register admin and set auth cookie.
  - Required body:
    ```json
    {
      "college":"<collegeId>",
      "name":"Admin Name",
      "email":"admin@college.edu",
      "employeeId":"EMP1002",
      "password":"admin123",
      "role":"SuperAdmin",
      "permissions":["Manage Students","View Reports"]
    }
    ```
  - Notes: `role` must be one of:
    - `SuperAdmin`, `ExamAdmin`, `TransportAdmin`, `AccountsAdmin`
  - Success: `201 Created` with admin object.
  - Errors: `400` for missing/invalid/duplicate fields.

- POST `/admin/login`
  - Body:
    ```json
    { "email":"admin@college.edu", "password":"admin123" }
    ```
  - Success: `200 OK` with admin object and cookie.
  - Errors: `400` invalid credentials.

---

## Response Examples

- Successful registration (driver example):
  ```json
  {
    "message":"Driver registered successfully",
    "driver": {
      "_id":"...",
      "name":"Rajesh Kumar",
      "email":"rajesh.driver@abc.edu",
      "driverId":"DRV1001",
      "licenseNumber":"RJ14LIC12345",
      "busNumber":"BUS-12",
      "route":"City Center - Campus",
      "contactNumber":"9876543210",
      "college":"<collegeId>"
    }
  }
  ```

- Successful login:
  ```json
  {
    "message":"Admin logged in successfully",
    "admin": { "_id":"...", "name":"...", "email":"...", "role":"SuperAdmin", "college":"..." }
  }
  ```

---

## Error Handling

- `400 Bad Request` — missing or invalid fields, duplicates.
- `401 Unauthorized` — invalid credentials (if used).
- `500 Internal Server Error` — unexpected server exception.

Controller tips:
- Always guard against `req.body` being undefined:
  ```js
  const body = req.body || {};
  ```
- Log request headers/body when debugging:
  ```js
  console.log("headers:", req.headers);
  console.log("body:", req.body);
  ```

---

## Testing

Use Postman / curl. Example curl for driver registration:

```bash
curl -X POST http://localhost:5000/api/auth/driver/register \
  -H "Content-Type: application/json" \
  -d '{
    "college":"66f2a0e8a12bcd4567891234",
    "name":"Rajesh Kumar",
    "email":"rajesh.driver@abc.edu",
    "driverId":"DRV1001",
    "password":"driver123",
    "licenseNumber":"RJ14LIC12345",
    "busNumber":"BUS-12",
    "route":"City Center - Campus",
    "contactNumber":"9876543210"
  }'
```

---

## Models referenced

- Student: college (ObjectId), name, email, rollNo, password, branch, semester, studentType, programLevel, programName
- Faculty: college, name, email, employeeId, password, department, designation, coursesHandled
- Driver: college, name, email, driverId, password, licenseNumber, busNumber, route, contactNumber
- Admin: college, name, email, employeeId, password, role, permissions

---

## Security / Deployment Notes

- Use strong `JWT_SECRET` and secure cookies in production.
- Set `secure: true` for cookies when serving over HTTPS.
- Validate ObjectId formats for `college` references.
- Rate-limit login endpoints to mitigate brute-force attacks.

---

## Contact

For updates or issues, modify controllers/routes accordingly and update this README.