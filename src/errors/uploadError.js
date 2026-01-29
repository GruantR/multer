class UploadError extends Error {
    constructor(message, code, statusCode = 400) {
        super(message);
        this.name = 'UploadError';
        this.code = code;
        this.statusCode = statusCode;
    }
}

// Конкретные ошибки
class InvalidFileTypeError extends UploadError {
    constructor() {
        super(
            'Недопустимый тип файла',
            'INVALID_FILE_TYPE',
            400
        );
        this.allowedTypes = ['jpeg', 'jpg', 'png', 'gif', 'pdf'];
    }
}

class FileTooLargeError extends UploadError {
    constructor(maxSizeMB) {
        super(
            `Файл слишком большой. Максимум: ${maxSizeMB}MB`,
            'FILE_TOO_LARGE',
            400
        );
        this.maxSize = maxSizeMB;
    }
}

class NoFileUploadedError extends UploadError {
    constructor() {
        super(
            'Файл не загружен',
            'NO_FILE_UPLOADED',
            400
        );
    }
}

module.exports = {
    UploadError,
    InvalidFileTypeError,
    FileTooLargeError,
    NoFileUploadedError
};