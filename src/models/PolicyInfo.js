// models/PolicyInfo.js
const mongoose = require('mongoose');

const policyInfoSchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: String,
    policyEndDate: String,
    policyCategoryCollectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
    companyCollectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('PolicyInfo', policyInfoSchema);
