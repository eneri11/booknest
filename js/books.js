export function formatOpenLibraryBook(book) {
    return {
        id: book.key,
        title: book.title || 'Unknown Title',
        author: book.author_name?.join(', ') || 'Unknown Author',
        year: book.first_publish_year || 'Unknown',
        coverId: book.cover_i || null,
        isbn: book.isbn?.[0] || null,
        publisher: book.publisher?.[0] || 'Unknown Publisher',
        subjects: book.subject?.slice(0, 5) || []
    };
}

export function formatGutendexBook(book) {
    return {
        id: `gutendex-${book.id}`,
        title: book.title || 'Unknown Title',
        author: book.authors?.map((author) => author.name).join(', ') || 'Unknown Author',
        summary: book.summaries?.[0] || 'No summary available.',
        languages: book.languages || [],
        subjects: book.subjects?.slice(0, 5) || [],
        downloadCount: book.download_count || 0,
        formats: book.formats || {}
    };
}

export function getCoverUrl(coverId) {
    if (!coverId) {
        return 'https://placehold.co/170x250?text=No+Cover';
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}