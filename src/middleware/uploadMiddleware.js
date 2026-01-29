const upload = require('../config/uploadConfig');
const { FileTooLargeError, NoFileUploadedError } = require('../errors/uploadError');

/**
 * Middleware для загрузки одного файла
 * Обрабатывает ошибки multer и преобразует их в кастомные
 */
const uploadSingleFile = (fieldName = 'file') => {
    return (req, res, next) => {
        upload.single(fieldName)(req, res, (err) => {
            if (err) {
                // Обрабатываем ошибки multer
                if (err.code === 'LIMIT_FILE_SIZE') {
                    const maxSizeMB = 5; // Должно совпадать с конфигом
                    return next(new FileTooLargeError(maxSizeMB));
                }
                
                if (err.code === 'INVALID_FILE_TYPE') {
                    // Ошибка уже кастомная, передаем дальше
                    return next(err);
                }
                
                // Любая другая ошибка multer
                return next(err);
            }
            
            // Проверяем, что файл был загружен
            if (!req.file) {
                return next(new NoFileUploadedError());
            }
            
            // Если всё ок, идем дальше
            next();
        });
    };
};

module.exports = {
    uploadSingleFile
};