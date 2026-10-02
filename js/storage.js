const STORAGE_KEY = 'booknest-reading-list';

export function getReadingList() {
    const savedBooks = localStorage.getItem(STORAGE_KEY);

    if (!savedBooks) {
        return [];
    }

    try {
        return JSON.parse(savedBooks);
    } catch (error) {
        console.error('Unable to read the saved book list:', error);
        return [];
    }
}

export function saveReadingList(books) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function addBook(book) {
    const books = getReadingList();

    const alreadySaved = books.some(
        (savedBook) => savedBook.id === book.id
    );

    if (!alreadySaved) {
        books.push({
            ...book,
            status: 'To Read'
        });

        saveReadingList(books);
    }

    return books;
}

export function removeBook(bookId) {
    const books = getReadingList();

    const updatedBooks = books.filter(
        (book) => book.id !== bookId
    );

    saveReadingList(updatedBooks);

    return updatedBooks;
}

export function updateBookStatus(bookId, status) {
    const books = getReadingList();

    const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
            return {
                ...book,
                status
            };
        }

        return book;
    });

    saveReadingList(updatedBooks);

    return updatedBooks;
}