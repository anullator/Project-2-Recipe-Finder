const router = require('express').Router();
const { search, saveRecipe, getUserRecipes } = require("./recipe-controller");

router.get('/search', search);

router.post('/save', saveRecipe);

router.get('/', getUserRecipes);

module.exports = router;