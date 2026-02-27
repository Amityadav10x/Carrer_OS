import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Zap, Map, MessageSquare,
    CheckCircle2, Sparkles, Zap as ZapIcon,
    ChevronDown, Play, Star, Users, Briefcase,
    Shield, Globe, BarChart3, Search, Activity,
    Cpu, Target, TrendingUp, Award, Minus
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const logos = [
    { name: 'Google', url: '#' },
    { name: 'Microsoft', url: '#' },
    { name: 'Amazon', url: '#' },
    { name: 'Meta', url: '#' },
    { name: 'Apple', url: '#' },
    { name: 'Netflix', url: '#' }
];

const features = [
    {
        icon: ZapIcon,
        title: 'AI Resume Intelligence',
        description: 'Advanced NLP analysis of your resume with instant scoring and actionable recommendations.',
        color: '#6366F1'
    },
    {
        icon: Target,
        title: 'Skill Gap Analysis',
        description: 'Compare your skills against market demands and get personalized development plans.',
        color: '#22D3EE'
    },
    {
        icon: MessageSquare,
        title: 'Interview Simulator',
        description: 'Practice with adaptive AI that provides real-time feedback and improves with each session.',
        color: '#8B5CF6'
    },
    {
        icon: BarChart3,
        title: 'Career Analytics',
        description: 'Track your progress with detailed insights and market benchmarking.',
        color: '#F43F5E'
    },
    {
        icon: Map,
        title: 'Learning Roadmaps',
        description: 'AI-generated personalized learning paths based on your goals and current skill level.',
        color: '#10B981'
    },
    {
        icon: Activity,
        title: 'Real-time Insights',
        description: 'Get instant feedback and suggestions powered by cutting-edge AI models.',
        color: '#F59E0B'
    }
];

const stats = [
    { label: 'Active Users', val: '10K+', color: '#6366F1' },
    { label: 'Success Rate', val: '95%', color: '#22D3EE' },
    { label: 'Interviews Simulated', val: '500K+', color: '#8B5CF6' },
    { label: 'User Rating', val: '4.9/5', color: '#F43F5E' }
];

const testimonials = [
    {
        text: "CareerOS AI helped me identify skill gaps I didn't even know I had. Landed my dream job within 3 months!",
        author: "Sarah Johnson",
        role: "Senior Software Engineer @ Google",
        initial: "S"
    },
    {
        text: "The interview simulator is incredible. It's like having a personal career coach available 24/7.",
        author: "Michael Chen",
        role: "Product Manager @ Microsoft",
        initial: "M"
    },
    {
        text: "The personalized learning roadmap was exactly what I needed. Saved me months of figuring out what to learn.",
        author: "Emily Rodriguez",
        role: "Data Scientist @ Amazon",
        initial: "E"
    }
];

const comparisonData = [
    { feature: 'AI Resume Analysis', careeros: true, traditional: false, competitors: true },
    { feature: 'Personalized Learning Paths', careeros: true, traditional: false, competitors: false },
    { feature: 'Interview Simulator', careeros: true, traditional: false, competitors: true },
    { feature: 'Real-time Market Insights', careeros: true, traditional: false, competitors: false },
    { feature: 'Career Analytics Dashboard', careeros: true, traditional: false, competitors: false },
    { feature: 'Unlimited Practice Sessions', careeros: true, traditional: false, competitors: false },
    { feature: '24/7 AI Assistance', careeros: true, traditional: false, competitors: false },
];

const InteractiveBackground: React.FC = () => (
    <div className="fixed inset-0 -z-10 bg-bg-main overflow-hidden pointer-events-none">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="bg-network absolute inset-0 opacity-10" />

        {/* Animated Orbs */}
        <div className="glow-orb -top-20 -left-20 animate-float-slow opacity-30" />
        <div className="glow-orb top-1/2 -right-40 animate-float-reverse opacity-20" />
        <div className="glow-orb -bottom-40 left-1/3 animate-float-slow opacity-25" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1 h-1 bg-accent-primary rounded-full opacity-20 animate-pulse"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                }}
            />
        ))}
    </div>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">{q}</span>
                <div className={`p-2 rounded-lg bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-[#94A3B8]" />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-[#94A3B8] leading-relaxed">{a}</p>
            </div>
        </div>
    );
};

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen text-white selection:bg-accent-primary/30 scroll-smooth">
            <InteractiveBackground />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#0A0B10]/80 backdrop-blur-xl">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 md:px-12 py-5">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-9 h-9 rounded-lg bg-accent-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                            <Zap size={18} className="text-white fill-white/20" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">CareerOS<span className="text-accent-cyan">AI</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">How it Works</a>
                        <a href="#pricing" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Pricing</a>
                        <div className="flex items-center gap-4 ml-4">
                            <button onClick={() => navigate('/login')} className="text-sm font-bold opacity-80 hover:opacity-100 px-4 py-2">Sign In</button>
                            <Button size="sm" onClick={() => navigate('/signup')} className="rounded-full px-6">Get Started</Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-8">
                <div className="relative max-w-5xl mx-auto text-center z-10">
                    <Badge variant="primary" className="mb-8 rounded-full px-4 py-1.5 bg-accent-primary/10 border-accent-primary/20 backdrop-blur-md">
                        <Sparkles size={14} className="mr-2 text-accent-cyan animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black">Trusted by 10k+ professionals</span>
                    </Badge>

                    <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
                        Everything You Need to <br />
                        <span className="gradient-text">Accelerate Your Career</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-12 font-medium leading-relaxed opacity-80">
                        Comprehensive AI-powered tools designed to give you an unfair <br className="hidden md:block" />
                        advantage in your career journey.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
                        <Button
                            size="lg"
                            className="h-16 px-10 rounded-full text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform"
                            onClick={() => navigate('/signup')}
                        >
                            Start Your Free Trial <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </div>

                    {/* Trusted By Logos */}
                    <div className="pt-12">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#64748B] mb-8">Trusted by professionals at</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
                            {logos.map(logo => (
                                <span key={logo.name} className="text-lg md:text-xl font-bold font-mono tracking-tighter hover:opacity-100 transition-opacity cursor-default">
                                    {logo.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="pb-32 px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <Card key={s.label} glass className="p-8 border-white/5 hover:border-white/10 transition-all text-center group">
                            <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform" style={{ color: s.color }}>{s.val}</div>
                            <div className="text-[10px] uppercase font-black tracking-widest text-[#64748B]">{s.label}</div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-8 max-w-[1440px] mx-auto">
                <div className="text-center mb-20">
                    <Badge variant="cyan" className="mb-6 uppercase tracking-[0.2em] font-black px-4 py-1">Powerful Features</Badge>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">Built for Success</h2>
                    <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto">One platform that handles your entire professional workflow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <Card key={f.title} glass className="p-8 border-white/5 hover:border-accent-primary/30 transition-all group relative overflow-hidden h-full">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-10"
                                style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}30` }}
                            >
                                <f.icon size={24} style={{ color: f.color }} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 group-hover:text-accent-cyan transition-colors">{f.title}</h3>
                            <p className="text-[#94A3B8] leading-relaxed mb-4">{f.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-32 px-8 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">How It <span className="text-accent-primary">Works</span></h2>
                        <p className="text-lg text-[#94A3B8]">Get started in minutes and see results immediately</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Upload Your Resume', desc: 'Simply drag and drop your resume or paste your LinkedIn profile.', icon: Briefcase },
                            { step: '02', title: 'AI Analysis', desc: 'Our AI analyzes your skills, experience, and identifies improvement areas.', icon: Cpu },
                            { step: '03', title: 'Get Your Roadmap', desc: 'Receive a personalized learning path and actionable recommendations.', icon: Globe },
                            { step: '04', title: 'Practice & Improve', desc: 'Use our interview simulator and track your progress in real-time.', icon: TrendingUp }
                        ].map((s) => (
                            <div key={s.step} className="text-center group">
                                <Card glass className="p-8 mb-6 border-white/5 group-hover:border-accent-primary/20 transition-all relative overflow-hidden aspect-square flex flex-col items-center justify-center">
                                    <div className="absolute top-4 left-4 text-4xl font-black text-white/5">{s.step}</div>
                                    <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <s.icon size={28} className="text-accent-primary" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2">{s.title}</h3>
                                </Card>
                                <p className="text-sm text-[#94A3B8] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">Loved by <span className="text-accent-cyan">Thousands</span></h2>
                        <p className="text-lg text-[#94A3B8]">See what our users have to say about their experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map(t => (
                            <Card key={t.author} glass className="p-8 border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-accent-warning fill-accent-warning" />)}
                                </div>
                                <p className="text-[#94A3B8] italic mb-8 flex-1 leading-relaxed">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center font-bold text-sm">
                                        {t.initial}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-white">{t.author}</div>
                                        <div className="text-[10px] text-[#64748B] uppercase tracking-wider">{t.role}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-32 px-8 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-4xl mx-auto overflow-x-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Why Choose <span className="text-accent-primary">CareerOS AI</span></h2>
                        <p className="text-lg text-[#94A3B8]">See how we compare to traditional career coaching and other platforms</p>
                    </div>

                    <table className="w-full compare-table">
                        <thead>
                            <tr>
                                <th className="text-left">Feature</th>
                                <th>CareerOS AI</th>
                                <th>Traditional</th>
                                <th>Competitors</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map(d => (
                                <tr key={d.feature} className="hover:bg-white/5 transition-colors">
                                    <td className="text-sm font-medium">{d.feature}</td>
                                    <td className="text-center">
                                        {d.careeros ? <CheckCircle2 size={18} className="text-accent-success mx-auto" /> : <Minus size={18} className="text-white/10 mx-auto" />}
                                    </td>
                                    <td className="text-center">
                                        {d.traditional ? <CheckCircle2 size={18} className="text-accent-success mx-auto" /> : <div className="w-4 h-4 rounded-full border-2 border-white/10 mx-auto" />}
                                    </td>
                                    <td className="text-center">
                                        {d.competitors ? <CheckCircle2 size={18} className="text-accent-success mx-auto" /> : <div className="w-4 h-4 rounded-full border-2 border-white/10 mx-auto" />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-40 px-8 max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black mb-6">Simple, <span className="text-accent-primary">Transparent</span> Pricing</h2>
                    <p className="text-lg text-[#94A3B8]">Choose the plan that fits your career goals</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card glass className="p-12 border-white/5 flex flex-col hover:border-white/10 transition-all">
                        <h3 className="text-2xl font-black mb-2">Free</h3>
                        <div className="text-5xl font-black mb-10">$0<span className="text-lg text-[#64748B] font-medium">/month</span></div>
                        <div className="space-y-4 mb-12 flex-1">
                            {['Basic resume analysis', '5 Interview simulations/month', 'Basic skill gap analysis', 'Community support'].map(f => (
                                <div key={f} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                                    <CheckCircle2 size={16} className="text-accent-success" /> {f}
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" fullWidth className="h-14 rounded-xl border-white/10 font-bold" onClick={() => navigate('/signup')}>Get Started</Button>
                    </Card>

                    <Card glass className="p-12 border-accent-primary/40 bg-accent-primary/5 shadow-2xl relative flex flex-col scale-105 z-10 overflow-hidden">
                        <div className="absolute top-0 right-0 px-6 py-2 bg-accent-primary text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">Most Popular</div>
                        <h3 className="text-2xl font-black mb-2">Pro</h3>
                        <div className="text-5xl font-black mb-10">$29<span className="text-lg text-[#64748B] font-medium">/month</span></div>
                        <div className="space-y-4 mb-12 flex-1">
                            {['Advanced AI resume analysis', 'Unlimited interview simulations', 'Personalized learning roadmaps', 'Market benchmarking & analytics', 'Real-time AI feedback', 'Priority support'].map(f => (
                                <div key={f} className="flex items-center gap-3 text-sm text-white font-medium">
                                    <CheckCircle2 size={16} className="text-accent-primary" /> {f}
                                </div>
                            ))}
                        </div>
                        <Button fullWidth className="h-14 rounded-xl font-bold shadow-xl shadow-accent-primary/20" onClick={() => navigate('/signup')}>Start 14-Day Free Trial</Button>
                        <p className="text-[10px] text-center mt-4 text-[#64748B] uppercase tracking-widest font-black">No credit card required</p>
                    </Card>
                </div>
            </section>

            {/* FAQ Area */}
            <section className="py-32 px-8 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">FAQ</h2>
                </div>
                <div className="glass-card rounded-3xl p-8 md:p-12 border-white/5">
                    {[
                        {
                            q: "What makes CareerOS AI different?",
                            a: "Unlike static platforms, CareerOS AI is a dynamic operating system that evolves with your career. We combine deep skill analytics with real-time interview coaching."
                        },
                        {
                            q: "Is there a free trial for the Pro plan?",
                            a: "Yes! We offer a 14-day free trial of our Pro plan so you can experience the full power of our AI tools without any commitment."
                        },
                        {
                            q: "How does the interview simulator work?",
                            a: "Our simulator uses custom-trained LLMs to mimic specific job roles and company cultures, providing personalized feedback on both content and delivery."
                        }
                    ].map(f => <FAQItem key={f.q} {...f} />)}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-8 border-t border-white/5">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
                                <Zap size={16} className="text-white fill-white/20" />
                            </div>
                            <span className="font-bold text-lg">CareerOS AI</span>
                        </div>
                        <p className="text-[#64748B] text-sm max-w-xs text-center md:text-left">Building the future of autonomous career navigation.</p>
                    </div>
                    <div className="flex gap-12 text-sm font-bold uppercase tracking-widest text-[#64748B]">
                        {['Platform', 'Pricing', 'Security'].map(l => (
                            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                        ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-[#64748B]">© 2026 CareerOS AI</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
