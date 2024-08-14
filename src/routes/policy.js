const express = require('express');
const { getPolicyByUsername, getAggregatedPolicies } = require('../controllers/policyController');
const policyRouter = express.Router();


policyRouter.get("/policy-info",getPolicyByUsername)
policyRouter.get("/aggregated-policies",getAggregatedPolicies)

module.exports = policyRouter