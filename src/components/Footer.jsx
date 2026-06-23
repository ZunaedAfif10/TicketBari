import Link from "next/link";
import {
    Plane,
    Envelope,
    Smartphone,
    LogoFacebook,
    ChevronRight
} from "@gravity-ui/icons";

export default function Footer() {
    return (
        // FOOTER BACKGROUND: Warm Oatmeal (#EAE3DA)
        <footer className="bg-[#EAE3DA] text-[#2C2520] border-t border-[#DCD3C7] pt-12 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 4 Columns Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-[#DCD3C7]">

                    {/* Column 1: Brand & Description */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2 text-xl font-extrabold text-[#4A6761] tracking-tight">
                            <Plane className="w-6 h-6" />
                            <span>TicketBari</span>
                        </Link>
                        <p className="text-sm font-medium text-[#2C2520]/80 leading-relaxed max-w-xs">
                            Book bus, train, launch & flight tickets easily all in one secure platform.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-extrabold text-[#4A6761] uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="/" className="text-sm font-semibold hover:text-[#4A6761] transition flex items-center gap-1 group">
                                    <ChevronRight className="w-4 h-4 text-[#4A6761] transition-transform group-hover:translate-x-0.5" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tickets" className="text-sm font-semibold hover:text-[#4A6761] transition flex items-center gap-1 group">
                                    <ChevronRight className="w-4 h-4 text-[#4A6761] transition-transform group-hover:translate-x-0.5" />
                                    <span>All Tickets</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm font-semibold hover:text-[#4A6761] transition flex items-center gap-1 group">
                                    <ChevronRight className="w-4 h-4 text-[#4A6761] transition-transform group-hover:translate-x-0.5" />
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm font-semibold hover:text-[#4A6761] transition flex items-center gap-1 group">
                                    <ChevronRight className="w-4 h-4 text-[#4A6761] transition-transform group-hover:translate-x-0.5" />
                                    <span>About Us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-sm font-extrabold text-[#4A6761] uppercase tracking-wider mb-4">Contact Info</h3>
                        <ul className="space-y-3 text-sm font-semibold">
                            <li className="flex items-center space-x-2.5">
                                <Envelope className="w-4 h-4 text-[#4A6761]" />
                                <span className="text-[#2C2520]/90">support@ticketbari.com</span>
                            </li>
                            <li className="flex items-center space-x-2.5">
                                <Smartphone className="w-4 h-4 text-[#4A6761]" />
                                <span className="text-[#2C2520]/90">+880 1234-567890</span>
                            </li>
                            <li className="flex items-center space-x-2.5">
                                <LogoFacebook className="w-4 h-4 text-[#4A6761]" />
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A6761] transition">
                                    TicketBari Page
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Payment Methods */}
                    <div>
                        <h3 className="text-sm font-extrabold text-[#4A6761] uppercase tracking-wider mb-4">Payment Methods</h3>
                        <div className="flex flex-wrap gap-2 max-w-[240px]">
                            {/* STRIPE */}
                            <div className="bg-[#FFFFFF]/60 backdrop-blur-sm border border-[#DCD3C7] px-3 py-1.5 rounded-md flex items-center justify-center font-bold text-[10px] tracking-widest text-[#635BFF] shadow-sm transition-all duration-200 hover:bg-[#FFFFFF] hover:border-[#635BFF]/30 hover:scale-105 cursor-default select-none">
                                STRIPE
                            </div>
                            {/* bKash */}
                            <div className="bg-[#FFFFFF]/60 backdrop-blur-sm border border-[#DCD3C7] px-3 py-1.5 rounded-md flex items-center justify-center font-black text-[11px] tracking-wide text-[#D12053] shadow-sm transition-all duration-200 hover:bg-[#FFFFFF] hover:border-[#D12053]/30 hover:scale-105 cursor-default select-none">
                                bKash
                            </div>
                            {/* Nagad */}
                            <div className="bg-[#FFFFFF]/60 backdrop-blur-sm border border-[#DCD3C7] px-3 py-1.5 rounded-md flex items-center justify-center font-bold text-[11px] tracking-wide text-[#F15A22] shadow-sm transition-all duration-200 hover:bg-[#FFFFFF] hover:border-[#F15A22]/30 hover:scale-105 cursor-default select-none">
                                Nagad
                            </div>
                            {/* VISA */}
                            <div className="bg-[#FFFFFF]/60 backdrop-blur-sm border border-[#DCD3C7] px-3 py-1.5 rounded-md flex items-center justify-center font-extrabold text-[10px] tracking-wider text-[#1A1F71] shadow-sm transition-all duration-200 hover:bg-[#FFFFFF] hover:border-[#1A1F71]/30 hover:scale-105 cursor-default select-none">
                                VISA
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-[#2C2520]/70 space-y-2 md:space-y-0">
                    <div>
                        &copy; 2026 TicketBari. All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/privacy" className="hover:text-[#4A6761] transition">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#4A6761] transition">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}