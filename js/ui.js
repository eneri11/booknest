import { createElement } from './utils.js';
import { getCoverUrl } from './books.js';

export function displayBooks(books, container) {
    container.innerHTML = '';

    if (!books.length) {
        container.textContent = 'No books were found.';
        return;
    }

    books.forEach((book) => {
        const card = createElement('article', 'book-card');

        const image = createElement('img');
        image.src = getCoverUrl(book.coverId);
        image.alt = `Cover of ${book.title}`;
        image.loading = 'lazy';

        const title = createElement('h2');
        title.textContent = book.title;

        const author = createElement('p');
        author.textContent = `Author: ${book.author}`;

        const year = createElement('p');
        year.textContent = `First published: ${book.year}`;

        const actions = createElement('div', 'book-actions');

        const detailsLink = createElement('a');
        detailsLink.href = `details.html?id=${encodeURIComponent(book.id)}`;
        detailsLink.textContent = 'View Details';

        const addButton = createElement('button');
        addButton.type = 'button';
        addButton.textContent = 'Add to List';
        addButton.dataset.bookId = book.id;

        actions.append(detailsLink, addButton);
        card.append(image, title, author, year, actions);

        container.appendChild(card);
    });
}

export function displayMessage(element, message) {
    element.textContent = message;
}

export function displayEbooks(books, container) {
    container.innerHTML = '';

    if (!books.length) {
        container.textContent = 'No free ebooks were found.';
        return;
    }

    books.forEach(book => {
        const card = createElement('article', 'book-card');

        const title = createElement('h3');
        title.textContent = book.title;

        const author = createElement('p');
        author.textContent = `Author: ${book.author}`;

        const summary = createElement('p');
        summary.textContent = book.summary;

        const link = createElement('a');
        link.href = book.formats['text/html'];
        link.textContent = 'Read Free Ebook';
        link.target = '_blank';
        link.rel = 'noopener';

        card.append(title, author, summary, link);
        container.appendChild(card);
    });
}


export function displayReadingList(books, container) {
    container.innerHTML = '';

    if (!books.length) {
        container.textContent = 'Your reading list is empty. Add some books!';
        return;
    }

    books.forEach(book => {
        const card = createElement('article', 'book-card');

        const title = createElement('h2');
        title.textContent = book.title;

        const author = createElement('p');
        author.textContent = `Author: ${book.author}`;

        const year = createElement('p');
        year.textContent = `First published: ${book.year}`;

        const statusLabel = createElement('label');
        statusLabel.textContent = 'Reading status: ';

        const statusSelect = createElement('select');
        statusSelect.dataset.bookId = book.id;

        ['To Read', 'Reading', 'Completed'].forEach(status => {
            const option = createElement('option');
            option.value = status;
            option.textContent = status;
            option.selected = book.status === status;
            statusSelect.appendChild(option);
        });

        statusLabel.appendChild(statusSelect);

        const removeButton = createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove from List';
        removeButton.dataset.removeBookId = book.id;

        card.append(title, author, year, statusLabel, removeButton);
        container.appendChild(card);
    });
}