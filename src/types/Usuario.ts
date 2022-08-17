export type role = 'user'|'admin';

export type status = 'true'|'false'

export interface iUsuario {
    id?: number
    email: string
    password: string
    username: string
    name: string
    lastname: string
    role: role
    url: string
    status: status
}