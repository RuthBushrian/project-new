const documentDal = require('../dal/document');
const fileDal = require('../dal/file');
const { deleteDocument, uploadDocument, getOpenDocument, verifyDocument } = require('../service/document')
const stageDal = require('../dal/stage')
const axios = require('axios')
exports.addDocuments = (req, res) => {
  console.log("\n\n\n\naddDocuments");

  try {
    this.addDocuments2(req.body.documents, req.params.id)
    res.status(201).json({ message: 'created documents' })
  }
  catch (err) {
    res.status(400).json({ message: `can't create documents. ${err}` })
  }
}

exports.addDocuments2 = (documents, fileId) => {

  //add to DB
  docsToCraete = documents.map((doc) => { return { fileId: fileId, name: doc.name, docType: doc.type } })
  documentDal.addDocument(docsToCraete)
    .then(async (data) => {
      if (!data) {
        throw new Error("can't add document to DB")
      }
      // upload
      documents.forEach(doc => {
        const type = doc.document.slice(4, doc.document.indexOf(';'));
        uploadDocument(doc.document, doc.name, type, fileId);
      });

      // send to check

      checkDocks(data, fileId)
    })
}

const checkDocks = async (data, fileId) => {

  const documents = data.map(doc => doc.dataValues)
  const pathes = documents.map(doc => `${process.env.PATH_FILE}${fileId}//${doc.name}.${doc.docType}`)

  // check
  axios.post('http://127.0.0.1:3562', {
    'pathes':pathes
  })
  .then(response=>
      {
        const results = response.data.results;

        // update doc in DB
        documents.forEach(async(doc, ind)=>{
          doc.result = results[ind];
          await documentDal.updateDocumentById(doc.iddocument, doc);
        })

        // update file res in DB
        fakeDocks = results.filter((res) => res < 0.6)
        if (fakeDocks.length > 0)
          fileRes = 0;
        else
        
          fileRes = 1
         fileDal.updateFile(fileId, {"result": fileRes, "statusId":2})

         // update file stages in DB

         stageDal.addStage({
          fileId: fileId,
          statusId:2,
          date: new Date()
         })
      })  
}

exports.updateDocumentById = (req, res) => {
  const id = req.params.id;
  documentDal.updateDocumentById(id, req.body)
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully."
        });
      } else {
        res.send({
          message: `num is ${num}, Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Document with id=" + id
      });
    });


}

exports.getDocumentsByFile = (req, res) => {
  const fileId = req.params.fileId;
  documentDal.getDocumentsByFile(fileId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Document with fileId=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with fileId=" + id
      });
    });
}

exports.getDocumentById = (req, res) => {
  const id = req.params.id;
  documentDal.getDocumentById(id)

    .then(data => {
      if (data) {
        res.send(data);
      } else {
        console.log(data);
        res.status(404).send({
          message: `Cannot find Document with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + id
      });
    });
}


exports.getOpenDocumentById = (req, res, next) => {

  getOpenDocument(res, `${process.env.PATH_FILE}${req.params.file}`, `${req.params.document}.${req.params.docType}`);

}



exports.deleteDocumentById = async (req, res) => {
  const id = req.params.id;
  const document = await documentDal.getDocumentById(id)
  documentDal.deleteDocumentById(id)

    .then(num => {
      if (num == 1) {
        deleteDocument(document);
        res.send({
          message: "Document was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id
      });
    });

}