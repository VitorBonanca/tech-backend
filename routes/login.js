const express = require('express');

const {
    registerView,
    loginView,
    registerUser,
    loginUser,
    logoutUser
} = require('../controllers/loginController');

const { 
    dashboardView
} = require("../controllers/dashboardController");

const { 
    landingPage
} = require("../controllers/landingController");

const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get('/landing', landingPage);
router.get('/register', registerView);
router.get('/login', loginView);

router.get("/dashboard", protectRoute, dashboardView);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;