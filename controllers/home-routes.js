const router = require('express').Router();

// Route to render the home page
router.get('/', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login'); // Redirect to login page if not logged in
        return;
    }

    // Render the home page
    res.render('homepage', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
    });
});

module.exports = router;