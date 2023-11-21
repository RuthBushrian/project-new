
const { DataTypes } = require("sequelize");
const { sequelize, permissions } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('permissions',
        {
            idpermission: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING}
        },
        {
            timestamps: false,
        });
    return Permission;
}
