"use client";

import React, { useState } from "react";
import { Ticket, ArrowRight, Check, Xmark } from "@gravity-ui/icons";
import { updateAdvertise } from "@/lib/actions/advertise";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminTicketsTable({ initialTickets }) {
    // Initialize state with your actual approved tickets array
    const [tickets, setTickets] = useState(initialTickets || []);

    const advertisedCount = tickets.filter(
        ticket => ticket.isAdvertised === true || ticket.isAdvertised === "true"
    ).length;

    const handleToggleAdvertise = async (ticketId, currentAdvertiseStatus) => {
        const isCurrentlyAdvertised = currentAdvertiseStatus === true || currentAdvertiseStatus === "true";

        // CRITICAL CHECK: Block advertising if already at the maximum threshold of 6
        if (!isCurrentlyAdvertised && advertisedCount >= 6) {
            toast.error("Action Denied: You cannot advertise more than 6 tickets simultaneously!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        const nextAdvertiseState = !isCurrentlyAdvertised;

        // Directly map and update state without any heavy try-catch wrapping
        setTickets(prevTickets =>
            prevTickets.map(ticket => {
                if (ticket._id === ticketId) {
                    // Toggle status (saving it matching your data structure format)
                    return { ...ticket, isAdvertised: nextAdvertiseState };
                }
                return ticket;
            })
        );
        
        const res = await updateAdvertise(ticketId, { isAdvertised: nextAdvertiseState });
        console.log(res);
    };

    return (
        <div className="space-y-4">
            {/* React Toastify Core Container element wrapper */}
            <ToastContainer />

            {/* Visual Counter Widget */}
            <div className="flex justify-between items-center bg-[#F4EFEA] border border-[#DCD3C7] px-4 py-2 rounded-xl">
                <div>
                    <h2 className="text-sm font-black text-[#2C2520]">Approved Registry</h2>
                    <p className="text-[11px] font-medium text-[#2C2520]/60">Live feed items pushing to home display slots.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C2520]/50">Active Featured Ads:</span>
                    <div className="flex items-center gap-1">
                        <span className={`text-sm font-black ${advertisedCount >= 6 ? "text-amber-600" : "text-[#4A6761]"}`}>
                            {advertisedCount}
                        </span>
                        <span className="text-xs font-bold text-[#2C2520]/30">/</span>
                        <span className="text-xs font-bold text-[#2C2520]/60">6 Max</span>
                    </div>
                </div>
            </div>

            {/* Tabular Layout */}
            <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F4EFEA]/80 border-b border-[#DCD3C7] text-[10px] font-bold uppercase tracking-wider text-[#2C2520]/50">
                                <th className="px-6 py-4">Journey Identity</th>
                                <th className="px-6 py-4">Modality</th>
                                <th className="px-6 py-4">Routing</th>
                                <th className="px-6 py-4">Unit Pricing</th>
                                <th className="px-6 py-4 text-right">Ad Promotion State</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DCD3C7]/60 text-sm font-semibold">
                            {tickets.map((ticket) => {
                                const isLive = ticket.isAdvertised === true || ticket.isAdvertised === "true";

                                return (
                                    <tr key={ticket._id} className="hover:bg-[#F4EFEA]/30 transition-colors">
                                        {/* Journey Identity Section */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#4A6761]/10 border border-[#4A6761]/20 flex items-center justify-center text-[#4A6761]">
                                                    <Ticket className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-[#2C2520]">{ticket.title}</span>
                                                    <span className="block text-[10px] text-[#2C2520]/40 font-medium tracking-wider">
                                                        Vendor: {ticket.vendorName}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Modality */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#F4EFEA] border border-[#DCD3C7] text-[#2C2520]/80">
                                                {ticket.transportType}
                                            </span>
                                        </td>

                                        {/* Routing Details */}
                                        <td className="px-6 py-4 text-[#2C2520]/80">
                                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase">
                                                <span>{ticket.from}</span>
                                                <ArrowRight className="w-3 h-3 text-[#4A6761]/60" />
                                                <span>{ticket.to}</span>
                                            </div>
                                        </td>

                                        {/* Pricing */}
                                        <td className="px-6 py-4 font-extrabold text-[#2C2520]">
                                            ${Number(ticket.price).toFixed(2)}
                                        </td>

                                        {/* Ad Promotion Action */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                                                    isLive 
                                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                                                        : "bg-[#2C2520]/5 text-[#2C2520]/40 border border-[#DCD3C7]"
                                                }`}>
                                                    {isLive ? "Live Featured" : "Inactive"}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)}
                                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                        isLive ? "bg-[#4A6761]" : "bg-[#2C2520]/20"
                                                    }`}
                                                >
                                                    <span
                                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#F4EFEA] shadow transition duration-200 ease-in-out flex items-center justify-center ${
                                                            isLive ? "translate-x-5" : "translate-x-0"
                                                        }`}
                                                    >
                                                        {isLive ? (
                                                            <Check className="w-3 h-3 text-[#4A6761]" />
                                                        ) : (
                                                            <Xmark className="w-3 h-3 text-[#2C2520]/40" />
                                                        )}
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}