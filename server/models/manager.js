
const { DataTypes } = require("sequelize");
const { sequelize, managers } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Manager=sequelize.define('managers',{
        idmanager:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idNumber:{ type: DataTypes.STRING, allowNull: false },
        name:{ type: DataTypes.STRING },
        password:{ type: DataTypes.STRING, allowNull: false }, 
        mail:{ type: DataTypes.STRING }, 
        numOfDocumentsForOfficer:{ type: DataTypes.INTEGER, defaultValue:0 }, 
        companyId:{type: DataTypes.INTEGER, allowNull: false},
        numOfDocumentsForManager:{ type: DataTypes.INTEGER, defaultValue:0 }
    },
    {
        
    
        timestamps: false,
        freezeTableName:true
    });
    return Manager;
}
