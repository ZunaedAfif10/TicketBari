"use client";

import React from "react";
import {
    Person,
    Envelope,
    ShieldCheck,
    Briefcase,
    PersonFill,
    Shield
} from "@gravity-ui/icons";

export default function ProfileCard({ user }) {
    const {
        name = "Anonymous User",
        email = "No email provided",
        image,
        role = "user"
    } = user || {};

    const roleBadges = {
        admin: {
            label: "System Administrator",
            style: "bg-red-500/10 text-red-700 border-red-200/50",
            icon: <ShieldCheck className="w-4 h-4" />
        },
        vendor: {
            label: "Verified Vendor Partner",
            style: "bg-[#4A6761]/10 text-[#4A6761] border-[#4A6761]/20",
            icon: <Briefcase className="w-4 h-4" />
        },
        user: {
            label: "Standard Traveler",
            style: "bg-[#2C2520]/5 text-[#2C2520]/70 border-[#2C2520]/10",
            icon: <Person className="w-4 h-4" />
        }
    };

    const currentBadge = roleBadges[role.toLowerCase()] || roleBadges.user;

    return (
        <div className="w-full bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-sm">
            {/* Top Graphic Accent Banner */}
            <div className="h-24 w-full bg-[#4A6761]/10 border-b border-[#DCD3C7]/60 relative pattern-grid" />

            {/* Main Layout Area */}
            <div className="px-6 pb-8 pt-0 sm:px-8 relative">

                {/* Avatar positioned breaking into the top banner */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-12 mb-6 text-center sm:text-left">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#F4EFEA] border-4 border-[#EAE3DA] flex items-center justify-center shrink-0 shadow-md">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <PersonFill className="w-20 h-20 text-[#2C2520]/30" />
                        )}
                    </div>

                    <div className="space-y-1.5 pb-2">
                        <div className={`inline-flex items-center gap-1.5 border text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${currentBadge.style}`}>
                            {currentBadge.icon}
                            {currentBadge.label}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#2C2520] tracking-tight">
                            {name}
                        </h2>
                    </div>
                </div>

                {/* Informational Cards Grid (Stretches the layout naturally) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#DCD3C7]/60">

                    <div className="bg-[#F4EFEA]/80 border border-[#DCD3C7]/60 p-4 rounded-xl flex items-start gap-4">
                        <div className="p-2.5 bg-[#4A6761]/10 rounded-lg shrink-0">
                            <Envelope className="w-5 h-5 text-[#4A6761]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[#2C2520]/40 uppercase tracking-wider">Email Address</p>
                            <p className="font-semibold text-[#2C2520] break-all text-sm sm:text-base mt-0.5">{email}</p>
                        </div>
                    </div>

                    <div className="bg-[#F4EFEA]/80 border border-[#DCD3C7]/60 p-4 rounded-xl flex items-start gap-4">
                        <div className="p-2.5 bg-[#4A6761]/10 rounded-lg shrink-0">
                            <Shield className="w-5 h-5 text-[#4A6761]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[#2C2520]/40 uppercase tracking-wider">Account Scope Context</p>
                            <p className="font-semibold text-[#2C2520] text-sm sm:text-base mt-0.5">System Status Managed: Active</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}