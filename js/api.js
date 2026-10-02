const OPEN_LIBRARY_URL = 'https://openlibrary.org/search.json';
const GUTENDEX_URL = 'https://gutendex.com/books/';

export async function searchOpenLibrary(query) {
    const url = `${OPEN_LIBRARY_URL}?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to retrieve books from Open Library.');
    }

    return response.json();
}

export async function getOpenLibraryBook(workId) {
    const url = `https://openlibrary.org${workId}.json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to retrieve the book details.');
    }

    return response.json();
}

export async function getGutendexBooks(query = '') {
    const url = query
        ? `${GUTENDEX_URL}?search=${encodeURIComponent(query)}`
        : GUTENDEX_URL;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to retrieve ebooks from Gutendex.');
    }

    return response.json();
}