export interface iLibros {
    id?: number;
    name: string;
    author: string;
    category: 'todos' | 'infantil' | 'adolecentes' | 'adultos' | 'sin clasificación'
    pages: number;
    publisher: string
    description: string;
    image: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5
    price: number;
    released: Date;
    language: string
}