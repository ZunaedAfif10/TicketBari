"use client";

import React, { useMemo } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { Banknote, ShoppingBag, Layers, TrendingUp } from "lucide-react";

export default function DashboardCharts({ sellings = [], totalTicketsAdded = 0 }) {
    
    // --- AGGREGATION MATRIX ---
    const metrics = useMemo(() => {
        let revenue = 0;
        let sold = 0;
        const routeMap = {};

        sellings.forEach((item) => {
            if (item.paymentStatus?.toLowerCase() === "paid") {
                const itemAmount = Number(item.amount) || 0;
                const itemQty = Number(item.quantity) || 0;

                revenue += itemAmount;
                sold += itemQty;

                // Group metrics dynamically by Ticket Title for chart breakdown
                if (!routeMap[item.ticketTitle]) {
                    routeMap[item.ticketTitle] = { name: item.ticketTitle, revenue: 0, sold: 0 };
                }
                routeMap[item.ticketTitle].revenue += itemAmount;
                routeMap[item.ticketTitle].sold += itemQty;
            }
        });

        return {
            totalRevenue: revenue,
            totalTicketsSold: sold,
            chartData: Object.values(routeMap)
        };
    }, [sellings]);

    return (
        <div className="w-full space-y-8 animate-fade-in">
            {/* Page Headers */}
            <div className="border-b border-[#DCD3C7] pb-4">
                <h1 className="text-2xl font-black text-[#2C2520] tracking-tight">Performance Analytics</h1>
                <p className="text-xs text-[#2C2520]/60 font-medium mt-0.5">
                    Track gross revenue flows, ticket volume allocation pools, and platform utilization metrics.
                </p>
            </div>

            {/* Premium Stat Matrix Rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Metric 1: Tickets Added */}
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Total Tickets Added</span>
                        <span className="text-3xl font-black text-[#2C2520]">{totalTicketsAdded || sellings.length}</span>
                    </div>
                    <div className="w-12 h-12 bg-[#2C2520]/5 rounded-xl flex items-center justify-center text-[#2C2520]/60">
                        <Layers className="w-6 h-6" />
                    </div>
                </div>

                {/* Metric 2: Tickets Sold */}
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Total Tickets Sold</span>
                        <span className="text-3xl font-black text-[#2C2520]">{metrics.totalTicketsSold}</span>
                    </div>
                    <div className="w-12 h-12 bg-[#4A6761]/10 rounded-xl flex items-center justify-center text-[#4A6761]">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                </div>

                {/* Metric 3: Revenue */}
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Total Revenue Gross</span>
                        <span className="text-3xl font-black text-[#4A6761]">${metrics.totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-800">
                        <Banknote className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Graphics Presentation Layer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Chart Block 1: Revenue Volume Chart */}
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#DCD3C7]/60 pb-3">
                        <TrendingUp className="w-4 h-4 text-[#4A6761]" />
                        <h3 className="text-sm font-black text-[#2C2520]">Revenue Yield Breakdown by Route</h3>
                    </div>
                    <div className="w-full h-72 text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4A6761" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#4A6761" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#DCD3C7" vertical={false} />
                                <XAxis dataKey="name" stroke="#2C2520" opacity={0.6} tickLine={false} />
                                <YAxis stroke="#2C2520" opacity={0.6} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: "#F4EFEA", borderColor: "#DCD3C7", borderRadius: "12px", color: "#2C2520" }}
                                    formatter={(value) => [`$${value}`, "Revenue"]}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#4A6761" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart Block 2: Tickets Volume Scale Chart */}
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-[#DCD3C7]/60 pb-3">
                        <ShoppingBag className="w-4 h-4 text-[#2C2520]/60" />
                        <h3 className="text-sm font-black text-[#2C2520]">Ticket Allocation Capacity Sold</h3>
                    </div>
                    <div className="w-full h-72 text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#DCD3C7" vertical={false} />
                                <XAxis dataKey="name" stroke="#2C2520" opacity={0.6} tickLine={false} />
                                <YAxis stroke="#2C2520" opacity={0.6} tickLine={false} allowDecimals={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: "#F4EFEA", borderColor: "#DCD3C7", borderRadius: "12px", color: "#2C2520" }}
                                    formatter={(value) => [value, "Units Sold"]}
                                />
                                <Bar dataKey="sold" fill="#2C2520" radius={[6, 6, 0, 0]} maxBarSize={45} opacity={0.8} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}