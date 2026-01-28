const path = require('path');
class uploadController {

    async readFile(req, res){
          res.sendFile(path.join(__dirname, '../views/upload-form.html'));
    }



    async uploadFile(req, res) {
        try {

            // Проверяем, что файл был загружен
            if (!req.file) {
                return res.status(400).json({ error: 'Файл не загружен' });
            }

            // Информация о загруженном файле
            const fileInfo = {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path: req.file.path,
                uploadedAt: new Date()
            };

            console.log('Загружен файл:', fileInfo);

            // Пока просто возвращаем информацию о файле
            res.json({
                message: 'Файл успешно загружен',
                file: fileInfo
            });
        }
        catch (err) {

        }
    }
}

module.exports = new uploadController();