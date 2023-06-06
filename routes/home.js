const express = require('express');

const { 
    addHome,
    homeView,
    homeUpdate,
} = require("../controllers/homeController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/add", protectRoute, addHome);

router.get("/view/:id", protectRoute, homeView);
router.post("/update/:id", protectRoute, homeUpdate);

router.get("/delete/:id", protectRoute, homeView);

module.exports = router;