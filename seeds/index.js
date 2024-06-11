const sequelize = require('../config/connection');
const seedUsers = require('./user-data');
const seedRecipeLists = require('./recipe-data');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedRecipeLists();

  process.exit(0);
};

seedAll();