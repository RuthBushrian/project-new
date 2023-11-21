const express = require("express");

const dashCntrl = require("../controllers/dashboard");

const dashRouter = express.Router();

dashRouter.route("/:officerId")
    .get(dashCntrl.getGrafOfFiles)

dashRouter.route("/active/:officerId")
    .get(dashCntrl.getActiveFiles)

dashRouter.route("/fake/:officerId")
    .get(dashCntrl.getFakeFiles)

dashRouter.route("/check/:officerId")
    .get(dashCntrl.getUnderCheckFiles)

dashRouter.route("/checked/:officerId")
    .get(dashCntrl.getCheckedFiles)

dashRouter.route("/:num/:officerId")
    .get(dashCntrl.getLastFiles)

module.exports = dashRouter;