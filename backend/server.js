
const express = require('express');
const http = require('http');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const socketSetup = require('./socket');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const presenceRoutes = require('./routes/presenceRoutes');

const app = express();
const server = http.createServer(app);
socketSetup(server);

connectDB();
app.use(express.json());

// Apply helmet to set security headers
app.use(helmet());

// Optionally, set specific CSP directives
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:'],
    'connect-src': ["'self'", 'ws://localhost:3000'],
    'font-src': ["'self'"],
    'object-src': ["'none'"],
    'frame-src': ["'none'"]
  }
}));

// Rate limiting for login and registration routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/auth/', limiter);
app.use('/api/register/', limiter);

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/presence', presenceRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
