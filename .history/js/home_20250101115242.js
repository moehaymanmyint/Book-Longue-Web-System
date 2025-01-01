document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    console.log('Search Query:', query); // Log the search query
    if (query) {
        fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
            .then(response => {
                console.log('API Response:', response);
                return response.json();
            })
            .then(data => {
                console.log('Parsed Data:', data);
                const resultsContainer = document.getElementById('results-container');
                resultsContainer.innerHTML = ''; // Clear previous results
                
                if (data.docs && data.docs.length > 0) {
                    data.docs.slice(0, 10).forEach(book => {
                        const bookCard = document.createElement('div');
                        bookCard.className = 'col-md-4 mb-4';
                        bookCard.innerHTML = `
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">${book.title}</h5>
                                    <p class="card-text">Author: ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                                    <p class="card-text">First Published: ${book.first_publish_year || 'N/A'}</p>
                                </div>
                            </div>
                        `;
                        resultsContainer.appendChild(bookCard);
                    });
                } else {
                    resultsContainer.innerHTML = '<p>No books found. Try a different search term.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        alert('Please enter a search term.');
    }
});
