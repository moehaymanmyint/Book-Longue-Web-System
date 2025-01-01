let resultsContainer = document.querySelector('#results-container');
let searchInput = document.querySelector('.search-value');
let searchButton = document.querySelector('.search-btn');

// Event listener for the search button click
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    searchBooks(query);
});

// Event listener for the Enter key in the input field
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        searchBooks(query);
    }
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

function showResults(books) {
    resultsContainer.innerHTML = ''; 

    if (books.length === 0) {
        resultsContainer.innerHTML = '<p>No books found!</p>'; 
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'col-md-3 mb-4'; 

        // Construct the cover image URL using Open Library's standard cover image format.
        const coverImageUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'https://via.placeholder.com/150?text=No+Cover';

        // Use the `ratings_average` if available, otherwise display "No Rating".
        const rating = book.ratings_average ? book.ratings_average.toFixed(1) : 'No Rating';

        bookCard.innerHTML = `
            <div class="card">
                <img src="${coverImageUrl}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5>${book.title}</h5>
                    <p>Author: ${book.author_name ? book.author_name[0] : 'Unknown'}</p>
                    <p>Rating: ${rating}</p>
                </div>
            </div>
        `;
        resultsContainer.appendChild(bookCard); 
    });
}

