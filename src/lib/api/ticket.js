import { serverFetch } from "../core/server"

export const getTickets = async () => {
    return serverFetch(`api/tickets`);
}

export const getTicketsById = async (ticketId) => {
    return serverFetch(`api/tickets/${ticketId}`);
}