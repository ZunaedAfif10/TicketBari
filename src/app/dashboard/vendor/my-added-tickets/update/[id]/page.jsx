import React from "react";
import { redirect } from "next/navigation";
import VendorTicketUpdateForm from "@/components/Ticket/VendorTicketUpdateForm";
import { getTicketsById } from "@/lib/api/ticket";


export default async function Page({ params }) {
    const { id } =  await params;

    const ticketData = await getTicketsById(id)


    return <VendorTicketUpdateForm initialTicket={ticketData} />;
}