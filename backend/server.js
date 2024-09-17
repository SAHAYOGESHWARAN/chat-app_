const express = require('express');
const http = require('http');
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

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/presence', presenceRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
