const express = require('express');

const { 
    addRoom,
    roomView,
    updateRoom,
    removeRoom
} = require("../controllers/roomController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/:homeId/add/", protectRoute, addRoom);

router.get("/view/:id", protectRoute, roomView);

router.post("/:homeId/update/:roomId", protectRoute, updateRoom);

router.post("/:homeId/delete/:roomId", protectRoute, removeRoom);

module.exports = router;