export type status = "complete" | "expired"

export interface iCompras {
    id: string;
    totalPrice: number
    status: status
}