require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Question = require('./models/Question');
const seedQuestions = require('./data/questions');

const quizRoutes = require('./routes/quizRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const statsRoutes = require('./routes/statsRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow requests from frontend
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve built frontend assets if present
const frontendDist = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));

// Routes
app.use('/api/quiz', quizRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ECCO Road Safety Academy API',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// SPA fallback for client routing
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
      if (err) next();
    });
  }
  next();
});

// Database Connection & Auto-Seed
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecco_road_safety';

async function seedDatabaseIfEmpty() {
  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      console.log('Question bank is empty. Seeding road safety questions...');
      await Question.insertMany(seedQuestions);
      console.log(`Successfully seeded ${seedQuestions.length} road safety questions!`);
    } else {
      console.log(`Question bank already initialized with ${count} questions.`);
    }
  } catch (err) {
    console.error('Error auto-seeding questions:', err);
  }
}

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully at:', MONGODB_URI);
    await seedDatabaseIfEmpty();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`ECCO Road Safety Backend listening on port ${PORT} (0.0.0.0)`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
