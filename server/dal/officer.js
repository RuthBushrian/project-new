const db = require("../models/index");
const Officer= db.officers;
const Op = db.Sequelize.Op;
const File = db.files;
const Stage=db.stages_of_progress_of_files;
const sequelize= require('sequelize');

exports.getOfficerByIDNumber=(id)=>{

    console.log(Officer);
    return  Officer.findOne({where:{idNumber:id}});

};

exports.getOfficerById= (id)=>
{
  console.log("getOfficerByIdNumber");
  return Officer.findByPk(id);
}


exports.updateOfficer=(id,officerToUpdate)=>{
    return Officer.update(officerToUpdate, {

        where: {idofficer: id }

      })

};
exports.getNumOfDocuments = async(id) => {
     
    return await Officer.findByPk(id);

  };

  exports.getNumOfUsedDocuments = async(id) => {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const cyear = date_ob.getFullYear();
    const cmonth = date_ob.getMonth()+1;
  
    return await File.count({ 
      include:[
              {model:db.stages_of_progress_of_files,  attributes: ['date']}    , 
              {model:db.documents}
              ],
      where: {[Op.and]:[sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), cyear),sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), cmonth), {officerId:id}]}    
    });
  }

