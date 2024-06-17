const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

// Join Table to manage the many-to-many relationship. One user can add as many recipes
// as they want, and each recipe can belong to many users.
class UserRecipe extends Model {}

UserRecipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "recipe",
        key: "recipe_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_recipe",
  }
);

module.exports = UserRecipe;