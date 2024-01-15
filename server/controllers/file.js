const fileDal = require('../dal/file');
const stageDal = require("../dal/stage");
const { createFolder, deleteFolder } = require("../service/folder")
const { addDocuments2 } = require('./document')

exports.addFile = (req, res) => {
  fileDal.addFile(req.body)
    .then(file => {
      if (file) {
        const folderName = process.env.PATH_FILE + file.idfile;

        createFolder(folderName);

        addDocuments2(req.body.documents, file.idfile);

        stageDal.addStage({ fileId: file.idfile, statusId: 1, date: new Date() })
          .then(() => {
            res.status(201).json({ message: 'created file', body: file });
          })
      }
      else
        return res.status(400).json({ message: 'error' })
    }
    )
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating file with id=" + id
      })
    });
};

exports.getFileByID = (req, res) => {
  const id = req.params.id;
  fileDal.getFileByID(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find File with id=${id}.`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving file with id=" + id
      });
    });
}

exports.getAllFiles = (req, res) => {
  fileDal.getAllFiles(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
}


exports.updateFile = async (req, res) => {
  const id = req.params.id;
  let lfile;
  try {
    const data = await fileDal.getFileByID(id);
    if (data) {
      lfile = data;
    }
    else {
      res.status(404).send({
        message: `Cannot find file with id= ${id}.`,
      });
    }
  }
  catch (err) {
    res.status(500).send({
      message: `Error retrieving last file with id= ${id}.`,
    });
  };

  if (req.body.statusId && lfile.statusId != req.body.statusId) {
    const ts = Date.now();
    stageDal
      .addStage({ fileId: id, statusId: req.body.statusId, date: ts })
      .then()
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Stage.",
        });
      });
  }
  fileDal.updateFile(id, req.body)
    .then(() => {
      res.send({
        message: "File was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating File with id=" + id
      });
    });

}

exports.deleteFileByID = (req, res) => {
  const id = req.params.id;
  fileDal.deleteFileByID(id).then(num => {
    if (num == 1) {
      const folderName = process.env.PATH_FILE + id;
      deleteFolder(folderName);
      res.send({
        message: "File was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete File with id=${id}. Maybe File was not found!`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete File with id=" + id
      });
    });
}

exports.deleteFiles = (req, res) => {

  const filesToDelete = req.body.filesToDelete;

  if (filesToDelete.length == 0) {
    res.send({
      message: "there are no files to delete"
    });
  }
  else {
    fileDal.deleteFiles(filesToDelete)
      .then(num => {
        filesToDelete.forEach(id => {
          const folderName = process.env.PATH_FILE + id;
          deleteFolder(folderName);
        });
        if (num == filesToDelete.length) {
          res.send({
            message: "Files were deleted successfully!"
          });
        }
        else {
          res.send({
            message: `only ${num} files deleted successfully!`
          });
        }

      })

      .catch(err => {
        console.log(err.message);
        res.status(500).send({
          message: err.message || "Could not delete Files"
        });
      })
  }
}
