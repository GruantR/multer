const { UploadError } = require('../errors/uploadError');

/**
 * Глобальный обработчик ошибок
 */
const errorHandler = (err, req, res, next) => {
    console.error('❌ Ошибка:', err.name, err.message);
    
    // Кастомная ошибка загрузки файла
    if (err instanceof UploadError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
            code: err.code,
            details: err.allowedTypes || err.maxSize ? {
                allowedTypes: err.allowedTypes,
                maxSizeMB: err.maxSize
            } : undefined
        });
    }
    
    // Ошибка валидации (Joi, express-validator и т.д.)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Ошибка валидации',
            details: err.details
        });
    }
    
    // Ошибка базы данных
    if (err.name === 'SequelizeError') {
        return res.status(500).json({
            success: false,
            error: 'Ошибка базы данных',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
    
    // Стандартная ошибка сервера
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Внутренняя ошибка сервера',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;