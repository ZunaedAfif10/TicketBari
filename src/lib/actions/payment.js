'use server'
import { serverMutation } from "../core/server";

export const createPayment = async (newPaymentData) => {
    return serverMutation('api/payments', newPaymentData);
}