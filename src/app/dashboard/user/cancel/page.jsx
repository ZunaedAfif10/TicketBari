import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { AlertCircle, Calendar, Ticket, Home, RefreshCw, ArrowRight } from 'lucide-react'

export default async function Cancel({ searchParams }) {
  const { session_id } = await searchParams

  let ticketTitle = "Transit Booking";
  let quantity = 1;
  let totalAmount = "0.00";
  let sessionIdString = session_id || "N/A";

  // If a session ID is passed back, safely fetch the context to show what was being purchased
  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items']
      })
      const lineItem = session.line_items?.data?.[0];
      ticketTitle = session.metadata?.ticketTitle || lineItem?.description || "Transit Booking";
      quantity = session.metadata?.quantity || lineItem?.quantity || 1;
      totalAmount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";
    } catch (error) {
      console.error("Failed to parse canceled session reference:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center p-4 sm:p-8">
      {/* Container matching max-w-4xl */}
      <div className="bg-[#EAE3DA] border border-[#DCD3C7] rounded-3xl p-6 sm:p-10 w-full max-w-4xl shadow-xl text-[#2C2520] space-y-8 animate-fade-in">
        
        {/* Top Header Banner Row */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-[#DCD3C7] pb-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 bg-amber-600/10 rounded-2xl flex items-center justify-center text-amber-700 shrink-0">
              <AlertCircle className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Checkout Aborted</h1>
              <p className="text-xs sm:text-sm font-medium text-[#2C2520]/60 mt-0.5">
                The payment process was canceled. No funds have been deducted from your account.
              </p>
            </div>
          </div>
          
          <div className="bg-amber-100 border border-amber-200 text-amber-800 font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shrink-0 shadow-sm">
            Transaction Unpaid
          </div>
        </div>

        {/* Dynamic Two-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Comprehensive Ticket Layout Details */}
          <div className="lg:col-span-7 bg-[#F4EFEA] border border-[#DCD3C7]/80 rounded-2xl p-6 space-y-5 shadow-inner">
            <div className="flex justify-between items-center text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider border-b border-[#DCD3C7]/60 pb-3">
              <span>Pending Boarding Pass Intent</span>
              <span className="text-[#4A6761] font-black tracking-widest">TicketBari Core</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Route Details / Asset Description</span>
              <p className="text-lg font-black text-[#2C2520]/50 line-clamp-1 line-through">{ticketTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#DCD3C7]/40 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> Reservation Status
                </span>
                <p className="text-sm font-extrabold text-amber-700">Released / Available</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Quantity Attempted</span>
                <p className="text-sm font-black text-[#2C2520]/60">{quantity} Space Units</p>
              </div>
            </div>

            <div className="bg-amber-600/5 border border-amber-600/10 rounded-xl p-3.5 text-xs text-[#2C2520]/70 font-medium flex items-center gap-2.5 mt-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-left">
                Your seats are held temporarily. To keep them locked, please return to your dashboard and complete initialization.
              </p>
            </div>
          </div>

          {/* Right Column: Statement Breakdown Elements */}
          <div className="lg:col-span-5 bg-[#F4EFEA]/50 border border-[#DCD3C7]/60 rounded-2xl p-6 space-y-4">
            <h4 className="text-[10px] font-bold text-[#2C2520]/40 uppercase tracking-wider border-b border-[#DCD3C7]/40 pb-2">
              Financial Summary Breakdown
            </h4>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#2C2520]/60">Transaction Mode</span>
              <span className="font-semibold text-[#2C2520]">Stripe Checkout</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#2C2520]/60">Unit Quantity Matrix</span>
              <span className="font-semibold text-[#2C2520]">{quantity}x Seats</span>
            </div>

            <div className="flex justify-between items-center border-t border-[#DCD3C7]/40 pt-3 text-sm">
              <span className="font-black text-[#2C2520]">Total Invoice Target</span>
              <span className="text-xl font-black text-[#2C2520]/40">${totalAmount}</span>
            </div>

            {session_id && (
              <div className="space-y-1 pt-2 border-t border-[#DCD3C7]/40">
                <span className="text-[9px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">Stripe Session Token Blueprint</span>
                <p className="text-[11px] font-mono font-semibold text-[#2C2520]/40 break-all bg-[#EAE3DA]/60 p-2 rounded-lg border border-[#DCD3C7]/40">
                  {sessionIdString}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Panel Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DCD3C7] pt-6">
          <p className="text-[11px] font-medium text-[#2C2520]/50 text-center sm:text-left">
            Need payment technical assistance? Direct your support tickets to{" "}
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
              <RefreshCw className="w-4 h-4 animate-reverse-spin" />
              Retry via Dashboard
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}