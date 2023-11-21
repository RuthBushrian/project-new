const db = require("../models/index");
const Document= db.documents;
   
exports.addDocument = (documentToAdd) => {

    return Document.bulkCreate(documentToAdd);
};
       
exports.getDocumentById=(id)=>{
    return Document.findByPk(id);
};

exports.getDocumentsByFile=(idFile)=>{
    return Document.findAll({where: {fileId: idFile}});
};

exports.updateDocumentById=(id,documentToUpdate)=>{
    return  Document.update(documentToUpdate, {
        where: { iddocument: id }
      })
};

exports.deleteDocumentById=(id)=>{
    return  Document.destroy({
      where: { iddocument: id }
    })
}
      