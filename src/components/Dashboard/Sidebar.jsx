"use client";

import React, { act } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
    Person,
    Ticket,
    Persons,
    LayoutSideContentRight,
    CirclePlus,
    ArrowUp,
    Receipt,
    Thunderbolt
} from "@gravity-ui/icons";

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Dynamically resolve role (defaults to 'user' if undefined or missing)
    const role = session?.user?.role || "user";
    // console.log(role)

    // Structured route configurations using @gravity-ui/icons

    const adminLinks = [
        { icon: Person, label: "Admin Profile", href: "/dashboard/admin/profile" },
        { icon: Ticket, label: "Manage Tickets", href: "/dashboard/admin/tickets" },
        { icon: Persons, label: "Manage Users", href: "/dashboard/admin/users" },
        { icon: Thunderbolt, label: "Advertise Tickets", href: "/dashboard/admin/advertise" },
    ]
    const vendorLinks = [
        { icon: Person, label: "Vendor Profile", href: "/dashboard/vendor/profile" },
        { icon: CirclePlus, label: "Add Ticket", href: "/dashboard/vendor/add-ticket" },
        { icon: Ticket, label: "My Added Tickets", href: "/dashboard/vendor/my-tickets" },
        { icon: LayoutSideContentRight, label: "Requested Bookings", href: "/dashboard/vendor/bookings" },
        { icon: ArrowUp, label: "Revenue Overview", href: "/dashboard/vendor/revenue" },
    ]
    const userLinks = [
        { icon: Person, label: "User Profile", href: "/dashboard/user/profile" },
        { icon: Ticket, label: "My Booked Tickets", href: "/dashboard/user/booked-tickets" },
        { icon: Receipt, label: "Transaction History", href: "/dashboard/user/transactions" },
    ]

    const navLinksMap = {
        admin: adminLinks,
        vendor: vendorLinks,
        user: userLinks,
    }

    const activeRoutes = navLinksMap[session?.user?.role || 'user'];
    return (
        <aside className="w-full md:w-64 bg-[#EAE3DA] border-b md:border-b-0 md:border-r border-[#DCD3C7] p-4 flex flex-col gap-1 shrink-0">
            {/* Dynamic Scope Label */}
            <div className="px-3 py-2 mb-2 hidden md:block">
                <p className="text-xs font-bold tracking-wider text-[#2C2520]/60 uppercase">
                    {role} Workspace
                </p>
            </div>

            {/* Navigation Links Grid */}
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
                {activeRoutes.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${isActive
                                ? "bg-[#4A6761] text-[#F4EFEA] shadow-sm"
                                : "text-[#2C2520] hover:bg-[#F4EFEA] hover:text-[#4A6761]"
                                }`}
                        >
                            <IconComponent
                                className={`w-5 h-5 shrink-0 ${isActive ? "text-[#F4EFEA]" : "text-[#2C2520]/70"
                                    }`}
                            />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}