<p align="center"> 
    <img src="Assets/2024-08-17-23-31-55.png" align="center" height="150"></img>
</p>

# Movie Ticket Booking Platform 🎬🎫 
> A full-stack movie ticket booking application built with React, Node.js, Express, MongoDB, and Docker Compose for seamless containerization.

<p align="center">
    <a href="https://reactjs.org/"><img alt="React" src="https://img.shields.io/badge/React-16.11.0-61DAFB?style=flat-square" /></a>
    <a href="https://nodejs.org/"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-16-339933?style=flat-square" /></a>
    <a href="https://expressjs.com/"><img alt="Express" src="https://img.shields.io/badge/Express-4.16-FF6347?style=flat-square" /></a>
    <a href="https://www.mongodb.com/"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-6-47A248?style=flat-square" /></a>
    <a href="https://www.docker.com/"><img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square" /></a>
    <a href="https://redux.js.org/"><img alt="Redux" src="https://img.shields.io/badge/Redux-4.0-764ABC?style=flat-square" /></a>
    <a href="https://mui.com/"><img alt="Material-UI" src="https://img.shields.io/badge/Material--UI-4.6-0081CB?style=flat-square" /></a>
</p>

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Docker & Deployment](#-docker--deployment)
- [Architecture](#-architecture)
- [Contributors](#-contributors)

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose installed
- Or: Node.js 16+, npm, and MongoDB 6+ for local development

### With Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/Mithileshan/movie-ticket-booking-platform.git
cd movie-ticket-booking-platform

# Start all services (Frontend, Backend, MongoDB)
docker compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# MongoDB: localhost:27017
```

### Local Development Setup

```bash
# Install dependencies
npm install

# Backend only (development mode)
npm run server
# Runs on http://localhost:8080

# Frontend only (development mode)
npm run client
# Runs on http://localhost:3000
```

---

## ✨ Features

### 👤 User Features
- **Browse Movies**: Explore a vast collection of movies filtered by genre, language, and release date
- **Select Showtimes**: Choose preferred cinema locations and showtimes
- **Seat Selection**: Visual real-time seat booking interface
- **Booking Confirmation**: Instant confirmation with booking summary
- **User Dashboard**: View reservation history and manage account
- **Authentication**: Secure login/registration with JWT tokens

### 🛡️ Admin Features
- **Cinema Management**: Add and manage multiple cinema locations
- **Movie Management**: Add movies, manage showtimes and availability
- **Seat Configuration**: Define seating arrangements and pricing
- **Reservation Tracking**: View all bookings and manage cancellations
- **Analytics Dashboard**: Visualize revenue, occupancy, and popularity metrics
- **Admin Approval System**: Super Admin approval workflow

### 🎯 Business Features
- **Multi-role Access**: Guest, Admin, and Super Admin roles
- **Real-time Seat Availability**: Dynamic seat status updates
- **Secure Payment Path**: Prepared for payment gateway integration
- **Email Notifications**: Booking confirmations via Nodemailer
- **QR Code Generation**: Digital ticket generation with qrcode library

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 16.11.0 |
| **State Management** | Redux | 4.0.4 |
| **UI Framework** | Material-UI | 4.6.0 |
| **Backend** | Node.js | 16-alpine |
| **API Framework** | Express.js | 4.16.4 |
| **Database** | MongoDB | 6 |
| **ODM** | Mongoose | 5.5.4 |
| **Authentication** | JWT + bcryptjs | 8.5.1 / 2.4.3 |
| **File Upload** | Multer | 1.4.2 |
| **Utilities** | Moment.js, Chart.js, jsPDF | Latest |
| **Containerization** | Docker & Docker Compose | Latest |
| **Reverse Proxy** | Nginx | Alpine |

---

## 📁 Project Structure

```
movie-ticket-booking-platform/
├── server/                          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/                 # API route handlers
│   │   ├── models/                 # Mongoose schemas
│   │   ├── controllers/            # Business logic
│   │   ├── middleware/             # Auth, validation middleware
│   │   └── index.js                # Express server entry
│   ├── Dockerfile                  # Backend containerization
│   ├── package.json                # Backend dependencies
│   └── .env                        # Backend environment config
│
├── client/                          # Frontend (React)
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── redux/                  # Redux store & actions
│   │   ├── App.js                  # Root component
│   │   └── index.js                # React DOM render
│   ├── Dockerfile                  # Frontend containerization
│   ├── nginx.conf                  # Nginx SPA routing config
│   ├── package.json                # Frontend dependencies
│   └── .env                        # Frontend environment config
│
├── docker-compose.yml              # Full stack orchestration (prod)
├── docker-compose.dev.yml          # Backend-only dev setup
└── README.md                       # This file
```

---

## 💻 Installation

### Clone Repository

```bash
git clone https://github.com/Mithileshan/movie-ticket-booking-platform.git
cd movie-ticket-booking-platform
```

### Backend Setup

```bash
cd server
npm install --legacy-peer-deps
```

### Frontend Setup

```bash
cd ../client
npm install --legacy-peer-deps
```

### MongoDB Setup

- **Docker**: Uses `mongo:6` service (included in docker-compose.yml)
- **Local**: Install [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/) and start `mongod`

---

## 🔐 Environment Variables

### Backend (server/.env)

```env
# Database
MONGODB_URI=mongodb://mongo:27017/movieticketdb  # Docker
# MONGODB_URI=mongodb://localhost:27017/movieticketdb  # Local

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Server
PORT=8080
NODE_ENV=production
```

### Frontend (client/.env)

```env
# API
REACT_APP_API_BASE_URL=http://localhost:8080

# OAuth (Optional future integration)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
GET    /api/auth/profile           # Get user profile
```

### Movies
```
GET    /api/movies                 # List all movies
GET    /api/movies/:id             # Get movie details
POST   /api/movies                 # Create movie (Admin)
PUT    /api/movies/:id             # Update movie (Admin)
DELETE /api/movies/:id             # Delete movie (Admin)
```

### Cinemas
```
GET    /api/cinemas                # List all cinemas
GET    /api/cinemas/:id            # Get cinema details
POST   /api/cinemas                # Create cinema (Admin)
PUT    /api/cinemas/:id            # Update cinema (Admin)
DELETE /api/cinemas/:id            # Delete cinema (Admin)
```

### Showtimes
```
GET    /api/showtimes              # List showtimes with filters
GET    /api/showtimes/:id          # Get showtime details
POST   /api/showtimes              # Create showtime (Admin)
PUT    /api/showtimes/:id          # Update showtime (Admin)
DELETE /api/showtimes/:id          # Delete showtime (Admin)
```

### Reservations
```
GET    /api/reservations           # List user reservations
GET    /api/reservations/:id       # Get reservation details
POST   /api/reservations           # Create reservation (Book ticket)
DELETE /api/reservations/:id       # Cancel reservation
```

### Admin Dashboard
```
GET    /api/admin/stats            # Get dashboard statistics
GET    /api/admin/analytics        # Get analytics data
GET    /api/admin/users            # List users (Super Admin)
GET    /api/admin/approvals        # Get admin approval requests
```

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed with bcryptjs),
  phone: String,
  role: String (Guest/Admin/SuperAdmin),
  isApproved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Movie Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  genre: [String],
  language: String,
  cast: [String],
  director: String,
  releaseDate: Date,
  endDate: Date,
  posterUrl: String,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Cinema Model
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  address: String,
  phone: String,
  email: String,
  admin: ObjectId (Reference to User),
  seatingLayout: Object,
  ticketPrice: Number,
  amenities: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Showtime Model
```javascript
{
  _id: ObjectId,
  movie: ObjectId (Reference to Movie),
  cinema: ObjectId (Reference to Cinema),
  startDate: Date,
  endDate: Date,
  showtimes: [String],
  seatsAvailable: Number,
  totalSeats: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Reservation Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (Reference to User),
  showtime: ObjectId (Reference to Showtime),
  seats: [String],
  totalPrice: Number,
  status: String (Confirmed/Cancelled),
  bookingDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐳 Docker & Deployment

### Docker Compose Files

#### `docker-compose.yml` (Production)
Orchestrates three services:
- **frontend**: React app served by Nginx on port 3000
- **backend**: Node.js API on port 8080
- **mongo**: MongoDB database on port 27017

```bash
docker compose up -d --build
```

#### `docker-compose.dev.yml` (Development)
Backend-only setup for rapid development:
- **backend**: Node.js API with hot reload
- **mongo**: MongoDB database

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

### Docker Images

**Backend Image**
- Base: `node:16-alpine`
- Size: ~150MB
- Health Check: `wget --quiet --tries=1 --spider http://localhost:8080/health`

**Frontend Image**
- Build Stage: `node:16` (compiles React)
- Runtime Stage: `nginx:alpine` (serves static files)
- Size: ~40MB

### Useful Docker Commands

```bash
# View running containers
docker compose ps

# View service logs
docker compose logs backend
docker compose logs frontend
docker compose logs -f mongo

# Execute command in container
docker exec -it movie-booking-api sh
docker exec -it movie-booking-frontend sh

# Stop and remove all services
docker compose down

# Clean up images and volumes
docker compose down -v
```

### Deployment to Cloud

#### Option 1: Render
```bash
# Create render.yaml for infrastructure-as-code deployment
render deploy
```

#### Option 2: Heroku
```bash
git push heroku main
```

#### Option 3: DigitalOcean App Platform
Connect repository and auto-deploy on push.

---

## 🏗️ Architecture

### High-Level System Flow

```
┌─────────────────┐
│  React SPA      │
│  (Port 3000)    │
└────────┬────────┘
         │ API Calls
         ▼
┌─────────────────┐
│  Express API    │
│  (Port 8080)    │
└────────┬────────┘
         │ Queries
         ▼
┌─────────────────┐
│  MongoDB        │
│  (Port 27017)   │
└─────────────────┘
```

### Authentication Flow

```
1. User submits credentials
2. Backend hashes password with bcryptjs
3. Compares with stored hash
4. Issues JWT token on success
5. Frontend stores token in localStorage
6. Token included in Authorization header for future requests
7. Middleware validates token on protected routes
```

### Booking Process

```
1. User browses movies and selects showtime
2. System queries available seats from MongoDB
3. User selects seats in React UI
4. Form validation on frontend
5. Reservation request sent with JWT token
6. Backend validates user, showtime, and seats
7. Transaction updates seat availability
8. Confirmation email sent via Nodemailer
9. QR code generated for ticket
10. Booking confirmed in user dashboard
```

---

## 🔒 Security Features

- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **CORS Middleware**: Prevents unauthorized cross-origin requests
- **Input Validation**: Schema validation with Mongoose
- **SQL/NoSQL Injection Prevention**: Parameterized queries via Mongoose
- **Rate Limiting**: Ready for express-rate-limit integration
- **HTTPS**: Ready for SSL/TLS configuration
- **Environment Variables**: Sensitive data in .env files (not committed)

---

## 🚀 Performance Optimizations

- **Multi-stage Docker builds**: Reduced image sizes
- **Nginx gzip compression**: Compresses API responses and static assets
- **MongoDB indexing**: Indexes on frequently queried fields
- **Redux state caching**: Minimizes unnecessary API calls
- **React code splitting**: Lazy loading of route components
- **CDN ready**: Static assets can be served from CDN
- **Connection pooling**: MongoDB connection reuse

---

## 🐛 Known Issues & Limitations

- Frontend npm installation may require `--legacy-peer-deps` due to older React 16 dependencies
- Email functionality requires valid Gmail app password
- Payment gateway not yet integrated (ready for Stripe/Razorpay)
- No real-time seat updates (WebSocket ready)

---

## 📚 API Testing

### Using cURL

```bash
# Get all movies
curl http://localhost:8080/api/movies

# Create reservation
curl -X POST http://localhost:8080/api/reservations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"showtimeId":"...", "seats":["A1","A2"]}'
```

### Using Postman

Import [postman/movie-api.collection.json](postman/movie-api.collection.json) for pre-configured API requests.

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👥 Contributors

- [Mithileshan](https://github.com/Mithileshan/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 References

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose ODM](https://mongoosejs.com/)
- [React Documentation](https://reactjs.org/)
- [Redux Documentation](https://redux.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [JWT Introduction](https://jwt.io/)

---

**⭐ If you find this project helpful, please consider giving it a star!**