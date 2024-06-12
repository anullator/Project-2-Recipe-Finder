// this file is the starting point for all the routes in the api folder. 

// import router and all the routes in the api folder
const router = require('express').Router();
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');

// API routes
router.use('/users', userRoutes);
// router.use('/recipe-routes', recipeRoutes);

// Catch-all route for undefined paths
router.use((req, res) => {
    res.status(404).send("<h1>Wrong Route!</h1>");
});

//export the router
module.exports = router;