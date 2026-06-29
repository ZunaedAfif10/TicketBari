import React from "react";
import { Megaphone } from "@gravity-ui/icons";
import AdminTicketsTable from "@/components/Ticket/AdminTicketsTable";
import { getApprovedTickets } from "@/lib/api/ticket";



export default async function AdminTicketsManagementPage() {
    const tickets = await getApprovedTickets();
    console.log(tickets)
    return (
        <div className="max-w-6xl mx-auto my-8 px-4 space-y-6 text-[#2C2520]">

            {/* Header Layout context */}
            <div className="bg-[#EAE3DA] border border-[#DCD3C7] p-6 rounded-2xl shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-[#4A6761]" /> Approved Ticket Inventory
                    </h1>
                    <p className="text-xs font-medium text-[#2C2520]/60">
                        Manage active routes and switch homepage advertisement banner campaign targets.
                    </p>
                </div>
            </div>

            {/* Injected Interactive Table Component Container */}
            <AdminTicketsTable initialTickets={tickets} />

        </div>
    );
}