//src/index.js
require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const path = require('path');
const errorHandler = require('./middleware/errorHandler'); 

const app = express();
const PORT = 3000;
const {initializeDatabase} = require('./models/index.js')

// Статические файлы (CSS, JS, изображения)
app.use(express.static(path.join(__dirname, '../public')));

// Маршруты API
app.use('/api', routes);

// Отдаем форму по корневому пути
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/upload-form.html'));
});

app.use(errorHandler);

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