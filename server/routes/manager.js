const express = require("express");

const managerCtrl = require("../controllers/manager")

const managerRouter = express.Router();

managerRouter.route("/:id")
    .get(managerCtrl.getManagerByOfficerID)
module.exports = managerRouter;
