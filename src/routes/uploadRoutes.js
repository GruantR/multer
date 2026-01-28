//src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');
const uploadController = require('../controllers/uploadController');


router.get('/', uploadController.readFile);


// Маршрут для загрузки файла
router.post('/upload', upload.single('file'), uploadController.uploadFile);





module.exports = router;