import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Hexagon } from 'lucide-react';

export const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await signup(name, email, password);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/login', { state: { message: 'Identity initialized. Please provide credentials to enter the vault.' } });
            }, 2000);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Identity synchronization failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden font-inter">
            {/* Animated Background Elements */}
            <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full animate-pulse delay-500" />

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 group hover:border-accent-primary/30 transition-all">
                        <Hexagon className="text-accent-primary group-hover:rotate-90 transition-transform duration-700" size={32} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Identity <span className="gradient-text">Protocol</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">Forge your high-performance career trajectory.</p>
                </div>

                <Card glass className="p-10 border-white/5 shadow-2xl relative overflow-hidden group border-t-accent-primary/20">
                    {isSuccess && (
                        <div className="mb-6 p-4 rounded-xl bg-accent-success/10 border border-accent-success/20 text-accent-success text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
                            Success: Identity handle created. Redirecting to access protocol...
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">Identity Handle</label>
                            <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within/input:text-accent-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Amit Operative"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-primary/30 transition-all placeholder-[#475569]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">Email Identifier</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within/input:text-accent-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="agent@careerOS.ai"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-primary/30 transition-all placeholder-[#475569]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-1">Security Vault Code</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within/input:text-accent-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-sm font-medium text-[#F9FAFB] focus:outline-none focus:border-accent-primary/30 transition-all placeholder-[#475569]"
                                />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/10 flex items-start gap-3">
                            <ShieldCheck className="text-accent-primary mt-0.5" size={16} />
                            <p className="text-[10px] text-[#94A3B8] leading-relaxed">
                                Biometric hashing enabled. Your credentials will be encrypted at the network edge before synchronization.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            className="h-12 text-xs font-black uppercase tracking-widest mt-8 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] group"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Synchronizing...' : (
                                <span className="flex items-center gap-2">
                                    Initialize Identity <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>
                </Card>

                <p className="mt-8 text-center text-sm text-[#64748B] font-medium">
                    Operative exists? <Link to="/login" className="text-accent-primary font-bold hover:underline underline-offset-4 tracking-wide">Enter Vault</Link>
                </p>
            </div>
        </div>
    );
};
