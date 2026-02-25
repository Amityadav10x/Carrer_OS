import React, { useState, useEffect, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockChatMessages, mockEvaluations } from '../data/mockData';
import type { ChatMessage } from '../types';
import { Send, User, Bot, Sparkles, Mic, Video, Settings, Play, Square, RefreshCcw, CheckCircle2 } from 'lucide-react';

export const InterviewPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: "That's a solid answer, Amit. You clearly understand the core principles of React 19's server components. Could you elaborate on how you would handle data mutations when mixing client and server components in a high-traffic dashboard?",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <AppLayout>
            <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <MessageSquareIcon size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Neural <span className="gradient-text">Interview</span> Coach</h1>
                        <p className="text-[#94A3B8] font-medium opacity-80">Synchronized mock simulation with real-time semantic evaluation.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {!isSessionActive ? (
                        <Button
                            variant="primary"
                            size="md"
                            icon={<Play size={16} />}
                            onClick={() => setIsSessionActive(true)}
                            className="shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                        >
                            Initiate Session
                        </Button>
                    ) : (
                        <Button
                            variant="danger"
                            size="md"
                            icon={<Square size={14} />}
                            onClick={() => setIsSessionActive(false)}
                        >
                            Terminate
                        </Button>
                    )}
                    <Button variant="outline" size="md" icon={<Settings size={16} />}>Config</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 min-h-[700px]">
                {/* Chat Panel */}
                <Card glass className="p-0 flex flex-col border-white/5 relative overflow-hidden">
                    {/* Header */}
                    <div className="bg-white/[0.02] border-b border-white/5 px-8 py-5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-white">
                                    <Bot size={22} />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent-success border-2 border-[#111827] shadow-[0_0_8px_#10B981]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-[#F9FAFB] tracking-wider uppercase">V-84 AI Interrogator</h3>
                                <p className="text-[10px] text-[#64748B] font-black uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                                    <Sparkles size={10} className="text-accent-primary" />
                                    Active Evaluation: ON
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge className="bg-white/5 border-white/5 text-[#94A3B8] text-[9px] py-1">React 19 Senior Role</Badge>
                            <Badge variant="cyan" className="text-[9px] py-1">Difficulty: IV</Badge>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-10 space-y-8 min-h-[500px] max-h-[600px] scrollbar-thin" ref={scrollRef}>
                        {messages.map((m) => {
                            const isAI = m.role === 'ai';
                            return (
                                <div key={m.id} className={`flex gap-5 max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-500 ${isAI ? 'self-start' : 'ml-auto flex-row-reverse text-right'}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${isAI ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/20' : 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/20'}`}>
                                        {isAI ? <Bot size={20} /> : <User size={20} />}
                                    </div>
                                    <div className="space-y-2">
                                        <div className={`p-5 rounded-2xl border text-sm leading-relaxed font-medium transition-all ${isAI
                                            ? 'bg-[#1F2937]/80 text-[#F9FAFB] border-white/5 rounded-tl-none hover:border-accent-primary/20 shadow-xl shadow-black/20'
                                            : 'bg-accent-cyan/10 text-[#F9FAFB] border-accent-cyan/20 rounded-tr-none hover:border-accent-cyan/40 shadow-xl shadow-accent-cyan/5'
                                            }`}>
                                            {m.content}
                                        </div>
                                        <div className={`text-[9px] px-1 font-black uppercase tracking-widest text-[#64748B] flex items-center gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}>
                                            {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {isAI && <CheckCircle2 size={10} className="text-accent-success" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {isTyping && (
                            <div className="flex gap-5 max-w-[85%] self-start animate-pulse">
                                <div className="w-10 h-10 rounded-xl bg-accent-primary/20 text-accent-primary border border-accent-primary/20 flex items-center justify-center">
                                    <Bot size={20} />
                                </div>
                                <div className="bg-[#1F2937]/80 px-6 py-4 rounded-2xl rounded-tl-none border border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent-primary/40 animate-bounce" />
                                        <div className="w-2 h-2 rounded-full bg-accent-primary/40 animate-bounce delay-150" />
                                        <div className="w-2 h-2 rounded-full bg-accent-primary/40 animate-bounce delay-300" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                        <div className="relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your response or use voice input..."
                                className="w-full h-14 bg-[#0B1120]/40 border border-white/5 rounded-2xl pl-6 pr-32 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all placeholder-[#64748B]"
                                disabled={!isSessionActive}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button className="p-2 text-[#64748B] hover:text-accent-cyan transition-colors hover:bg-white/5 rounded-lg active:scale-95">
                                    <Mic size={18} />
                                </button>
                                <button className="p-2 text-[#64748B] hover:text-[#F9FAFB] transition-colors hover:bg-white/5 rounded-lg active:scale-95">
                                    <Video size={18} />
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-white hover:bg-accent-primary/80 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95"
                                    disabled={!isSessionActive}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Evaluation Side Panel */}
                <div className="space-y-6">
                    <Card glass className="p-8 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-primary/10 blur-[50px] rounded-full group-hover:bg-accent-primary/20 transition-all" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB]">Session Intelligence</h3>
                                <Badge variant="success" className="text-[9px] font-black tracking-widest px-2 group-hover:bg-accent-success group-hover:text-white transition-all">Validated</Badge>
                            </div>
                            <div className="flex flex-col items-center mb-10">
                                <div className="text-6xl font-black text-[#F9FAFB] mb-2 tracking-tighter">82<span className="text-2xl font-bold opacity-30">/100</span></div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Real-time Aptitude Rank</div>
                            </div>
                            <div className="space-y-6">
                                {mockEvaluations.map((ev: any) => (
                                    <div key={ev.category} className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-[#94A3B8] uppercase">
                                            <span>{ev.category}</span>
                                            <span className="text-accent-cyan">{ev.score}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-accent-primary to-accent-cyan rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.3)]" style={{ width: `${ev.score}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card glass className="p-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB] mb-6 flex items-center gap-2">
                            <Sparkles size={14} className="text-accent-primary" />
                            Semantic Feedback
                        </h3>
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                            <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
                                "The candidate shows high confidence in <span className="text-[#F9FAFB]">state management</span> but needs to refine explanations of <span className="text-accent-error font-extrabold uppercase tracking-widest text-[9px]">Server Actions</span> context."
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                                <div className="w-2 h-2 rounded-full bg-accent-success shadow-[0_0_8px_#10B981]" />
                                <span className="text-[10px] font-black text-[#F9FAFB] uppercase tracking-widest opacity-80">Sentiment: POSITIVE (0.89)</span>
                            </div>
                        </div>
                        <Button variant="outline" fullWidth className="mt-8 border-white/10 text-xs font-bold uppercase tracking-widest text-[#64748B] hover:text-[#F9FAFB] group">
                            Generate Coaching Log <RefreshCcw size={14} className="ml-2 transition-transform group-hover:rotate-180 duration-500" />
                        </Button>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

// Internal icon for message square
const MessageSquareIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export default InterviewPage;
