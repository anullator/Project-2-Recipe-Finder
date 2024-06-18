const router = require('express').Router();
const { userReg, userLogin, userLogout, getUserID} = require('./user-controller.js');

// Route for user registration
router.post('/register', userReg);

// Route for user login
router.post('/login', userLogin);

// Route for user logout
router.post('/logout', userLogout);

router.get('/id', getUserID);

module.exports = router;
