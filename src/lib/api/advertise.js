import { serverFetch } from "../core/server";

export const getAdvertise = async () => {
    return serverFetch(`api/advertise`);
}