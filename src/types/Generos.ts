export type genre = 'arte' | 'anime' | 'biografía' | 'biología' | 'comic' | 'comida' | 'computación' | 'deporte' | 'derecho' | 'economía' | 'estudio' | 'ficción' | 'historia' | 'humor' | 'infantil' | 'juvenil' | 'matemática' | 'medicina' | 'novela' | 'ocio - tiempo libre' | 'política' | 'salud - desarrollo personal' | 'tecnología' | 'terror';

export interface iGeneros {
    id?: number
    genre:genre
}