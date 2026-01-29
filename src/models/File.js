//src/models/File.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const File = sequelize.define('File', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fileName: {
    type: DataTypes.STRING,
      allowNull: false,
      comment: 'Уникальное имя файла на сервере'
    },
        originalName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'original_name', // snake_case в БД
      comment: 'Оригинальное имя файла'
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: 'Размер в байтах'
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'MIME-тип файла'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Относительный путь к файлу'
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Расширение файла'
    },
    uploadedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'uploaded_by',
      comment: 'Идентификатор пользователя'
    },
    downloadCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'download_count',
      comment: 'Количество скачиваний'
    },
        description: { // Добавь опционально
        type: DataTypes.TEXT,
        allowNull: true
    }
},
{
        tableName: 'files',
    timestamps: true,
    underscored: true, // автоматически преобразует camelCase в snake_case
    paranoid: false, // если true - мягкое удаление
     indexes: [
        {
            unique: true,
            fields: ['uuid']
        },
        {
            fields: ['original_name']
        },
        {
            fields: ['uploaded_by']
        }
    ]
}
)

module.exports = File;