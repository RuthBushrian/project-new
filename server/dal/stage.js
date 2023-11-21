const db = require("../models/index");
const Stage = db.stages_of_progress_of_files;

exports.addStage = (stageToAdd) => {
  return Stage.create(stageToAdd);
};

exports.getStagebyFileId = (id) => {
  return Stage.findAll({
    where: { fileId: id },
    include: { model: db.statuses, attributes: ['name'] }
  });
};