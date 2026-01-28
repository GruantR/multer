//src/models/index.js
const sequelize = require('../config/db');


const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ База данных подключена (${process.env.NODE_ENV})`);

      const syncOptions = {
        alter: false, // ⚠️ Лучше false для безопасности
        force: false, // ⚠️ Никогда true в продакшене!
        logging: false
      };
      await sequelize.sync(syncOptions);
      console.log("🔄 Режим разработки: sync выполнен");
      return true
  }
  catch(error){
    console.error("❌ Ошибка БД:", error.message);
    return false
  }
}

module.exports = initializeDatabase;