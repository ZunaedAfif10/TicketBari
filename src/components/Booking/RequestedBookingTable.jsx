"use client";

import React from "react";
import { CircleCheck, CircleXmark, Shield } from "@gravity-ui/icons";
import { updateBooking } from "@/lib/actions/booking";

export default function RequestedBookingsTable({ bookings }) {

    const handleApprove = async (bookingId) => {
        const result = await updateBooking(bookingId, { status: 'approved' })
    };

    const handleReject = async (bookingId) => {
        const result = await updateBooking(bookingId, { status: 'rejected' })
    };

    return (
        <div className="space-y-6 text-[#2C2520]">
            <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-1">Requested Bookings</h1>
                <p className="text-xs font-medium text-[#2C2520]/60">
                    Review and dispatch authorization changes on inbound consumer ticket inventory allocations.
                </p>
            </div>

            {!bookings || bookings.length === 0 ? (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-12 text-center text-[#2C2520]/60 font-bold text-sm space-y-4">
                    <Shield className="w-8 h-8 text-[#4A6761] mx-auto block" />
                    <p>No pending consumer booking space parameters await resolution at this window context.</p>
                </div>
            ) : (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[850px]">
                            <thead>
                                <tr className="bg-[#2C2520]/5 border-b border-[#DCD3C7] text-[10px] font-black uppercase tracking-wider text-[#2C2520]/50">
                                    <th className="p-4 w-[25%]">User / Account Identifier</th>
                                    <th className="p-4 w-[25%]">Ticket Registry Title</th>
                                    <th className="p-4 w-[15%] text-center">Allocated Qty</th>
                                    <th className="p-4 w-[15%] text-right">Total Financial Parameter</th>
                                    <th className="p-4 w-[20%] text-center">Status / Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCD3C7]/60 font-bold">
                                {bookings.map((booking) => {
                                    const ticketPrice = Number(booking.ticketId?.price || 0);
                                    const requestedQty = Number(booking.quantity || 0);
                                    const totalPrice = ticketPrice * requestedQty;
                                    const statusLower = booking.status?.toLowerCase();

                                    return (
                                        <tr key={booking._id} className="hover:bg-[#F4EFEA]/40 transition">
                                            {/* User Details */}
                                            <td className="p-4 space-y-0.5 max-w-[200px] truncate">
                                                <span className="block font-black text-[#2C2520] truncate">
                                                    {booking.userName || "Unknown Client"}
                                                </span>
                                                <span className="block text-[11px] text-[#2C2520]/50 font-medium font-mono truncate">
                                                    {booking.userEmail}
                                                </span>
                                            </td>

                                            {/* Ticket Title */}
                                            <td className="p-4 font-extrabold text-[#2C2520] max-w-[220px] truncate">
                                                {booking.ticketId?.title || "Unknown System Asset"}
                                            </td>

                                            {/* Quantity */}
                                            <td className="p-4 text-center font-mono text-[#2C2520]/80 whitespace-nowrap">
                                                {requestedQty} units
                                            </td>

                                            {/* Financial Metrics */}
                                            <td className="p-4 text-right text-base font-black text-[#4A6761] font-mono whitespace-nowrap">
                                                ${totalPrice.toFixed(2)}{" "}
                                                <span className="text-[9px] font-normal text-[#2C2520]/50">USD</span>
                                            </td>

                                            {/* Dynamic Conditional Status/Actions Column */}
                                            <td className="p-4 text-center">
                                                {statusLower === "approved" || statusLower === "paid" ? (
                                                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide">
                                                        <CircleCheck className="w-3.5 h-3.5" /> Approved
                                                    </span>
                                                ) : statusLower === "rejected" ? (
                                                    <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide">
                                                        <CircleXmark className="w-3.5 h-3.5" /> Rejected
                                                    </span>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleApprove(booking._id)}
                                                            className="px-3 py-1.5 whitespace-nowrap bg-[#4A6761] text-[#F4EFEA] hover:opacity-90 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs shrink-0"
                                                        >
                                                            <CircleCheck className="w-3.5 h-3.5" /> Accept
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleReject(booking._id)}
                                                            className="px-3 py-1.5 whitespace-nowrap bg-red-800 text-red-50 hover:bg-red-900 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs shrink-0"
                                                        >
                                                            <CircleXmark className="w-3.5 h-3.5" /> Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}