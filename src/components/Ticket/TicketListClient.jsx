"use client";

import { useState } from "react";
import TicketCard from "./TicketCard";


export default function TicketListClient({ initialTickets = [] }) {
  // Interactive search/sort state hooks
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [sortBy, setSortBy] = useState(""); // "" | "low-to-high" | "high-to-low"

  // Filter and Sort Engine running live on the client side
  const filteredAndSortedTickets = initialTickets
    .filter((ticket) => {
      const matchFrom = (ticket?.from || "").toLowerCase().includes(searchFrom.toLowerCase());
      const matchTo = (ticket?.to || "").toLowerCase().includes(searchTo.toLowerCase());
      return matchFrom && matchTo;
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") return Number(a.price || 0) - Number(b.price || 0);
      if (sortBy === "high-to-low") return Number(b.price || 0) - Number(a.price || 0);
      return 0;
    });

  return (
    <div className="space-y-8">
      {/* --- SEARCH & SORT CONTROL PANEL --- */}
      <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-4 md:p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* From Search */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60 block px-0.5">
            Departure Base (From)
          </label>
          <input
            type="text"
            placeholder="e.g. Dhaka"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] text-sm text-[#2C2520] font-bold px-4 py-3 rounded-xl placeholder-[#2C2520]/30 focus:outline-none focus:border-[#4A6761]/60 transition"
          />
        </div>

        {/* To Search */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60 block px-0.5">
            Arrival Destination (To)
          </label>
          <input
            type="text"
            placeholder="e.g. Chattogram"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] text-sm text-[#2C2520] font-bold px-4 py-3 rounded-xl placeholder-[#2C2520]/30 focus:outline-none focus:border-[#4A6761]/60 transition"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="space-y-1.5 text-left sm:col-span-2 lg:col-span-1">
          <label className="text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60 block px-0.5">
            Price Valuation Ordering
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] text-sm text-[#2C2520] font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-[#4A6761]/60 transition cursor-pointer"
          >
            <option value="">Default Schedule Layout</option>
            <option value="low-to-high">Price: Economy to Premium</option>
            <option value="high-to-low">Price: Premium to Economy</option>
          </select>
        </div>
      </div>

      {/* --- LIVE SEAT INVENTORY RENDER GRID --- */}
      {filteredAndSortedTickets.length === 0 ? (
        <div className="text-center py-20 bg-[#EAE3DA]/30 rounded-2xl border border-dashed border-[#DCD3C7]">
          <p className="text-base text-[#2C2520]/60 font-semibold">No active routes found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}