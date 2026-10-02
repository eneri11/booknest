export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

export function createElement(element, className = '') {
    const newElement = document.createElement(element);

    if (className) {
        newElement.className = className;
    }

    return newElement;
}