const { DataTypes } = require("sequelize");
const { sequelize,documents } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('documents',
        {
            iddocument: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: { type: DataTypes.INTEGER, allowNull: false},
            name: { type: DataTypes.STRING, allowNull: false },
            result: { type: DataTypes.FLOAT, defaultValue : null },
            languageId: { type: DataTypes.INTEGER },
            docType:{type: DataTypes.STRING, allowNull: false }
        }, 
        {
            timestamps: false,
        });
    return Document;
}
