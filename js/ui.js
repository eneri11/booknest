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