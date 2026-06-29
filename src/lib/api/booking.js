import { protectedFetch, serverFetch } from "../core/server";

export const getBookingById = async (userId) => {
    return protectedFetch(`api/bookings?userId=${userId}`);
}

export const getBookingByEmail = async (vendorEmail) => {
    return protectedFetch(`api/bookings?vendorEmail=${vendorEmail}`);
}