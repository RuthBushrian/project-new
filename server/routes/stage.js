const express = require("express");

const stageCntrl = require("../controllers/stage");

const stageRouter = express.Router();

stageRouter.route("/")
.post(stageCntrl.addStage);

stageRouter.route("/:fileId")
  .get(stageCntrl.getStagebyFileId)

  // stageRouter.route("/stages/:fileId")
  // .get(stageCntrl.getStagebyFileId)
  // getStagebyFileId
  module.exports = stageRouter;