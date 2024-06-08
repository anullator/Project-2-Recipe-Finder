const router = require('express').Router();
const userRoutes = require('./api/user-routes');
// const recipeRoutes = require('./api/recipe-routes'); // Uncomment and use when ready

// API routes
router.use('/api/users', userRoutes);
// router.use('/api/recipes', recipeRoutes); // Uncomment and use when ready

// Catch-all route for undefined paths
router.use((req, res) => {
    res.status(404).send("<h1>Wrong Route!</h1>");
});

module.exports = router;
