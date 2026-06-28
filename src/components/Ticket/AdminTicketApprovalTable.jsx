"use client";

import React from "react";
import { CircleCheck, CircleXmark, Layers } from "@gravity-ui/icons";

export default function AdminTicketApprovalTable({ tickets }) {
    
    const handleApprove = async (ticketId) => {
        // 📝 YOUR CODE HERE FOR APPROVE FUNCTION (e.g., fetch patch status to "Approved")
        console.log("Approving ticket ID:", ticketId);
    };

    const handleReject = async (ticketId) => {
        // 📝 YOUR CODE HERE FOR REJECT FUNCTION (e.g., fetch patch status to "Rejected")
        console.log("Rejecting ticket ID:", ticketId);
    };

    return (
        <div className="space-y-6 text-[#2C2520]">
            <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-1">Ticket Moderation Desk</h1>
                <p className="text-xs font-medium text-[#2C2520]/60">
                    Review incoming vendor ticket applications and authorize catalog placement.
                </p>
            </div>

            {!tickets || tickets.length === 0 ? (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-12 text-center text-[#2C2520]/60 font-bold text-sm space-y-4">
                    <Layers className="w-8 h-8 text-[#4A6761] mx-auto block" />
                    <p>No ticket registries available in the system tier context.</p>
                </div>
            ) : (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-[#2C2520]/5 border-b border-[#DCD3C7] text-[10px] font-black uppercase tracking-wider text-[#2C2520]/50">
                                    <th className="p-4">Route Info / Title</th>
                                    <th className="p-4">Transport Mode</th>
                                    <th className="p-4 text-center">Available Stock</th>
                                    <th className="p-4 text-right">Unit Pricing</th>
                                    <th className="p-4">Vendor Origins</th>
                                    <th className="p-4 text-center">Status / Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCD3C7]/60 font-bold">
                                {tickets.map((ticket) => (
                                    <tr key={ticket._id} className="hover:bg-[#F4EFEA]/40 transition">
                                        <td className="p-4 space-y-1 max-w-[220px]">
                                            <span className="block font-black text-[#2C2520] truncate">{ticket.title}</span>
                                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2C2520]/60 bg-[#2C2520]/5 px-2 py-0.5 rounded">
                                                {ticket.from} → {ticket.to}
                                            </span>
                                        </td>

                                        <td className="p-4 text-[#2C2520]/80">
                                            <span className="bg-[#4A6761]/10 text-[#4A6761] px-2 py-1 rounded text-xs uppercase font-extrabold">
                                                {ticket.transportType}
                                            </span>
                                        </td>

                                        <td className="p-4 text-center font-mono text-[#2C2520]/80">
                                            {ticket.quantity} units
                                        </td>

                                        <td className="p-4 text-right text-base font-black text-[#4A6761] font-mono">
                                            ${Number(ticket.price).toFixed(2)}
                                        </td>

                                        <td className="p-4 space-y-0.5 max-w-[180px] truncate">
                                            <span className="block text-[#2C2520] font-bold">{ticket.vendorName}</span>
                                            <span className="block text-[11px] text-[#2C2520]/50 font-medium truncate">{ticket.vendorEmail}</span>
                                        </td>

                                        {/* Dynamic Conditional Status Column */}
                                        <td className="p-4 text-center">
                                            {ticket.status?.toLowerCase() === "approved" ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide">
                                                    <CircleCheck className="w-3.5 h-3.5" /> Approved
                                                </span>
                                            ) : ticket.status?.toLowerCase() === "rejected" ? (
                                                <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide">
                                                    <CircleXmark className="w-3.5 h-3.5" /> Rejected
                                                </span>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleApprove(ticket._id)}
                                                        className="px-3 py-1.5 bg-[#4A6761] text-[#F4EFEA] hover:opacity-90 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleCheck className="w-3.5 h-3.5" /> Approve
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReject(ticket._id)}
                                                        className="px-3 py-1.5 bg-red-800 text-red-50 hover:bg-red-900 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleXmark className="w-3.5 h-3.5" /> Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}