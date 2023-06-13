const express = require('express');

const { 
    addHome,
    homeView,
    // homeUpdate,
    updateHome,
    removeHome
} = require("../controllers/homeController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/add", protectRoute, addHome);

router.get("/view/:id", protectRoute, homeView);
// router.post("/update/:id", protectRoute, homeUpdate);

router.post("/update/:homeId", protectRoute, updateHome);

router.post("/delete/:homeId", protectRoute, removeHome);

module.exports = router;