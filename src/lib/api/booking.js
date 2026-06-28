import { serverFetch } from "../core/server";

export const getBookingById = async (userId) => {
    return serverFetch(`api/bookings?userId=${userId}`);
}

export const getBookingByEmail = async (vendorEmail) => {
    return serverFetch(`api/bookings?vendorEmail=${vendorEmail}`);
}