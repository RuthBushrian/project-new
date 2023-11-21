const { DataTypes } = require("sequelize");
const { sequelize, officers } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Officer=sequelize.define('officers',{
        idofficer:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        managerId:{ type: DataTypes.INTEGER, allowNull: false },///
        professionUnitId:{ type: DataTypes.INTEGER },///
        //permissionId:{ type: DataTypes.INTEGER,  defaultValue:1 },///
        idNumber:{ type: DataTypes.STRING, allowNull: false },
        name:{ type: DataTypes.STRING },
        password:{ type: DataTypes.STRING, allowNull: false }, 
        mail:{ type: DataTypes.STRING }, 
        numOfDocuments:{ type: DataTypes.INTEGER, allowNull: false, defaultValue:0 }, 
        path:{ type: DataTypes.STRING},
        type:{ type: DataTypes.STRING}
       
        
    },
    {
        
    
        timestamps: false,
        freezeTableName:true
    });
    return Officer;
}
