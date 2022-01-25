 export interface Author {
        id: number;
        firstName: string;
        lastName: string;
        displayName: string;
        description: string;
    }

    export interface Category {
        id: number;
        displayName: string;
        description: string;
    }

    export interface Format {
        id: number;
        displayName: string;
    }

    export interface Book {
        id: number;
        displayName: string;
        price: number;
        image: string;
        description: string;
        publisher: string;
        publicationCity: string;
        language: string;
        authorId: number;
        author: Author;
        categoryId: number;
        category: Category;
        formatId: number;
        format: Format;
        stars: number;
    }

    export interface Pagination {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalCount: number;
    }

    export interface BooksWithPagination {
        books: Book[];
        pagination: Pagination;
    }

