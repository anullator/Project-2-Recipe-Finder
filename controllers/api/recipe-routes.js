const router = require('express').Router();
const { search, saveRecipe, getUserRecipes } = require("./recipe-controller");
const withAuth = require('../../utils/auth');

router.get('/search', withAuth, search);

router.post('/save', withAuth, saveRecipe);

router.get('/', withAuth, getUserRecipes);

module.exports = router;