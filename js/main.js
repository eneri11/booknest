import {
    getReadingList,
    removeBook,
    updateBookStatus
} from './storage.js';

import { displayReadingList } from './ui.js';

import { getCurrentYear, getQueryParameter } from './utils.js';
import {
    searchOpenLibrary,
    getOpenLibraryBook,
    getGutendexBooks
} from './api.js';
import {
    formatOpenLibraryBook,
    formatGutendexBook
} from './books.js';
import {
    displayBooks,
    displayEbooks,
    displayMessage
} from './ui.js';
import { addBook } from './storage.js';

let currentSearchBooks = [];

function setupReadingList() {
    const listContainer = document.querySelector('#reading-list');
    const messageElement = document.querySelector('#reading-list-message');

    if (!listContainer || !messageElement) return;

    function refreshReadingList(message = '') {
        const books = getReadingList();

        displayReadingList(books, listContainer);
        messageElement.textContent = message || `You have ${books.length} saved book(s).`;
    }

    listContainer.addEventListener('change', (event) => {
        const select = event.target.closest('select[data-book-id]');

        if (!select) return;

        updateBookStatus(select.dataset.bookId, select.value);
        refreshReadingList('Reading status updated!');
    });

    listContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-remove-book-id]');

        if (!button) return;

        removeBook(button.dataset.removeBookId);
        refreshReadingList('Book removed from your reading list.');
    });

    refreshReadingList();
}

function initializeApp() {
    const yearElement = document.querySelector('#current-year');

    if (yearElement) {
        yearElement.textContent = getCurrentYear();
    }

    setupSearchForm();
    setupBookDetails();
    setupAddToList();
    loadFreeEbooks();
    setupReadingList();
}

function setupSearchForm() {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const resultsContainer = document.querySelector('#book-results');
    const messageElement = document.querySelector('#search-message');

    if (!searchForm) return;

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();

        if (!query) {
            displayMessage(messageElement, 'Please enter a book title or author.');
            return;
        }

        displayMessage(messageElement, 'Searching for books...');

        try {
            const data = await searchOpenLibrary(query);

            currentSearchBooks = data.docs
                .slice(0, 12)
                .map(formatOpenLibraryBook);

            displayBooks(currentSearchBooks, resultsContainer);

            displayMessage(
                messageElement,
                `Found ${currentSearchBooks.length} books.`
            );
        } catch (error) {
            console.error('Open Library error:', error);
            displayMessage(
                messageElement,
                'Sorry, we could not load the books. Please try again.'
            );
        }
    });
}

async function setupBookDetails() {
    const detailsContainer = document.querySelector('#book-details');

    if (!detailsContainer) return;

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
        console.error('Book details error:', error);
        detailsContainer.textContent = 'Sorry, we could not load this book.';
    }
}

function setupAddToList() {
    const resultsContainer = document.querySelector('#book-results');

    if (!resultsContainer) return;

    resultsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-book-id]');

        if (!button) return;

        const book = currentSearchBooks.find(
            item => item.id === button.dataset.bookId
        );

        if (!book) return;

        addBook(book);

        button.textContent = 'Added to List';
        button.disabled = true;
    });
}

async function loadFreeEbooks() {
    const ebookContainer = document.querySelector('#ebook-results');
    const messageElement = document.querySelector('#ebook-message');

    if (!ebookContainer || !messageElement) return;

    messageElement.textContent = 'Loading free ebooks...';

    try {
        const data = await getGutendexBooks('Alice in Wonderland');

        const ebooks = data.results
            .slice(0, 6)
            .map(formatGutendexBook);

        displayEbooks(ebooks, ebookContainer);

        messageElement.textContent = `Found ${ebooks.length} free ebooks.`;
    } catch (error) {
        console.error('Gutendex API error:', error);
        messageElement.textContent =
            'Sorry, we could not load free ebooks. Please try again.';
    }
}

initializeApp();