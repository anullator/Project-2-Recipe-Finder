const router = require('express').Router();
const { userReg } = require('../../controllers/api/user-controller');

// User Registration route
router.post('/register', userReg);

//User login route


// User logout route