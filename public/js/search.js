
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

        const searchResult = await res.json();

        // handle response data
        displayRecipes(searchResult);
        
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

function displayRecipes (searchResult) {

    const top20 = searchResult.hits;
    // console.log(top20);

    const resultBox = document.getElementById('results-box');
    resultBox.textContent = '';

    top20.forEach(hit => {
        const recipe = hit.recipe;

        // recipe card el
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');

        // recipe name el
        const nameEl = document.createElement('h3');
        nameEl.textContent = recipe.label;

        //ingredients el
        const ingredientsLabel = document.createElement('p');
        ingredientsLabel.textContent = 'Ingredients:';
        const ingredientsListEl = document.createElement('ul');

        recipe.ingredientLines.forEach(ingredient => {
            const ingredientEl = document.createElement('li');
            ingredientEl.textContent = ingredient;
            ingredientsListEl.appendChild(ingredientEl);
        })

        // calories el
        const calEl = document.createElement('p');
        calEl.textContent = `Calories: ${recipe.calories}`;

        // protein el
        const proteinEl = document.createElement('p');
        proteinEl.textContent = `${recipe.digest[2].label}: ${recipe.digest[2].total}`;

        // carbs el
        const carbsEl = document.createElement('p');
        carbsEl.textContent = `${recipe.digest[1].label}: ${recipe.digest[1].total}`;

        // fats el
        const fatsEl = document.createElement('p');
        fatsEl.textContent = `${recipe.digest[0].label}: ${recipe.digest[0].total}`;

        // save recipe btn
        const saveRecipeBtn = document.createElement('button');
        saveRecipeBtn.textContent = 'Save Recipe';

        // add components to card
        cardEl.appendChild(nameEl);
        cardEl.appendChild(ingredientsLabel);
        cardEl.appendChild(ingredientsListEl);
        cardEl.appendChild(calEl);
        cardEl.appendChild(proteinEl);
        cardEl.appendChild(carbsEl);
        cardEl.appendChild(fatsEl);
        cardEl.appendChild(saveRecipeBtn);

        // add card to container
        resultBox.appendChild(cardEl);
    })
}

// attach click listener to search button
document.querySelector('#search').addEventListener('click', handleSearch);
