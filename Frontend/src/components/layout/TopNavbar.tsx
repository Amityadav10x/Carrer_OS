import React, { useState } from 'react';
import { Bell, Search, Hexagon, User } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const TopNavbar: React.FC = () => {
    const [notifications] = useState(3);

    return (
        <header className="fixed top-0 right-0 left-[280px] h-20 bg-[#0B1120]/60 backdrop-blur-xl border-b border-white/5 z-[90] flex items-center justify-between px-10 transition-all duration-300">
            {/* Search - Decorative for UI */}
            <div className="relative group flex-1 max-w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] transition-colors group-hover:text-accent-cyan" size={16} />
                <input
                    type="text"
                    placeholder="Search systems..."
                    className="w-full h-11 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-xs font-bold tracking-widest text-[#F9FAFB] placeholder-[#64748B] focus:outline-none focus:border-accent-cyan/30 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-50">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[8px] font-black">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[8px] font-black">K</kbd>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
                {/* Token Usage Pill */}
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-2xl group hover:border-accent-cyan/30 transition-all cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                        <Hexagon size={16} fill="currentColor" fillOpacity={0.2} />
                    </div>
                    <div>
                        <div className="flex items-center justify-between gap-6 mb-1">
                            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest">Compute Power</span>
                            <span className="text-[9px] font-black text-accent-cyan uppercase tracking-widest">7.2K / 10K</span>
                        </div>
                        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[72%] bg-accent-cyan shadow-[0_0_8px_#22D3EE]" />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-[#F9FAFB] hover:bg-white/10 transition-all border border-white/5">
                    <Bell size={18} />
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-error border-2 border-[#0B1120] flex items-center justify-center text-[9px] font-black text-white animate-in zoom-in">
                            {notifications}
                        </span>
                    )}
                </button>

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-white/5" />

                {/* Brief User Info */}
                <div className="flex items-center gap-4">
                    <div className="text-right flex flex-col items-end">
                        <span className="text-xs font-black text-[#F9FAFB] uppercase tracking-widest">A. Sharma</span>
                        <Badge variant="cyan" className="mt-1 text-[8px] px-1.5 py-0">SYNCIVE</Badge>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-purple p-[1px]">
                        <div className="w-full h-full rounded-[10px] bg-[#0B1120] flex items-center justify-center text-accent-cyan text-sm font-black">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
