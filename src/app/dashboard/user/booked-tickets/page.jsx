import BookedTicketsList from "@/components/Booking/BookedTicketsList";
import { getBookingById } from "@/lib/api/booking";
import { getUserSession } from "@/lib/core/session";



export default async function MyBookedTicketsPage() {

    const user = await getUserSession();
    // console.log(userId)

    if (!user.id) {
        return (
            <div className="text-center py-12 text-sm font-bold text-[#2C2520]/50">
                Please log in to review your secured ticket ledger records.
            </div>
        );
    }

    let initialBookings = [];
    
    const data = await getBookingById(user.id)
    console.log(data)
    if(data)
        initialBookings = data;

    // 3. Render the interactive Client component instantly with data pre-loaded
    return <BookedTicketsList  initialBookings={initialBookings}/>;
}