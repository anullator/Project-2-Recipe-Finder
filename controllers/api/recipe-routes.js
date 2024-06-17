const router = require('express').Router();
const { saveRecipe, getUserRecipes } = require("./recipe-controller");
const { searchEdamam } = require('./edamam-controller.js');
const withAuth = require('../../utils/auth');

router.get('/search', withAuth, searchEdamam);

router.post('/save', withAuth, saveRecipe);

router.get('/', withAuth, getUserRecipes);

module.exports = router;