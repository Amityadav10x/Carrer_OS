import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { milestones } from '../data/mockData';
import type { Milestone } from '../types';
import { Map, Calendar, ExternalLink, CheckCircle2, Circle, ChevronRight, Zap, MessageSquare, ArrowRight } from 'lucide-react';

export const RoadmapPage: React.FC = () => {
    const navigate = useNavigate();
    const phases = [
        { title: 'Phase 1: Foundation & Core Systems', days: '30 Days', range: [0, 2] },
        { title: 'Phase 2: Specialized Integration', days: '60 Days', range: [3, 5] },
        { title: 'Phase 3: Advanced Optimization', days: '90 Days', range: [6, 8] },
    ];

    return (
        <AppLayout>
            <div className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Career <span className="gradient-text">Vector</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">90-day autonomous execution plan based on your current skill delta.</p>
                </div>
                <Card glass className="py-3 px-6 flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Execution Velocity</span>
                        <span className="text-sm font-black text-accent-cyan tracking-wider">High (0.8x)</span>
                    </div>
                    <div className="w-px h-8 bg-white/5" />
                    <Button variant="primary" size="sm" className="h-9 px-4 text-[10px] uppercase font-black tracking-widest">Update Plan</Button>
                </Card>
            </div>

            {/* Overall Progress */}
            <Card glass className="mb-12 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-[0_0_20px_rgba(79,70,229,0.2)]">
                            <Map size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#F9FAFB] mb-1">Global Milestone Coverage</h2>
                            <p className="text-sm text-[#94A3B8] font-medium">Stage 3 of 9 synchronized. Optimal progress detected.</p>
                        </div>
                    </div>
                    <div className="flex-1 max-w-md w-full">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">System Completion</span>
                            <span className="text-sm font-black text-accent-cyan tracking-widest">37%</span>
                        </div>
                        <ProgressBar value={37} color="cyan" size="md" />
                    </div>
                </div>
            </Card>

            {/* Vertical Timeline */}
            <div className="relative pl-10 md:pl-0 space-y-20">
                {/* Visual Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-primary via-accent-cyan to-accent-purple rounded-full opacity-20 hidden md:block" />

                {phases.map((phase) => (
                    <div key={phase.title} className="relative">
                        {/* Phase Header */}
                        <div className="flex items-center justify-center mb-12 relative z-10">
                            <div className="px-6 py-2 rounded-full bg-[#1F2937] border border-[#4F46E5]/30 shadow-[0_0_20px_rgba(79,70,229,0.15)] flex items-center gap-3">
                                <Zap size={14} className="text-accent-primary" />
                                <span className="text-xs font-black uppercase tracking-widest text-[#F9FAFB]">{phase.title}</span>
                                <Badge variant="primary" className="text-[8px] px-2 py-0 border-white/10 uppercase tracking-widest">{phase.days}</Badge>
                            </div>
                        </div>

                        {/* Milestones for this phase */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10">
                            {milestones.slice(phase.range[0], phase.range[1] + 1).map((m: Milestone, idx: number) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <div key={m.id} className={`relative group ${isEven ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4 md:col-start-2'}`}>
                                        {/* Dot on timeline */}
                                        <div className="absolute top-10 flex items-center justify-center
                                            md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                                            left-[-46px] z-20 transition-all duration-300 group-hover:scale-125">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 shadow-lg transition-all
                                                ${m.status === 'completed'
                                                    ? 'bg-accent-success/20 border-accent-success shadow-accent-success/20'
                                                    : m.status === 'in-progress'
                                                        ? 'bg-accent-primary/20 border-accent-primary animate-pulse shadow-accent-primary/20'
                                                        : 'bg-bg-main border-white/10'
                                                }`}>
                                                {m.status === 'completed' ? (
                                                    <CheckCircle2 size={16} className="text-accent-success" />
                                                ) : m.status === 'in-progress' ? (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_8px_#4F46E5]" />
                                                ) : (
                                                    <Circle size={12} className="text-[#64748B]" />
                                                )}
                                            </div>
                                        </div>

                                        <Card glass hoverable className={`p-8 border-white/5 hover:border-white/10 relative overflow-hidden ${m.status === 'in-progress' ? 'ring-1 ring-accent-primary/30' : ''}`}>
                                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight size={16} className="text-accent-cyan" />
                                            </div>
                                            <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                                                <Badge
                                                    variant={m.status === 'completed' ? 'success' : m.status === 'in-progress' ? 'primary' : 'cyan'}
                                                    className="text-[9px] font-black uppercase tracking-widest py-1"
                                                >
                                                    {m.status}
                                                </Badge>
                                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest flex items-center gap-1.5">
                                                    <Calendar size={12} />
                                                    {m.targetDate}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-black text-[#F9FAFB] mb-2 tracking-tight">{m.title}</h4>
                                            <p className="text-xs text-[#94A3B8] mb-6 font-medium leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">
                                                Bridge the <span className="text-accent-cyan font-bold">{m.skill}</span> gap using designated system resources.
                                            </p>
                                            <div className={`space-y-4 mb-8 ${isEven ? 'md:items-end' : ''}`}>
                                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#64748B] mb-1.5 min-w-[120px]">
                                                    <span>Sync Progress</span>
                                                    <span>{m.progress}%</span>
                                                </div>
                                                <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full max-w-[200px]">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${m.status === 'completed' ? 'bg-accent-success' : 'bg-accent-primary'
                                                            }`}
                                                        style={{ width: `${m.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`flex items-center gap-4 ${isEven ? 'md:justify-end' : ''}`}>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-[#64748B] hover:text-accent-cyan cursor-pointer transition-colors group/link">
                                                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5" />
                                                    View Resource
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA for Interview Prep */}
            <div className="mt-20 max-w-4xl mx-auto">
                <Card glass className="p-8 md:p-12 border-accent-cyan/10 bg-accent-cyan/[0.02] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                    <MessageSquare size={20} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent-cyan">Next Protocol</span>
                            </div>
                            <h2 className="text-3xl font-black text-[#F9FAFB] mb-4 tracking-tight">Evolve to Interview <span className="gradient-text">Simulation</span></h2>
                            <p className="text-[#94A3B8] font-medium leading-relaxed">
                                Your skills are synchronized. The next optimal step is to stress-test your knowledge in our AI-driven interview environment.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <Button
                                onClick={() => navigate('/interview')}
                                size="lg"
                                className="h-14 px-10 text-xs font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(34,211,238,0.2)] hover:shadow-[0_15px_50px_rgba(34,211,238,0.3)]"
                                icon={<ArrowRight size={18} />}
                            >
                                Start Interview
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
};

export default RoadmapPage;
