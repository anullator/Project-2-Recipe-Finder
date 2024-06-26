const { Recipe, UserRecipe } = require('../../models');

// Save a recipe to the user's Recipe List
const saveRecipe = async (req, res) => {
  try {
    console.log('Session in saveRecipe:', req.session); // Debugging user_id = null issue
    const addRecipe = await Recipe.create({
      user_id: req.session.user_id,
      // recipe_id: req.body.recipe_id,
      recipe_name: req.body.recipe_name,
      ingredients: req.body.ingredients,
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fats: req.body.fats,
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
    if(!req.session.user_id) {
      return res.status(401).json({ 
        message: "Unauthorized access. Please Login."
      });
    }

    const userRecipes = await UserRecipe.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Recipe, // Include the Recipe model to get recipe details
          attributes: ['recipe_id', 'recipe_name', 'ingredients', 'calories', 'protein', 'carbs', 'fats'],
        }
      ]
    });

    // get recipe data from results
    const recipes = userRecipes.map(userRecipe => userRecipe.recipe);

    console.log('Fetched recipes:', recipes.map(recipe => recipe.recipe_name));

    // res.json(userRecipes);
  } catch (err) {
    console.log('Error fetching user recipes:', err);
    res.status(500).json({
      message: "Error, could not display recipes",
      error: err.message,
    });
  }
};

module.exports = { saveRecipe, getUserRecipes };
