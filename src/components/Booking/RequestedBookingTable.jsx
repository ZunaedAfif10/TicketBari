"use client";

import React, { useState } from "react";
import { CircleCheck, CircleXmark, CircleInfo, Shield } from "@gravity-ui/icons";

export default function RequestedBookingsTable({ bookings: initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings || []);
    const [actionMessage, setActionMessage] = useState({ type: "", text: "" });
    const [processingId, setProcessingId] = useState(null);

    // ✅ Events are now completely self-contained within the client component
    const handleAction = async (bookingId, actionType) => {
        setProcessingId(bookingId);
        setActionMessage({ type: "", text: "" });

        const targetStatus = actionType === "accept" ? "Approved" : "Rejected";

        try {
            const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: targetStatus }),
            });

            if (res.ok) {
                // Instantly filter out the managed booking from UI loop state array
                setBookings((prev) => prev.filter((b) => b._id !== bookingId));
                setActionMessage({
                    type: "success",
                    text: `Booking request successfully ${actionType === "accept" ? "approved" : "rejected"}.`,
                });
            } else {
                throw new Error("Backend failed to accept update payload.");
            }
        } catch (err) {
            setActionMessage({
                type: "error",
                text: "Failed to dispatch request modifications. Please try again.",
            });
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="space-y-6 text-[#2C2520]">
            <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-1">Requested Bookings</h1>
                <p className="text-xs font-medium text-[#2C2520]/60">
                    Review and dispatch authorization changes on inbound consumer ticket inventory allocations.
                </p>
            </div>

            {/* Action Alert Strip */}
            {actionMessage.text && (
                <div
                    className={`p-3.5 border rounded-xl text-xs font-bold flex items-center gap-2 ${
                        actionMessage.type === "success"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-red-50 border-red-200 text-red-800"
                    }`}
                >
                    {actionMessage.type === "success" ? <CircleCheck className="w-4 h-4" /> : <CircleInfo className="w-4 h-4" />}
                    {actionMessage.text}
                </div>
            )}

            {bookings.length === 0 ? (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-12 text-center text-[#2C2520]/60 font-bold text-sm space-y-4">
                    <Shield className="w-8 h-8 text-[#4A6761] mx-auto block" />
                    <p>No pending consumer booking space parameters await resolution at this window context.</p>
                </div>
            ) : (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-[#2C2520]/5 border-b border-[#DCD3C7] text-[10px] font-black uppercase tracking-wider text-[#2C2520]/50">
                                    <th className="p-4">User / Account Identifier</th>
                                    <th className="p-4">Ticket Registry Title</th>
                                    <th className="p-4 text-center">Allocated Qty</th>
                                    <th className="p-4 text-right">Total Financial Parameter</th>
                                    <th className="p-4 text-center">Management Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCD3C7]/60 font-bold">
                                {bookings.map((booking) => {
                                    const ticketPrice = Number(booking.ticketId?.price || 0);
                                    const requestedQty = Number(booking.quantity || 0);
                                    const totalPrice = ticketPrice * requestedQty;

                                    return (
                                        <tr key={booking._id} className="hover:bg-[#F4EFEA]/40 transition">
                                            <td className="p-4 space-y-0.5 max-w-[200px] truncate">
                                                <span className="block font-black text-[#2C2520]">
                                                    {booking.userId?.name || "Anonymous Traveller"}
                                                </span>
                                                <span className="block text-[11px] text-[#2C2520]/50 font-medium font-mono truncate">
                                                    {booking.userId?.email || "No registry email"}
                                                </span>
                                            </td>

                                            <td className="p-4 font-extrabold text-[#2C2520] max-w-[220px] truncate">
                                                {booking.ticketId?.title || "Unknown System Asset"}
                                            </td>

                                            <td className="p-4 text-center font-mono text-[#2C2520]/80">
                                                {requestedQty} units
                                            </td>

                                            <td className="p-4 text-right text-base font-black text-[#4A6761] font-mono">
                                                ${totalPrice.toFixed(2)}{" "}
                                                <span className="text-[9px] font-normal text-[#2C2520]/50">USD</span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2.5">
                                                    <button
                                                        type="button"
                                                        disabled={processingId !== null}
                                                        onClick={() => handleAction(booking._id, "accept")}
                                                        className="px-3 py-1.5 bg-[#4A6761] text-[#F4EFEA] hover:bg-[#3e5651] disabled:opacity-40 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleCheck className="w-3.5 h-3.5" /> Accept
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={processingId !== null}
                                                        onClick={() => handleAction(booking._id, "reject")}
                                                        className="px-3 py-1.5 bg-red-800 text-red-50 hover:bg-red-900 disabled:opacity-40 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleXmark className="w-3.5 h-3.5" /> Reject
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
            )}
        </div>
    );
}