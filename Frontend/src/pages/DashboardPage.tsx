import React from 'react';
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { CircularProgress } from '../components/ui/CircularProgress';
import { Badge } from '../components/ui/Badge';
import { mockRadarData, mockTrendData, mockActivity } from '../data/mockData';
import { TrendingUp, Clock, FileText, MessageSquare, Map, BarChart3, ArrowUpRight } from 'lucide-react';

const activityIcons = {
    resume: FileText,
    interview: MessageSquare,
    roadmap: Map,
    skill: BarChart3,
};

const activityColors = {
    resume: '#4F46E5',
    interview: '#10B981',
    roadmap: '#22D3EE',
    skill: '#8B5CF6',
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#1F2937]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                <p className="text-[10px] uppercase tracking-widest text-[#64748B] mb-2 font-black">{label}</p>
                {payload.map((p: any) => (
                    <div key={p.name} className="flex items-center gap-2 mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.stroke }} />
                        <p className="text-sm font-bold text-[#F9FAFB]">
                            {p.name}: <span className="text-accent-cyan">{p.value}</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export const DashboardPage: React.FC = () => {
    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good Morning';
        if (h < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <AppLayout>
            {/* Header Section */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">
                        {getGreeting()}, <span className="gradient-text">Amit 👋</span>
                    </h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">Track your intelligence growth and career velocity.</p>
                </div>
                <div className="flex gap-3">
                    <Card glass className="py-2 px-4 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse shadow-[0_0_8px_#10B981]" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#F9FAFB]">Systems Online</span>
                    </Card>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Resume Score */}
                <Card glass hoverable className="flex flex-col items-center py-8">
                    <CircularProgress
                        value={84}
                        size={110}
                        strokeWidth={8}
                        color="#4F46E5"
                        sublabel="INTELLIGENCE"
                    />
                    <div className="mt-6 text-center">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B] mb-1">Resume Score</p>
                        <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-accent-success/10 rounded-full">
                            <TrendingUp size={12} className="text-accent-success" />
                            <span className="text-[10px] text-accent-success font-black uppercase tracking-widest">+12 Gain</span>
                        </div>
                    </div>
                </Card>

                {/* Skill Gaps */}
                <Card glass hoverable>
                    <div className="flex items-start justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Critical Gaps</span>
                        <Badge variant="warning" className="px-2 py-0.5 text-[10px]">Action Required</Badge>
                    </div>
                    <div className="text-5xl font-black text-accent-warning mb-3">06</div>
                    <p className="text-sm text-[#94A3B8] font-medium mb-6">Identify & Bridge key technical vulnerabilities.</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-[#64748B] uppercase">
                            <span>Coverage</span>
                            <span>40%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[40%] bg-gradient-to-r from-accent-warning to-yellow-300 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                        </div>
                    </div>
                </Card>

                {/* Interview Success */}
                <Card glass hoverable>
                    <div className="flex items-start justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Interview Avg</span>
                        <Badge variant="success" className="px-2 py-0.5 text-[10px]">Exceptional</Badge>
                    </div>
                    <div className="text-5xl font-black text-accent-success mb-3">78<span className="text-2xl opacity-50">%</span></div>
                    <p className="text-sm text-[#94A3B8] font-medium mb-6">Aggregate performance across 14 simulations.</p>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <span className="text-xs font-bold text-accent-success underline decoration-dotted group-hover:no-underline">View Performance Logs</span>
                        <ArrowUpRight size={14} className="text-accent-success transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </Card>

                {/* Roadmap Velocity */}
                <Card glass hoverable>
                    <div className="flex items-start justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Roadmap Velocity</span>
                        <Badge variant="cyan" className="px-2 py-0.5 text-[10px]">Optimal</Badge>
                    </div>
                    <div className="text-5xl font-black text-accent-cyan mb-3">37<span className="text-2xl opacity-50">%</span></div>
                    <p className="text-sm text-[#94A3B8] font-medium mb-6">Phase 1 integration nearing completion.</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-[#64748B] uppercase">
                            <span>Completion</span>
                            <span>3/9 Stages</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[37%] bg-gradient-to-r from-accent-cyan to-blue-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Analytics Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Skill Radar */}
                <Card glass className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Architecture Radar</h3>
                        <Badge className="bg-white/5 border-white/10 text-[#64748B] text-[10px]">Live Profile</Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={mockRadarData}>
                            <PolarGrid stroke="#374151" strokeDasharray="4 4" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }} />
                            <Radar
                                name="Proficiency"
                                dataKey="value"
                                stroke="#4F46E5"
                                strokeWidth={3}
                                fill="#4F46E5"
                                fillOpacity={0.15}
                            />
                            <Tooltip content={<CustomTooltip />} />
                        </RadarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Evaluation Trend */}
                <Card glass className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Improvement Velocity</h3>
                        <Badge className="bg-white/5 border-white/10 text-[#64748B] text-[10px]">Year to Date</Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={mockTrendData}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="score"
                                name="Performance"
                                stroke="#4F46E5"
                                strokeWidth={4}
                                dot={{ fill: '#4F46E5', stroke: '#0B1120', strokeWidth: 2, r: 6 }}
                                activeDot={{ r: 8, strokeWidth: 0, fill: '#22D3EE' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="average"
                                name="Benchmark"
                                stroke="#1F2937"
                                strokeWidth={2}
                                strokeDasharray="8 8"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Activity Log */}
            <Card glass className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Global Activity Log</h3>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_8px_#4F46E5]" />
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:text-accent-cyan transition-colors">Audit Full History</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockActivity.map((item) => {
                        const Icon = activityIcons[item.type as keyof typeof activityIcons];
                        const color = activityColors[item.type as keyof typeof activityColors];
                        return (
                            <div key={item.id} className="group flex items-center gap-4 p-4 rounded-2xl bg-[#0B1120]/40 border border-white/5 hover:border-white/10 hover:bg-[#111827]/60 transition-all duration-300">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                    style={{ background: `${color}15`, border: `1px solid ${color}30`, boxShadow: `0 8px 15px ${color}15` }}
                                >
                                    <Icon size={20} style={{ color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-black text-[#F9FAFB] tracking-tight">{item.title}</p>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#64748B] flex items-center gap-1">
                                            <Clock size={10} />
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#94A3B8] font-medium truncate opacity-70 group-hover:opacity-100 transition-opacity">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </AppLayout>
    );
};

export default DashboardPage;
