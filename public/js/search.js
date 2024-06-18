
async function handleSearch (event) {
    event.preventDefault();
    let params = '';
    let selectedId;
    let searchResult;

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

// get the search route from the server
    try {
        const res = await fetch('/api/recipes/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({params: params}),
        });

        searchResult = await res.json();
        
    } catch (err) {
        console.error('Error fetching data:', err);
    }

    // handle response data
    displayRecipes(searchResult);
}

function displayRecipes (searchResult) {

    const top20 = searchResult.hits;

    const resultContainer = document.getElementById('results-container');
    resultContainer.textContent = '';

    top20.forEach(hit => {
        const recipe = hit.recipe;

        // recipe card el
        const cardEl = document.createElement('div');
        cardEl.classList.add('card', 'bg-white', 'p-6', 'rounded-lg', 'shadow-md', 'mb-6');

        // recipe name el
        const nameEl = document.createElement('h3');
        nameEl.textContent = recipe.label;
        nameEl.classList.add('text-2xl', 'font-extrabold', 'text-gray-900', 'mb-2');

        //ingredients el
        const ingredientsLabel = document.createElement('h4');
        ingredientsLabel.textContent = 'Ingredients:';
        ingredientsLabel.classList.add('text-xl', 'font-semibold', 'text-gray-800', 'mb-2');

        const ingredientsListEl = document.createElement('ul');
        ingredientsListEl.classList.add('list-disc', 'list-inside', 'mb-4');

        recipe.ingredientLines.forEach(ingredient => {
            const ingredientEl = document.createElement('li');
            ingredientEl.textContent = ingredient;
            ingredientEl.classList.add('text-gray-700');
            ingredientsListEl.appendChild(ingredientEl);
        })

        // calories el
        const calEl = document.createElement('p');
        calEl.textContent = `Calories: ${Math.round(recipe.calories)}`;
        calEl.classList.add('text-gray-700', 'mb-2');

        // protein el
        const proteinEl = document.createElement('p');
        proteinEl.textContent = `${recipe.digest[2].label}: ${Math.round(recipe.digest[2].total)}`;
        proteinEl.classList.add('text-gray-700', 'mb-2');

        // carbs el
        const carbsEl = document.createElement('p');
        carbsEl.textContent = `${recipe.digest[1].label}: ${Math.round(recipe.digest[1].total)}`;
        carbsEl.classList.add('text-gray-700', 'mb-2');

        // fats el
        const fatsEl = document.createElement('p');
        fatsEl.textContent = `${recipe.digest[0].label}: ${Math.round(recipe.digest[0].total)}`;
        fatsEl.classList.add('text-gray-700', 'mb-2');

        // save recipe btn
        const saveRecipeBtn = document.createElement('button');
        saveRecipeBtn.textContent = 'Save Recipe';
        saveRecipeBtn.classList.add('mt-4', 'px-4', 'py-2', 'bg-indigo-600', 'text-white', 'text-sm', 'font-medium', 'rounded-md', 'shadow-sm', 'hover:bg-indigo-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-indigo-500');

        // event listener to save recipe
        saveRecipeBtn.addEventListener('click', handleSaveRecipe);

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
        resultContainer.appendChild(cardEl);
    })
}

async function handleSaveRecipe (event) {
    event.preventDefault();
    const clickedEl = event.target;

    const savedRecipe = clickedEl.parentNode;
    console.log(savedRecipe); // works as expected

    const recipe_name = savedRecipe.querySelector('h3').textContent;
    // console.log(recipe_name);
    const ingredientList = savedRecipe.querySelectorAll('li');
    const ingredients = Array.from(ingredientList).map(li => li.textContent);
    //console.log(ingredients);

    const macrosList = savedRecipe.querySelectorAll('p');
    macrosList.unshift();
    let text;

    console.log(macrosList);

    // const macros = Array.from(macrosList.map(p => {
    //     text =  p.textContent;
    //     const arrText = text.split(' ');
    //     text = arrText[1];
    //     return text;
    // }));

    // console.log(macros);




    // const calories = ;


    // try {
    //     const res = await fetch('/api/recipes/save', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             recipe_name: recipe_name;
    //             ingredients:
    //             calories:
    //             protein:
    //             carbs:
    //             fats:

    //         }),
    //     });

    //     savedResponse = await res.json();
    //     console.log(savedResponse);
        
    // } catch (err) {
    //     console.error('Error fetching data:', err);
    // }
}

// attach click listener to search button
document.querySelector('#search').addEventListener('click', handleSearch);
