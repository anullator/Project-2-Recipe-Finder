// import Models
const { Recipe } = require('../models');

const recipeData = [
    {
        name: 'Sage Salmon',
        ingredients: [
            '2 tablespoons minced fresh sage',
            '1 teaspoon garlic powder', 
            '1 teaspoon kosher salt',
            '1 teaspoon freshly ground pepper',
            '1 skin-on salmon fillet (1-1/2 pounds)',
            '2 tablespoons olive oil',
        ],
        calories: 220,
        protein: 19,
        carbs: 1,
        fats: 15,
    },
    //second recipe
    {
        name: 'Grilled Buttermilk Chicken',
        ingredients: [
            '1-1/2 cups buttermilk',
            '4 fresh thyme sprigs',
            '4 garlic cloves, halved',
            '1/2 teaspoon salt',
            '12 boneless skinless chicken breast halves (about 4-1/2 pounds)',
        ],
        calories: 189,
        protein: 35,
        carbs: 1,
        fats: 4,
    },
];

// define seedUsers function
const seedRecipeLists = () => Recipe.bulkCreate(recipeData);

// export seedUsers function
module.exports = seedRecipeLists;