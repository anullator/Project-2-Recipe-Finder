const router = require('express').Router();
const { userReg, userLogin, userLogout } = require('./user-controller.js');

// Route for user registration
router.post('/register', userReg);

// Route for user login
router.post('/login', userLogin);

// Route for user logout
router.post('/logout', userLogout);

module.exports = router;
