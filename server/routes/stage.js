const express = require("express");

const stageCntrl = require("../controllers/stage");

const stageRouter = express.Router();

stageRouter.route("/")
.post(stageCntrl.addStage);

stageRouter.route("/:fileId")
  .get(stageCntrl.getStagebyFileId)

module.exports = stageRouter;