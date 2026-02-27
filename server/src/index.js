const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

require('./db/mongoose');

// Auto-seed database if SEED_ON_START is true (first time only, idempotent)
if (process.env.SEED_ON_START === 'true') {
  const seedData = require('../scripts/seed');
  seedData().catch(err => console.error('Seed error:', err.message));
}

// Routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const cinemaRouter = require('./routes/cinema');
const showtimeRouter = require('./routes/showtime');
const reservationRouter = require('./routes/reservation');
const invitationsRouter = require('./routes/invitations');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;

// Serve static files from the React app (if they exist)
const clientBuildPath = path.join(__dirname, '../../client/build');
try {
  if (require('fs').existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
  }
} catch (e) {
  console.log('Client build files not found, serving API only');
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(movieRouter);
app.use(cinemaRouter);
app.use(showtimeRouter);
app.use(reservationRouter);
app.use(invitationsRouter);

// app.get('/api/test', (req, res) => res.send('Hello World'))

// The "catchall" handler: for any request that doesn't match above, send back React's index.html file (if it exists)
const indexPath = path.join(__dirname, '../../client/build/index.html');
try {
  if (require('fs').existsSync(indexPath)) {
    app.get('/*', (req, res) => {
      res.sendFile(indexPath);
    });
  }
} catch (e) {
  // No catchall if client build doesn't exist
}

app.listen(port, () => console.log(`app is running in PORT: ${port}`));
