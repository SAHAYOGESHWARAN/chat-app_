const express = require('express');
const { updatePresence } = require('../controllers/presenceController');
const router = express.Router();

router.post('/presence', updatePresence);

module.exports = router;
