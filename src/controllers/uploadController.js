const path = require('path');
const fileService = require('../services/fileService')
class uploadController {

    async showForm(req, res) {
        res.sendFile(path.join(__dirname, '../views/upload-form.html'));
    }



    async uploadFile(req, res) {
        try {
               //Используем сервис для сохранения в БД
            const savedFile = await fileService.saveFile(req.file);

            // Информация о загруженном файле
                   const fileInfo = {
                id: savedFile.id,
                uuid: savedFile.uuid,
                filename: savedFile.fileName,
                originalName: savedFile.originalName,
                size: savedFile.size,
                mimetype: savedFile.mimetype,
                path: savedFile.path,
                extension: savedFile.extension,
                uploadedAt: savedFile.createdAt
            };

            console.log('Загружен файл:', fileInfo);

            // Пока просто возвращаем информацию о файле
          res.json({
                message: 'Файл успешно загружен и сохранен в базе данных',
                file: fileInfo
            });
        }
        catch (err) {
    next(err);
        }
    }
}

module.exports = new uploadController();