//src/routes/index.js
const express = require('express');
const uploadRoutes = require('./uploadRoutes');
const router = express.Router();

router.use("/upload", uploadRoutes);

module.exports = router;
