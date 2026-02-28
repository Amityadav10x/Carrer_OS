// Types for CareerOS AI

export interface NavItem {
    label: string;
    icon: string;
    path: string;
}

export interface MetricCard {
    label: string;
    value: string | number;
    change?: number;
    unit?: string;
}

export interface Skill {
    name: string;
    level: number; // 0-100
    category: 'have' | 'missing' | 'market';
    priority?: number;
    marketDemand: number;
}

export interface Milestone {
    id: string;
    title: string;
    phase: '30 Days' | '60 Days' | '90 Days';
    skill: string;
    resource: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'upcoming';
    targetDate: string;
}

export interface ChatMessage {
    id: string;
    role: 'ai' | 'user';
    content: string;
    timestamp: Date;
}

export interface EvaluationScore {
    label: string;
    score: number;
    maxScore: number;
}

export interface ActivityItem {
    id: string;
    type: 'resume' | 'interview' | 'roadmap' | 'skill';
    title: string;
    description: string;
    time: string;
    icon?: string;
}

export interface PricingPlan {
    name: string;
    price: string;
    period: string;
    features: string[];
    highlighted?: boolean;
}

export interface RadarDataPoint {
    subject: string;
    value: number;
    fullMark: number;
}

export interface TrendDataPoint {
    week: string;
    score: number;
    average: number;
}

export interface BarDataPoint {
    name: string;
    value: number;
    fill?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    credits?: {
        remaining: number;
    };
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface SignupCredentials {
    name: string;
    email: string;
    password?: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    signup: (name: string, email: string, pass: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}
