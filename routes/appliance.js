const express = require('express');

const { 
    addAppliance,
    removeAppliance
} = require("../controllers/applianceController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/:roomId/add/", protectRoute, addAppliance);

router.post("/:roomId/delete/:applianceId", protectRoute, removeAppliance);

module.exports = router;