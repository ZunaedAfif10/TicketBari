"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { CircleCheck, ArrowLeft, Layers } from "@gravity-ui/icons";
import { updateTicket } from "@/lib/actions/ticket";

export default function VendorTicketUpdateForm({ initialTicket }) {
    const router = useRouter();
    const [ticket, setTicket] = useState(initialTicket || {
        title: "",
        from: "",
        to: "",
        transportType: "Bus",
        quantity: 0,
        price: 0,
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            const res = await updateTicket(initialTicket._id , ticket)
            // console.log(res)
            router.push('/dashboard/vendor/my-added-tickets')
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 text-[#2C2520] p-4 sm:p-6">
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-[#DCD3C7] pb-5">
                <div className="space-y-1">
                    <div 
                        onClick={() => router.push("/dashboard/vendor/my-tickets")}
                        className="flex items-center gap-2 text-xs font-bold text-[#2C2520]/60 hover:text-[#2C2520] cursor-pointer transition"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">Modify Ticket Profile</h1>
                    <p className="text-xs font-medium text-[#2C2520]/60">
                        Adjust logistics configurations, parameters, financial sizing, and allocation limits.
                    </p>
                </div>
                <Layers className="w-8 h-8 text-[#4A6761] hidden sm:block" />
            </div>

            {/* Form Sheet Card */}
            <form onSubmit={handleSubmit} className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 space-y-5 font-bold text-sm shadow-xs">
                
                {/* Title Input */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60">
                        Ticket Title / Registry Name
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={ticket.title}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-[#2C2520] font-bold focus:outline-none focus:border-[#4A6761] transition"
                    />
                </div>

                {/* Logistics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60">Origin / From</label>
                        <input
                            type="text"
                            name="from"
                            value={ticket.from}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-[#2C2520] font-bold focus:outline-none focus:border-[#4A6761] transition"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60">Destination / To</label>
                        <input
                            type="text"
                            name="to"
                            value={ticket.to}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-[#2C2520] font-bold focus:outline-none focus:border-[#4A6761] transition"
                        />
                    </div>
                </div>

                {/* Transport Mode Matrix */}
                <div className="space-y-1.5">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60">Transport Mode Matrix</label>
                    <select
                        name="transportType"
                        value={ticket.transportType}
                        onChange={handleChange}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-[#2C2520] font-bold focus:outline-none focus:border-[#4A6761] cursor-pointer transition appearance-none"
                    >
                        <option value="Bus">Bus Logistics</option>
                        <option value="Train">Train Logistics</option>
                        <option value="Flight">Airway Flight</option>
                    </select>
                </div>

                {/* Financial and Quantities Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60">Available Stock Units</label>
                        <input
                            type="number"
                            name="quantity"
                            min="0"
                            value={ticket.quantity}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-[#2C2520] font-mono font-bold focus:outline-none focus:border-[#4A6761] transition"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C2520]/60">Unit Pricing (USD)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-[#2C2520]/50">$</span>
                            <input
                                type="number"
                                name="price"
                                min="0"
                                step="0.01"
                                value={ticket.price}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#F4EFEA] border border-[#DCD3C7] rounded-xl pl-8 pr-4 py-2.5 text-[#2C2520] font-mono font-bold focus:outline-none focus:border-[#4A6761] transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Panel Wrapper */}
                <div className="pt-4 border-t border-[#DCD3C7]/60 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2.5 bg-[#4A6761] text-[#F4EFEA] hover:opacity-90 disabled:opacity-50 text-xs font-black uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-xs"
                    >
                        <CircleCheck className="w-4 h-4" /> 
                        {isSaving ? "Saving Updates..." : "Publish Amendments"}
                    </button>
                </div>
            </form>
        </div>
    );
}