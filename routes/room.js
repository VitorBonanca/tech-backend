const express = require('express');

const { 
    addRoom,
    roomView,
    roomUpdate
} = require("../controllers/roomController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/:homeId/add/", protectRoute, addRoom);

router.get("/update/:id", protectRoute, roomView);
router.post("/update/:id", protectRoute, roomUpdate);

module.exports = router;