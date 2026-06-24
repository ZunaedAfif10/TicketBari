"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Person,
  Briefcase,
  Gear,
  Magnifier,
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

  // Utilizing standard core Gravity UI icons that are universally built into the library
  const travelModes = [
    { id: "bus", label: "Bus", icon: <Ticket className="w-5 h-5" /> },
    { id: "train", label: "Train", icon: <Compass className="w-5 h-5" /> },
    {
      id: "launch",
      label: "Launch",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    { id: "plane", label: "Plane", icon: <Plane className="w-5 h-5" /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for ${activeTab} tickets:`, searchData);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* --- HERO / BANNER SECTION --- */}
      <section
        className="relative rounded-2xl overflow-hidden bg-cover bg-center h-[500px] flex items-center shadow-md border border-[#DCD3C7]"
        style={{
          backgroundImage: `linear-gradient(rgba(44, 37, 32, 0.6), rgba(44, 37, 32, 0.4)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop')`,
        }}
      >
        <div className="relative z-10 px-8 md:px-12 max-w-2xl text-white">
          <span className="bg-[#4A6761] text-[#F4EFEA] text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full">
            Welcome to TicketBari
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4 tracking-tight leading-tight text-[#F4EFEA]">
            Your Ultimate Gateway to Seamless Travel
          </h1>
          <p className="text-[#EAE3DA] text-lg font-medium mb-6">
            Discover, compare, and instantly book travel tickets for Buses,
            Trains, Launches, and Flights all across the country.
          </p>
          <div className="flex gap-4">
            <a
              href="#search-tickets"
              className="bg-[#4A6761] hover:bg-[#4A6761]/90 text-[#F4EFEA] px-6 py-3 rounded-lg font-bold transition shadow-sm flex items-center space-x-2"
            >
              <span>Book Tickets Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/tickets"
              className="bg-[#EAE3DA] hover:bg-[#DCD3C7] text-[#2C2520] px-6 py-3 rounded-lg font-bold transition shadow-sm"
            >
              Explore Routes
            </Link>
          </div>
        </div>
      </section>

      {/* --- REPLACED: AVAILABLE TRANSPORT MODES GRID --- */}
      <section className="scroll-mt-24">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-[#2C2520] tracking-tight mb-3">
            Explore Booking Options
          </h2>
          <p className="text-[#2C2520]/70 text-sm font-medium">
            Choose your preferred way to travel. We aggregate top tier fleets to
            make your journey safe and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelModes.map((mode) => (
            <div
              key={mode.id}
              className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-xl p-6 shadow-sm flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-md duration-200"
            >
              <div>
                <div className="bg-[#F4EFEA] p-3 rounded-lg w-fit mb-4 border border-[#DCD3C7]">
                  {mode.icon}
                </div>
                <h3 className="text-lg font-bold text-[#2C2520] mb-2">
                  {mode.label}
                </h3>
                <p className="text-[#2C2520]/80 text-xs leading-relaxed mb-6 font-medium">
                  {mode.desc}
                </p>
              </div>
              <Link
                href="/tickets"
                className="text-[#4A6761] hover:text-[#2C2520] font-bold text-xs uppercase tracking-wider flex items-center space-x-1 group"
              >
                <span>Find Tickets</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES & ROLES DISCUSSION --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#EAE3DA]/50 border border-[#DCD3C7] rounded-xl p-6 transition hover:shadow-md">
          <div className="bg-[#4A6761]/10 text-[#4A6761] p-3 rounded-lg w-fit mb-4">
            <Person className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#2C2520] mb-2">
            For Travelers
          </h3>
          <p className="text-[#2C2520]/80 text-sm leading-relaxed">
            Create an account to track your booking histories, explore seasonal
            discounts, download digital tickets, and request instant
            cancellations seamlessly.
          </p>
        </div>
        <div className="bg-[#EAE3DA]/50 border border-[#DCD3C7] rounded-xl p-6 transition hover:shadow-md">
          <div className="bg-[#4A6761]/10 text-[#4A6761] p-3 rounded-lg w-fit mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#2C2520] mb-2">
            For Service Vendors
          </h3>
          <p className="text-[#2C2520]/80 text-sm leading-relaxed">
            Partner up with TicketBari. Register your agency profile to manage
            custom fleets, set flexible seat configurations, update schedules,
            and track detailed revenue parameters.
          </p>
        </div>
        <div className="bg-[#EAE3DA]/50 border border-[#DCD3C7] rounded-xl p-6 transition hover:shadow-md">
          <div className="bg-[#4A6761]/10 text-[#4A6761] p-3 rounded-lg w-fit mb-4">
            <Gear className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#2C2520] mb-2">
            Administrative Control
          </h3>
          <p className="text-[#2C2520]/80 text-sm leading-relaxed">
            Our powerful internal engine allows full moderation control. Approve
            incoming vendor verify credentials, monitor platform-wide analytics,
            and audit security compliance.
          </p>
        </div>
      </section>

      {/* --- PROMOTIONAL BANNER --- */}
      <section className="bg-[#4A6761] rounded-2xl p-8 md:p-12 text-center shadow-lg text-[#F4EFEA]">
        <h2 className="text-3xl font-extrabold mb-3">
          Are you a Transport Owner?
        </h2>
        <p className="max-w-xl mx-auto text-[#EAE3DA] mb-6">
          Maximize your sales capacity by listing your transportation
          itineraries on TicketBari's dashboard architecture. Register as a
          vendor today!
        </p>
        <Link
          href="/register"
          className="inline-block bg-[#EAE3DA] hover:bg-[#DCD3C7] text-[#2C2520] px-8 py-3 rounded-lg font-bold transition shadow-md"
        >
          Join as Vendor
        </Link>
      </section>
    </div>
  );
}
