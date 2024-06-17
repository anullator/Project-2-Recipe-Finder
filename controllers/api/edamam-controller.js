const searchEdamam = async (req, res) => {
    try {
        const baseURL = 'https://api.edamam.com/api/recipes/v2';
        
        // user query parameters
        const searchParams = req.body.params;

        // complete query url
        const url = `${baseURL}?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&${searchParams}`;
        
        const response = await fetch(url);
        const result = await response.json();
        
        // send result back to client
        res.json(result);

    } catch (err) {
        res.status(500).json({
            message: "Error: could not get Edamam API",
            error: err.message,
        });
    }
};

module.exports = { searchEdamam };