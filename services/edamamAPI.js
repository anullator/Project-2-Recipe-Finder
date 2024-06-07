const fetch = require('node-fetch');
require('dotenv').config();

const searchRecipesEdamam = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching data from Edamam API');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in searchRecipesEdamam:', error);
    throw error;
  }
};

module.exports = { searchRecipesEdamam };
