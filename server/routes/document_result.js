const express = require("express");

const resultCntrl = require("../controllers/document_result");

const resultRouter = express.Router();
resultRouter.route("/")
    .post(resultCntrl.addResult)
resultRouter.route("/:documentId")
    .get(resultCntrl.getResultsByDocumentId)
module.exports = resultRouter;