import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Lock, ArrowRight, Sparkles, Hexagon } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || "/dashboard";
    const successMessage = (location.state as any)?.message;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Authentication failed. Please verify your email and security code.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden font-inter">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full animate-pulse delay-700" />

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 group hover:border-accent-cyan/30 transition-all">
                        <Hexagon className="text-accent-cyan group-hover:scale-110 transition-transform" size={32} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Initialize <span className="gradient-text">Session</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">Access your autonomous career acceleration dashboard.</p>
                </div>

                <Card glass className="p-10 border-white/5 shadow-2xl relative overflow-hidden group">
                    {successMessage && !error && (
                        <div className="mb-6 p-4 rounded-xl bg-accent-success/10 border border-accent-success/20 text-accent-success text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
                            {successMessage}
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </div>
                    )}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles size={40} className="text-accent-cyan" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">Email Identifier</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within/input:text-accent-cyan transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="agent@careerOS.ai"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all placeholder-[#475569]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Access Protocol</label>
                                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-accent-cyan hover:underline decoration-dotted transition-all">Recover</a>
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within/input:text-accent-cyan transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-cyan/30 transition-all placeholder-[#475569]"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            className="h-12 text-xs font-black uppercase tracking-widest mt-8 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] group"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Decrypting...' : (
                                <span className="flex items-center gap-2">
                                    Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 flex items-center justify-center gap-2">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#475569]">System Status</span>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">Encryption Active (AES-256)</span>
                    </div>
                </Card>

                <p className="mt-8 text-center text-sm text-[#64748B] font-medium">
                    New operative? <Link to="/signup" className="text-accent-cyan font-bold hover:underline underline-offset-4">Create Identity Handle</Link>
                </p>
            </div>
        </div>
    );
};
