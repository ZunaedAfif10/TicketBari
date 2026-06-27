import { serverFetch } from "../core/server";

export const getBookingById = async (userId) => {
    return serverFetch(`api/bookings?userId=${userId}`);
}