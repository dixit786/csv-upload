const User = require('./../models/User');
const PolicyInfo = require('./../models/PolicyInfo');



module.exports.getPolicyByUsername = async (req, res) => {
    try {
        const username = req.query.username;
        const user = await User.findOne({ firstName: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const policies = await PolicyInfo.find({ userId: user._id })
            .populate('policyCategoryCollectionId')
            .populate('companyCollectionId');

        res.json({
            user: user,
            policies: policies
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getAggregatedPolicies = async (req, res) => {
    try {
        const users = await User.find();

        const aggregatedData = await Promise.all(users.map(async (user) => {
            const policies = await PolicyInfo.find({ userId: user._id })
                .populate('policyCategoryCollectionId')
                .populate('companyCollectionId');

            return {
                user: user,
                policies: policies
            };
        }));

        res.json(aggregatedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}