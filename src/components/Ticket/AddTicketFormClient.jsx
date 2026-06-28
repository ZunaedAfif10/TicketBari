"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { 
    Text, Compass, Ticket, Layers, 
    Calendar, CircleCheck, CircleInfoFill, Link
} from "@gravity-ui/icons";

export default function AddTicketFormClient() {
    const router = useRouter();
    const { data: session } = useSession();

    // 1. STATE CONFIGURATIONS
    const [title, setTitle] = useState("");
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [transportType, setTransportType] = useState("Bus");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [departureDate, setDepartureDate] = useState(""); // Formats automatically to YYYY-MM-DD
    const [departureTime, setDepartureTime] = useState(""); // Formats automatically to HH:MM (24h)
    const [selectedPerks, setSelectedPerks] = useState([]);
    const [imageUrl, setImageUrl] = useState(""); 
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

    // Available modular perks choices matrix
    const AVAILABLE_PERKS = ["Air Conditioned (AC)", "Complimentary Breakfast", "WiFi Access", "USB Charging Ports", "Water Bottle Provided", "Reclining Seats"];

    // 2. INPUT CONTROL HANDLERS
    const handlePerkChange = (perk) => {
        setSelectedPerks(prev => 
            prev.includes(perk) ? prev.filter(p => p !== perk) : [...prev, perk]
        );
    };

    // 3. CORE SUBMISSION ARCHITECTURE
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage({ type: "", text: "" });

        try {
            const finalImageUrl = imageUrl.trim() || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600";

            // Format dynamic schema matching requirements
            const ticketPayload = {
                title,
                from: fromLocation,
                to: toLocation,
                transportType,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                departureDate, // e.g., "2026-06-28"
                departureTime, // e.g., "21:30"
                perks: selectedPerks,
                image: finalImageUrl,
                vendorName: session?.user?.name || "Authenticated Vendor",
                vendorEmail: session?.user?.email || "vendor@example.com",
                status: "pending" 
            };

            // ====================================================================
            // POST PAYLOAD TO YOUR EXPRESS DATABASE DISPATCH API ENDPOINT
            const response = await fetch('http://localhost:5000/api/tickets', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(ticketPayload)
            });
            // ====================================================================

            if (!response.ok) {
                throw new Error("Server rejected request stream network pipe.");
            }

            console.log("Ticket Payload dispatched successfully:", ticketPayload);
            setStatusMessage({ type: "success", text: "Journey asset created! Awaiting platform verification." });
            
            // setTimeout(() => {
            //     router.push("/dashboard/vendor/my-tickets");
            // }, 2000);

        } catch (error) {
            setStatusMessage({ type: "error", text: "Submission pipeline failed. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 shadow-sm space-y-6 text-[#2C2520]">
            
            {/* 1. Vendor Readonly Context Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F4EFEA]/60 border border-[#DCD3C7]/60 rounded-xl p-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Vendor Provider Name</label>
                    <input 
                        type="text" 
                        readOnly 
                        value={session?.user?.name || "Loading Vendor Context..."} 
                        className="w-full bg-[#2C2520]/5 text-[#2C2520]/60 border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-not-allowed"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Vendor Profile Email</label>
                    <input 
                        type="email" 
                        readOnly 
                        value={session?.user?.email || "loading@vendor.com"} 
                        className="w-full bg-[#2C2520]/5 text-[#2C2520]/60 border border-[#DCD3C7] rounded-xl px-4 py-2.5 text-sm font-bold outline-none cursor-not-allowed"
                    />
                </div>
            </div>

            {/* 2. Core Operational Parameters */}
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1"><Text className="w-3.5 h-3.5 text-[#4A6761]"/> Ticket/Journey Title</label>
                <input 
                    type="text"
                    required
                    placeholder="e.g., Green Line Scenic Scania Business Class"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition"
                />
            </div>

            {/* 3. Node Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-[#4A6761]"/> From (Origin Location)</label>
                    <input 
                        type="text" required placeholder="Dhaka" value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-[#4A6761]"/> To (Destination Target)</label>
                    <input 
                        type="text" required placeholder="Cox's Bazar" value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1"><Ticket className="w-3.5 h-3.5 text-[#4A6761]"/> Transport Modality</label>
                    <select 
                        value={transportType}
                        onChange={(e) => setTransportType(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition cursor-pointer"
                    >
                        <option value="Bus">Bus Fleet</option>
                        <option value="Train">Railway Link</option>
                        <option value="Plane">Aviation Line</option>
                        <option value="Launch">Waterway Cruiser</option>
                    </select>
                </div>
            </div>

            {/* 4. Numeric Configuration Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1">Price (USD per unit seat)</label>
                    <input 
                        type="number" min="1" required placeholder="25" value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-[#4A6761]"/> Allotted Allocation Quantity</label>
                    <input 
                        type="number" min="1" required placeholder="14" value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition"
                    />
                </div>
            </div>

            {/* 5. Scheduling Calendar / Time Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#4A6761]"/> Select Departure Date
                    </label>
                    <input 
                        type="date" 
                        required 
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition cursor-pointer"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1">
                        Select Departure Time
                    </label>
                    <input 
                        type="time" 
                        required 
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition cursor-pointer"
                    />
                </div>
            </div>

            {/* 6. Perks Checkbox Array Matrix Container */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 block">Select Journey Perks & Amenities</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 bg-[#F4EFEA]/40 border border-[#DCD3C7]/60 rounded-xl p-4">
                    {AVAILABLE_PERKS.map((perk, index) => (
                        <label key={index} className="flex items-center gap-2.5 text-xs font-bold text-[#2C2520]/80 cursor-pointer selection:bg-none">
                            <input 
                                type="checkbox"
                                checked={selectedPerks.includes(perk)}
                                onChange={() => handlePerkChange(perk)}
                                className="w-4 h-4 rounded text-[#4A6761] focus:ring-[#4A6761] bg-[#F4EFEA] border-[#DCD3C7] cursor-pointer"
                            />
                            <span>{perk}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 7. Image Field Input (Direct Text URL Configuration) */}
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 flex items-center gap-1">
                    <Link className="w-3.5 h-3.5 text-[#4A6761]" /> Asset Image URL
                </label>
                <div className="flex flex-col lg:flex-row gap-4 items-stretch bg-[#F4EFEA]/40 border border-[#DCD3C7]/60 rounded-xl p-4">
                    <div className="flex-1 flex flex-col justify-center space-y-2">
                        <input 
                            type="url" 
                            placeholder="https://example.com/bus-image.jpg" 
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-[#F4EFEA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition"
                        />
                        <p className="text-[11px] text-[#2C2520]/50 font-medium">
                            Provide a direct absolute image reference link path hosting the media thumbnail asset.
                        </p>
                    </div>
                    
                    {/* Interactive Live Image Preview Window */}
                    <div className="w-full lg:w-48 h-28 bg-[#2C2520]/5 rounded-xl border border-dashed border-[#DCD3C7] overflow-hidden flex items-center justify-center shrink-0">
                        {imageUrl.trim() ? (
                            <img 
                                src={imageUrl} 
                                alt="Live URL Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600";
                                }}
                            />
                        ) : (
                            <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider">No Link Input</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Feedback Alert Strip */}
            {statusMessage.text && (
                <div className={`p-3.5 border rounded-xl text-xs font-bold flex items-center gap-2 ${
                    statusMessage.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
                }`}>
                    {statusMessage.type === "success" ? <CircleCheck className="w-4 h-4"/> : <CircleInfoFill className="w-4 h-4"/>}
                    {statusMessage.text}
                </div>
            )}

            {/* 8. Action Trigger Input element */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#4A6761] text-[#F4EFEA] font-extrabold rounded-xl transition tracking-wide text-sm shadow-sm hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? "Saving Data..." : "Add Ticket"}
            </button>
        </form>
    );
}