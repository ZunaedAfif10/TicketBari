import { protectedFetch, serverFetch } from "../core/server"

export const getTickets = async () => {
    return protectedFetch(`api/tickets`);
}

export const getLatestTickets = async () => {
    return serverFetch(`api/latest-tickets`);
}

export const getApprovedTickets = async () => {
    return serverFetch(`api/approved-tickets`);
}

export const getTicketsById = async (ticketId) => {
    return serverFetch(`api/tickets/${ticketId}`);
}

export const getTicketsByVendor = async (email) => {
    return protectedFetch(`api/tickets?email=${email}`);
}

