// Initiating sequelize
const sequelize = require('../config/connection');

// Importing the Recipe and User Models, and the UserRecipe Join Table
const Recipe = require('./recipe');
const User = require('./user');
const UserRecipe = require('./user-recipe');


// Defining the many-to-many relationship between User and Recipe
User.belongsToMany(Recipe, {

  // 'through' specifies the join table for the many-to-many relationship
  through: UserRecipe,

  // Defines the foreign key in the join table that references the User model
  foreignKey: 'userId',

  // Defines the foreign key in the join table that references the Recipe Model
  otherKey: 'recipeId'
});

// Defining the many-to-many relationship between Recipe and User
Recipe.belongsToMany(User, {
  through: UserRecipe,
  foreignKey: 'recipeId',
  otherKey: 'userId'
});

