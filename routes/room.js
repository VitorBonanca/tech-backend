const express = require('express');

const { 
    addRoom
} = require("../controllers/roomController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/:homeId/add/", protectRoute, addRoom);

module.exports = router;