export type category = 'todos' | '12+' | '16+' | '18+' | 'sin clasificación';

export interface iLibros {
  id?: number;
  name: string;
  author: string;
  category: category
  pages: number;
  publisher: string;
  description: string;
  image: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  price: number;
  released: string;
  language: string;
}
