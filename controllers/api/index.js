// this file is the starting point for all the routes in the api folder. 

// import router and all the routes in the api folder
const router = require('express').Router();
const userRoutes = require('./user-routes');
// const recipeRoutes = require('./recipe-routes'); // Uncomment and use when ready

// call router.use() for each of the imports
router.use('/user-routes', userRoutes);
router.use('/recipe-routes', recipeRoutes);

// Catch-all route for undefined paths
router.use((req, res) => {
    res.status(404).send("<h1>Wrong Route!</h1>");
});

//export the router
module.exports = router;









// API routes
router.use('/api/users', userRoutes);
// router.use('/api/recipes', recipeRoutes); // Uncomment and use when ready



