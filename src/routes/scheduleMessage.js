const express = require('express');
const { scheduleMessage } = require('../controllers/scheduleMessageController');
const scheduleMessageRouter = express.Router();


scheduleMessageRouter.post("/schedule-message",scheduleMessage)

module.exports = scheduleMessageRouter