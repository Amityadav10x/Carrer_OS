import React from 'react';
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
    BarChart, Bar, Cell,
    PieChart, Pie,
} from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockRadarData, mockTrendData } from '../data/mockData';
import { Target, Award, Flame, MousePointer2 } from 'lucide-react';

const barData = [
    { name: 'Week 1', apps: 12, callbacks: 2 },
    { name: 'Week 2', apps: 18, callbacks: 4 },
    { name: 'Week 3', apps: 15, callbacks: 3 },
    { name: 'Week 4', apps: 22, callbacks: 8 },
];

const pieData = [
    { name: 'Applied', value: 400, color: '#4F46E5' },
    { name: 'Interviewing', value: 300, color: '#22D3EE' },
    { name: 'Offered', value: 100, color: '#10B981' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#1F2937]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#64748B] mb-2 uppercase">{label}</p>
                {payload.map((p: any) => (
                    <div key={p.name} className="flex items-center gap-2 mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.fill || p.stroke }} />
                        <p className="text-sm font-bold text-[#F9FAFB] uppercase tracking-wider">
                            {p.name}: <span className="text-accent-cyan">{p.value}</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export const AnalyticsPage: React.FC = () => {
    const [filter, setFilter] = React.useState<'7d' | '15d' | '30d'>('30d');

    // Simulated data switching based on filters
    const getMultiplier = () => {
        if (filter === '7d') return 0.4;
        if (filter === '15d') return 0.7;
        return 1;
    };

    const multiplier = getMultiplier();

    // KPI Data (Simulated)
    const kpis = {
        delta: Math.round(32 * multiplier),
        practice: Math.round(142 * multiplier),
        streak: filter === '7d' ? 5 : filter === '15d' ? 8 : 12
    };

    return (
        <AppLayout>
            <div className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">System <span className="gradient-text">Diagnostics</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">Comprehensive performance analysis of your career trajectory.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-[#1F2937]/50 p-1 rounded-xl border border-white/5">
                        {(['7d', '15d', '30d'] as const).map((period) => (
                            <button
                                key={period}
                                onClick={() => setFilter(period)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === period
                                    ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20'
                                    : 'text-[#64748B] hover:text-[#94A3B8]'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card glass className="p-8 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] mb-4">Improvement Delta</p>
                            <div className="text-5xl font-black text-[#F9FAFB] tracking-tighter mb-4">+{kpis.delta}%</div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-accent-success/10 flex items-center justify-center text-accent-success shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Target size={24} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-accent-success">
                        <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                        <span>Above Industry Benchmark</span>
                    </div>
                </Card>

                <Card glass className="p-8 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] mb-4">Practice Count</p>
                            <div className="text-5xl font-black text-[#F9FAFB] tracking-tighter mb-4">{kpis.practice}</div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                            <Award size={24} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-[#64748B]">
                        <span>Total simulation cycles</span>
                    </div>
                </Card>

                <Card glass className="p-8 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-warning/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] mb-4">Execution Streak</p>
                            <div className="text-5xl font-black text-[#F9FAFB] tracking-tighter mb-4">{kpis.streak} <span className="text-2xl opacity-30 uppercase font-black tracking-widest">Days</span></div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-accent-warning/10 flex items-center justify-center text-accent-warning shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <Flame size={24} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-accent-warning">
                        <div className="w-2 h-2 rounded-full bg-accent-warning animate-pulse" />
                        <span>Active streak maintained</span>
                    </div>
                </Card>
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 mb-10">
                <Card glass className="p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Progress Velocity Vector</h3>
                        <Badge className="bg-white/5 border-white/10 text-accent-cyan text-[10px] uppercase font-black tracking-widest px-3">Aggregated Data</Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={mockTrendData.slice(filter === '7d' ? -3 : filter === '15d' ? -5 : 0)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                            <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="score"
                                name="Performance"
                                stroke="#4F46E5"
                                strokeWidth={5}
                                dot={{ fill: '#4F46E5', stroke: '#0B1120', strokeWidth: 2, r: 6 }}
                                activeDot={{ r: 10, fill: '#22D3EE', strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card glass className="p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Funnel Conversion</h3>
                        <Badge className="bg-white/5 border-white/10 text-[#64748B] text-[10px] font-black uppercase tracking-widest px-3">Pipeline</Badge>
                    </div>
                    <div className="h-[400px] flex flex-col items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="80%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <div className="text-3xl font-black text-[#F9FAFB] tracking-tighter">80%</div>
                            <div className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Efficiency</div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 w-full mt-auto">
                            {pieData.map(d => (
                                <div key={d.name} className="text-center group cursor-pointer">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-[#64748B] mb-2 group-hover:text-[#F9FAFB] transition-colors">{d.name}</div>
                                    <div className="text-sm font-black" style={{ color: d.color }}>{d.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                <Card glass className="p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Market Demand Response</h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-accent-cyan transition-colors flex items-center gap-2">
                            <MousePointer2 size={12} />
                            Refetch Vector
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData.slice(filter === '7d' ? -2 : filter === '15d' ? -3 : 0)}>
                            <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="apps" name="Applications" fill="rgba(79,70,229,0.3)" stroke="#4F46E5" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="callbacks" name="Interviews" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card glass className="p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Skill Saturation</h3>
                        <Badge className="bg-white/5 border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest">Neural Link</Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={mockRadarData}>
                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 9, fontWeight: 700 }} />
                            <Radar
                                name="Proficiency"
                                dataKey="value"
                                stroke="#4F46E5"
                                fill="#4F46E5"
                                fillOpacity={0.2}
                            />
                            <Tooltip content={<CustomTooltip />} />
                        </RadarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </AppLayout>
    );
};

export default AnalyticsPage;
