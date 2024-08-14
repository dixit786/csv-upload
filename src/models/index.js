const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/upload-data', { useNewUrlParser: true, useUnifiedTopology: true,  serverSelectionTimeoutMS: 30000, socketTimeoutMS: 45000 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

require('./Message');
require('./Agent');
require('./User');
require('./Account');
require('./PolicyCategory');
require('./PolicyCarrier');
require('./PolicyInfo'); 