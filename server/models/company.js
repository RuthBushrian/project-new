const { DataTypes } = require("sequelize");
const { sequelize, companies } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('companies',
        {
            idcompany: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false }
        },
        {
            timestamps: false,
        });
    return Company;
}
