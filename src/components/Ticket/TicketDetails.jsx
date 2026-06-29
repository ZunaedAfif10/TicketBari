"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Calendar, Clock, Ticket, Compass, Plane, ShieldCheck,
    ArrowRight, CircleCheck, CircleInfo, Layers, Xmark
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { createBooking } from "@/lib/actions/booking";

export default function TicketDetails({ ticket }) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState("");
    const [isPast, setIsPast] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingQty, setBookingQty] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Dynamic Icon Renderer
    const iconMap = {
        bus: <Ticket className="w-5 h-5 text-[#4A6761]" />,
        train: <Compass className="w-5 h-5 text-[#4A6761]" />,
        plane: <Plane className="w-5 h-5 text-[#4A6761]" />,
        launch: <ShieldCheck className="w-5 h-5 text-[#4A6761]" />,
    };

    // Calculate Departure Date/Time and build dynamic Countdown
    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetString = `${ticket.departureDate} ${ticket.departureTime}`;
            const difference = +new Date(targetString) - +new Date();

            if (difference <= 0) {
                setTimeLeft("Passed");
                setIsPast(true);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            let timeString = "";
            if (days > 0) timeString += `${days}d `;
            timeString += `${hours}h ${minutes}m ${seconds}s`;
            setTimeLeft(timeString);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [ticket]);

    // Check if Booking Button needs to be completely locked down
    const isBookDisabled = isPast || ticket.quantity <= 0;

    const { data: session } = authClient.useSession();

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (bookingQty > ticket.quantity) {
            setErrorMessage(`Booking quantity cannot be greater than ${ticket.quantity}.`);
            return;
        }
        if (bookingQty <= 0) {
            setErrorMessage("Please select at least 1 ticket.");
            return;
        }

        setIsSubmitting(true);
        try {
            const booking = {
                userId: session?.user?.id,
                userEmail: session?.user?.email,
                userName: session?.user?.name,
                ticketId: ticket._id,
                quantity: bookingQty,
                status: "Pending"
            };

            const res = await createBooking(booking);
            console.log("Server Action Response:", res);
            
            if (res && (res.acknowledged === true || res.insertedId)) {
                setIsModalOpen(false);
                // Redirect user instantly to their personal booked space
                router.push("/dashboard/user/booked-tickets");
            } else {
                setErrorMessage(res?.message || "Failed to process database booking.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Image View */}
            <div className="lg:col-span-7 bg-[#EAE3DA] p-3 border border-[#DCD3C7] rounded-2xl shadow-sm">
                <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-[#2C2520]/10">
                    <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Right: Explicit Information Pane */}
            <div className="lg:col-span-5 bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                    <span className="inline-flex items-center gap-1.5 bg-[#4A6761]/10 text-[#4A6761] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3">
                        {iconMap[ticket.transportType?.toLowerCase()] || iconMap.bus}
                        {ticket.transportType}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-[#2C2520] tracking-tight leading-tight">
                        {ticket.title}
                    </h1>
                </div>

                {/* Core Route Bar */}
                <div className="flex items-center gap-3 bg-[#F4EFEA] border border-[#DCD3C7]/80 rounded-xl p-3 text-sm font-bold text-[#2C2520]">
                    <span className="flex-1 text-center truncate">{ticket.from}</span>
                    <ArrowRight className="w-4 h-4 text-[#4A6761] shrink-0" />
                    <span className="flex-1 text-center truncate">{ticket.to}</span>
                </div>

                {/* Time Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 border-y border-[#DCD3C7] py-4 text-xs sm:text-sm text-[#2C2520]/80">
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
                        <p className="font-bold truncate">{ticket.departureDate}</p>
                    </div>
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Time</span>
                        <p className="font-bold truncate">{ticket.departureTime}</p>
                    </div>
                </div>

                {/* Live CountDown Timer Banner */}
                <div className="bg-[#4A6761]/5 border border-[#4A6761]/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] font-bold tracking-widest text-[#4A6761] uppercase mb-1">Time Left Until Departure</span>
                    <span className={`text-lg sm:text-xl font-black tracking-tight ${isPast ? 'text-red-600' : 'text-[#2C2520]'}`}>
                        {timeLeft || "Calculating..."}
                    </span>
                </div>

                {/* Availability and Price Parameter Cards */}
                <div className="flex items-center justify-between bg-[#F4EFEA]/40 border border-[#DCD3C7]/60 rounded-xl p-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C2520]/40 flex items-center gap-1"><Layers className="w-3 h-3" /> Available Seats</span>
                        <p className={`font-extrabold ${ticket.quantity === 0 ? "text-red-600" : "text-[#2C2520]"}`}>
                            {ticket.quantity === 0 ? "Sold Out" : `${ticket.quantity} Units Left`}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C2520]/40">Price Per Unit</span>
                        <p className="text-2xl font-black text-[#4A6761]">${ticket.price}</p>
                    </div>
                </div>

                {/* Perks Layout Window */}
                {ticket.perks && ticket.perks.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-[11px] font-bold text-[#2C2520]/50 uppercase tracking-wider">Journey Perks</h4>
                        <div className="flex flex-wrap gap-2">
                            {ticket.perks.map((perk, index) => (
                                <span key={index} className="inline-flex items-center gap-1.5 bg-[#4A6761]/5 border border-[#4A6761]/20 rounded-lg px-3 py-1 text-xs font-bold text-[#4A6761]">
                                    <CircleCheck className="w-3 h-3" /> {perk}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Trigger Element */}
                <button
                    disabled={isBookDisabled}
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full py-3.5 rounded-xl text-base font-extrabold shadow-sm transition tracking-wide ${isBookDisabled
                        ? "bg-[#2C2520]/10 text-[#2C2520]/30 cursor-not-allowed border border-[#DCD3C7]"
                        : "bg-[#4A6761] text-[#F4EFEA] hover:opacity-95"
                        }`}
                >
                    {isPast ? "Departure Time Passed" : ticket.quantity === 0 ? "Sold Out" : "Book Tickets Now"}
                </button>
            </div>

            {/* --- BOOKING DISPATCH MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-[#2C2520]/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#F4EFEA] border border-[#DCD3C7] rounded-2xl p-6 w-full max-w-md shadow-xl animate-fade-in text-[#2C2520] relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 text-[#2C2520]/60 hover:text-[#2C2520]"
                        >
                            <Xmark className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-black tracking-tight mb-1">Confirm Booking Space</h3>
                        <p className="text-xs font-medium text-[#2C2520]/60 mb-4">{ticket.title}</p>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/70">Desired Ticket Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={ticket.quantity}
                                    value={bookingQty}
                                    onChange={(e) => setBookingQty(parseInt(e.target.value) || 0)}
                                    className="w-full bg-[#EAE3DA] border border-[#DCD3C7] focus:border-[#4A6761] rounded-xl px-4 py-3 font-semibold focus:outline-none transition"
                                    required
                                />
                                <div className="flex justify-between items-center text-[11px] text-[#2C2520]/50 font-bold px-1 pt-0.5">
                                    <span>Max allowed: {ticket.quantity}</span>
                                    <span>Total Price: ${bookingQty * ticket.price}</span>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-xs font-bold text-red-600 flex items-center gap-2">
                                    <CircleInfo className="w-4 h-4 shrink-0" /> {errorMessage}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-[#EAE3DA] hover:bg-[#DCD3C7] text-[#2C2520] font-bold py-3 rounded-xl transition text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-[#4A6761] hover:opacity-95 text-[#F4EFEA] font-bold py-3 rounded-xl transition text-sm disabled:opacity-50"
                                >
                                    {isSubmitting ? "Processing..." : "Confirm & Request"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}