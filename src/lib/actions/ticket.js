import { serverMutation } from "../core/server";

export const createTicket = async (newTicketData) => {
    return serverMutation('api/tickets', newTicketData);
}