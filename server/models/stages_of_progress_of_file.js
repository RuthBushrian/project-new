const { DataTypes } = require("sequelize");
const { sequelize, stages_of_progress_of_file } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Stages_of_progress_of_file = sequelize.define('stages_of_progress_of_file',
        {
            idstages_of_progress_of_file: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: { type: DataTypes.INTEGER, allowNull: false },
            statusId: { type: DataTypes.INTEGER,allowNull:false},
            date:{type:DataTypes.DATE, allowNull:false}
        },
        {
            timestamps: false,
        });
    return Stages_of_progress_of_file;
}