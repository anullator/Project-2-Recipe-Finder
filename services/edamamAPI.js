// const fetch = require('node-fetch');
// require('dotenv').config();

// const baseURL = 'https://api.edamam.com/api/recipes/v2';

// const getRecipes = async (params) => {
//     try {
//         const url = `${baseURL}?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&${params}`;
//         const response = await fetch(url);
//         const result = await response.json();
//         console.log(result);

//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// module.exports = { getRecipes };

// const searchRecipes = async (query) => {
//   const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Error fetching data from Edamam API');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error in searchRecipes:', error);
//     throw error;
//   }
// };

// module.exports = { searchRecipes };
