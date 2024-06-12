const router = require('express').Router();
const { User, Recipe, UserRecipe } = require('../models');
const withAuth = require('../utils/auth');

// START ROUTE
router.get('/', async (req, res) => {
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
        res.redirect('/home');
        return;
    }

    res.render('login');
});

// HOMEPAGE ROUTE
router.get('/home', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userDat = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Recipe, UserRecipe }],
        });
    
        const user = userDat.get({ plain: true });
    
        res.render('homepage', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;