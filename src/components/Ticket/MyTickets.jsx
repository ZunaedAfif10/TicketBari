"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { 
    Compass, Ticket, Layers, Calendar, 
    TrashBin, Gear, CircleCheck, CircleInfoFill, Shield 
} from "@gravity-ui/icons";
import { getTicketsByVendor } from "@/lib/api/ticket";

export default function MyTickets() {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const fetchVendorTickets = async () => {
            if (!session?.user?.email) return;
          
                // console.log(session?.user?.email)
                const data = await getTicketsByVendor(session?.user?.email)
                console.log(data)
                
                setTickets(data);
                console.log(tickets)
                setIsLoading(false)
        };

        fetchVendorTickets();
    }, [session?.user?.email]);


    const handleDelete = async (ticketId) => {
       
    };

    const handleUpdateRedirect = (ticketId) => {
        router.push(`/dashboard/vendor/my-added-tickets/update/${ticketId}`);
    };


    const getStatusBadgeStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-emerald-50 text-emerald-800 border-emerald-200/60";
            case "rejected":
                return "bg-red-50 text-red-800 border-red-200/60";
            case "pending":
            default:
                return "bg-amber-50 text-amber-800 border-amber-200/60";
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-[#2C2520]/60 font-bold text-sm">
                Parsing inventory grid matrices...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            
            {/* Action Alert Strip */}
            {actionMessage.text && (
                <div className={`p-3.5 border rounded-xl text-xs font-bold flex items-center gap-2 ${
                    actionMessage.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
                }`}>
                    {actionMessage.type === "success" ? <CircleCheck className="w-4 h-4"/> : <CircleInfoFill className="w-4 h-4"/>}
                    {actionMessage.text}
                </div>
            )}

            {/* Grid Conditionals */}
            {tickets.length === 0 ? (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-12 text-center text-[#2C2520]/60 font-bold text-sm space-y-4">
                    <Shield className="w-8 h-8 text-[#4A6761] mx-auto block" />
                    <p>No journey assets registered under your vendor registry profile template yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => {
                        const isRejected = ticket.status?.toLowerCase() === "rejected";

                        return (
                            <div 
                                key={ticket._id} 
                                className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between text-[#2C2520]"
                            >
                                {/* Media Image Window */}
                                <div className="h-40 relative bg-[#2C2520]/5 w-full">
                                    <img 
                                        src={ticket.image} 
                                        alt={ticket.title} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600";
                                        }}
                                    />
                                    {/* Verification Status Badge Overlay */}
                                    <span className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border shadow-sm ${getStatusBadgeStyle(ticket.status)}`}>
                                        {ticket.status || "pending"}
                                    </span>
                                    {/* Transport Mode Badge Overlay */}
                                    <span className="absolute bottom-3 left-3 bg-[#2C2520]/80 text-[#F4EFEA] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                                        {ticket.transportType}
                                    </span>
                                </div>

                                {/* Content Details Container */}
                                <div className="p-5 flex-1 space-y-4">
                                    <div>
                                        <h3 className="font-extrabold text-base leading-tight tracking-tight line-clamp-1 text-[#2C2520]">
                                            {ticket.title}
                                        </h3>
                                    </div>

                                    {/* Operational Routing Matrix */}
                                    <div className="grid grid-cols-2 gap-2 text-xs font-bold bg-[#F4EFEA]/60 border border-[#DCD3C7]/60 rounded-xl p-3">
                                        <div className="space-y-0.5">
                                            <span className="text-[9px] text-[#2C2520]/40 uppercase block">Origin</span>
                                            <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-[#4A6761]" /> {ticket.from}</span>
                                        </div>
                                        <div className="space-y-0.5">
                                            <span className="text-[9px] text-[#2C2520]/40 uppercase block">Destination</span>
                                            <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-[#4A6761]" /> {ticket.to}</span>
                                        </div>
                                    </div>

                                    {/* Financials & Stock parameters */}
                                    <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-[#2C2520]/50 block">Pricing Matrix</span>
                                            <span className="text-base font-black text-[#4A6761]">${ticket.price?.toFixed(2)} <span className="text-[10px] font-normal text-[#2C2520]/60">USD</span></span>
                                        </div>
                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-[#2C2520]/50 block">Stock Allocation</span>
                                            <span className="flex items-center gap-1 pt-1 font-extrabold"><Layers className="w-3.5 h-3.5 text-[#2C2520]/40" /> {ticket.quantity} units</span>
                                        </div>
                                    </div>

                                    {/* Departure Date/Time Indicators */}
                                    <div className="text-xs font-bold text-[#2C2520]/70 flex items-center gap-1.5 pt-1 border-t border-[#DCD3C7]/50">
                                        <Calendar className="w-3.5 h-3.5 text-[#4A6761]" />
                                        <span>{ticket.departureDate} • {ticket.departureTime}</span>
                                    </div>
                                </div>

                                {/* Dynamic Action Trigger Footer Bar */}
                                <div className="p-4 bg-[#F4EFEA]/40 border-t border-[#DCD3C7]/60 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        disabled={isRejected}
                                        onClick={() => handleUpdateRedirect(ticket._id)}
                                        className="w-full py-2 bg-[#4A6761] disabled:bg-[#2C2520]/10 text-[#F4EFEA] disabled:text-[#2C2520]/40 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs hover:opacity-95 disabled:opacity-100 disabled:cursor-not-allowed"
                                    >
                                        <Gear className="w-3.5 h-3.5" />
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isRejected}
                                        onClick={() => handleDelete(ticket._id)}
                                        className="w-full py-2 bg-red-800 disabled:bg-[#2C2520]/10 text-red-50 disabled:text-[#2C2520]/40 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs hover:bg-red-900 disabled:opacity-100 disabled:cursor-not-allowed"
                                    >
                                        <TrashBin className="w-3.5 h-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}