import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { CircularProgress } from '../components/ui/CircularProgress';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CheckCircle2, AlertCircle, Sparkles, FileText, Download, Upload, ChevronDown } from 'lucide-react';

const strengths = [
    'Strong React background with 5+ years experience',
    'Expertise in TypeScript and modern state management',
    'Proven track record in building scalable SaaS architectures',
];

const improvements = [
    'Missing Cloud Infrastructure (AWS/GCP) specialized knowledge',
    'Quantifiable metrics in achievement bullets could be stronger',
    'Missing exposure to Next.js App Router patterns',
];

const suggestions = [
    {
        target: 'Experience at TechFlow',
        original: 'Developed front-end components using React and managed state.',
        suggestion: 'Orchestrated the development of a suite of reusable React 19 components, boosting engineer velocity by 40% and reducing bundle size by 15% through strategic code-splitting.',
    },
    {
        target: 'Project: DataViz Pro',
        original: 'Built a dashboard to show data to users.',
        suggestion: 'Engineered a high-performance analytics dashboard using Recharts and Tailwind CSS, processing 1M+ data points in real-time with sub-100ms latency.',
    },
];

export const ResumePage: React.FC = () => {
    // Persistent State Logic
    const [resumeData, setResumeData] = React.useState<{
        score: number,
        lastSync: string,
        fileName: string,
        isScanning: boolean
    }>(() => {
        const saved = localStorage.getItem('career_os_resume_data');
        return saved ? JSON.parse(saved) : {
            score: 84,
            lastSync: '2h ago',
            fileName: 'Resume_v2.pdf',
            isScanning: false
        };
    });

    React.useEffect(() => {
        localStorage.setItem('career_os_resume_data', JSON.stringify(resumeData));
    }, [resumeData]);

    const handleUpload = () => {
        setResumeData(prev => ({ ...prev, isScanning: true }));

        // Simulate AI Scan
        setTimeout(() => {
            setResumeData({
                score: Math.round(85 + Math.random() * 10),
                lastSync: 'Just now',
                fileName: 'Resume_Updated.pdf',
                isScanning: false
            });
        }, 3000);
    };

    return (
        <AppLayout>
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Resume <span className="gradient-text">Intelligence</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">AI-driven analysis and optimization of your professional profile.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="md" icon={<Download size={16} />}>Export PDF</Button>
                    <Button
                        variant="primary"
                        size="md"
                        icon={resumeData.isScanning ? <Sparkles size={16} className="animate-spin" /> : <Upload size={16} />}
                        onClick={handleUpload}
                        disabled={resumeData.isScanning}
                    >
                        {resumeData.isScanning ? 'Scanning...' : 'Update Resume'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                {/* Left Column - Preview & Suggestions */}
                <div className="space-y-8">
                    {/* Resume Preview Card */}
                    <Card glass className="p-0 border-white/5 overflow-hidden">
                        <div className="bg-white/[0.02] border-b border-white/5 px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-accent-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Current Document: {resumeData.fileName}</span>
                            </div>
                            <Badge variant="cyan" className="text-[9px]">Last Sync: {resumeData.lastSync}</Badge>
                        </div>
                        <div className="p-10 text-[#94A3B8] aspect-[1/1.4] bg-[#0B1120]/40 relative">
                            {/* Scanning Overlay */}
                            {resumeData.isScanning && (
                                <div className="absolute inset-0 z-10 bg-[#0B1120]/60 backdrop-blur-sm flex items-center justify-center flex-col gap-6">
                                    <div className="w-16 h-16 rounded-full border-4 border-accent-cyan/20 border-t-accent-cyan animate-spin" />
                                    <div className="text-xs font-black text-accent-cyan uppercase tracking-[0.2em] animate-pulse">Running Neural Analysis...</div>
                                </div>
                            )}

                            {/* Mock Resume Content with skeleton lines for cool look */}
                            <div className="max-w-2xl mx-auto space-y-6">
                                <div className="h-8 w-48 bg-white/5 rounded-lg mb-10" />
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-white/5 rounded" />
                                    <div className="h-4 w-full bg-white/5 rounded" />
                                    <div className="h-4 w-2/3 bg-white/5 rounded" />
                                </div>
                                <div className="pt-10 space-y-3">
                                    <div className="h-6 w-32 bg-white/10 rounded mb-4" />
                                    <div className="h-4 w-full bg-white/5 rounded" />
                                    <div className="h-4 w-full bg-white/5 rounded" />
                                    <div className="h-4 w-1/2 bg-white/5 rounded shadow-[0_0_15px_rgba(79,70,229,0.1)]" />
                                </div>
                            </div>
                            {/* Floating Overlay logic indicator */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1120]/10 to-[#0B1120]/60 flex items-end justify-center pb-20">
                                <div className="px-6 py-3 bg-accent-primary rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(79,70,229,0.6)] cursor-pointer hover:scale-105 transition-transform">
                                    <Sparkles size={16} className="text-white fill-white/20" />
                                    <span className="text-xs font-black uppercase tracking-widest text-white">Toggle AI Overlay View</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* AI Suggestions Header */}
                    <div className="flex items-center gap-3 pt-4 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                            <Sparkles size={16} className="text-accent-purple" />
                        </div>
                        <h2 className="text-xl font-bold text-[#F9FAFB] tracking-tight">AI Optimization Engine</h2>
                    </div>

                    <div className="space-y-4">
                        {suggestions.map((s, i) => (
                            <Card glass key={i} className="group hover:border-accent-purple/30 transition-all p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="purple" className="text-[10px] font-black uppercase tracking-widest">Target: {s.target}</Badge>
                                        <Badge className="bg-white/5 border-white/10 text-[#64748B] text-[9px]">Rank: Optimal</Badge>
                                    </div>
                                    <ChevronDown size={14} className="text-[#64748B] group-hover:text-accent-purple" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#64748B] mb-3">Current Version</h4>
                                        <p className="text-sm text-[#94A3B8] opacity-60 line-through leading-relaxed">{s.original}</p>
                                    </div>
                                    <div className="relative">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-accent-purple mb-3">AI Recommendation</h4>
                                        <div className="absolute -top-1 -right-1">
                                            <Sparkles size={12} className="text-accent-purple animate-pulse" />
                                        </div>
                                        <p className="text-sm text-[#F9FAFB] leading-relaxed font-medium">{s.suggestion}</p>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/5">
                                    <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest">Discard</Button>
                                    <Button size="sm" className="h-9 px-4 text-[10px] uppercase font-black tracking-widest bg-accent-purple hover:bg-accent-purple/80">Apply Update</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Column - Analysis Scorecard */}
                <div className="space-y-6">
                    <Card glass className="flex flex-col items-center py-10">
                        <CircularProgress
                            value={resumeData.score}
                            size={130}
                            strokeWidth={10}
                            color="#4F46E5"
                            label={resumeData.score.toString()}
                            sublabel="OVERALL"
                        />
                        <div className="mt-8 px-5 py-2 bg-accent-success/10 border border-accent-success/20 rounded-full flex items-center gap-2">
                            <TrendingUp size={12} className="text-accent-success" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent-success">System Validated</span>
                        </div>
                    </Card>

                    <Card glass>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB] mb-6 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-accent-success" />
                            Core Strengths
                        </h3>
                        <div className="space-y-4">
                            {strengths.map((s, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-5 h-5 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 size={12} className="text-accent-success" />
                                    </div>
                                    <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">{s}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card glass>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB] mb-6 flex items-center gap-2">
                            <AlertCircle size={14} className="text-accent-warning" />
                            Critical Gains
                        </h3>
                        <div className="space-y-4">
                            {improvements.map((im, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-xl bg-accent-warning/5 border border-accent-warning/20">
                                    <div className="w-5 h-5 rounded-full bg-accent-warning/20 flex items-center justify-center flex-shrink-0 mt-1">
                                        <AlertCircle size={12} className="text-accent-warning" />
                                    </div>
                                    <p className="text-xs text-accent-warning leading-relaxed font-bold opacity-80">{im}</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" fullWidth className="mt-8 border-white/10 text-xs font-bold uppercase tracking-widest text-[#64748B]">
                            Learn to Bridge
                        </Button>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

// Simple internal icon for trend
const TrendingUp = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

export default ResumePage;
