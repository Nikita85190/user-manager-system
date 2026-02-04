You are a senior full-stack engineer. Create a complete production-ready solution from scratch inside this empty folder.

Generate files and folders automatically.

=====================================================
SOLUTION STRUCTURE
=====================================================

Root
│
├── UI        (React Application)
└── API       (.NET Web API)

=====================================================
BACKEND (API)
=====================================================

Tech Stack:
- ASP.NET Core 8 Web API (latest LTS)
- Entity Framework Core 8
- SQL Server (LocalDB)
- Swagger/OpenAPI
- JWT Authentication + Refresh Tokens
- BCrypt.Net for password hashing

Architecture:
- Controllers
- Services
- Repositories
- Data
- Models
- DTOs

Patterns:
- Dependency Injection
- Repository Pattern
- Service Layer
- Async/Await everywhere
- Code First EF Migrations

-----------------------------------------------------
DATABASE
-----------------------------------------------------

Connection string must be located in appsettings.json.

Entities:

User
- Id (int, PK)
- Username (string, unique)
- PasswordHash (string)
- Role (enum: Admin, Client)

RefreshToken
- Id (int, PK)
- Token (string)
- Expires (DateTime)
- Created (DateTime)
- Revoked (DateTime?)
- UserId (FK)

-----------------------------------------------------
SEED DATA
-----------------------------------------------------

On application startup create default admin:

Username: admin  
Password: 1  
Role: Admin  

-----------------------------------------------------
AUTHENTICATION
-----------------------------------------------------

Use JWT Access Token + Refresh Token

Access Token:
- Lifetime: 15 minutes

Refresh Token:
- Lifetime: 7 days
- Stored in database
- One active refresh token per user

Endpoints:

POST    /api/auth/login  
POST    /api/auth/refresh  
POST    /api/auth/logout  

-----------------------------------------------------
USERS MANAGEMENT
-----------------------------------------------------

Endpoints:

GET     /api/users  
POST    /api/users  
PUT     /api/users/{id}  
DELETE  /api/users/{id}  

Use DTOs:

LoginRequest  
CreateUserRequest  
UpdateUserRequest  
UserResponse  

-----------------------------------------------------
AUTHORIZATION RULES
-----------------------------------------------------

Admin:
- Can view users
- Can create user
- Can edit user
- Can delete user

Client:
- Can only view users

Use [Authorize] attributes and role-based authorization.

-----------------------------------------------------
SWAGGER
-----------------------------------------------------

Swagger must:
- Be enabled in Development
- Support JWT Bearer authentication
- Allow testing secured endpoints

-----------------------------------------------------
FRONTEND (UI)
=====================================================

Tech Stack:
- React 18 (latest)
- TypeScript
- Material-UI (MUI) v5
- MUI DataGrid
- React Router v6
- Axios

-----------------------------------------------------
PAGES
-----------------------------------------------------

LoginPage  
UsersListPage  
CreateUserPage  
EditUserPage  

-----------------------------------------------------
FEATURES
-----------------------------------------------------

- Login form
- Store AccessToken and RefreshToken in localStorage
- Axios interceptor:
    - Attach AccessToken
    - On 401 automatically call /refresh
    - Retry original request
- Protected routes
- Role-based UI rendering

Admin sees:
- Add User button
- Edit button
- Delete button

Client sees:
- Only users grid

-----------------------------------------------------
USERS LIST
-----------------------------------------------------

Use MUI DataGrid:

Columns:
- ID
- Username
- Role
- Actions (Edit, Delete buttons for Admin only)

-----------------------------------------------------
CREATE / EDIT USER
-----------------------------------------------------
MUI TextField and Select:

Fields:
- Username (TextField)
- Password (TextField, type="password")
- Role (Select with MenuItem: Admin, Client
- Role (Dropdown)

-----------------------------------------------------
UI STRUCTURE
-----------------------------------------------------

src
│
├── api
├── auth
├── components
├── pages
├── routes
├── models

-----------------------------------------------------
GENERAL REQUIREMENTS
=====================================================

- Provide full project scaffolding
- Provide complete implementations for:
  - Controllers (AuthController, UsersController)
  - Services (AuthService, UserService, TokenService)
  - Repositories (IUserRepository, UserRepository)
  - DbContext with proper entity configuration
  - JWT & Refresh Token logic with auto-refresh
  - All React pages with Material-UI
  - Axios interceptor for token refresh
  - Role-based UI rendering
-----------------------------------------------------
ADDITIONAL FEATURES IMPLEMENTED
-----------------------------------------------------

Backend:
- Auto-migration on startup
- Auto-seed default admin user
- CORS configured for React app
- Global exception handling
- Token revocation on logout
- One active refresh token per user

Frontend:
- Material Design UI (MUI v5)
- AppBar with navigation
- MUI DataGrid with pagination
- MUI Icons for better UX
- Responsive design
- Loading states and error handling
- Client-side role checking
- Auto token refresh on 401
- Protected routes
- Form validation

Security:
- Password hashing with BCrypt
- Refresh token rotation
- Token revocation
- Role-based authorization
- CORS protection

- Include EF migration commands
- Include comprehensive README.md with:
  - Setup instructions
  - API documentation
  - Troubleshooting guide
  - Database schema
  - Default credentials

=====================================================
END OF PROMPT
=====================================================
