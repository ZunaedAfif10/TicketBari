"use client";

import React from "react";
import { CircleCheck, Shield, Person, CircleExclamation, EyeSlash } from "@gravity-ui/icons";
import { updateUser } from "@/lib/actions/user";

export default function AdminUserManagementTable({ users }) {

    const handleMakeAdmin = async (userId) => {
        const result = await updateUser(userId, { role: 'admin' })
    };

    const handleMakeVendor = async (userId) => {
        const result = await updateUser(userId, { role: 'vendor' })
    };

    const handleMarkFraud = async (userId) => {
        const result = await updateUser(userId, { role: 'fraud' })
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
                <>
                    {/* ================= 📱 MOBILE CARD VIEW (Visible below 768px) ================= */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {users.map((user) => {
                            const roleLower = user.role?.toLowerCase();
                            const isFraud = user.status?.toLowerCase() === "fraud";

                            return (
                                <div key={user._id} className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-xl p-4 space-y-4 font-bold shadow-xs">
                                    {/* Identity + Badge */}
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-black text-[#2C2520] truncate">{user.name || "Unnamed Account"}</p>
                                            <p className="text-[11px] text-[#2C2520]/50 font-medium truncate">{user.email}</p>
                                        </div>
                                        <div className="shrink-0">
                                            {isFraud ? (
                                                <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wide animate-pulse">
                                                    <EyeSlash className="w-3 h-3" /> Fraud
                                                </span>
                                            ) : roleLower === "admin" ? (
                                                <span className="inline-flex items-center gap-1 text-[#4A6761] bg-[#4A6761]/10 border border-[#4A6761]/20 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wide">
                                                    <Shield className="w-3 h-3" /> Admin
                                                </span>
                                            ) : roleLower === "vendor" ? (
                                                <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wide">
                                                    Vendor
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold tracking-wide">
                                                    User
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Box */}
                                    <div className="pt-2 border-t border-[#DCD3C7]/60">
                                        {isFraud ? (
                                            <p className="text-[11px] font-medium text-red-800/60 italic text-center">
                                                All inventory has been purged from catalog
                                            </p>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-2">
                                                {roleLower !== "admin" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                        className="w-full justify-center px-2 py-2 bg-[#4A6761] text-[#F4EFEA] hover:opacity-90 text-[11px] font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleCheck className="w-3.5 h-3.5" /> Admin
                                                    </button>
                                                )}

                                                {roleLower !== "vendor" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMakeVendor(user._id)}
                                                        className="w-full justify-center px-2 py-2 bg-[#2C2520] text-[#F4EFEA] hover:opacity-90 text-[11px] font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleCheck className="w-3.5 h-3.5" /> Vendor
                                                    </button>
                                                )}

                                                {roleLower === "vendor" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMarkFraud(user._id)}
                                                        className="w-full col-span-2 justify-center px-2 py-2 bg-red-800 text-red-50 hover:bg-red-900 text-[11px] font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                    >
                                                        <CircleExclamation className="w-3.5 h-3.5" /> Mark as Fraud
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ================= 🖥️ DESKTOP TABLE VIEW (Visible on 768px and up) ================= */}
                    <div className="hidden md:block bg-[#EAE3DA] border border-[#DCD3C7] rounded-2xl overflow-hidden shadow-xs">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#2C2520]/5 border-b border-[#DCD3C7] text-[10px] font-black uppercase tracking-wider text-[#2C2520]/50">
                                    <th className="p-4 w-[35%]">Account Profile</th>
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
                                            <td className="p-4 max-w-[240px] truncate">
                                                <span className="block font-black text-[#2C2520] truncate">
                                                    {user.name || "Unnamed Account"}
                                                </span>
                                                <span className="block text-[11px] text-[#2C2520]/50 font-medium truncate">
                                                    {user.email}
                                                </span>
                                            </td>

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

                                            <td className="p-4 pr-6">
                                                <div className="flex items-center justify-end gap-2">
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
                                                                    className="px-3 py-1.5 whitespace-nowrap bg-[#4A6761] text-[#F4EFEA] hover:opacity-90 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                                >
                                                                    <CircleCheck className="w-3.5 h-3.5" /> Make Admin
                                                                </button>
                                                            )}

                                                            {roleLower !== "vendor" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleMakeVendor(user._id)}
                                                                    className="px-3 py-1.5 whitespace-nowrap bg-[#2C2520] text-[#F4EFEA] hover:opacity-90 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                                                                >
                                                                    <CircleCheck className="w-3.5 h-3.5" /> Make Vendor
                                                                </button>
                                                            )}

                                                            {roleLower === "vendor" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleMarkFraud(user._id)}
                                                                    className="px-3 py-1.5 whitespace-nowrap bg-red-800 text-red-50 hover:bg-red-900 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
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
                </>
            )}
        </div>
    );
}