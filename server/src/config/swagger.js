/**
 * Swagger/OpenAPI Setup for Movie Ticket Booking Platform
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Ticket Booking Platform API',
      version: '1.0.0',
      description: 'Complete REST API for movie ticket booking system with authentication, cinema management, and reservations',
      contact: {
        name: 'Support',
        email: 'support@movietickets.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development Server',
      },
      {
        url: 'http://api.movietickets.com',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'username', 'email', 'password'],
          properties: {
            _id: { type: 'string', description: 'User ID' },
            name: { type: 'string', description: 'Full name' },
            username: { type: 'string', description: 'Unique username' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            role: { type: 'string', enum: ['guest', 'admin', 'superadmin'] },
            password: { type: 'string', minLength: 7 },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Movie: {
          type: 'object',
          required: ['title', 'language', 'genre', 'director', 'cast', 'description', 'duration', 'releaseDate', 'endDate'],
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            image: { type: 'string', description: 'Movie poster image URL' },
            language: { type: 'string' },
            genre: { type: 'string' },
            director: { type: 'string' },
            cast: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'number', description: 'Duration in minutes' },
            releaseDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
          },
        },
        Cinema: {
          type: 'object',
          required: ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable'],
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            ticketPrice: { type: 'number' },
            city: { type: 'string' },
            seatsAvailable: { type: 'number' },
            seats: { type: 'array', items: { type: 'object' } },
            image: { type: 'string' },
          },
        },
        Showtime: {
          type: 'object',
          required: ['startAt', 'startDate', 'endDate', 'movieId', 'cinemaId'],
          properties: {
            _id: { type: 'string' },
            startAt: { type: 'string', example: '10:00 AM' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            movieId: { type: 'string', description: 'Movie ID' },
            cinemaId: { type: 'string', description: 'Cinema ID' },
          },
        },
        Reservation: {
          type: 'object',
          required: ['userId', 'showtimeId', 'seats', 'totalPrice'],
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            showtimeId: { type: 'string' },
            seats: { type: 'array', items: { type: 'string' } },
            totalPrice: { type: 'number' },
            status: { type: 'string', enum: ['Confirmed', 'Cancelled'] },
            qrCode: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            statusCode: { type: 'number' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Movies', description: 'Movie management' },
      { name: 'Cinemas', description: 'Cinema management' },
      { name: 'Showtimes', description: 'Showtime management' },
      { name: 'Reservations', description: 'Ticket reservations' },
      { name: 'Admin', description: 'Admin dashboard and analytics' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
