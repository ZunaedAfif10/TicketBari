import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CircleCheck, Calendar, Ticket, Home, Mail, ArrowRight } from 'lucide-react'
import { createPayment } from '@/lib/actions/payment'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const paymentData = {
        userId: session?.metadata?.userId,
        amount: session?.metadata?.amount,
        bookingId: session?.metadata?.bookingId,
        ticketId: session?.metadata?.ticketId,
        ticketTitle: session?.metadata?.ticketTitle,
        quantity: session?.metadata?.quantity,
        email: session?.metadata?.email,
        transactionId: session?.payment_intent?.id,
        paymentStatus: session?.payment_status,
        vendorEmail: session?.metadata?.vendorEmail,
    }
    //   console.log(paymentData)

    const res = await createPayment(paymentData);
    console.log(res)

    // Extract line item details safely
    const lineItem = session.line_items?.data?.[0];
    const ticketTitle = session.metadata?.ticketTitle || lineItem?.description || "Transit Booking";
    const quantity = session.metadata?.quantity || lineItem?.quantity || 1;
    const customerEmail = session.customer_details?.email;
    const totalAmount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";

    return (
        <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center p-4 sm:p-8">
            {/* Expanded Container Width to max-w-4xl */}
            <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-3xl p-6 sm:p-10 w-full max-w-4xl shadow-xl text-[#2C2520] space-y-8 animate-fade-in">

                {/* Top Header Banner Row */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-[#DCD3C7] pb-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-14 h-14 bg-[#4A6761]/10 rounded-2xl flex items-center justify-center text-[#4A6761] shrink-0">
                            <CircleCheck className="w-8 h-8" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Payment Confirmed!</h1>
                            <p className="text-xs sm:text-sm font-medium text-[#2C2520]/60 mt-0.5">
                                Thank you for choosing TicketBari. Your transit reservation is officially secured.
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-100/80 border border-emerald-200 text-emerald-800 font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shrink-0 shadow-sm">
                        Paid &amp; Fully Issued
                    </div>
                </div>

                {/* Dynamic Two-Column Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Comprehensive Ticket Layout Details */}
                    <div className="lg:col-span-7 bg-[#F4EFEA] border border-[#DCD3C7]/80 rounded-2xl p-6 space-y-5 shadow-inner">
                        <div className="flex justify-between items-center text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider border-b border-[#DCD3C7]/60 pb-3">
                            <span>Primary Passenger Boarding Pass</span>
                            <span className="text-[#4A6761] font-black tracking-widest">TicketBari Core</span>
                        </div>

                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Route Details / Asset Description</span>
                            <p className="text-lg font-black text-[#2C2520] leading-tight">{ticketTitle}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-[#DCD3C7]/40 pt-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-[#4A6761]" /> Reservation Status
                                </span>
                                <p className="text-sm font-extrabold text-emerald-700">Seat Confirmed</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Quantity Allocated</span>
                                <p className="text-sm font-black text-[#2C2520]">{quantity} Space Units</p>
                            </div>
                        </div>

                        {/* Email notification routing updates */}
                        {customerEmail && (
                            <div className="bg-[#4A6761]/5 border border-[#4A6761]/10 rounded-xl p-3.5 text-xs text-[#2C2520]/70 font-medium flex items-center gap-2.5 mt-2">
                                <Mail className="w-4 h-4 text-[#4A6761] shrink-0" />
                                <p className="truncate text-left">
                                    Digital confirmation invoice sent directly to <span className="font-bold text-[#2C2520]">{customerEmail}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Statement Breakdown Elements */}
                    <div className="lg:col-span-5 bg-[#F4EFEA]/50 border border-[#DCD3C7]/60 rounded-2xl p-6 space-y-4">
                        <h4 className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider border-b border-[#DCD3C7]/40 pb-2">
                            Financial Summary
                        </h4>

                        <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-[#2C2520]/60">Transaction Mode</span>
                            <span className="font-semibold text-[#2C2520]">Stripe Direct Checkout</span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-[#2C2520]/60">Unit Quantity Matrix</span>
                            <span className="font-semibold text-[#2C2520]">{quantity}x Seats</span>
                        </div>

                        <div className="flex justify-between items-center border-t border-[#DCD3C7]/40 pt-3 text-sm">
                            <span className="font-black text-[#2C2520]">Total Amount Charged</span>
                            <span className="text-xl font-black text-[#4A6761]">${totalAmount}</span>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-[#DCD3C7]/40">
                            <span className="text-[9px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Stripe Gateway Token Reference</span>
                            <p className="text-[11px] font-mono font-semibold text-[#2C2520]/70 break-all bg-[#EAE3DA]/60 p-2 rounded-lg border border-[#DCD3C7]/40">
                                {session.id}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Panel Navigation and Action Controls Router Blocks */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DCD3C7] pt-6">
                    <p className="text-[11px] font-medium text-[#2C2520]/50 text-center sm:text-left">
                        Have immediate boarding questions? Query our operational dispatchers at{" "}
                        <a href="mailto:support@ticketbari.com" className="text-[#4A6761] hover:underline font-bold">
                            support@ticketbari.com
                        </a>
                    </p>

                    <div className="flex gap-3 w-full sm:w-auto shrink-0">
                        <a
                            href="/"
                            className="flex-1 sm:flex-initial bg-[#F4EFEA] hover:bg-[#DCD3C7]/40 border border-[#DCD3C7] font-bold py-3 px-5 rounded-xl transition text-xs text-[#2C2520] flex items-center justify-center gap-1.5 no-underline"
                        >
                            <Home className="w-4 h-4 text-[#2C2520]/60" />
                            Home
                        </a>
                        <a
                            href="/dashboard/user/booked-tickets"
                            className="flex-2 sm:flex-initial bg-[#4A6761] hover:opacity-95 text-[#F4EFEA] font-extrabold py-3 px-6 rounded-xl transition text-xs flex items-center justify-center gap-1.5 shadow-sm no-underline"
                        >
                            <Ticket className="w-4 h-4" />
                            Go to My Dashboard
                            <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}