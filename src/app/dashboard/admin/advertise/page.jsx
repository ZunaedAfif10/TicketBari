import React from "react";
import { Megaphone } from "@gravity-ui/icons";
import AdminTicketsTable from "@/components/AdminTicketsTable";

// Simulated fetch from database/API
const MOCK_DB_APPROVED_TICKETS = [
    { id: "1", title: "Green Line Scenic Scania Business", from: "Dhaka", to: "Cox's Bazar", transportType: "Bus", price: 25, isAdvertised: true },
    { id: "2", title: "Subarna Express Silk Seat", from: "Dhaka", to: "Chittagong", transportType: "Train", price: 12, isAdvertised: true },
    { id: "3", title: "US-Bangla Aviation Premium", from: "Dhaka", to: "Sylhet", transportType: "Plane", price: 65, isAdvertised: true },
    { id: "4", title: "Green Line Waterways Cruise", from: "Dhaka", to: "Barisal", transportType: "Launch", price: 18, isAdvertised: true },
    { id: "5", title: "Hanif Enterprise Sleeper", from: "Dhaka", to: "Rajshahi", transportType: "Bus", price: 20, isAdvertised: true },
    { id: "6", title: "Ena Transport Executive", from: "Dhaka", to: "Sylhet", transportType: "Bus", price: 15, isAdvertised: true },
    { id: "7", title: "Parabat Express AC Cabin", from: "Dhaka", to: "Sylhet", transportType: "Train", price: 14, isAdvertised: false },
    { id: "8", title: "Biman Bangladesh Economy", from: "Dhaka", to: "Cox's Bazar", transportType: "Plane", price: 70, isAdvertised: false },
];

export default function AdminTicketsManagementPage() {
    return (
        <div className="max-w-6xl mx-auto my-8 px-4 space-y-6 text-[#2C2520]">
            
            {/* Header Layout context */}
            <div className="bg-[#EAE3DA] border border-[#DCD3C7] p-6 rounded-2xl shadow-sm">
                <div className="space-y-1">
                    <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-[#4A6761]" /> Approved Ticket Inventory
                    </h1>
                    <p className="text-xs font-medium text-[#2C2520]/60">
                        Manage active routes and switch homepage advertisement banner campaign targets.
                    </p>
                </div>
            </div>

            {/* Injected Interactive Table Component Container */}
            <AdminTicketsTable initialTickets={MOCK_DB_APPROVED_TICKETS} />

        </div>
    );
}