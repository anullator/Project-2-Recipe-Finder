// import Models
const { User } = require('../models');


const userData = [
    {
        id: 1, 
        username: 'reyG18', 
        email: 'example@gmail.com', 
        password: 'abcde1234', 

    },
    {
        id: 2, 
        username: 'anullator', 
        email: 'danyelle.joy@gmail.com', 
        password: 'abcde1234', 
    },
];

// define seedUsers function
const seedUsers = function () {
    User.bulkCreate(userData)
}

// export seedUsers function
module.exports = { seedUsers };