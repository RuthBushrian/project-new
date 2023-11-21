const express = require("express");

const documentCntrl = require("../controllers/document");

const documentRouter = express.Router();

// documentRouter.route("/")

documentRouter.route("/:id")
    .get(documentCntrl.getDocumentById)
    .put(documentCntrl.updateDocumentById)
    .delete(documentCntrl.deleteDocumentById) //למחוק את מי שמקושר
    .post(documentCntrl.addDocuments)

documentRouter.route("/file/:fileId")
    .get(documentCntrl.getDocumentsByFile)
documentRouter.route("/:file/:document/:docType")
    .get(documentCntrl.getOpenDocumentById)
module.exports = documentRouter; 