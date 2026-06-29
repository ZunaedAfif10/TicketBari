import { protectedFetch, serverFetch } from "../core/server";

export const getPaymentsByEmail = async (email) => {
    return protectedFetch(`api/payments?email=${email}`);
}

export const getSellingsByEmail = async (email) => {
    return protectedFetch(`api/sellings?email=${email}`);
}