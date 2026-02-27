/**
 * Seed Script - Idempotent demo data initialization
 * Run once with: npm run seed
 * Or auto-run on startup by setting SEED_ON_START=true in .env
 */

const path = require('path');
const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

require('../src/db/mongoose');

const User = require('../src/models/user');
const Movie = require('../src/models/movie');
const Cinema = require('../src/models/cinema');
const Showtime = require('../src/models/showtime');

const seedData = async () => {
  try {
    console.log('🌱 Starting seed data initialization...');

    // Check if data already exists (idempotent)
    const movieCount = await Movie.countDocuments();
    const cinemaCount = await Cinema.countDocuments();
    const showtimeCount = await Showtime.countDocuments();

    if (movieCount > 0 && cinemaCount > 0 && showtimeCount > 0) {
      console.log('✅ Seed data already exists. Skipping initialization.');
      process.exit(0);
    }

    // === DEMO MOVIES ===
    const movies = [
      {
        title: 'inception',
        image: 'https://via.placeholder.com/300x450?text=Inception',
        language: 'english',
        genre: 'sci-fi',
        director: 'christopher nolan',
        cast: 'leonardo dicaprio, joseph gordon-levitt',
        description: 'a thief who steals corporate secrets through dream-sharing technology',
        duration: 148,
        releaseDate: new Date('2024-02-15'),
        endDate: new Date('2024-03-31'),
      },
      {
        title: 'the dark knight',
        image: 'https://via.placeholder.com/300x450?text=Dark+Knight',
        language: 'english',
        genre: 'action',
        director: 'christopher nolan',
        cast: 'christian bale, heath ledger',
        description: 'when the menace known as the joker wreaks havoc on gotham city',
        duration: 152,
        releaseDate: new Date('2024-02-20'),
        endDate: new Date('2024-04-15'),
      },
      {
        title: 'interstellar',
        image: 'https://via.placeholder.com/300x450?text=Interstellar',
        language: 'english',
        genre: 'sci-fi',
        director: 'christopher nolan',
        cast: 'matthew mcconaughey, anne hathaway',
        description: 'a team of explorers travel through a wormhole in space',
        duration: 169,
        releaseDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-30'),
      },
      {
        title: 'pulp fiction',
        image: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
        language: 'english',
        genre: 'crime',
        director: 'quentin tarantino',
        cast: 'john travolta, samuel l. jackson',
        description: 'the lives of two mob hitmen, a boxer, a gangster and his wife intertwine',
        duration: 154,
        releaseDate: new Date('2024-02-10'),
        endDate: new Date('2024-05-20'),
      },
      {
        title: 'the matrix',
        image: 'https://via.placeholder.com/300x450?text=The+Matrix',
        language: 'english',
        genre: 'sci-fi',
        director: 'lana wachowski, lilly wachowski',
        cast: 'keanu reeves, laurence fishburne',
        description: 'a computer programmer discovers that reality is a simulation',
        duration: 136,
        releaseDate: new Date('2024-02-25'),
        endDate: new Date('2024-04-20'),
      },
    ];

    const insertedMovies = await Movie.insertMany(movies);
    console.log(`✅ Created ${insertedMovies.length} movies`);

    // === DEMO CINEMAS ===
    const seatsLayout = Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 12 }, (_, col) => ({
        seatNumber: `${String.fromCharCode(65 + row)}${col + 1}`,
        available: true,
      }))
    );

    const cinemas = [
      {
        name: 'Galaxy Cinema - Downtown',
        ticketPrice: 250,
        city: 'mumbai',
        seats: seatsLayout,
        seatsAvailable: 120,
        image: 'https://via.placeholder.com/400x300?text=Galaxy+Cinema',
      },
      {
        name: 'Star Lights Multiplex',
        ticketPrice: 300,
        city: 'bangalore',
        seats: seatsLayout,
        seatsAvailable: 120,
        image: 'https://via.placeholder.com/400x300?text=Star+Lights',
      },
      {
        name: 'PVR Cinemas - Central',
        ticketPrice: 280,
        city: 'delhi',
        seats: seatsLayout,
        seatsAvailable: 120,
        image: 'https://via.placeholder.com/400x300?text=PVR+Cinemas',
      },
      {
        name: 'INOX - Westend',
        ticketPrice: 320,
        city: 'hyderabad',
        seats: seatsLayout,
        seatsAvailable: 120,
        image: 'https://via.placeholder.com/400x300?text=INOX+Cinemas',
      },
    ];

    const insertedCinemas = await Cinema.insertMany(cinemas);
    console.log(`✅ Created ${insertedCinemas.length} cinemas`);

    // === DEMO SHOWTIMES ===
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 1); // Tomorrow

    const showtimes = [];
    
    // Create showtimes for each movie in each cinema
    for (let i = 0; i < insertedMovies.length; i++) {
      for (let j = 0; j < insertedCinemas.length; j++) {
        const startDate = new Date(baseDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14); // 2 weeks

        const times = ['10:00 AM', '01:00 PM', '04:30 PM', '08:00 PM'];

        times.forEach((time) => {
          showtimes.push({
            startAt: time,
            startDate,
            endDate,
            movieId: insertedMovies[i]._id,
            cinemaId: insertedCinemas[j]._id,
          });
        });
      }
    }

    const insertedShowtimes = await Showtime.insertMany(showtimes);
    console.log(`✅ Created ${insertedShowtimes.length} showtimes`);

    // === DEMO ADMIN USER (optional) ===
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const adminUser = new User({
        name: 'Demo Admin',
        username: 'demoadmin',
        email: 'admin@demo.com',
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log('✅ Created demo admin user (email: admin@demo.com, password: Admin@123)');
    }

    console.log('\n✨ Seed data initialization complete!');
    console.log('\n📊 Summary:');
    console.log(`   - Movies: ${insertedMovies.length}`);
    console.log(`   - Cinemas: ${insertedCinemas.length}`);
    console.log(`   - Showtimes: ${insertedShowtimes.length}`);
    console.log('\n🎬 Ready for demo! Start the app with: docker compose up');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed data error:', error.message);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;
