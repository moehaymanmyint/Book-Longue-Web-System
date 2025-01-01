let resultsContainer = document.getElementById('results-container');
let searchInput = document.querySelector('.search-value');
let searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', () => {
    const query = searchInput.value; 
    searchBooks(query);
});

