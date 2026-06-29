import { serverFetch } from "../core/server"

export const getTickets = async () => {
    return serverFetch(`api/tickets`);
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
    return serverFetch(`api/tickets?email=${email}`);
}

