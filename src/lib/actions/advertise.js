'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


export const updateAdvertise = async (id, data) => {
    const result = serverMutation(`api/advertise/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/advertise');
    return result;
}