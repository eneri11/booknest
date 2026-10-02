import { getCurrentYear, getQueryParameter } from './utils.js';
import { searchOpenLibrary, getOpenLibraryBook } from './api.js';
import { formatOpenLibraryBook } from './books.js';
import { displayBooks, displayMessage } from './ui.js';

function initializeApp() {
    const yearElement = document.querySelector('#current-year');

    if (yearElement) {
        yearElement.textContent = getCurrentYear();
    }

    setupSearchForm();
    setupBookDetails();
}

function setupSearchForm() {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const resultsContainer = document.querySelector('#book-results');
    const messageElement = document.querySelector('#search-message');

    if (!searchForm) {
        return;
    }

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();

        if (!query) {
            displayMessage(
                messageElement,
                'Please enter a book title or author.'
            );
            return;
        }

        displayMessage(messageElement, 'Searching for books...');

        try {
            const data = await searchOpenLibrary(query);

            const books = data.docs
                .slice(0, 12)
                .map(formatOpenLibraryBook);

            displayBooks(books, resultsContainer);

            displayMessage(
                messageElement,
                `Found ${books.length} book${books.length === 1 ? '' : 's'}.`
            );
        } catch (error) {
            console.error(error);

            displayMessage(
                messageElement,
                'Sorry, we could not load the books. Please try again.'
            );
        }
    });
}

async function setupBookDetails() {
    const detailsContainer = document.querySelector('#book-details');

    if (!detailsContainer) {
        return;
    }

    const workId = getQueryParameter('id');

    if (!workId) {
        detailsContainer.textContent = 'No book was selected.';
        return;
    }

    detailsContainer.textContent = 'Loading book details...';

    try {
        const book = await getOpenLibraryBook(workId);

        detailsContainer.innerHTML = '';

        const title = document.createElement('h1');
        title.textContent = book.title || 'Unknown Title';

        const description = document.createElement('p');

        if (typeof book.description === 'string') {
            description.textContent = book.description;
        } else if (book.description?.value) {
            description.textContent = book.description.value;
        } else {
            description.textContent = 'No description available.';
        }

        detailsContainer.append(title, description);
    } catch (error) {
        console.error(error);
        detailsContainer.textContent =
            'Sorry, we could not load this book.';
    }
}

initializeApp();