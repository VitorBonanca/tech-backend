const express = require('express');

const { 
    addHome,
    homeView,
    homeUpdate,
} = require("../controllers/homeController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/add", protectRoute, addHome);

// router.get("/update/:id", protectRoute, homeView);
router.get("/update/:id", homeView);
router.post("/update/:id", homeUpdate);

router.get("/delete/:id", protectRoute, homeView);

module.exports = router;