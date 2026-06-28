import { serverMutation } from "../core/server";

export const createBooking = async (newBookingData) => {
    return serverMutation('api/bookings', newBookingData);
}

export const updateBooking = async (id, data) => {
    const result = serverMutation(`api/bookings/${id}`, data, 'PATCH');
    revalidatePath('/dashboard/vendor/requested-bookings');
    return result;
}