import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, BarChart3, Map, MessageSquare, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const features = [
    {
        icon: BarChart3,
        title: 'AI Resume Analyzer',
        description:
            'Get instant AI-powered analysis of your resume. Identify strengths, gaps, and receive targeted rewrite suggestions aligned to job descriptions.',
        badge: 'Powered by GPT-4',
        color: '#4F46E5',
    },
    {
        icon: Map,
        title: 'Personalized Roadmap',
        description:
            'Receive a 30-60-90 day skill development roadmap tailored to your target role, current skills, and market demand.',
        badge: 'Custom to You',
        color: '#22D3EE',
    },
    {
        icon: MessageSquare,
        title: 'Smart Interview Coach',
        description:
            'Practice with an AI interviewer that evaluates your answers, tracks improvement over time, and provides real-time scoring.',
        badge: 'Real-time Feedback',
        color: '#8B5CF6',
    },
];

const pricingPlans = [
    {
        name: 'Free',
        price: '$0',
        period: '/month',
        features: [
            '1 Resume Analysis',
            'Basic Skill Assessment',
            '5 Interview Questions / month',
            'Standard Roadmap',
            'Email Support',
        ],
        highlighted: false,
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/month',
        features: [
            'Unlimited Resume Analyses',
            'Advanced AI Skill Gap Detection',
            'Unlimited Interview Practice',
            'Personalized 90-Day Roadmap',
            'Analytics Dashboard',
            'Priority AI Support',
            '10,000 AI Tokens / month',
        ],
        highlighted: true,
    },
];

const DashboardPreview: React.FC = () => (
    <div className="relative w-full max-w-[540px]">
        {/* Glow behind preview */}
        <div className="absolute inset-0 -z-10 blur-[100px] bg-gradient-to-br from-[#4F46E5]/40 via-[#22D3EE]/20 to-transparent rounded-full" />
        <Card glass className="p-0 overflow-hidden shadow-2xl border-white/10 ring-1 ring-white/5">
            {/* Mockup header */}
            <div className="h-10 bg-[#111827]/80 flex items-center gap-2 px-4 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                </div>
                <div className="ml-auto flex gap-4">
                    <div className="w-16 h-1.5 rounded bg-white/5" />
                    <div className="w-20 h-1.5 rounded bg-white/5" />
                </div>
            </div>
            <div className="p-6">
                {/* Mock metric row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Resume Score', value: '84', color: '#4F46E5' },
                        { label: 'Interview Avg', value: '78%', color: '#10B981' },
                        { label: 'Skills Gaps', value: '6', color: '#F59E0B' },
                    ].map((m) => (
                        <div key={m.label} className="bg-bg-main/50 rounded-xl p-3 border border-white/5">
                            <div className="text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold">{m.label}</div>
                            <div className="text-xl font-bold" style={{ color: m.color }}>{m.value}</div>
                        </div>
                    ))}
                </div>
                {/* Mock radar placeholder */}
                <div className="bg-bg-main/50 rounded-xl p-5 border border-white/5 mb-5">
                    <div className="text-xs text-[#94A3B8] font-semibold mb-4">Skill Proficiency</div>
                    <div className="flex items-end justify-between h-24 gap-2">
                        {[70, 85, 45, 90, 60, 50, 75].map((h, i) => (
                            <div key={i} className="flex-1 rounded-t-md relative group" style={{
                                height: `${h}%`,
                                background: `linear-gradient(to top, #4F46E5, #22D3EE)`,
                                boxShadow: `0 0 15px ${i % 2 === 0 ? '#4F46E533' : '#22D3EE33'}`
                            }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1F2937] text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mock activity */}
                <div className="space-y-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold px-1">Recent Activity</div>
                    {['Resume Analyzed — Score: 84', 'Mock Interview Completed — 82%'].map((text, i) => (
                        <div key={text} className="flex items-center gap-3 text-xs text-[#94A3B8] bg-white/5 p-2.5 rounded-lg border border-white/5">
                            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#4F46E5]' : 'bg-[#22D3EE]'} shadow-[0_0_8px_rgba(79,70,229,0.5)]`} />
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    </div>
);

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0B1120] text-text-primary overflow-x-hidden selection:bg-accent-primary/30">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#0B1120]/60 backdrop-blur-xl transition-all duration-300">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between px-12 py-5">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#22D3EE] flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all">
                            <Zap size={20} className="text-white fill-white/20" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            <span className="text-[#F9FAFB]">CareerOS</span>
                            <span className="text-[#22D3EE]"> AI</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-medium text-[#94A3B8] hover:text-[#F9FAFB] transition-colors relative group">
                                Features
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full" />
                            </a>
                            <a href="#pricing" className="text-sm font-medium text-[#94A3B8] hover:text-[#F9FAFB] transition-colors relative group">
                                Pricing
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full" />
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/login')} className="text-sm font-semibold text-[#F9FAFB] hover:text-accent-cyan transition-colors px-4 py-2">Sign In</button>
                            <Button size="md" onClick={() => navigate('/signup')} className="shadow-[0_0_20px_rgba(79,70,229,0.3)]">Get Started</Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-12 max-w-[1440px] mx-auto min-h-screen flex items-center">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-accent-cyan/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-start translate-y-[-20px]">
                        <Badge variant="primary" className="mb-8 px-4 py-1.5 bg-accent-primary/10 border-accent-primary/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Sparkles size={14} className="mr-2 text-accent-cyan" />
                            <span className="text-xs uppercase tracking-widest font-bold">New: Enterprise AI Integration</span>
                        </Badge>
                        <h1 className="text-6xl font-black text-[#F9FAFB] leading-[1.1] mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            Your Autonomous <br />
                            <span className="gradient-text py-2">AI Career</span> <br />
                            Operating System
                        </h1>
                        <p className="text-2xl text-[#F9FAFB] mb-4 font-semibold opacity-90 tracking-tight">
                            Analyze. Improve. Practice. Evolve.
                        </p>
                        <p className="text-lg text-[#94A3B8] mb-12 leading-relaxed max-w-lg font-medium opacity-80">
                            CareerOS AI analyzes your profile, identifies skill gaps, builds a 90-day roadmap,
                            and coaches you through mock interviews — all in one unified platform.
                        </p>
                        <div className="flex items-center gap-5 flex-wrap">
                            <Button
                                size="lg"
                                onClick={() => navigate('/roadmap')}
                                className="h-14 px-8 text-base shadow-[0_0_30px_rgba(79,70,229,0.35)] hover:shadow-[0_0_45px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-1"
                                icon={<Map size={20} />}
                            >
                                Generate Roadmap
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/interview')}
                                className="h-14 px-8 text-base border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transform hover:-translate-y-1 transition-all"
                                icon={<MessageSquare size={20} className="text-accent-cyan" />}
                            >
                                Practice Interview
                            </Button>
                        </div>
                        <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/5 w-full">
                            {[
                                { t: 'No Credit Card', icon: CheckCircle2 },
                                { t: 'Free Forever Plan', icon: CheckCircle2 },
                                { t: 'AI Verified', icon: Sparkles }
                            ].map(({ t, icon: Icon }) => (
                                <div key={t} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#64748B]">
                                    <Icon size={14} className="text-accent-success" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Preview */}
                    <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
                        <DashboardPreview />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-12 max-w-[1440px] mx-auto relative">
                <div className="text-center mb-24 max-w-2xl mx-auto">
                    <Badge variant="cyan" className="mb-6 uppercase tracking-[0.2em] font-black py-1.5 px-4 bg-accent-cyan/10 border-accent-cyan/30">Intelligence</Badge>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#F9FAFB] mb-6 tracking-tight">Everything You Need to Land Your Dream Role</h2>
                    <p className="text-xl text-[#94A3B8] leading-relaxed font-medium">
                        An end-to-end AI-powered career acceleration platform that works 24/7 on your behalf.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(({ icon: Icon, title, description, badge, color }) => (
                        <Card key={title} glass hoverable className="group p-8 border-white/5 hover:border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:scale-110"
                                style={{ background: `${color}15`, border: `1px solid ${color}30`, boxShadow: `0 8px 30px ${color}1a` }}
                            >
                                <Icon size={26} style={{ color }} />
                            </div>
                            <div style={{ color: color }}>
                                <Badge className="mb-6 py-1 px-3 bg-white/5 border-white/10 uppercase tracking-widest text-[10px] font-black">
                                    {badge}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4 group-hover:text-accent-cyan transition-colors">{title}</h3>
                            <p className="text-[#94A3B8] leading-relaxed font-medium text-sm opacity-80 group-hover:opacity-100 transition-opacity">{description}</p>
                            <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest cursor-pointer hover:gap-4 transition-all" style={{ color: color }}>
                                Explore Feature <ArrowRight size={16} />
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pricing Section split into more visual layout */}
            <section id="pricing" className="py-32 px-12 max-w-[1440px] mx-auto relative bg-[#0B1120]/40 rounded-[40px] border border-white/5 mb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent -z-10" />
                <div className="text-center mb-24">
                    <Badge variant="purple" className="mb-6 uppercase tracking-[0.2em] font-black py-1.5 px-4 bg-accent-purple/10 border-accent-purple/30">Plans</Badge>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#F9FAFB] mb-6 tracking-tight">Flexible Intelligence</h2>
                    <p className="text-xl text-[#94A3B8] font-medium">Start free. Upgrade when you're ready to accelerate.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[960px] mx-auto">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-[32px] p-10 border transition-all duration-500 hover:-translate-y-2 ${plan.highlighted
                                ? 'bg-[#1F2937]/40 border-accent-primary/40 shadow-[0_40px_100px_rgba(79,70,229,0.15)] ring-1 ring-accent-primary/20'
                                : 'bg-[#1F2937]/20 border-white/5 hover:border-white/10'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-primary px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent-primary/30">
                                    Highly Recommended
                                </div>
                            )}
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2">{plan.name}</h3>
                                    <p className="text-sm text-[#64748B] font-medium">For {plan.name === 'Free' ? 'early explorers' : 'career accelerators'}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-4xl font-black text-[#F9FAFB]">{plan.price}</span>
                                        <span className="text-sm text-[#64748B] font-bold">{plan.period}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 mb-12">
                                {plan.features.map((f) => (
                                    <div key={f} className="flex items-center gap-4 text-sm font-medium text-[#94A3B8]">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-accent-primary/20' : 'bg-white/5'}`}>
                                            <CheckCircle2 size={12} className={plan.highlighted ? 'text-accent-primary' : 'text-accent-success'} />
                                        </div>
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant={plan.highlighted ? 'primary' : 'outline'}
                                size="lg"
                                fullWidth
                                onClick={() => navigate('/dashboard')}
                                className={`h-14 font-black uppercase tracking-widest text-xs transition-all ${plan.highlighted ? 'shadow-xl shadow-accent-primary/20' : 'border-white/10 hover:border-white/30'}`}
                            >
                                {plan.highlighted ? 'Get Access Now' : 'Join Free'}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sticky Footer CTA or simple footer */}
            <footer className="border-t border-white/5 py-16 px-12 bg-[#0B1120]">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#22D3EE] flex items-center justify-center">
                                    <Zap size={16} className="text-white fill-white/20" />
                                </div>
                                <span className="text-[#F9FAFB] text-lg font-bold">CareerOS AI</span>
                            </div>
                            <p className="text-sm text-[#64748B] max-w-xs text-center md:text-left font-medium">
                                The world's first autonomous AI career operating system.
                            </p>
                        </div>
                        <div className="flex gap-12 text-sm font-bold uppercase tracking-widest text-[#64748B]">
                            <a href="#" className="hover:text-accent-cyan transition-colors">Platform</a>
                            <a href="#" className="hover:text-accent-cyan transition-colors">Resources</a>
                            <a href="#" className="hover:text-accent-cyan transition-colors">Company</a>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs font-medium text-[#64748B]">© 2026 CareerOS AI. All rights reserved.</p>
                        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-[#64748B]">
                            <a href="#" className="hover:text-[#F9FAFB]">Privacy Policy</a>
                            <a href="#" className="hover:text-[#F9FAFB]">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
