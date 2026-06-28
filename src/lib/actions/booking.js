import { serverMutation } from "../core/server";

export const createBooking = async (newBookingData) => {
    return serverMutation('api/bookings', newBookingData);
}