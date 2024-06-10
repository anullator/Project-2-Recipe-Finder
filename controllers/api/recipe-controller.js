const { Recipe } = require('../../models');
const { searchRecipes } = require('../../services/edamam');

// Search for recipes using Edamam API
const search = async (req, res) => {
  try {
    const results = await searchRecipes(req.query.q);
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Save a recipe to the user's Recipe List
const saveRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      user_id: req.session.user_id,
      recipe_id: req.body.recipe_id,
      recipe_name: req.body.recipe_name,
      // Add other relevant fields
    });
    res.json(newRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Fetch saved recipes for a user
const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: { user_id: req.session.user_id },
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { search, saveRecipe, getUserRecipes };
