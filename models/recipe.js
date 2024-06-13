const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Basic Recipe Model
class Recipe extends Model {}

Recipe.init(
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
    },
    protein: {
      type: DataTypes.INTEGER,
    },
    carbs: {
      type: DataTypes.INTEGER,
    },
    fats: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;