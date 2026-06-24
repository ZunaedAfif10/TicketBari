"use client";

import React, { useState } from "react";
import TicketCard from "@/components/TicketCard/TicketCard";

// Mock ticket data structure representing complete platform schema
const MOCK_TICKETS = [
  {
    id: "1",
    title: "Green Line Scenic Scania Business Class",
    from: "Dhaka",
    to: "Cox's Bazar",
    transportType: "Bus",
    price: 25,
    quantity: 14,
    departureDate: "June 28, 2026",
    departureTime: "09:30 PM",
    perks: ["WiFi", "Water Bottle", "Reclining Seats"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Biman Bangladesh Boeing 777-300ER",
    from: "Dhaka",
    to: "Sylhet",
    transportType: "Plane",
    price: 45,
    quantity: 4,
    departureDate: "July 02, 2026",
    departureTime: "02:15 PM",
    perks: ["20KG Baggage", "In-flight Meal", "Priority Boarding"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "MV Manami VIP Luxury Double Cabin",
    from: "Dhaka",
    to: "Barishal",
    transportType: "Launch",
    price: 35,
    quantity: 2,
    departureDate: "June 30, 2026",
    departureTime: "08:30 PM",
    perks: ["Attached Bath", "LED TV", "VIP Lounge Access"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop"
  }
];

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
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}