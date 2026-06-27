"use client";

import React, { useState, useEffect } from "react";
import { 
    Calendar, Clock, Layers, ArrowRight, 
    CircleCheck, CircleXmark, CircleInfo, CreditCard
} from "@gravity-ui/icons";

// --- CLIENT-SIDE COUNTDOWN ENGINE ---
function DynamicTimer({ departureDate, departureTime, status, onExpire }) {
    const [timeLeft, setTimeLeft] = useState("");
    const isRejected = status?.toLowerCase() === "rejected";

    useEffect(() => {
        if (isRejected) return;

        const checkTime = () => {
            const target = +new Date(`${departureDate} ${departureTime}`);
            const now = +new Date();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft("Expired / Departed");
                if (onExpire) onExpire();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            let str = "";
            if (days > 0) str += `${days}d `;
            setTimeLeft(`${str}${hours}h ${minutes}m ${seconds}s`);
        };

        checkTime();
        const interval = setInterval(checkTime, 1000);
        return () => clearInterval(interval);
    }, [departureDate, departureTime, isRejected]);

    if (isRejected) return null;

    return (
        <div className="bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl p-2 text-center my-2">
            <span className="text-[9px] font-bold text-[#2C2520]/40 uppercase tracking-widest block">Time Until Departure</span>
            <span className="text-xs font-black text-[#4A6761]">{timeLeft || "Calculating..."}</span>
        </div>
    );
}

// --- INTERACTIVE MATRIX CONTAINER ---
export default function BookedTicketsList({ initialBookings }) {
    const [expiredStatus, setExpiredStatus] = useState({});

    const bookings = initialBookings 

    const handleExpired = (id) => {
        setExpiredStatus(prev => ({ ...prev, [id]: true }));
    };

    // =========================================================================
    //  todo: STRIPE CHECKOUT INTEGRATION GAP
    // =========================================================================

    const statusStyles = {
        pending: "bg-amber-100 border-amber-200 text-amber-700",
        accepted: "bg-blue-100 border-blue-200 text-blue-700",
        rejected: "bg-red-100 border-red-200 text-red-700",
        paid: "bg-emerald-100 border-emerald-200 text-emerald-700"
    };

    return (
        <div className="w-full space-y-6">
            <div className="border-b border-[#DCD3C7] pb-4">
                <h1 className="text-2xl font-black text-[#2C2520] tracking-tight">My Booked Tickets</h1>
                <p className="text-xs text-[#2C2520]/60 font-medium mt-0.5">Monitor reservations, check vendor approval, and complete payments securely.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((item) => {
                    const ticket = item.ticketId || {};
                    const isCurrentExpired = expiredStatus[item._id] || (+new Date(`${ticket.departureDate} ${ticket.departureTime}`) <= +new Date());
                    const cleanedStatus = item.status?.toLowerCase();

                    return (
                        <div key={item._id} className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full">
                            
                            <div className="relative h-40 bg-[#2C2520]/10 shrink-0">
                                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                                <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border shadow-sm uppercase tracking-wide ${statusStyles[cleanedStatus] || "bg-gray-100"}`}>
                                    {cleanedStatus}
                                </span>
                            </div>

                            <div className="p-4 flex flex-col flex-1 gap-3">
                                <div>
                                    <h3 className="text-base font-extrabold text-[#2C2520] tracking-tight line-clamp-1">{ticket.title}</h3>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C2520]/70 mt-0.5">
                                        <span>{ticket.from}</span>
                                        <ArrowRight className="w-3 h-3 text-[#4A6761]" />
                                        <span>{ticket.to}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 border-y border-[#DCD3C7]/60 py-2 text-[11px] font-semibold text-[#2C2520]/70">
                                    <div className="flex items-center gap-1 truncate"><Calendar className="w-3.5 h-3.5 text-[#4A6761]"/> {ticket.departureDate}</div>
                                    <div className="flex items-center gap-1 truncate"><Clock className="w-3.5 h-3.5 text-[#4A6761]"/> {ticket.departureTime}</div>
                                </div>

                                <DynamicTimer 
                                    departureDate={ticket.departureDate} 
                                    departureTime={ticket.departureTime} 
                                    status={item.status}
                                    onExpire={() => handleExpired(item._id)} 
                                />

                                <div className="flex items-center justify-between pt-1 mt-auto">
                                    <div className="text-xs font-bold text-[#2C2520]/60 flex items-center gap-1">
                                        <Layers className="w-3.5 h-3.5 text-[#2C2520]/40"/> Booked: {item.quantity}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[9px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Total Price</span>
                                        <span className="text-base font-black text-[#4A6761]">${item.quantity * (ticket.price || 0)}</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-[#DCD3C7]/60 mt-2">
                                    {cleanedStatus === "pending" && (
                                        <div className="w-full bg-[#F4EFEA]/60 border border-[#DCD3C7]/60 rounded-xl py-2 px-3 text-[11px] font-bold text-[#2C2520]/50 text-center flex items-center justify-center gap-1.5">
                                            <CircleInfo className="w-3.5 h-3.5 text-amber-600"/> Awaiting vendor processing...
                                        </div>
                                    )}

                                    {cleanedStatus === "accepted" && (
                                        <button
                                            disabled={isCurrentExpired}
                                            onClick={() => triggerStripePayment(item)}
                                            className={`w-full py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                                                isCurrentExpired 
                                                ? "bg-[#2C2520]/5 text-[#2C2520]/30 border border-[#DCD3C7] cursor-not-allowed" 
                                                : "bg-[#4A6761] text-[#F4EFEA] hover:opacity-95 shadow-sm"
                                            }`}
                                        >
                                            <CreditCard className="w-4 h-4"/>
                                            {isCurrentExpired ? "Payment Blocked (Departure Passed)" : "Pay Now via Stripe"}
                                        </button>
                                    )}

                                    {cleanedStatus === "rejected" && (
                                        <div className="w-full bg-red-50 text-red-700 border border-red-100 rounded-xl py-2 px-3 text-[11px] font-bold text-center flex items-center justify-center gap-1.5">
                                            <CircleXmark className="w-3.5 h-3.5"/> Booking has been rejected by vendor
                                        </div>
                                    )}

                                    {cleanedStatus === "paid" && (
                                        <div className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl py-2 px-3 text-[11px] font-bold text-center flex items-center justify-center gap-1.5">
                                            <CircleCheck className="w-3.5 h-3.5"/> Payment verified • Seat Confirmed
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}