const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Basic Recipe Model
class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe'
  }
);

module.exports = Recipe;