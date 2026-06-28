import AddTicketFormClient from "@/components/Ticket/AddTicketFormClient";
import React from "react";


export default async function AddTicketPage() {
    return (
        <div className="w-full max-w-4xl mx-auto py-6">
            {/* Header branding window layout */}
            <div className="border-b border-[#DCD3C7] pb-4 mb-6">
                <h1 className="text-2xl font-black text-[#2C2520] tracking-tight">Create New Journey Listing</h1>
                <p className="text-xs text-[#2C2520]/60 font-medium mt-0.5">
                    Fill out the multi-modal configuration fields below to dispatch an itinerary asset for validation.
                </p>
            </div>

            <AddTicketFormClient />
        </div>
    );
}