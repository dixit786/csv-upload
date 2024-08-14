// index.js
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 1000000
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1000000
}));

app.use(cors());

require("./src/models");
app.use('/', require('./src/routes/uploadData'));
app.use('/policy', require('./src/routes/policy'));
app.use('/message', require('./src/routes/scheduleMessage'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
