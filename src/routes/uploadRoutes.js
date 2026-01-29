//src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');
const uploadController = require('../controllers/uploadController');
const { uploadSingleFile } = require('../middleware/uploadMiddleware');


router.get('/', uploadController.showForm);


// Маршрут для загрузки файла
router.post('/upload', uploadSingleFile('file'), uploadController.uploadFile);





module.exports = router;