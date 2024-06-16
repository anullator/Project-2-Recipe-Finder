const handleSearch = (event) => {
    console.log(`enter handle search`);
    event.preventDefault();
    const query = document.getElementById("keyword");
    console.log(query);
    const diet = document.getElementById("diet");
    console.log(diet);
}

document.querySelector('#search').addEventListener('click', handleSearch);
console.log(`added event listener`);