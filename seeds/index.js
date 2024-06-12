const sequelize = require('../config/connection');
const seedUsers = require('./user-data');
const seedRecipeLists = require('./recipe-data');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await seedUsers();
console.log(users);

  const recipes = await seedRecipeLists();
  console.log(recipes);

  process.exit(0);
};

seedAll();