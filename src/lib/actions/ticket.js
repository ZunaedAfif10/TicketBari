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

export const deleteTicket = async (id) => {
    const result = serverMutation(`api/tickets/${id}`,{}, 'DELETE');
    revalidatePath('/dashboard/vendor/my-added-tickets');
    return result;
}