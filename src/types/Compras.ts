export type status = "complete" | "expired" | "open";
export type buttonSwitch = "active" | "disable"

export interface iCompras {
    id: string;
    user_id?: number;
    totalPrice: number;
    status: status
    buttonSwitch: buttonSwitch
}