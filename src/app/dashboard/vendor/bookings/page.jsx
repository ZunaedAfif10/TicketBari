import RequestedBookingsTable from "@/components/Booking/RequestedBookingTable";
import { getBookingByEmail} from "@/lib/api/booking";
import { getUserSession } from "@/lib/core/session";
import React from "react";


export default async function RequestedBookingsPage() {
    const user = await getUserSession();
    
    const pendingBookings = await getBookingByEmail(user?.email);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* The page only does one thing: pass the prop */}
            <RequestedBookingsTable bookings={pendingBookings} />
        </div>
    );
}