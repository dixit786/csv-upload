// models/Agent.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: String,
    scheduledAt: Date
});

module.exports = mongoose.model('Message', messageSchema);
