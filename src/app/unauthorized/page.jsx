import Link from "next/link";
import { ShieldCheck, ArrowRight, Compass, Ticket } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-[90vh] w-full flex items-center justify-center px-4 py-16 md:py-24 bg-[#F4EFEA]/30 relative overflow-hidden">
            
            {/* Background Decorative Graphic Elements */}
            <div className="absolute top-1/4 left-1/12 w-[600px] h-[600px] bg-[#EAE3DA] rounded-full filter blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/12 w-[600px] h-[600px] bg-[#4A6761]/5 rounded-full filter blur-3xl opacity-70 pointer-events-none" />

            {/* Massive Wide Container */}
            <div className="max-w-5xl w-full bg-[#EAE3DA] border border-[#DCD3C7] rounded-3xl p-8 md:p-16 shadow-md relative z-10">
                
                {/* Visual Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#4A6761] rounded-t-3xl"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Huge Alerts & Headings */}
                    <div className="lg:col-span-7 text-left space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#4A6761]/10 flex items-center justify-center text-[#4A6761] border border-[#4A6761]/20 shadow-inner">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-[#4A6761] block">
                                    Security Firewall
                                </span>
                                <span className="text-[11px] font-bold text-[#2C2520]/40 uppercase tracking-wider block">
                                    Status Code: 401 Restricted
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#2C2520] tracking-tight leading-tight">
                            Access Tokens <br />Are Missing.
                        </h1>
                        
                        <p className="text-[#2C2520]/70 text-base md:text-lg font-semibold leading-relaxed max-w-2xl">
                            Your secure web session does not contain the required encrypted permission parameters needed to cross this point. This route remains restricted to authorized clearance states only.
                        </p>

                        {/* Large Scale Interactive Controls */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 max-w-md">
                            <Link
                                href="/login"
                                className="flex-1 bg-[#4A6761] hover:bg-[#2C2520] text-[#F4EFEA] px-6 py-4 rounded-xl font-black text-sm transition-all shadow-sm flex items-center justify-center space-x-2"
                            >
                                <span>Authenticate Profile</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/"
                                className="flex-1 bg-[#F4EFEA] hover:bg-[#DCD3C7]/60 text-[#2C2520] border border-[#DCD3C7] px-6 py-4 rounded-xl font-black text-sm transition-colors shadow-sm text-center"
                            >
                                Return to Terminal
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Detailed Troubleshooting Grid */}
                    <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-[#DCD3C7] pt-8 lg:pt-0 lg:pl-8 text-left">
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#2C2520]/50 px-1">
                            System Diagnostics Guidance
                        </h3>
                        
                        <div className="bg-[#F4EFEA] border border-[#DCD3C7]/60 rounded-xl p-6 space-y-2.5">
                            <div className="flex items-center gap-2 text-[#4A6761]">
                                <Ticket className="w-4 h-4" />
                                <h4 className="font-extrabold text-sm md:text-base text-[#2C2520]">Role Overlap Flag</h4>
                            </div>
                            <p className="text-xs md:text-sm text-[#2C2520]/60 font-semibold leading-relaxed">
                                Administrative route structures require full profile tags. If you are a team moderator, verify that your assigned permissions match your current active login session.
                            </p>
                        </div>

                        <div className="bg-[#F4EFEA] border border-[#DCD3C7]/60 rounded-xl p-6 space-y-2.5">
                            <div className="flex items-center gap-2 text-[#4A6761]">
                                <Compass className="w-4 h-4" />
                                <h4 className="font-extrabold text-sm md:text-base text-[#2C2520]">Stale Security States</h4>
                            </div>
                            <p className="text-xs md:text-sm text-[#2C2520]/60 font-semibold leading-relaxed">
                                Local tokens degrade automatically over time to defend system memory. Terminating your current session state and signing back in fresh will re-allocate active clearance layers.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}