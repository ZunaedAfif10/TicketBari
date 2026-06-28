"use client";

import React, { useState } from "react";
import TicketCard from "@/components/Ticket/TicketCard";
import { getApprovedTickets } from "@/lib/api/ticket";

const MOCK_TICKETS = await getApprovedTickets();
// console.log(tickets);


export default function AllTicketsPage() {
  const [tickets] = useState(MOCK_TICKETS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full min-h-screen">
      {/* Title Header Block */}
      <div className="mb-8 border-b border-[#DCD3C7] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C2520] tracking-tight">
            Available Journeys
          </h1>
          <p className="text-[#2C2520]/70 text-sm mt-1 font-medium">
            Browse active itineraries across multi-modal networks listed dynamically by authenticated providers.
          </p>
        </div>
        <div className="text-xs font-bold text-[#2C2520]/50 bg-[#EAE3DA] px-3 py-1.5 rounded-lg border border-[#DCD3C7] w-fit">
          Showing {tickets.length} available paths
        </div>
      </div>

      {/* Grid Layout Container */}
      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-[#EAE3DA]/30 rounded-2xl border border-dashed border-[#DCD3C7]">
          <p className="text-base text-[#2C2520]/60 font-semibold">No active listings available at this moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}