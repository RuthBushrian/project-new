const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('statuses',
        {
            idstatus: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false }
        },
        {
            timestamps: false,
        });
    return Status;
}
