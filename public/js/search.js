const getRecipes = require('./controllers/edamam-routes/edamam-api');

async function handleSearch (event) {
    event.preventDefault();
    let param = '';
    let selectedId;

    // get keyword input
    const rawQuery = document.getElementById("keyword").value.trim();

    //separate multi-word input and recombine
    let parts = rawQuery.split(' ');
    let query = parts.join('+');

    // get selected radio btn
    const selectedDiet = document.querySelector('input[name="diet"]:checked');

    // get val of selected radio btn
    if (selectedDiet) {
        selectedId = selectedDiet.id;
    } 

    // check if keyword input exists
    if (query && !selectedId) {
        param+= `q=${query}`;
    
    // check if keyword and diet both exist
    } else if (query && selectedId) {
        param+= `q=${query}&diet=${selectedId}`;

    // check if only diet exists
    } else if (!query && selectedId) {
        param+= `diet=${selectedId}`;

    // error handling if search attempted w/neither keyword or diet
    } else {
        alert('Must enter keyword or select a diet.');
        return;
    }
    
    // getRecipes(param);
}

// attach click listener to search button
document.querySelector('#search').addEventListener('click', handleSearch);
