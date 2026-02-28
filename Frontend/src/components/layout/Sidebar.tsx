import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Map,
    MessageSquare,
    LineChart,
    Settings,
    Zap,
    LogOut,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Resume', icon: FileText, path: '/resume' },
    { label: 'Skill Gap', icon: BarChart3, path: '/skill-gap' },
    { label: 'Roadmap', icon: Map, path: '/roadmap' },
    { label: 'Interview', icon: MessageSquare, path: '/interview' },
    { label: 'Analytics', icon: LineChart, path: '/analytics' },
    { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#111827]/80 backdrop-blur-xl border-r border-white/5 flex flex-col z-[100]">
            {/* Logo */}
            <div className="flex items-center gap-3 px-8 py-8 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#22D3EE] flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    <Zap size={20} className="text-white fill-white/20" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[#F9FAFB] font-black text-xl tracking-tighter leading-none">CareerOS</span>
                    <span className="text-accent-cyan font-black text-xs tracking-[0.2em] mt-1">INTELLIGENCE</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                {navItems.map(({ label, icon: Icon, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <NavLink
                            key={path}
                            to={path}
                            className={`relative flex items-center gap-4 px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 group ${isActive
                                ? 'sidebar-active-bar bg-accent-primary/15 text-[#F9FAFB]'
                                : 'text-[#64748B] hover:bg-white/5 hover:text-[#94A3B8]'
                                }`}
                        >
                            <Icon
                                size={18}
                                className={`transition-all duration-300 ${isActive ? 'text-accent-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'group-hover:text-[#94A3B8]'
                                    }`}
                            />
                            {label}
                            {isActive && (
                                <div className="ml-auto w-1 h-1 rounded-full bg-accent-cyan shadow-[0_0_10px_#22D3EE]" />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="px-4 py-8 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer group">
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-accent-primary to-accent-purple flex items-center justify-center text-white text-sm font-black shadow-lg">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            user?.name?.charAt(0) || 'U'
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="text-xs font-black text-[#F9FAFB] truncate uppercase tracking-widest">{user?.name || 'Operative'}</div>
                        <div className="text-[9px] font-black text-accent-cyan uppercase tracking-[0.2em] mt-0.5 opacity-70">Pro Operative</div>
                    </div>
                </div>

                {/* Credits Display */}
                {user?.credits && (
                    <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Power Reserve</span>
                            <Zap size={12} className={user.credits.remaining < 100 ? 'text-accent-warning animate-pulse' : 'text-accent-cyan'} />
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black tracking-tight ${user.credits.remaining < 100 ? 'text-accent-warning' : 'text-[#F9FAFB]'}`}>
                                {user.credits.remaining.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Credits</span>
                        </div>
                        <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${user.credits.remaining < 100 ? 'bg-accent-warning shadow-[0_0_8px_#F59E0B]' : 'bg-accent-cyan shadow-[0_0_8px_#22D3EE]'}`}
                                style={{ width: `${Math.min(100, (user.credits.remaining / 1000) * 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 group"
                >
                    <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
                    Logout Session
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
