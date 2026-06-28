"use client";

import React from "react";
import { CircleCheck, Shield, Person, CircleExclamation, EyeSlash } from "@gravity-ui/icons";

export default function AdminUserManagementTable({ users }) {

    const handleMakeAdmin = async (userId) => {
        // 📝 YOUR CODE HERE FOR MAKING USER AN ADMIN
        console.log("Promoting user to Admin:", userId);
    };

    const handleMakeVendor = async (userId) => {
        // 📝 YOUR CODE HERE FOR MAKING USER A VENDOR
        console.log("Promoting user to Vendor:", userId);
    };

    const handleMarkFraud = async (userId) => {
        // 📝 YOUR CODE HERE FOR MARKING VENDOR AS FRAUD
        console.log("Marking vendor as fraud:", userId);
    };

    return (
        <div className="space-y-6 text-[#2C2520]">
            <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-1">User Registry Control</h1>
                <p className="text-xs font-medium text-[#2C2520]/60">
                    Manage system identities, adjust platform access clearance, and police malicious activity.
                </p>
            </div>

            {!users || users.length === 0 ? (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl p-12 text-center text-[#2C2520]/60 font-bold text-sm space-y-4">
                    <Person className="w-8 h-8 text-[#4A6761] mx-auto block" />
                    <p>No user accounts discovered in the active database cluster.</p>
                </div>
            ) : (
                <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[700px]">
                            <thead>
                                <tr className="bg-[#2C2520]/5 border-b border-[#DCD3C7] text-[10px] font-black uppercase tracking-wider text-[#2C2520]/50">
                                    <th className="p-4 w-[35%]">Account Profile (Name / Email)</th>
                                    <th className="p-4 w-[20%]">Platform Role Status</th>
                                    <th className="p-4 w-[45%] text-right pr-6">System Authorization Clearances</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#DCD3C7]/60 font-bold">
                                {users.map((user) => {
                                    const roleLower = user.role?.toLowerCase();
                                    const isFraud = user.status?.toLowerCase() === "fraud";

                                    return (
                                        <tr key={user._id} className="hover:bg-[#F4EFEA]/40 transition">
                                            {/* Account Identity detail */}
                                            <td className="p-4 max-w-[240px] truncate">
                                                <span className="block font-black text-[#2C2520] truncate">
                                                    {user.name || "Unnamed Account"}
                                                </span>
                                                <span className="block text-[11px] text-[#2C2520]/50 font-medium truncate">
                                                    {user.email}
                                                </span>
                                            </td>

                                            {/* Role Status badge */}
                                            <td className="p-4 whitespace-nowrap">
                                                {isFraud ? (
                                                    <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 border border-red-200 px-2.5 py-0.5 rounded text-xs uppercase font-extrabold tracking-wide animate-pulse">
                                                        <EyeSlash className="w-3.5 h-3.5" /> Fraud Blocked
                                                    </span>
                                                ) : roleLower === "admin" ? (
                                                    <span className="inline-flex items-center gap-1 text-[#4A6761] bg-[#4A6761]/10 border border-[#4A6761]/20 px-2.5 py-0.5 rounded text-xs uppercase font-extrabold tracking-wide">
                                                        <Shield className="w-3.5 h-3.5" /> Admin Tier
                                                    </span>
                                                ) : roleLower === "vendor" ? (
                                                    <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded text-xs uppercase font-extrabold tracking-wide">
                                                        Merchant Vendor
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded text-xs uppercase font-extrabold tracking-wide">
                                                        Standard User
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions Panel */}
                                            <td className="p-4 pr-6">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    {isFraud ? (
                                                        <span className="text-[11px] font-medium text-red-800/60 italic whitespace-nowrap">
                                                            All inventory has been purged from catalog
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {roleLower !== "admin" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleMakeAdmin(user._id)}
                                                                    className="px-3 py-1.5 whitespace-nowrap bg-[#4A6761] text-[#F4EFEA] hover:opacity-90 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs shrink-0"
                                                                >
                                                                    <CircleCheck className="w-3.5 h-3.5" /> Make Admin
                                                                </button>
                                                            )}

                                                            {roleLower !== "vendor" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleMakeVendor(user._id)}
                                                                    className="px-3 py-1.5 whitespace-nowrap bg-[#2C2520] text-[#F4EFEA] hover:opacity-90 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs shrink-0"
                                                                >
                                                                    <CircleCheck className="w-3.5 h-3.5" /> Make Vendor
                                                                </button>
                                                            )}

                                                            {roleLower === "vendor" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleMarkFraud(user._id)}
                                                                    className="px-3 py-1.5 whitespace-nowrap bg-red-800 text-red-50 hover:bg-red-900 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs shrink-0"
                                                                >
                                                                    <CircleExclamation className="w-3.5 h-3.5" /> Mark as Fraud
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}