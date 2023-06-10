const express = require('express');

const { 
    addAppliance,
    updateAppliance,
    removeAppliance
} = require("../controllers/applianceController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/:roomId/add/", protectRoute, addAppliance);

router.post("/:roomId/update/:applianceId", protectRoute, updateAppliance);

router.post("/:roomId/delete/:applianceId", protectRoute, removeAppliance);

module.exports = router;