const { File } = require('../models/index');
const path = require('path');

class FileService {
    /**
     * Сохранить информацию о файле в базу данных
     * @param {Object} file - Объект файла от multer (req.file)
     * @returns {Promise<Object>} - Сохраненная запись из БД
     */
    async saveFile(file) {
        try {
            // 1. Получаем расширение файла
            // Например: "photo.jpg" -> "jpg"
            const extension = path.extname(file.originalname) // '.jpg'
                .toLowerCase()                                // '.jpg'
                .replace('.', '');                            // 'jpg'

            // 2. Сохраняем в БД
            const savedFile = await File.create({
                fileName: file.filename,      // уникальное имя на сервере
                originalName: file.originalname, // оригинальное имя
                size: file.size,              // размер
                mimetype: file.mimetype,      // тип (image/jpeg)
                path: file.path,              // путь к файлу
                extension: extension          // расширение
                // uploadedBy пока не используем
            });

            console.log('Файл сохранен в БД, ID:', savedFile.id);
            return savedFile;
            
        } catch (error) {
            console.error('Ошибка сохранения файла в БД:', error.message);
            throw error; // Передаем ошибку дальше
        }
    }
}

module.exports = new FileService();