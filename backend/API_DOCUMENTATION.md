# ClubConnect Backend API Documentation

## Overview
This document lists all available APIs in the ClubConnect backend application.

**Total APIs: 31**

---

## 1. Authentication APIs (Base: `/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | User login | Public |

**Total: 1 API**

---

## 2. Club APIs (Base: `/api/clubs`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/clubs/` | Create a new club | Admin Only |
| GET | `/api/clubs/` | Get all clubs | Protected |
| POST | `/api/clubs/add-student` | Add student to a club | Admin Only |
| GET | `/api/clubs/:id` | Get club by ID | Protected |

**Total: 4 APIs**

---

## 3. Student APIs (Base: `/api/students`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/students/create` | Create a new student | Admin Only |

**Total: 1 API**

---

## 4. Event APIs (Base: `/api/events`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/events/` | Create a new event (with poster upload) | Admin Only |
| GET | `/api/events/` | Get all events | Protected |

**Total: 2 APIs**

---

## 5. Registration APIs (Base: `/api/registrations`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/registrations/` | Register for an event | Protected |
| GET | `/api/registrations/` | Get all registrations | Admin Only |
| PATCH | `/api/registrations/:id` | Update registration status | Admin Only |

**Total: 3 APIs**

---

## 6. Resource APIs (Base: `/api/resources`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/resources/` | Upload resource (with file upload) | Admin Only |
| GET | `/api/resources/:eventId` | Get resources by event ID | Protected |

**Total: 2 APIs**

---

## 7. Feedback APIs (Base: `/api/feedback`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/feedback/` | Submit feedback | Approved Users Only |
| GET | `/api/feedback/:eventId` | Get feedback by event ID | Admin Only |

**Total: 2 APIs**

---

## 8. Certificate APIs (Base: `/api/certificates`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/certificates/generate` | Generate certificate | Admin Only |
| GET | `/api/certificates/my` | Get my certificates | Protected |

**Total: 2 APIs**

---

## 9. Dashboard APIs (Base: `/api/dashboard`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/dashboard/admin` | Get admin statistics | Protected |
| GET | `/api/dashboard/student` | Get student statistics | Protected |

**Total: 2 APIs**

---

## 10. User APIs (Base: `/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| PUT | `/api/users/change-password` | Change user password | Protected |

**Total: 1 API**

---

## 11. Admin APIs (Base: `/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/students` | Get all students | Admin Only |

**Total: 1 API**

---

## 12. Gallery APIs (Base: `/api/gallery`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/gallery/` | Get gallery items | Protected |

**Total: 1 API**

---

## 13. Announcement APIs (Base: `/api/announcements`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/announcements/` | Create announcement and notify club members | Admin Only |
| GET | `/api/announcements/all` | Get all announcements | Admin Only |
| GET | `/api/announcements/my` | Get announcements for student's clubs | Protected |
| DELETE | `/api/announcements/:id` | Delete announcement | Admin Only |

**Total: 4 APIs**

**Note:** When an announcement is created, all members of the selected club receive an email notification.

---

## Access Level Definitions

- **Public**: No authentication required
- **Protected**: Requires valid JWT token
- **Admin Only**: Requires valid JWT token + admin role
- **Approved Users Only**: Requires valid JWT token + approved status

---

## File Upload APIs

The following APIs support file uploads:

1. **POST /api/events/** - Uploads event poster (single file)
   - Field name: `poster`
   
2. **POST /api/resources/** - Uploads resource file (single file)
   - Field name: `file`

---

## Summary by Category
Announcements | 4 |
| **TOTAL** | **31
| Category | Number of APIs |
|----------|----------------|
| Authentication | 1 |
| Clubs | 4 |
| Students | 1 |
| Events | 2 |
| Registrations | 3 |
| Resources | 2 |
| Feedback | 2 |
| Certificates | 2 |
| Dashboard | 2 |
| Users | 1 |
| Admin | 1 |
| Gallery | 1 |
| **TOTAL** | **27** |

---

## Static Files

- **GET /uploads/***: Access uploaded files (posters, resources, etc.)
- **GET /**: Health check endpoint - returns "Club Connect API Running"

---

*Last Updated: February 5, 2026*
