const express = require('express');
const { createGroupChat, sendMessage } = require('../controllers/chatController');
const router = express.Router();

router.post('/group', createGroupChat);
router.post('/message', sendMessage);

module.exports = router;
