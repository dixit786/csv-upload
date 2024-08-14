const express = require('express');
const uploadDataRouter = express.Router();
const multer = require('multer');
const { uploadData } = require('../controllers/uploadDataController');

const upload = multer({ dest: 'uploads/' });

uploadDataRouter.post("/upload", upload.single('file'), uploadData)

module.exports = uploadDataRouter