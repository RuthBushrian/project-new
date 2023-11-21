const ResultDal=require('../dal/document_result');


exports.addResult=(req, res)=>{
    console.log("contoller");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  ResultDal.addResult(req.body)
    .then(data => {
      res.status(201).json({ message: 'created result' }) 
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the algorithm result for the document."
      });
    });
}

exports.getResultsByDocumentId=(req, res)=>{
  const documentId = req.params.documentId;
  ResultDal.getResultsByDocumentId(documentId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Result with documentId=${documentId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Result with documentId=${documentId}.`
      });
    });
}
