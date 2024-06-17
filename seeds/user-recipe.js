// seed user-recipe table
const { UserRecipe } = require('../models');

const userRecipeData = [
  { userId: 1, recipeId: 1 }, // User 1 saves Recipe 1
  { userId: 1, recipeId: 2 }, // User 1 saves Recipe 2
  { userId: 2, recipeId: 1 }, // User 2 saves Recipe 1
  { userId: 2, recipeId: 2 }, // User 2 saves Recipe 2

];

const seedUserRecipes = () => UserRecipe.bulkCreate(userRecipeData);

module.exports = seedUserRecipes;