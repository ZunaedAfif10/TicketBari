'use client'
import Link from "next/link";
import { Compass, ShieldCheck, ArrowRight, Ticket } from "@gravity-ui/icons";

export default function GlobalErrorPage() {
    return (
        <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-16 bg-[#F4EFEA]/30 relative overflow-hidden">
            
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] bg-[#EAE3DA] rounded-full filter blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/12 w-[500px] h-[500px] bg-[#4A6761]/5 rounded-full filter blur-3xl opacity-70 pointer-events-none" />

            {/* Main Layout Container */}
            <div className="max-w-5xl w-full bg-[#EAE3DA] border border-[#DCD3C7] rounded-3xl p-8 md:p-16 shadow-md relative z-10">
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#2C2520]/20 rounded-t-3xl"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Heading and Description */}
                    <div className="lg:col-span-7 text-left space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#2C2520]/5 flex items-center justify-center text-[#2C2520]/60 border border-[#DCD3C7] shadow-inner">
                                <Compass className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-[#2C2520]/60 block">
                                    System Disruption
                                </span>
                                <span className="text-[11px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">
                                    Status Code: 500 Execution Fault
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2C2520] tracking-tight leading-tight">
                            Something Went <br />Off Track.
                        </h1>
                        
                        <p className="text-[#2C2520]/70 text-base md:text-lg font-semibold leading-relaxed max-w-2xl">
                            The core layout pipeline encountered an unexpected interruption while rendering this ticket architecture layer. No data configurations have been compromised.
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 max-w-md">
                            <Link
                                href="/"
                                className="flex-1 bg-[#4A6761] hover:bg-[#2C2520] text-[#F4EFEA] px-6 py-4 rounded-xl font-black text-sm transition-all shadow-sm flex items-center justify-center"
                            >
                                Return to Main Terminal
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Platform Safeguards */}
                    <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-[#DCD3C7] pt-8 lg:pt-0 lg:pl-8 text-left">
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#2C2520]/50 px-1">
                            Operational Safeguards
                        </h3>
                        
                        <div className="bg-[#F4EFEA] border border-[#DCD3C7]/60 rounded-xl p-6 space-y-2.5">
                            <div className="flex items-center gap-2 text-[#4A6761]">
                                <ShieldCheck className="w-4 h-4" />
                                <h4 className="font-extrabold text-sm md:text-base text-[#2C2520]">Transaction Integrity</h4>
                            </div>
                            <p className="text-xs md:text-sm text-[#2C2520]/60 font-semibold leading-relaxed">
                                Don't worry—if you were halfway through an active booking payment sequence, database locking layers hold seat selections stable while network sockets reset.
                            </p>
                        </div>

                        <div className="bg-[#F4EFEA] border border-[#DCD3C7]/60 rounded-xl p-6 space-y-2.5">
                            <div className="flex items-center gap-2 text-[#4A6761]">
                                <Ticket className="w-4 h-4" />
                                <h4 className="font-extrabold text-sm md:text-base text-[#2C2520]">Automated Reports</h4>
                            </div>
                            <p className="text-xs md:text-sm text-[#2C2520]/60 font-semibold leading-relaxed">
                                System trace logs have automatically dispatched an error block to administrators to normalize data configurations immediately.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}