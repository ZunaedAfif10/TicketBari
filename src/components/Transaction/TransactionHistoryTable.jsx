"use client";

import React from "react";
import { CreditCard, Calendar, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function TransactionHistoryTable({ transactions = [] }) {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(Number(amount));
    };

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="w-full space-y-6">
            {/* Header Matrix Block */}
            <div className="border-b border-[#DCD3C7] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#2C2520] tracking-tight">Transaction History</h1>
                    <p className="text-xs text-[#2C2520]/60 font-medium mt-0.5">
                        Review statements, transaction logs, and secure payment receipts verified by Stripe.
                    </p>
                </div>
                
                <div className="bg-[#4A6761]/10 border border-[#4A6761]/20 rounded-xl px-4 py-2 flex items-center gap-2 self-start sm:self-center">
                    <ShieldCheck className="w-4 h-4 text-[#4A6761]" />
                    <span className="text-xs font-bold text-[#4A6761]">
                        Total Logs: {transactions.length} Verified
                    </span>
                </div>
            </div>

            {/* Table Core Container Block */}
            <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl shadow-sm overflow-hidden">
                {transactions.length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                        <div className="w-12 h-12 bg-[#2C2520]/5 rounded-xl flex items-center justify-center mx-auto text-[#2C2520]/40">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="space-y-0.5">
                            <h3 className="text-sm font-black text-[#2C2520]">No payment activity recorded</h3>
                            <p className="text-xs text-[#2C2520]/50 font-medium max-w-xs mx-auto">
                                Once you finalize any active vendor approved bookings, your official statement history logs will populate here.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F4EFEA] border-b border-[#DCD3C7] text-[10px] font-bold text-[#2C2520]/50 uppercase tracking-wider">
                                    <th className="py-3.5 px-5">Ticket Title</th>
                                    <th className="py-3.5 px-5">Transaction ID</th>
                                    <th className="py-3.5 px-5">Payment Date</th>
                                    <th className="py-3.5 px-5 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCD3C7]/60 text-xs text-[#2C2520]/80">
                                {transactions.map((tx) => (
                                    <tr 
                                        key={tx._id} 
                                        className="hover:bg-[#F4EFEA]/40 transition-colors group"
                                    >
                                        {/* Ticket Title Cell */}
                                        <td className="py-4 px-5 font-black text-[#2C2520]">
                                            <span className="capitalize">{tx.ticketTitle || "Transit Pass"}</span>
                                        </td>
                                        
                                        {/* Transaction ID Cell */}
                                        <td className="py-4 px-5 font-mono font-medium text-[#2C2520]/70">
                                            <span className="bg-[#F4EFEA] border border-[#DCD3C7]/60 px-2 py-0.5 rounded text-[11px] select-all">
                                                {tx.transactionId}
                                            </span>
                                        </td>

                                        {/* Payment Date Cell */}
                                        <td className="py-4 px-5 font-semibold text-[#2C2520]/60">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-[#4A6761]/60" />
                                                <span>{formatDate(tx.paidAt)}</span>
                                            </div>
                                        </td>

                                        {/* Amount Cell */}
                                        <td className="py-4 px-5 text-right font-black text-[#4A6761] text-sm">
                                            <div className="flex items-center justify-end gap-1">
                                                <span>{formatCurrency(tx.amount)}</span>
                                                <ArrowUpRight className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}