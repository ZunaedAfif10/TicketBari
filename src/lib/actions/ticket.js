'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createTicket = async (newTicketData) => {
    return serverMutation('api/tickets', newTicketData);
}

export const updateTicket = async (id, data) => {
    const result = serverMutation(`api/tickets/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/tickets');
    return result;
}