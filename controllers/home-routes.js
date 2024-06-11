const router = require('express').Router();
const { User, UserRecipe } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the home page
router.get('/', async (req, res) => {
    // TODO: lines 8 - 12 may not be necessary
    try {
        if (!req.session.logged_in) {
            res.redirect('/login'); // Redirect to login page if not logged in
            return;
        }

        // Render the home page
        res.render('homepage', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN ROUTE
router.get('/login', (req, res) => {
    // redirect to homepage if already logged in
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;