
const { DataTypes } = require("sequelize");
const { sequelize, document_results } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Document_result = sequelize.define('document_results',
        {
            iddocument_results: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            documentId: { type: DataTypes.INTEGER, allowNull: false },
            algorithmId: { type: DataTypes.INTEGER, allowNull: false },
            result: { type: DataTypes.FLOAT, allowNull: false }
        },
        {
            timestamps: false,
        });
    return Document_result;
}
