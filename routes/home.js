const express = require('express');

const { 
    addHome
} = require("../controllers/homeController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.post("/add", protectRoute, addHome);

module.exports = router;