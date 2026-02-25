import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { User, Shield, Zap, LogOut, CheckCircle2, ChevronRight, Globe, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
    return (
        <AppLayout>
            <div className="mb-12">
                <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">System <span className="gradient-text">Configuration</span></h1>
                <p className="text-[#94A3B8] font-medium opacity-80">Manage your profile permissions and compute allocations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
                {/* Main Settings Area */}
                <div className="space-y-8">
                    {/* Profile Section */}
                    <Card glass className="p-8 group">
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                            <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                <User size={24} />
                            </div>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Identity Core</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Legal Name</label>
                                <input
                                    type="text"
                                    defaultValue="Amit Sharma"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Communications Vector</label>
                                <input
                                    type="email"
                                    defaultValue="amit.sharma@example.com"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all opacity-60"
                                    disabled
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-1">Professional Protocol (Title)</label>
                                <input
                                    type="text"
                                    defaultValue="Senior Frontend Architect"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all"
                                />
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                            <Button variant="primary" size="md" className="h-10 px-8 text-xs font-black uppercase tracking-widest">Synchronize Profile</Button>
                        </div>
                    </Card>

                    {/* Security Section */}
                    <Card glass className="p-8">
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                            <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Access & Security</h2>
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: 'Multi-Factor Validation', desc: 'Add an extra layer of biometric security to your session.', status: 'Inactive', icon: Lock },
                                { title: 'Regional Integrity', desc: 'Restrict access by designated geolocation vectors.', status: 'Global', icon: Globe },
                            ].map((item) => (
                                <div key={item.title} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#64748B] group-hover:text-[#F9FAFB] transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#F9FAFB]">{item.title}</h4>
                                            <p className="text-xs text-[#64748B] font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-white/5 text-[9px] font-black uppercase tracking-widest text-[#64748B]">{item.status}</Badge>
                                        <ChevronRight size={16} className="text-[#374151]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column - Plan & Tokens */}
                <div className="space-y-8">
                    {/* Subscription Card */}
                    <Card glass className="p-8 border-accent-primary/20 bg-accent-primary/[0.03] relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-primary/10 blur-[60px] rounded-full" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-8">
                                <Badge variant="primary" className="text-[9px] font-black uppercase tracking-widest px-3 py-1">Pro Member</Badge>
                                <Zap size={16} className="text-accent-primary animate-pulse" />
                            </div>
                            <div className="mb-10">
                                <div className="text-3xl font-black text-[#F9FAFB] tracking-tighter mb-1">$29<span className="text-sm font-bold opacity-30">/mo</span></div>
                                <p className="text-xs text-[#64748B] font-black uppercase tracking-widest">Intelligence Pro Plan</p>
                            </div>
                            <div className="space-y-4 mb-10">
                                {['Unlimited Rescans', 'Premium AI Coaching', 'Priority Compute'].map(f => (
                                    <div key={f} className="flex items-center gap-2 text-xs font-bold text-[#94A3B8]">
                                        <CheckCircle2 size={12} className="text-accent-success" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" fullWidth className="h-11 border-white/10 text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#F9FAFB]">Adjust Plan</Button>
                        </div>
                    </Card>

                    {/* Token Usage */}
                    <Card glass className="p-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] mb-8">Compute Allocation</h3>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-black text-[#F9FAFB] tracking-wider uppercase">V-84 Tokens</span>
                            <span className="text-xs font-black text-accent-cyan tracking-widest">7,240 / 10,000</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-accent-cyan shadow-[0_0_12px_#22D3EE]" style={{ width: '72%' }} />
                        </div>
                        <p className="text-[10px] text-[#64748B] leading-relaxed font-medium italic">
                            Allocated compute resets in <span className="text-[#F9FAFB] font-bold">14 days, 4 hours</span>.
                        </p>
                        <Button fullWidth className="mt-8 bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-accent-cyan hover:bg-white/10 active:scale-95 transition-all h-11">Buy compute credits</Button>
                    </Card>

                    {/* Destructive Action */}
                    <div className="pt-4">
                        <Button variant="ghost" fullWidth className="text-accent-error hover:bg-accent-error/5 text-[10px] font-black uppercase tracking-widest h-11" icon={<LogOut size={14} />}>Terminate Session</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SettingsPage;
