
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

// get the search route from the server
    try {
        const res = await fetch('/api/recipes/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({params: params}),
        });

        const searchResult = await res.json();
        const top20 = searchResult.hits;

        // get the desired info from the top 20 recipes
        let recipesArr = [];
        top20.forEach(hit => {
            const recipe = hit.recipe;
            
            // object containing individual recipe data
            const recipeObj = {
                recipe_name: recipe.label,
                ingredients: recipe.ingredientLines,
                calories: Math.round(recipe.calories),
                protein: Math.round(recipe.digest[2].total),
                carbs: Math.round(recipe.digest[1].total),
                fats: Math.round(recipe.digest[0].total),
            }
            // add each recipe object to the recipe array
            recipesArr.push(recipeObj)
        });

        // handle response data
        storeRecipes(recipesArr);
        displayRecipes(recipesArr);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

function storeRecipes(allRecipes) {
    // clear stored recipes
    if (localStorage.getItem('storedRecipes')) {
        localStorage.removeItem('storedRecipes');
    }

    // Store recipe results in local storage
    localStorage.setItem('storedRecipes', JSON.stringify(allRecipes));
}

function displayRecipes (allRecipes) {

    const resultContainer = document.getElementById('results-container');
    resultContainer.textContent = '';
    // counter for recipe id
    let i = 0;

    allRecipes.forEach(recipe => {
        // recipe card el
        const cardEl = document.createElement('div');
        cardEl.classList.add('card', 'bg-white', 'p-6', 'rounded-lg', 'shadow-md', 'mb-6');
        cardEl.setAttribute('id', i);
        i++;

        // recipe name el
        const nameEl = document.createElement('h3');
        nameEl.textContent = recipe.recipe_name;
        nameEl.classList.add('text-2xl', 'font-extrabold', 'text-gray-900', 'mb-2');

        //ingredients list el
        const ingredientsLabel = document.createElement('h4');
        ingredientsLabel.textContent = 'Ingredients:';
        ingredientsLabel.classList.add('text-xl', 'font-semibold', 'text-gray-800', 'mb-2');

        const ingredientsListEl = document.createElement('ul');
        ingredientsListEl.classList.add('list-disc', 'list-inside', 'mb-4');

        recipe.ingredients.forEach(ingredient => {
            const ingredientEl = document.createElement('li');
            ingredientEl.textContent = ingredient;
            ingredientEl.classList.add('text-gray-700');
            ingredientsListEl.appendChild(ingredientEl);
        })

        // calories el
        const calEl = document.createElement('p');
        calEl.textContent = `Calories: ${recipe.calories}`;
        calEl.classList.add('text-gray-700', 'mb-2');

        // protein el
        const proteinEl = document.createElement('p');
        proteinEl.textContent = `Protein: ${recipe.protein}`;
        proteinEl.classList.add('text-gray-700', 'mb-2');

        // carbs el
        const carbsEl = document.createElement('p');
        carbsEl.textContent = `Carbs: ${recipe.carbs}`;
        carbsEl.classList.add('text-gray-700', 'mb-2');

        // fats el
        const fatsEl = document.createElement('p');
        fatsEl.textContent = `Fats: ${recipe.fats}`;
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

    // get recipe to save from local storage
    const recipeID = clickedEl.parentNode.id;
    const recipeResults = JSON.parse(localStorage.getItem('storedRecipes'));
    let savedRecipe = recipeResults[recipeID];

    // send request to get user id
    try {
        // get user id
        const res = await fetch('/api/users/id');
        const id = await res.json();

        // add id to recipe obj
        savedRecipe = {
            ...savedRecipe,
            user_id: id
        }
        
    } catch (err) {
        console.error('Error fetching data:', err);
    }

    // send request to save recipe
    try {
        const res = await fetch('/api/recipes/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(savedRecipe),
        });

        savedResponse = await res.json();
        console.log(savedResponse);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

// attach click listener to search button
document.querySelector('#search').addEventListener('click', handleSearch)