const withAuth = (req, res, next) => {
    // If not logged in, redirect to login page

    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
      // If logged in, execute route function
      // call next() if user authenticated
        next();
    }
};

module.exports = withAuth;