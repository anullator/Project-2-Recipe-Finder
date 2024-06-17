const baseURL = 'https://api.edamam.com/api/recipes/v2';

const getRecipes = async (params) => {
    try {
        const url = `${baseURL}?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&${params}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { getRecipes };