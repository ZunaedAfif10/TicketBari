import React from "react";

import { getTickets } from "@/lib/api/ticket";
import AdminTicketApprovalTable from "@/components/Ticket/AdminTicketApprovalTable";



export default async function AdminTicketsPage() {
    const allTickets = await getTickets();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminTicketApprovalTable tickets={allTickets} />
        </div>
    );
}