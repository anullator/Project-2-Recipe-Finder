const router = require('express').Router();
const userRoutes = require('./api/user-routes');
// For later use
// const recipeRoutes = require('./api/recipe-routes');


router.use('/users', userRoutes);
//For later use
// router.use('/recipes', recipeRoutes);

module.exports = router;