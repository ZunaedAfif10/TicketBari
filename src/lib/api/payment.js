import { serverFetch } from "../core/server";

export const getPaymentsByEmail = async (email) => {
    return serverFetch(`api/payments?email=${email}`);
}