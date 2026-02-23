import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = bigint;
export interface Ticket {
    id: TicketId;
    owner: UserId;
}
export type TicketId = bigint;
export interface backendInterface {
    buyTicket(userId: UserId): Promise<TicketId>;
    getAllTicketsByUser(userId: UserId): Promise<Array<Ticket>>;
    getTicket(ticketId: TicketId): Promise<Ticket>;
}
