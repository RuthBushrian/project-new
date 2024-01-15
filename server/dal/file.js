const db = require("../models/index");
const File= db.files;
const fs= require("fs");
const { env } = require("process");

const Op = db.Sequelize.Op;

exports.addFile = (fileToAdd) => {

    return File.create(fileToAdd);

};

exports.getFileByID=(id)=>{

    qry={};
    addIncludeForQry(qry);
    return  File.findByPk(id,qry);
};



const concatForWhere=(wh,attribute_key ,attribute_value)=>
{    
    if(attribute_value!=null && attribute_value!=undefined)

        wh[attribute_key] =attribute_value;

}


const addIncludeForQry=(qry) =>
{
    qry.include=[
        {model:db.statuses,  attributes: ['name'] },
        {model:db.officers,  attributes: ['name'] }
];

    qry.raw=true;
}



exports.getAllFiles= (filterParams)=>{

    //where
    let wh={};

    concatForWhere(wh,"statusId",filterParams.statusId);

    concatForWhere(wh,"urgency",filterParams.urgency);

    concatForWhere(wh,"IDnumberOfApplicant",filterParams.IDnumberOfApplicant);
 
    concatForWhere(wh,"result",filterParams.result);

    concatForWhere(wh,"officerId",filterParams.officerId); ////token
    
   if(filterParams.ApplicationSubmissionDateS)
        wh["ApplicationSubmissionDate"]= {[Op.gte]:filterParams.ApplicationSubmissionDateS};

    if(filterParams.ApplicationSubmissionDateE)
        wh["ApplicationSubmissionDate"]= {[Op.lte]:filterParams.ApplicationSubmissionDateE};

    const qry={};
    qry.where= wh;

    //order
    if(filterParams.sortBy)
        qry.order= [db.sequelize.literal(filterParams.sortBy)];

    //join
    addIncludeForQry(qry);


    return File.findAll(qry);

};

exports.updateFile=(id,fileToUpdate)=>{

    return File.update(fileToUpdate, {

        where: { idfile: id }

      })

};

exports.deleteFileByID=(id)=>{
    
    return File.destroy({

      where: { idfile: id }

    })

}

exports.deleteFiles=(idArr)=>
{
    return File.destroy({

        where: { idfile: {[Op.or]:idArr }}
  
      })
}
      