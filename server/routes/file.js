const express = require("express");

const fileCntrl = require("../controllers/file");

const fileRouter = express.Router();

fileRouter.route("/")
    .post(fileCntrl.addFile)
    .delete(fileCntrl.deleteFiles)

fileRouter.route("/:id")
    .get(fileCntrl.getFileByID)
    .put(fileCntrl.updateFile)
    .delete(fileCntrl.deleteFileByID)

fileRouter.route("/getfiles")
    .post(fileCntrl.getAllFiles)




module.exports = fileRouter;
