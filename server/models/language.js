const { DataTypes } = require("sequelize");
const { sequelize, languages } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('languages',
        {
            idlanguage: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false }
        },
        {
            timestamps: false,
        });
    return Language;
}


