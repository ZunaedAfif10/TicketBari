"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Person,
  Briefcase,
  Gear,
  Ticket,
  Compass,
  ShieldCheck,
  Plane,
} from "@gravity-ui/icons";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("bus");
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
  });

  // Included descriptive fields to prevent rendering errors
  const travelModes = [
    { id: "bus", label: "Bus", desc: "Premium intercity buses across all operational routes.", icon: <Ticket className="w-5 h-5" /> },
    { id: "train", label: "Train", desc: "State rail system route scheduling and luxury compartments.", icon: <Compass className="w-5 h-5" /> },
    { id: "launch", label: "Launch", desc: "Luxurious riverine cruise decks and cabin options.", icon: <ShieldCheck className="w-5 h-5" /> },
    { id: "plane", label: "Plane", desc: "Domestic flights to all airports at the best fare rates.", icon: <Plane className="w-5 h-5" /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for ${activeTab} tickets:`, searchData);
  };

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
              href="#search-tickets"
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

      {/* --- AVAILABLE TRANSPORT MODES GRID --- */}
      <section className="scroll-mt-24" id="search-tickets">
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-10 px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C2520] tracking-tight mb-2.5">
            Explore Booking Options
          </h2>
          <p className="text-[#2C2520]/70 text-xs md:text-sm font-medium">
            Choose your preferred way to travel. We aggregate top tier fleets to
            make your journey safe and reliable.
          </p>
        </div>

        {/* Responsive layout updates from 1 column up to 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {travelModes.map((mode) => (
            <div
              key={mode.id}
              className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md duration-200"
            >
              <div>
                <div className="bg-[#F4EFEA] p-2.5 rounded-lg w-fit mb-4 border border-[#DCD3C7]">
                  {mode.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#2C2520] mb-1.5">
                  {mode.label}
                </h3>
                <p className="text-[#2C2520]/80 text-xs leading-relaxed mb-5 font-medium">
                  {mode.desc}
                </p>
              </div>
              <Link
                href="/tickets"
                className="text-[#4A6761] hover:text-[#2C2520] font-bold text-[11px] uppercase tracking-wider flex items-center space-x-1 group mt-auto w-fit"
              >
                <span>Find Tickets</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES & ROLES SECTIONS --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <div className="bg-[#EAE3DA]/50 border border-[#DCD3C7] rounded-xl p-5 md:p-6 transition hover:shadow-md flex flex-col">
          <div className="bg-[#4A6761]/10 text-[#4A6761] p-2.5 rounded-lg w-fit mb-4">
            <Person className="w-5 h-5" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-[#2C2520] mb-1.5">
            For Travelers
          </h3>
          <p className="text-[#2C2520]/80 text-xs md:text-sm leading-relaxed font-medium">
            Create an account to track your booking histories, explore seasonal
            discounts, download digital tickets, and request instant
            cancellations seamlessly.
          </p>
        </div>
        
        <div className="bg-[#EAE3DA]/50 border border-[#DCD3C7] rounded-xl p-5 md:p-6 transition hover:shadow-md flex flex-col">
          <div className="bg-[#4A6761]/10 text-[#4A6761] p-2.5 rounded-lg w-fit mb-4">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-[#2C2520] mb-1.5">
            For Service Vendors
          </h3>
          <p className="text-[#2C2520]/80 text-xs md:text-sm leading-relaxed font-medium">
            Partner up with TicketBari. Register your agency profile to manage
            custom fleets, set flexible seat configurations, update schedules,
            and track detailed revenue parameters.
          </p>
        </div>

        <div className="bg-[#EAE3DA]/50 border border-[#DCD3C7] rounded-xl p-5 md:p-6 transition hover:shadow-md flex flex-col sm:col-span-2 lg:col-span-1">
          <div className="bg-[#4A6761]/10 text-[#4A6761] p-2.5 rounded-lg w-fit mb-4">
            <Gear className="w-5 h-5" />
          </div>
          <h3 className="text-lg md:text-xl font-extrabold text-[#2C2520] mb-1.5">
            Administrative Control
          </h3>
          <p className="text-[#2C2520]/80 text-xs md:text-sm leading-relaxed font-medium">
            Our powerful internal engine allows full moderation control. Approve
            incoming vendor verify credentials, monitor platform-wide analytics,
            and audit security compliance.
          </p>
        </div>
      </section>

      {/* --- PROMOTIONAL BANNER --- */}
      <section className="bg-[#4A6761] rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-md text-[#F4EFEA] mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">
          Are you a Transport Owner?
        </h2>
        <p className="max-w-xl mx-auto text-[#EAE3DA] text-xs md:text-sm font-medium mb-6 leading-relaxed">
          Maximize your sales capacity by listing your transportation
          itineraries on TicketBari's dashboard architecture. Register as a
          vendor today!
        </p>
        <Link
          href="/register"
          className="inline-block bg-[#EAE3DA] hover:bg-[#DCD3C7] text-[#2C2520] px-6 py-2.5 md:py-3 rounded-lg font-bold transition shadow-sm text-sm"
        >
          Join as Vendor
        </Link>
      </section>
    </div>
  );
}