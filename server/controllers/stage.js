const stageDal = require("../dal/stage");

exports.addStage = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  stageDal
    .addStage(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Stage.",
      });
    });
};

// exports.getStagebyFileId = (req, res) => {
//   const fileId = req.params.fileId;
//   stageDal
//     .getStagebyFileId(fileId)
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find stage with fileId= ${fileId}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: `Error retrieving stage with FileId= ${fileId}.`,
//       });
//     });
// };

exports.getStagebyFileId = (req, res) => {
  const fileId = req.params.fileId;
  stageDal
    .getStagebyFileId(fileId)
    .then((data) => {
      data = data.map((e) => {
        return {
          "idstages": e.idstages_of_progress_of_file,
          "fileId": e.fileId,
          "statusId": e.statusId,
          "date": new Date(e.date).toLocaleDateString(),
          "IDnumberOfApplicant": e.IDnumberOfApplicant,
          "statusName": e.status.name
        }
      })
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find stage with fileId= ${fileId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving stage with FileId= ${fileId}.`,
      });
    });
};

// exports.updateStagebyFileId = (req, res) => {
//   const fileId = req.params.fileId;
//   stageDal
//     .updateStagebyFileId(fileId, req.body)
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "stage was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update stage with fileId= ${fileId}. Maybe stage was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: `Error updating stage with fileId= ${fileId}.`,
//       });
//     });
// };

