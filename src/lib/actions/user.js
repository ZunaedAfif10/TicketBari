'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateUser = async (id, data) => {
    const result = serverMutation(`api/users/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/admin/users');
    return result;
}