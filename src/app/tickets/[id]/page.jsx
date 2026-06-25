import TicketDetails from '@/components/Ticket/TicketDetails';
import { getTicketsById } from '@/lib/api/ticket';


export default async function Page({ params }) {
    const { id } = await params;
    const ticketInfo = await getTicketsById(id);

    if (!ticketInfo) {
        return (
            <div className="flex min-h-screen items-center justify-center text-[#2C2520]/60 font-medium bg-[#F4EFEA]">
                Ticket not found or has been removed.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full min-h-screen bg-[#F4EFEA]">
            <TicketDetails ticket={ticketInfo} />
        </div>
    );
}