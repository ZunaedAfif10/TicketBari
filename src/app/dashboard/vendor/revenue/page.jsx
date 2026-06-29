
import DashboardCharts from "@/components/Chart/DashboardCharts";
import { getSellingsByEmail } from "@/lib/api/payment";
import { getTicketsByVendor } from "@/lib/api/ticket";
import { getUserSession } from "@/lib/core/session";
import React from "react";

export default async function AnalyticsPage() {
    
    const {email} = await getUserSession();

    const sellings = await getSellingsByEmail(email)
    // console.log(sellings)
   

    const tickets = await getTicketsByVendor(email);

    const totalTicketsAdded = tickets.length; 

    return (
        <div className="p-4 sm:p-8 bg-[#F4EFEA] min-h-screen">
            <div className="max-w-6xl mx-auto">
                <DashboardCharts
                    sellings={sellings} 
                    totalTicketsAdded={totalTicketsAdded} 
                />
            </div>
        </div>
    );
}