# User Management System

Full-stack application with .NET 8 Web API backend and React + TypeScript frontend featuring JWT authentication with refresh tokens.

## 📋 Project Structure

```
ColipotProjects/
├── API/               # .NET 8 Web API
│   ├── Controllers/   # API Controllers
│   ├── Services/      # Business Logic
│   ├── Repositories/  # Data Access Layer
│   ├── Data/          # DbContext
│   ├── Models/        # Entity Models
│   └── DTOs/          # Data Transfer Objects
│
└── UI/                # React + TypeScript
    └── src/
        ├── api/       # API Client & Services
        ├── auth/      # Authentication Logic
        ├── models/    # TypeScript Types
        ├── pages/     # React Pages
        └── routes/    # Route Configuration
```

## 🚀 Getting Started

### Prerequisites

- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **SQL Server** (LocalDB or Express)
- **Visual Studio Code** or **Visual Studio 2022**

---

## 🔧 Backend Setup (API)

### 1. Navigate to API folder

```powershell
cd API
```

### 2. Install EF Core Tools (one-time setup)

```powershell
dotnet tool install --global dotnet-ef
```

If already installed, update it:
```powershell
dotnet tool update --global dotnet-ef
```

### 3. Restore NuGet packages

```powershell
dotnet restore
```

### 3. Update database connection string (if needed)

Edit `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=UserManagementDB;Trusted_Connection=true;TrustServerCertificate=true;"
}
```

### 4. Create and apply database migrations

```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

> **Note:** Default admin user is automatically created on first run:
> - Username: `admin`
> - Password: `1`

### 5. Run the API

```powershell
dotnet run
```

The API will be available at:
- **HTTP:** `http://localhost:5000`
- **Swagger:** `http://localhost:5000/swagger`

---

## 🎨 Frontend Setup (UI)

### 1. Navigate to UI folder

```powershell
cd UI
```

### 2. Install dependencies

```powershell
npm install
```

### 3. Configure API URL (if needed)

Edit `src/api/apiClient.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### 4. Run the development server

```powershell
npm run dev
```

The UI will be available at:
- **URL:** `http://localhost:5173`

---

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with credentials |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout and revoke refresh token |

### Users Management

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/api/users` | Get all users | ✅ | ❌ |
| GET | `/api/users/{id}` | Get user by ID | ✅ | ❌ |
| POST | `/api/users` | Create new user | ✅ | ✅ |
| PUT | `/api/users/{id}` | Update user | ✅ | ✅ |
| DELETE | `/api/users/{id}` | Delete user | ✅ | ✅ |

---

## 🔐 Authentication Flow

1. **Login** - User submits credentials → receives Access Token (15 min) + Refresh Token (7 days)
2. **Access** - Access Token sent with each request via `Authorization: Bearer {token}` header
3. **Refresh** - When Access Token expires (401), Axios interceptor automatically calls `/refresh`
4. **Retry** - Original request retried with new Access Token
5. **Logout** - Refresh Token revoked in database

---

## 👥 User Roles

### Admin
- ✅ View all users
- ✅ Create new users
- ✅ Edit users
- ✅ Delete users

### Client
- ✅ View all users
- ❌ Cannot create/edit/delete

---

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core 8** - Web API Framework
- **Entity Framework Core 8** - ORM
- **SQL Server** - Database
- **JWT Bearer** - Authentication
- **BCrypt.Net** - Password Hashing
- **Swagger** - API Documentation

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Kendo React** - UI Components
- **Axios** - HTTP Client
- **React Router** - Navigation

---

## 📝 Database Schema

### Users Table
```sql
Id (int, PK)
Username (string, unique)
PasswordHash (string)
Role (enum: Admin = 1, Client = 2)
```

### RefreshTokens Table
```sql
Id (int, PK)
Token (string)
Expires (DateTime)
Created (DateTime)
Revoked (DateTime, nullable)
UserId (int, FK → Users)
```

---

## 🧪 Testing with Swagger

1. Navigate to `http://localhost:5000/swagger`
2. Click **Authorize** button
3. Login using `/api/auth/login`:
   ```json
   {
     "username": "admin",
     "password": "1"
   }
   ```
4. Copy the `accessToken` from response
5. Enter in Authorization dialog: `Bearer {accessToken}`
6. Test secured endpoints

---

## 🐛 Troubleshooting

### Database Connection Issues
```powershell
# Check SQL Server LocalDB status
sqllocaldb info mssqllocaldb

# Start LocalDB if stopped
sqllocaldb start mssqllocaldb
```

### Port Already in Use
```powershell
# API (change in launchSettings.json or use)
dotnet run --urls "http://localhost:5001"

# UI (change in vite.config.ts or use)
npm run dev -- --port 3000
```

### CORS Issues
Ensure API `Program.cs` includes your UI origin in CORS policy:
```csharp
policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
```

---

## 📦 Build for Production

### Backend
```powershell
cd API
dotnet publish -c Release -o ./publish
```

### Frontend
```powershell
cd UI
npm run build
# Output in ./dist folder
```

---

## 🔑 Security Notes

- **Change JWT Secret** in production (`appsettings.json`)
- **Use HTTPS** in production
- **Update CORS** policy for production domains
- **Strong passwords** enforcement recommended
- **Rate limiting** should be added for production

---

## 📄 License

This project is provided as-is for educational purposes.

## 💡 Default Credentials

```
Username: admin
Password: 1
```

Change these immediately after first login in production!
