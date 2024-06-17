
async function handleSearch (event) {
    event.preventDefault();
    let params = '';
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
        params+= `q=${query}`;
    
    // check if keyword and diet both exist
    } else if (query && selectedId) {
        params+= `q=${query}&diet=${selectedId}`;

    // check if only diet exists
    } else if (!query && selectedId) {
        params+= `diet=${selectedId}`;

    // error handling if search attempted w/neither keyword or diet
    } else {
        alert('Must enter keyword or select a diet.');
        return;
    }

// TODO: ====================
// this should get the search route from the server
    try {
        const res = await fetch('/api/recipes/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({params: params}),
        });
        const searchResult = res.json();
        // handle response data
        console.log(searchResult);
        
    } catch (err) {
        console.error('Error fetching data:', error);
    }
}

// attach click listener to search button
document.querySelector('#search').addEventListener('click', handleSearch);
