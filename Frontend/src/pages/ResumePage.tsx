import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { CircularProgress } from '../components/ui/CircularProgress';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CheckCircle2, AlertCircle, Sparkles, FileText, Download, Upload, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// No mock data needed anymore as we use active state from backend

export const ResumePage: React.FC = () => {
    const { refreshUser } = useAuth();
    // Persistent State Logic
    const [resumeData, setResumeData] = React.useState<{
        id: string | null,
        score: number,
        lastSync: string,
        fileName: string,
        isScanning: boolean,
        strengths: string[],
        weaknesses: string[],
        suggestions: { id?: string, original: string, improved: string, applied?: boolean, discarded?: boolean }[],
        rawContent: string | null
    }>(() => {
        const saved = localStorage.getItem('career_os_resume_data');
        if (saved) {
            const data = JSON.parse(saved);
            return {
                id: data.id || null,
                score: data.score || 0,
                lastSync: data.lastSync || 'Never',
                fileName: data.fileName || 'No file uploaded',
                isScanning: data.isScanning || false,
                strengths: data.strengths || [],
                weaknesses: data.weaknesses || [],
                suggestions: data.suggestions || [],
                rawContent: data.rawContent || null
            };
        }
        return {
            id: null,
            score: 0,
            lastSync: 'Never',
            fileName: 'No file uploaded',
            isScanning: false,
            strengths: [],
            weaknesses: [],
            suggestions: [],
            rawContent: null
        };
    });

    const [isOverlayVisible, setIsOverlayVisible] = React.useState(false);
    const [roles, setRoles] = React.useState<string[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<string>(() => {
        return localStorage.getItem('career_os_selected_role') || '';
    });
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        localStorage.setItem('career_os_resume_data', JSON.stringify(resumeData));
    }, [resumeData]);

    React.useEffect(() => {
        localStorage.setItem('career_os_selected_role', selectedRole);
    }, [selectedRole]);

    React.useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('career_os_access_token');
                const response = await fetch('http://127.0.0.1:8000/v1/skills/roles/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();
                if (result.status === 'success') {
                    setRoles(result.data.roles);
                }
            } catch (error) {
                console.error('Failed to fetch roles', error);
            }
        };
        fetchRoles();
    }, []);

    const handleUploadClick = () => {
        if (!selectedRole) {
            alert('Please select a target role first.');
            return;
        }
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setResumeData(prev => ({ ...prev, isScanning: true }));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('target_role', selectedRole);

        try {
            const token = localStorage.getItem('career_os_access_token');
            const response = await fetch('http://127.0.0.1:8000/v1/resumes/upload/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Fetch full resume details
                const detailResponse = await fetch(`http://127.0.0.1:8000/v1/resumes/${result.data.resume_id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const detailResult = await detailResponse.json();

                if (detailResult.status === 'success') {
                    const data = detailResult.data;
                    setResumeData({
                        id: data.id,
                        score: data.overall_score,
                        lastSync: 'Just now',
                        fileName: file.name,
                        isScanning: false,
                        strengths: data.strengths,
                        weaknesses: data.weaknesses,
                        suggestions: data.suggestions,
                        rawContent: data.raw_content
                    });

                    // Refresh user data (credits)
                    refreshUser();
                }
            } else if (response.status === 402) {
                alert('Insufficient credits. Please top up your account.');
                setResumeData(prev => ({ ...prev, isScanning: false }));
            } else {
                alert(result.message || 'Processing failed');
                setResumeData(prev => ({ ...prev, isScanning: false }));
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Failed to upload resume. Please check your connection.');
            setResumeData(prev => ({ ...prev, isScanning: false }));
        }
    };

    const handleExportPDF = async () => {
        if (!resumeData.id) {
            alert('No analyzed resume to export.');
            return;
        }

        try {
            const token = localStorage.getItem('career_os_access_token');
            const response = await fetch(`http://127.0.0.1:8000/v1/resumes/${resumeData.id}/export/pdf/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Resume_Report_${resumeData.id}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert('Failed to generate PDF.');
            }
        } catch (error) {
            console.error('Export failed', error);
            alert('Error exporting PDF.');
        }
    };

    const handleApplySuggestion = async (suggestionId: string) => {
        if (!resumeData.id || !suggestionId) return;

        try {
            const token = localStorage.getItem('career_os_access_token');
            const response = await fetch(`http://127.0.0.1:8000/v1/resumes/suggestions/${suggestionId}/apply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Fetch updated resume data
                const detailResponse = await fetch(`http://127.0.0.1:8000/v1/resumes/${result.data.resume_id}/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const detailResult = await detailResponse.json();

                if (detailResult.status === 'success') {
                    const data = detailResult.data;
                    setResumeData(prev => ({
                        ...prev,
                        id: data.id,
                        score: data.overall_score,
                        lastSync: 'Just now',
                        strengths: data.strengths,
                        weaknesses: data.weaknesses,
                        suggestions: data.suggestions,
                        rawContent: data.raw_content
                    }));
                }
            } else {
                alert(result.message || 'Failed to apply suggestion.');
            }
        } catch (error) {
            console.error('Apply failed', error);
            alert('Failed to apply suggestion. Please try again.');
        }
    };

    const handleDiscardSuggestion = async (suggestionId: string) => {
        if (!suggestionId) return;

        try {
            const token = localStorage.getItem('career_os_access_token');
            const response = await fetch(`http://127.0.0.1:8000/v1/resumes/suggestions/${suggestionId}/discard/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Remove / mark as discarded in local state to hide it
                setResumeData(prev => ({
                    ...prev,
                    suggestions: prev.suggestions.map(s =>
                        s.id === suggestionId ? { ...s, discarded: true } : s
                    )
                }));
            } else {
                alert(result.message || 'Failed to discard suggestion.');
            }
        } catch (error) {
            console.error('Discard failed', error);
            alert('Failed to discard suggestion. Please try again.');
        }
    };

    // Filter out discarded suggestions
    const visibleSuggestions = resumeData.suggestions.filter(s => !s.discarded);

    return (
        <AppLayout>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileChange}
            />
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#F9FAFB] tracking-tight mb-2">Resume <span className="gradient-text">Intelligence</span></h1>
                    <p className="text-[#94A3B8] font-medium opacity-80">AI-driven analysis and optimization of your professional profile.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="relative group">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="bg-[#0B1120] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-[#F9FAFB] appearance-none pr-10 focus:outline-none focus:border-accent-cyan/50 transition-all cursor-pointer hover:bg-white/5"
                        >
                            <option value="" disabled>Select Target Role</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none group-hover:text-accent-cyan transition-colors" />
                    </div>
                    <Button
                        variant="outline"
                        size="md"
                        icon={<Download size={16} />}
                        onClick={handleExportPDF}
                        disabled={!resumeData.id}
                    >
                        Export PDF
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        icon={resumeData.isScanning ? <Sparkles size={16} className="animate-spin" /> : <Upload size={16} />}
                        onClick={handleUploadClick}
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
                        <div className="p-10 text-[#94A3B8] aspect-[1/1.4] bg-[#0B1120]/40 relative overflow-y-auto">
                            {/* Scanning Overlay */}
                            {resumeData.isScanning && (
                                <div className="absolute inset-0 z-20 bg-[#0B1120]/60 backdrop-blur-sm flex items-center justify-center flex-col gap-6">
                                    <div className="w-16 h-16 rounded-full border-4 border-accent-cyan/20 border-t-accent-cyan animate-spin" />
                                    <div className="text-xs font-black text-accent-cyan uppercase tracking-[0.2em] animate-pulse">Running Neural Analysis...</div>
                                </div>
                            )}

                            {/* Real Content vs Skeleton */}
                            {resumeData.rawContent && isOverlayVisible ? (
                                <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in zoom-in duration-500">
                                    <div className="flex items-center gap-2 mb-6 text-accent-cyan">
                                        <Sparkles size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">AI Augmented View Active</span>
                                    </div>
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#F9FAFB] opacity-90">
                                        {resumeData.rawContent}
                                    </pre>
                                </div>
                            ) : (
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
                            )}

                            {/* Floating Overlay Toggle Button */}
                            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
                                <div
                                    onClick={() => setIsOverlayVisible(!isOverlayVisible)}
                                    className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(79,70,229,0.6)] cursor-pointer hover:scale-105 transition-all ${isOverlayVisible ? 'bg-accent-cyan shadow-accent-cyan/50' : 'bg-accent-primary'
                                        }`}
                                >
                                    <Sparkles size={16} className={`text-white fill-white/20 ${isOverlayVisible ? 'animate-pulse' : ''}`} />
                                    <span className="text-xs font-black uppercase tracking-widest text-white">
                                        {isOverlayVisible ? 'Disable AI Overlay' : 'Toggle AI Overlay View'}
                                    </span>
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
                        {visibleSuggestions.length > 0 ? (
                            visibleSuggestions.map((s, i) => (
                                <Card glass key={s.id || i} className={`group hover:border-accent-purple/30 transition-all p-8 ${s.applied ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <Badge variant={s.applied ? 'success' : 'purple'} className="text-[10px] font-black uppercase tracking-widest">
                                                {s.applied ? 'Applied' : 'Target Adjustment'}
                                            </Badge>
                                            {!s.applied && <Badge className="bg-white/5 border-white/10 text-[#64748B] text-[9px]">Rank: Optimal</Badge>}
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
                                            {!s.applied && (
                                                <div className="absolute -top-1 -right-1">
                                                    <Sparkles size={12} className="text-accent-purple animate-pulse" />
                                                </div>
                                            )}
                                            <p className="text-sm text-[#F9FAFB] leading-relaxed font-medium">{s.improved}</p>
                                        </div>
                                    </div>
                                    {!s.applied && s.id && (
                                        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/5">
                                            <Button variant="ghost" size="sm" onClick={() => handleDiscardSuggestion(s.id!)} className="text-[10px] uppercase font-black tracking-widest hover:text-accent-warning">Discard</Button>
                                            <Button size="sm" onClick={() => handleApplySuggestion(s.id!)} className="h-9 px-4 text-[10px] uppercase font-black tracking-widest bg-accent-purple hover:bg-accent-purple/80">Apply Update</Button>
                                        </div>
                                    )}
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <Sparkles size={32} className="text-[#475569] mx-auto mb-4" />
                                <p className="text-[#64748B] text-xs font-black uppercase tracking-widest">
                                    {resumeData.id ? 'All analysis suggestions applied or discarded.' : 'Awaiting Analysis Data'}
                                </p>
                            </div>
                        )}
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
                            {resumeData.strengths.length > 0 ? (
                                resumeData.strengths.map((s, i) => (
                                    <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-5 h-5 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 size={12} className="text-accent-success" />
                                        </div>
                                        <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">{s}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-[#64748B] italic">No strengths identified yet.</p>
                            )}
                        </div>
                    </Card>

                    <Card glass>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#F9FAFB] mb-6 flex items-center gap-2">
                            <AlertCircle size={14} className="text-accent-warning" />
                            Critical Gains
                        </h3>
                        <div className="space-y-4">
                            {resumeData.weaknesses.length > 0 ? (
                                resumeData.weaknesses.map((im, i) => (
                                    <div key={i} className="flex gap-4 p-3 rounded-xl bg-accent-warning/5 border border-accent-warning/20">
                                        <div className="w-5 h-5 rounded-full bg-accent-warning/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <AlertCircle size={12} className="text-accent-warning" />
                                        </div>
                                        <p className="text-xs text-accent-warning leading-relaxed font-bold opacity-80">{im}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-[#64748B] italic">No critical gains identified yet.</p>
                            )}
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
