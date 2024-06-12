// import Models
const { User } = require("../models");


const userData = [
    {
        username: "reyG18", 
        email: "example@gmail.com", 
        password: "abcde1234", 
    },
    { 
        username: "anullator", 
        email: "danyelle.joy@gmail.com", 
        password: "abcde1234", 
    },
];

// define seedUsers function
const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
});

// export seedUsers function
module.exports = seedUsers;