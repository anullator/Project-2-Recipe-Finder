// import sequelize and seed functions
const sequelize = require('../config/connection');
const seedUsers = require('./user-data');
const seedRecipeLists = require('./recipe-data');
const seedUserRecipes = require('./user-recipe');

// define seed database function
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedRecipeLists();

  await seedUserRecipes();

  process.exit(0);
};

// seed database
seedAll();