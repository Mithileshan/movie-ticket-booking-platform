# Movie Ticket Booking Platform

Full-stack production-ready movie ticket booking system built with MERN stack and containerized using Docker Compose.

![Docker](https://img.shields.io/badge/docker-ready-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/node-18+-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/database-mongodb-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/react-16.11+-61DAFB?style=flat-square)
![Express](https://img.shields.io/badge/express-4.16+-FF6347?style=flat-square)

---

## Overview

A full-stack movie ticketing platform supporting user authentication, movie browsing, seat selection, and reservation management. Designed for production deployment with Docker Compose orchestration, comprehensive API documentation via Swagger/OpenAPI 3.0, and database seeding for immediate demo usage. Portfolio-grade architecture demonstrating full DevOps capabilities.

---

## Architecture

```
┌─────────────────────────────┐
│   React SPA (Port 3000)     │
│   Nginx Reverse Proxy       │
└────────────┬────────────────┘
             │ HTTPS/REST API
             ▼
┌─────────────────────────────┐
│  Node.js + Express API      │
│  (Port 8080)                │
│  - JWT Authentication       │
│  - Business Logic           │
│  - Swagger/OpenAPI Docs     │
└────────────┬────────────────┘
             │ Mongoose ODM
             ▼
┌─────────────────────────────┐
│   MongoDB Database          │
│   (Port 27017)              │
│   - Seeded Demo Data        │
│   - Live Bookings           │
└─────────────────────────────┘
```

---

## Features

### User

- Register & Login with JWT authentication
- Browse movies filtered by genre, language, release date
- Select showtimes and cinema locations
- Visual seat booking interface
- Real-time seat availability status
- View booking history
- Instant confirmation with QR-encoded ticket

### Admin

- Create and manage movies with metadata
- Configure cinema locations and seating arrangements
- Schedule showtimes with availability control
- View all reservations and manage cancellations
- Analytics dashboard with revenue/occupancy metrics
- Approval workflow for admin access

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 16.11.0 |
| State Mgmt | Redux | 4.0+ |
| UI Framework | Material-UI | 4.6+ |
| Backend | Node.js | 16-alpine |
| API Server | Express.js | 4.16+ |
| Database | MongoDB | 6 |
| ODM | Mongoose | 5.5+ |
| Authentication | JWT + bcryptjs | 8.5+ / 2.4+ |
| API Docs | Swagger-UI + swagger-jsdoc | Latest |
| File Upload | Multer | 1.4+ |
| Utilities | Moment.js, Chart.js, qrcode | Latest |
| Containerization | Docker & Docker Compose | Latest |
| Reverse Proxy | Nginx | Alpine |

---

## Project Structure

```
movie-ticket-booking-platform/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── index.js
│   ├── scripts/seed.js              # Idempotent seed script
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── docker-compose.yml               # Production orchestration
├── docker-compose.dev.yml           # Development setup
└── README.md
```

---

## Environment Variables

### Backend (server/.env)

```env
# Database
MONGODB_URI=mongodb://mongo:27017/movieticketdb
SEED_ON_START=true

# JWT
JWT_SECRET=your_secure_secret_key
JWT_EXPIRY=7d

# Server
PORT=8080
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Frontend (client/.env)

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

---

## Quick Start

### With Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/Mithileshan/movie-ticket-booking-platform.git
cd movie-ticket-booking-platform

# Start all services
docker compose up -d --build

# Access application
# Frontend:  http://localhost:3000
# Backend:   http://localhost:8080
# API Docs:  http://localhost:8080/api/docs
```

### Local Development

```bash
# Backend
cd server
npm install --legacy-peer-deps
npm run dev

# Frontend (in another terminal)
cd client
npm install --legacy-peer-deps
npm start
```

---

## Demo Data

Demo data auto-seeds on first startup:

- **5 movies**: Inception, Dark Knight, Interstellar, Pulp Fiction, The Matrix
- **4 cinemas**: Major city locations with 120-seat layouts
- **80 showtimes**: 2-week schedule across all cinemas/movies
- **Admin user**: `admin@demo.com` / `Admin@123`

### Idempotent Seeding

Seed script checks if data exists before insertion — safe to restart containers without duplicate data.

### Manual Reset

```bash
# Delete database and reseed
docker compose down -v
docker compose up -d

# Or manually seed
npm run seed
```

### Disable Auto-Seed (Production)

```env
SEED_ON_START=false
```

---

## API Documentation

### Interactive Swagger UI

```
GET http://localhost:8080/api/docs
```

Complete OpenAPI 3.0 specification with:
- 50+ documented endpoints
- Request/response examples
- JWT authorization token support
- Direct endpoint testing

### Health Check

```bash
curl http://localhost:8080/health
# { "status": "healthy", "timestamp": "..." }

curl http://localhost:8080/version
# { "version": "1.0.0", "name": "Movie Ticket Booking Platform", "environment": "production" }
```

### Core Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/movies
GET    /api/cinemas
POST   /api/showtimes
POST   /api/reservations
```

Full API reference: See `/api/docs` after running application.

---

## Docker & Deployment

### Build & Run

```bash
# Development (backend + MongoDB)
docker compose -f docker-compose.dev.yml up -d

# Production (frontend + backend + MongoDB)
docker compose up -d --build

# View logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

### Containerization Details

- **Backend**: node:16-alpine (150MB)
- **Frontend**: Multi-stage build using nginx:alpine (40MB)
- **Health checks**: Built-in for auto-recovery
- `.dockerignore`: Optimized build context

---

## Security & Production

### Authentication & Encryption

- Password hashing: bcryptjs (10 salt rounds)
- Token-based auth: JWT with configurable expiry
- Input validation: Schema validation via Mongoose
- CORS protection: Configuration via CLIENT_URL environment variable

### Network Security

- Nginx security headers:
  - X-Frame-Options: SAMEORIGIN (prevents clickjacking)
  - X-Content-Type-Options: nosniff (prevents MIME sniffing)
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: no-referrer-when-downgrade

### Production Checklist

- [ ] Environment variables secured (use .env.production)
- [ ] MongoDB Atlas cluster configured
- [ ] JWT_SECRET generated: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Email credentials configured
- [ ] CORS CLIENT_URL set to production domain
- [ ] HTTPS/SSL certificates ready
- [ ] SEED_ON_START=false for persistent data
- [ ] Database backups configured

---

## Deployment Ready

The application is **deployment-ready** and configured for:

- **Render** (recommended) — native Docker support, auto-HTTPS
- **Railway** — simple GitHub integration
- **Heroku** — git-based deployment
- **AWS ECS** — container orchestration
- **DigitalOcean Kubernetes** — production-grade scaling

Detailed deployment guides for each platform available upon request.

---

## Future Enhancements

- Redis caching layer for seat locking
- Payment gateway integration (Stripe/Razorpay)
- WebSocket support for real-time updates
- CI/CD pipeline with GitHub Actions
- Advanced analytics and reporting
- Microservices architecture refactor

---

## Testing

### Using Swagger UI

1. Start: `docker compose up -d`
2. Open: http://localhost:8080/api/docs
3. Authorize with JWT token
4. Test any endpoint

### Using cURL

```bash
# Get all movies
curl http://localhost:8080/api/movies

# Health status
curl http://localhost:8080/health

# Make a reservation (requires token)
curl -X POST http://localhost:8080/api/reservations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"showtimeId":"...", "seats":["A1","A2"], "totalPrice":500}'
```

---

## License

This project is licensed under the MIT License.

---

## Author

**Mithileshan**  
GitHub: [Mithileshan](https://github.com/Mithileshan)
