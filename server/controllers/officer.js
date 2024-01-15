const officerDal = require('../dal/officer');
const { getOpenDocument } = require('../service/document')

exports.login = (req, res) => {
  const id = req.params.id;
  const password = req.params.password;
  officerDal.getOfficerByIDNumber(id)
    .then(data => {
      if (data) {
        if (data.password == password)
          res.send(data);
        else
          res.status(404).send({
            message: `Cannot find Officer with id=${id} and password ${password}.`
          })
      }
      else {
        res.status(404).send({
          message: `Cannot find Officer with id=${id} and password ${password}.`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving officer with id=" + id
      });
    });
}

exports.getOfficerByID = (req, res) => {
  const id = req.params.id;
  officerDal.getOfficerById(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Officer with id=${id}.`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving officer with id=" + id
      });
    });
}
exports.updateOfficer = (req, res) => {
  const id = req.params.id;
  officerDal.updateOfficer(id, req.body)
    .then(num => {
      if (num == 1) {
        res.send({
          message: "officer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update officer with id=${id}. Maybe officer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating officer with id=" + id
      });
    });
}

exports.getNumOfDocuments = async (req, res) => {
  const id = req.params.idofficer;
  try {
    const officer = await officerDal.getOfficerById(id);
    const used = await officerDal.getNumOfUsedDocuments(id);
    if (officer && used >= 0) {
      res.send({ 'num': officer.numOfDocuments - used });
    }
    else {
      res.status(404).send({
        message: `Cannot find number of documents for officer with id= ${id}.`,
      });
    }
  }
  catch (err) {
    console.log("err" + err);
    res.status(500).send({

      message: `Error retrieving number of documents for officer with id= ${id}.`,
    });
  };
};

exports.getOfficerImage = (req, res) => {
  getOpenDocument(res, `${process.env.PATH_OFFICER}`, `${req.params.path}.${req.params.type}`);
}