let resultsContainer = document.getElementById('results-container');
let searchInput = document.querySelector('.search-value');
let searchButton = document.querySelector('.search-btn');

searchButton.addEventListener('click', () => {
    const query = searchInput.value; 
    searchBooks(query);
});

function searchBooks(query) {
    const url = `https://openlibrary.org/search.json?q=${query}`;
    fetch(url) 
        .then(response => response.json()) 
        .then(data => {
            showResults(data.docs);
        })
        .catch(error => {
            console.error('Error fetching books:', error); 
        });
}