const db = require("../models/index");
const Result= db.document_results;

   
    
exports.addResult = (resultToAdd) => {

    return Result.create(resultToAdd);
};

exports.getResultsByDocumentId=(id)=>{
    qry={}
    qry.where={documentId:id}
    qry.include=[{model:db.algorithms,  attributes: ['name', 'description'] }];
    qry.raw=true;
    return Result.findAll(qry); 
};