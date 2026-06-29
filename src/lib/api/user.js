import { protectedFetch, serverFetch } from "../core/server";

export const getAllUsers = async () => {
    return protectedFetch(`api/users`);
}