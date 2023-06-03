const express = require('express');

const { 
    addAppliance
} = require("../controllers/applianceController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/:roomId/add/", protectRoute, addAppliance);

module.exports = router;