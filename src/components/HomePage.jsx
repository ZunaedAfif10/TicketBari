import Link from "next/link";
import {
    ArrowRight,
    Ticket,
    Compass,
    ShieldCheck,
    Plane,
} from "@gravity-ui/icons";

export default function HomePage({ advertisedTickets = [], latestTickets = [] }) {
    return (
        <div className="space-y-12 md:space-y-16 pb-12 w-full overflow-hidden">

            {/* --- HERO / BANNER SECTION --- */}
            <section
                className="relative rounded-2xl overflow-hidden bg-cover bg-center min-h-[420px] md:h-[500px] flex items-center shadow-sm border border-[#DCD3C7]"
                style={{
                    backgroundImage: `linear-gradient(rgba(44, 37, 32, 0.65), rgba(44, 37, 32, 0.45)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop')`,
                }}
            >
                <div className="relative z-10 px-6 sm:px-10 md:px-12 py-8 max-w-2xl text-white">
                    <span className="inline-block bg-[#4A6761] text-[#F4EFEA] text-[10px] md:text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full">
                        Welcome to TicketBari
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight leading-tight text-[#F4EFEA]">
                        Your Ultimate Gateway to Seamless Travel
                    </h1>
                    <p className="text-[#EAE3DA] text-sm sm:text-base md:text-lg font-medium mb-6 max-w-xl">
                        Discover, compare, and instantly book travel tickets for Buses,
                        Trains, Launches, and Flights all across the country.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a
                            href="#featured-ads"
                            className="bg-[#4A6761] hover:bg-[#4A6761]/90 text-[#F4EFEA] px-5 py-3 rounded-lg font-bold transition shadow-sm flex items-center justify-center space-x-2 text-sm md:text-base"
                        >
                            <span>Book Tickets Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link
                            href="/tickets"
                            className="bg-[#EAE3DA] hover:bg-[#DCD3C7] text-[#2C2520] px-5 py-3 rounded-lg font-bold transition shadow-sm text-center text-sm md:text-base"
                        >
                            Explore Routes
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- ADVERTISEMENT SECTION (MAX 6 ADMIN FEEDS) --- */}
            <section id="featured-ads" className="scroll-mt-12">
                <div className="mb-6 px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A6761]">Promoted Promos</span>
                    <h2 className="text-2xl md:text-3xl font-black text-[#2C2520] mt-0.5 tracking-tight">Featured Offers</h2>
                </div>

                {advertisedTickets.length === 0 ? (
                    <div className="text-center py-8 bg-[#EAE3DA]/40 border border-dashed border-[#DCD3C7] rounded-xl text-xs font-bold text-[#2C2520]/50">
                        No active advertisements currently running.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {advertisedTickets.slice(0, 6).map((ticket) => (
                            <div key={ticket._id} className="bg-[#EAE3DA] border-2 border-[#4A6761]/30 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between transition hover:shadow-md duration-200 relative">
                                <div className="absolute top-3 right-3 z-10 bg-[#4A6761] text-[#F4EFEA] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm animate-pulse">
                                    Featured Ad
                                </div>
                                <div>
                                    <div className="h-44 w-full bg-[#2C2520] overflow-hidden">
                                        <img src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"} alt={ticket.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase bg-[#F4EFEA] border border-[#DCD3C7] px-2 py-0.5 rounded text-[#2C2520]/80">{ticket.transportType}</span>
                                            <span className="text-xs font-bold text-[#2C2520]/60">Qty: {ticket.quantity || ticket.availableSeats || 0} left</span>
                                        </div>
                                        <h3 className="font-black text-[#2C2520] text-base line-clamp-1">{ticket.title}</h3>
                                        <p className="text-[11px] text-[#2C2520]/60 font-medium line-clamp-2">Perks: {ticket.perks || "Standard Amenities Provided"}</p>
                                    </div>
                                </div>
                                <div className="p-4 pt-0 mt-2 border-t border-[#DCD3C7]/60 flex items-center justify-between bg-[#F4EFEA]/30">
                                    <div className="pt-2">
                                        <span className="block text-[8px] font-bold text-[#2C2520]/40 uppercase tracking-wider">Unit Fare</span>
                                        <span className="text-base font-black text-[#2C2520]">${Number(ticket.price).toFixed(2)}</span>
                                    </div>
                                    <Link href={`/tickets/${ticket._id}`} className="bg-[#4A6761] text-[#F4EFEA] hover:bg-[#2C2520] px-4 py-2 rounded-lg text-xs font-bold transition-colors mt-2">
                                        See details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* --- WHY CHOOSE US SECTION --- */}
            <section className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 md:p-10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#4A6761]">The TicketBari Edge</span>
                        <h2 className="text-2xl md:text-3xl font-black text-[#2C2520] mt-1 mb-3 tracking-tight">
                            Why Thousands Trust Us For Their Journeys
                        </h2>
                        <p className="text-[#2C2520]/70 text-xs md:text-sm font-medium leading-relaxed">
                            We bridge the gap between regional transport vendors and modern travelers, creating a premium booking infrastructure that leaves zero room for uncertainties.
                        </p>
                    </div>
                    
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#F4EFEA] p-5 rounded-xl border border-[#DCD3C7]/60">
                            <div className="w-8 h-8 rounded-lg bg-[#4A6761]/10 flex items-center justify-center text-[#4A6761] mb-3">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <h4 className="font-extrabold text-[#2C2520] text-sm md:text-base mb-1">100% Secure Checkout</h4>
                            <p className="text-[11px] md:text-xs text-[#2C2520]/60 font-semibold leading-relaxed">Encrypted digital gateway compliance keeping your monetary credentials fully bulletproof.</p>
                        </div>

                        <div className="bg-[#F4EFEA] p-5 rounded-xl border border-[#DCD3C7]/60">
                            <div className="w-8 h-8 rounded-lg bg-[#4A6761]/10 flex items-center justify-center text-[#4A6761] mb-3">
                                <Ticket className="w-4 h-4" />
                            </div>
                            <h4 className="font-extrabold text-[#2C2520] text-sm md:text-base mb-1">Instant Digital Boarding</h4>
                            <p className="text-[11px] md:text-xs text-[#2C2520]/60 font-semibold leading-relaxed">Skip long terminal counter lines completely. Get PDF counter slips dispatched instantly.</p>
                        </div>

                        <div className="bg-[#F4EFEA] p-5 rounded-xl border border-[#DCD3C7]/60">
                            <div className="w-8 h-8 rounded-lg bg-[#4A6761]/10 flex items-center justify-center text-[#4A6761] mb-3">
                                <Compass className="w-4 h-4" />
                            </div>
                            <h4 className="font-extrabold text-[#2C2520] text-sm md:text-base mb-1">Real-Time seat maps</h4>
                            <p className="text-[11px] md:text-xs text-[#2C2520]/60 font-semibold leading-relaxed">Select window seats, executive rows, or premium upper cabin slots directly from current live feeds.</p>
                        </div>

                        <div className="bg-[#F4EFEA] p-5 rounded-xl border border-[#DCD3C7]/60">
                            <div className="w-8 h-8 rounded-lg bg-[#4A6761]/10 flex items-center justify-center text-[#4A6761] mb-3">
                                <Plane className="w-4 h-4" />
                            </div>
                            <h4 className="font-extrabold text-[#2C2520] text-sm md:text-base mb-1">Multi-Modal Aggregator</h4>
                            <p className="text-[11px] md:text-xs text-[#2C2520]/60 font-semibold leading-relaxed">The only regional portal coordinating aviation paths, rail configurations, bus lanes, and cruises concurrently.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LATEST TICKETS SECTION (6-8 NEW ENTRIES) --- */}
            <section>
                <div className="mb-6 px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A6761]">Recent Arrivals</span>
                    <h2 className="text-2xl md:text-3xl font-black text-[#2C2520] mt-0.5 tracking-tight">Newly Added Routes</h2>
                </div>

                {latestTickets.length === 0 ? (
                    <div className="text-center py-8 bg-[#EAE3DA]/40 border border-dashed border-[#DCD3C7] rounded-xl text-xs font-bold text-[#2C2520]/50">
                        No ticket schedules found in database logs.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {latestTickets.slice(0, 8).map((ticket) => (
                            <div key={ticket._id} className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md duration-200">
                                <div>
                                    <div className="h-36 w-full bg-[#2C2520] overflow-hidden">
                                        <img src={ticket.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"} alt={ticket.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4 space-y-1.5">
                                        <div className="flex items-center justify-between text-[10px] font-bold">
                                            <span className="uppercase text-[#4A6761]">{ticket.transportType}</span>
                                            <span className="text-[#2C2520]/50">Qty: {ticket.quantity || ticket.availableSeats || 0}</span>
                                        </div>
                                        <h3 className="font-extrabold text-[#2C2520] text-sm line-clamp-1">{ticket.title}</h3>
                                        <p className="text-[10px] text-[#2C2520]/60 font-semibold line-clamp-1">Perks: {ticket.perks || "None Specified"}</p>
                                    </div>
                                </div>
                                <div className="p-4 pt-0 mt-1 flex items-center justify-between">
                                    <div>
                                        <span className="block text-[8px] font-bold text-[#2C2520]/40 uppercase">Price</span>
                                        <span className="text-sm font-black text-[#2C2520]">${Number(ticket.price).toFixed(2)}</span>
                                    </div>
                                    <Link href={`/tickets/${ticket._id}`} className="bg-[#2C2520]/10 hover:bg-[#4A6761] text-[#2C2520] hover:text-[#F4EFEA] px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors">
                                        See details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* --- REPLACED SECTION: CLEAN TEXT-ONLY ANNOUNCEMENTS / UPDATES --- */}
            <section className="border-t border-[#DCD3C7] pt-12">
                <div className="max-w-3xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A6761]">Important Bulletins</span>
                    <h2 className="text-2xl md:text-3xl font-black text-[#2C2520] mt-0.5 mb-6 tracking-tight">Travel Advisory & System Notices</h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-[#4A6761] pl-4">
                            <h4 className="font-bold text-[#2C2520] text-sm md:text-base">Eid Rush Pre-booking Schedule Announcement</h4>
                            <p className="text-xs text-[#2C2520]/70 font-medium mt-1">Advance ticket pools for highway bus lines and specialized cross-district rail paths will be unrolled by platform administrators every morning at 08:00 AM local time.</p>
                        </div>

                        <div className="border-l-4 border-[#DCD3C7] pl-4">
                            <h4 className="font-bold text-[#2C2520] text-sm md:text-base">Monsoon Coastal Waterway Regulations</h4>
                            <p className="text-xs text-[#2C2520]/70 font-medium mt-1">Launch cruise operations might dynamic-shift based on weather alerts issued by meteorological departments. Check your digital ticket dashboard for instant flight or trip status updates.</p>
                        </div>

                        <div className="border-l-4 border-[#DCD3C7] pl-4">
                            <h4 className="font-bold text-[#2C2520] text-sm md:text-base">Refund Architecture Policy Adjustments</h4>
                            <p className="text-xs text-[#2C2520]/70 font-medium mt-1">Instant gate cancellations requested 24 hours prior to departure times are processed directly into your native checkout account without internal moderation overhead.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}