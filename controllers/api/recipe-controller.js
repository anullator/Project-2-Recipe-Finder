const { Recipe } = require('../../models');
const { searchRecipes } = require('../../services/edamamAPI');

// Search for recipes using Edamam API
const search = async (req, res) => {
  try {
    const results = await searchRecipes(req.query.q);
    res.json(results);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while searching for recipes",
      error: err.message,
    });
  }
};

// Save a recipe to the user's Recipe List
const saveRecipe = async (req, res) => {
  try {
    const addRecipe = await Recipe.create({
      user_id: req.session.user_id,
      // recipe_id: req.body.recipe_id,
      recipe_name: req.body.recipe_name,
      ingredients: req.body.ingredients,
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fats: req.body.fats
      // Add other relevant fields if necessary
    });
    res.json(addRecipe);
  } catch (err) {
    res.status(500).json({
      message: "Error, could not add recipe",
      error: err.message,
    });
  }
};

// Fetch saved recipes for a user
const getUserRecipes = async (req, res) => {
  try {
    const userRecipes = await Recipe.findAll({
      where: { user_id: req.session.user_id },
    });
    res.json(userRecipes);
  } catch (err) {
    res.status(500).json({
      message: "Error, could not display recipes",
      error: err.message,
    });
  }
};

module.exports = { search, saveRecipe, getUserRecipes };
