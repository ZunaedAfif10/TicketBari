
import MyTickets from "@/components/Ticket/MyTickets";
import React from "react";

export const metadata = {
    title: "My Ticket Inventory | Vendor Workspace",
    description: "Manage, update, or clear registered journey listings and track administrative platform approvals.",
};

export default function MyTicketsPage() {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="border-b border-[#DCD3C7] pb-4">
                <h1 className="text-2xl font-black tracking-tight text-[#2C2520]">
                    Registered Ticket Assets
                </h1>
                <p className="text-xs text-[#2C2520]/60 font-semibold mt-1">
                    Review live metrics, verify platform authorization status, or update operational transport payload fields.
                </p>
            </div>

            {/* Injected 3-column client inventory layout component */}
            <MyTickets></MyTickets>
        </div>
    );
}