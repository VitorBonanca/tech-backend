const express = require('express');

const { 
    addHome,
    homeView
} = require("../controllers/homeController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/add", protectRoute, addHome);

router.get("", protectRoute, homeView);

module.exports = router;