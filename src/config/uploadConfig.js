  //src/config/uploadConfig.js
  const multer = require('multer'); 
   const path = require('path');
 const UPLOAD_DIR = 'uploads/';

  const storage = multer.diskStorage({
      destination: (req,file,cb)=>{
          cb(null, UPLOAD_DIR)
      },
      filename: (req,file,cb)=>{
      // Генерируем уникальное имя
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
      cb(null, uniqueName);
      }
  });

  const fileFilter = (req, file, cb)=>{
        // Разрешаем только изображения и PDF
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;

    // Проверяем тип файла (MIME-тип)
    const mimetype = allowedTypes.test(file.mimetype)

    // Проверяем расширение (.jpg, .png и т.д.)
    const extname = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());

      if (mimetype && extname) {
      return cb(null, true); // Файл подходит, принимаем
    } else {
      cb(new Error('Недопустимый тип файла')); // Файл не подходит
    }
  } 

  // Инициализация multer с настройками
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: fileFilter
  });

  module.exports = upload;



