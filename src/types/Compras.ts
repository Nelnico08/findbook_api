export type status = "complete" | "expired" | "open";

export interface iCompras {
    id: string;
    user_id?: number;
    totalPrice: number;
    status: status
}