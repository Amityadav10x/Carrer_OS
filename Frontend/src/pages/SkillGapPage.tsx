import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { skills } from '../data/mockData';
import type { Skill } from '../types';
import { Search, ArrowRight, Sparkles, TrendingUp, Info } from 'lucide-react';

export const SkillGapPage: React.FC = () => {
    const skillsYouHave = skills.filter((s: Skill) => s.level >= 70);
    const missingSkills = skills.filter((s: Skill) => s.level < 70 && s.level > 0);
    const marketPriority = [...skills].sort((a: Skill, b: Skill) => b.marketDemand - a.marketDemand);

    return (
        <AppLayout>
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Skill <span className="gradient-text">Delta</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">Quantifying the gap between your current profile and industry benchmarks.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={14} />
                        <input
                            type="text"
                            placeholder="Search skillsets..."
                            className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs font-bold tracking-widest text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all w-64"
                        />
                    </div>
                    <Button variant="primary" size="md" icon={<Sparkles size={16} />}>Identify Roadmap</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Column 1: Skills You Have */}
                <Card glass className="p-8 h-fit">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-success/10 flex items-center justify-center">
                                <TrendingUp size={16} className="text-accent-success" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Confirmed Proficiency</h2>
                        </div>
                        <Badge variant="success" className="text-[9px]">Verified</Badge>
                    </div>
                    <div className="space-y-8">
                        {skillsYouHave.map((skill: Skill) => (
                            <div key={skill.name} className="space-y-3 group">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#94A3B8] group-hover:text-accent-success transition-colors">{skill.name}</span>
                                    <span className="text-xs font-black text-accent-success">{skill.level}%</span>
                                </div>
                                <ProgressBar value={skill.level} color="success" size="sm" />
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" fullWidth className="mt-12 border-white/5 text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#94A3B8]">
                        Rescan Profile
                    </Button>
                </Card>

                {/* Column 2: Missing Skills (Gaps) */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent-warning/10 flex items-center justify-center">
                            <TrendingUp size={16} className="text-accent-warning" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Identified Vulnerabilities</h2>
                    </div>
                    {missingSkills.slice(0, 4).map((skill: Skill) => (
                        <Card key={skill.name} glass hoverable className="p-6 border-accent-warning/5 hover:border-accent-warning/20 group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-[#F9FAFB] mb-1 group-hover:text-accent-warning transition-colors">{skill.name}</h3>
                                    <p className="text-xs text-[#64748B] font-medium leading-relaxed">
                                        Critically low exposure detected. Required for 84% of target roles.
                                    </p>
                                </div>
                                <Badge variant="warning" className="text-[9px]">Critical</Badge>
                            </div>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-[10px] font-black tracking-widest text-[#64748B] uppercase">
                                    <span>Current Level</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <ProgressBar value={skill.level} color="warning" size="sm" />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-[10px] font-black text-accent-cyan uppercase tracking-widest cursor-pointer hover:underline underline-offset-4">
                                    Find Resources <ArrowRight size={14} />
                                </div>
                                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[#64748B] hover:text-[#F9FAFB] transition-colors">
                                    <Info size={12} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Column 3: Market Priority */}
                <Card glass className="p-8 h-fit">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                                <TrendingDownIcon size={16} />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Market Demand Vector</h2>
                        </div>
                        <Badge variant="cyan" className="text-[9px]">Live Data</Badge>
                    </div>
                    <div className="space-y-8">
                        {marketPriority.map((skill: Skill) => (
                            <div key={skill.name} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${skill.level >= 70 ? 'bg-accent-success' : 'bg-accent-warning'}`} />
                                        <span className="text-xs font-black uppercase tracking-widest text-[#94A3B8]">{skill.name}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded leading-none">{skill.marketDemand}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)]" style={{ width: `${skill.marketDemand}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 p-5 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl relative overflow-hidden group hover:bg-accent-primary/10 transition-colors cursor-pointer">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-primary/10 blur-2xl rounded-full" />
                        <p className="text-xs font-black text-[#F9FAFB] uppercase tracking-widest mb-3 relative">AI Optimization Protocol</p>
                        <p className="text-[10px] text-[#94A3B8] font-medium leading-relaxed relative">
                            Generate a specialized roadmap to bridge these 6 critical gaps focused on high-demand market vectors.
                        </p>
                        <Button fullWidth className="mt-6 bg-accent-primary hover:bg-accent-primary/80 h-10 text-[10px] font-black uppercase tracking-widest relative">Generate Roadmap</Button>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
};

// Internal icons
const TrendingDownIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m23 18-9.5-9.5-5 5L1 6" />
        <path d="M17 18h6v-6" />
    </svg>
)

export default SkillGapPage;
