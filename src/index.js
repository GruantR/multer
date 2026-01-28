//src/index.js
require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;
const initializeDatabase = require('./models/index.js')
app.use('/api', routes);


async function startServer() {
  try {
    console.log("🔄 Инициализация базы данных...");
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      throw new Error("Не удалось инициализировать базу данных");
    }


    app.listen(PORT, () => {
      console.log(`✓ Сервер запущен на порту ${PORT}`);
    });

  } catch (error) {
    console.error('✗ Ошибка подключения к базе данных:', error);

  }
}

startServer();