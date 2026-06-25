"use client";

import React from "react";
import Link from "next/link";
import { 
  Ticket, 
  Compass, 
  Plane, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  ArrowRight,
  Layers,
  CircleCheck
} from "@gravity-ui/icons";

export default function TicketCard({ ticket }) {
  // Map transport types cleanly to Gravity UI Icons
  const iconMap = {
    bus: <Ticket className="w-4 h-4 text-[#4A6761]" />,
    train: <Compass className="w-4 h-4 text-[#4A6761]" />,
    plane: <Plane className="w-4 h-4 text-[#4A6761]" />,
    launch: <ShieldCheck className="w-4 h-4 text-[#4A6761]" />,
  };

  const transportIcon = iconMap[ticket.transportType?.toLowerCase()] || <Ticket className="w-4 h-4 text-[#4A6761]" />;

  return (
    <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group">
      
      {/* Ticket Image Frame */}
      <div className="relative h-48 w-full bg-[#2C2520]/10 overflow-hidden shrink-0">
        <img 
          src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop"} 
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 bg-[#4A6761] text-[#F4EFEA] text-xs font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5 capitalize">
          {transportIcon}
          {ticket.transportType}
        </span>
      </div>

      {/* Card Details Window */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-4">
        
        <div className="space-y-2">
          {/* Ticket Title */}
          <h3 className="text-lg font-extrabold text-[#2C2520] tracking-tight line-clamp-1">
            {ticket.title}
          </h3>

          {/* From → To Location Route */}
          <div className="flex items-center gap-2 text-sm font-bold text-[#2C2520]/80 bg-[#F4EFEA]/60 px-3 py-1.5 rounded-lg border border-[#DCD3C7]/40 w-full">
            <span className="truncate">{ticket.from}</span>
            <ArrowRight className="w-3 h-3 text-[#4A6761] shrink-0" />
            <span className="truncate">{ticket.to}</span>
          </div>

          {/* Departure Date & Time parameters */}
          <div className="grid grid-cols-2 gap-2 text-xs text-[#2C2520]/70 pt-1">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#4A6761]" />
              <span className="truncate">{ticket.departureDate}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#4A6761]" />
              <span className="truncate">{ticket.departureTime}</span>
            </div>
          </div>
        </div>

        {/* Perks Section Container */}
        {ticket.perks && ticket.perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-[#DCD3C7]/60 pt-3">
            {ticket.perks.slice(0, 3).map((perk, index) => (
              <span 
                key={index} 
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4A6761] bg-[#4A6761]/5 border border-[#4A6761]/20 px-2 py-0.5 rounded"
              >
                <CircleCheck className="w-2.5 h-2.5" />
                {perk}
              </span>
            ))}
          </div>
        )}

        {/* Dynamic Quantity & Price Metrics */}
        <div className="flex items-center justify-between border-t border-[#DCD3C7]/60 pt-3 mt-auto">
          <div className="flex items-center gap-1 text-xs text-[#2C2520]/60 font-semibold">
            <Layers className="w-3.5 h-3.5 text-[#2C2520]/40" />
            <span>{ticket.quantity} Left</span>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-[#2C2520]/50 uppercase tracking-wider leading-none">Per Unit</p>
            <p className="text-xl font-black text-[#4A6761] mt-0.5">${ticket.price}</p>
          </div>
        </div>

        {/* View Action Element */}
        <Link 
          href={`/tickets/${ticket.id || ticket._id}`}
          className="w-full text-center bg-[#4A6761] hover:bg-[#4A6761]/90 text-[#F4EFEA] py-2.5 rounded-xl text-sm font-bold transition shadow-sm block shrink-0"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}