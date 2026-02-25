import type { Skill, Milestone, ChatMessage, ActivityItem, RadarDataPoint, TrendDataPoint, BarDataPoint } from '../types';

export const skills: Skill[] = [
    { name: 'React', level: 90, category: 'have', marketDemand: 95 },
    { name: 'TypeScript', level: 75, category: 'have', marketDemand: 88 },
    { name: 'Node.js', level: 68, category: 'have', marketDemand: 82 },
    { name: 'Python', level: 55, category: 'have', marketDemand: 78 },
    { name: 'SQL', level: 70, category: 'have', marketDemand: 85 },
    { name: 'System Design', level: 40, category: 'have', marketDemand: 92 },
    { name: 'AWS', level: 35, category: 'have', marketDemand: 89 },
    { name: 'Docker', level: 50, category: 'have', marketDemand: 75 },
    { name: 'Kubernetes', level: 0, category: 'missing', marketDemand: 84 },
    { name: 'GraphQL', level: 0, category: 'missing', marketDemand: 72 },
    { name: 'Redis', level: 0, category: 'missing', marketDemand: 68 },
    { name: 'Machine Learning', level: 0, category: 'missing', marketDemand: 80 },
    { name: 'Microservices', level: 0, category: 'missing', marketDemand: 86 },
    { name: 'CI/CD', level: 0, category: 'missing', priority: 1, marketDemand: 91 },
    { name: 'System Design', level: 0, category: 'market', priority: 2, marketDemand: 92 },
    { name: 'Cloud Architecture', level: 0, category: 'market', priority: 3, marketDemand: 88 },
    { name: 'Data Structures', level: 0, category: 'market', priority: 4, marketDemand: 85 },
    { name: 'API Design', level: 0, category: 'market', priority: 5, marketDemand: 87 },
];

export const milestones: Milestone[] = [
    { id: '1', title: 'Advanced TS Integration', phase: '30 Days', skill: 'Advanced TypeScript', resource: 'TypeScript Deep Dive - Book', progress: 80, status: 'in-progress', targetDate: 'March 15, 2026' },
    { id: '2', title: 'System Architecture Refactor', phase: '30 Days', skill: 'System Design Basics', resource: 'Grokking System Design', progress: 45, status: 'in-progress', targetDate: 'March 20, 2026' },
    { id: '3', title: 'Containerization Deployment', phase: '30 Days', skill: 'Docker Fundamentals', resource: 'Docker Official Docs + Labs', progress: 100, status: 'completed', targetDate: 'March 1, 2026' },
    { id: '4', title: 'Orchestration Scaling', phase: '60 Days', skill: 'Kubernetes Essentials', resource: 'Kubernetes in Action - Manning', progress: 20, status: 'in-progress', targetDate: 'April 10, 2026' },
    { id: '5', title: 'Cloud Infrastructure Setup', phase: '60 Days', skill: 'AWS Cloud Practitioner', resource: 'AWS Skill Builder Platform', progress: 0, status: 'upcoming', targetDate: 'April 25, 2026' },
    { id: '6', title: 'Automated Pipeline Sync', phase: '60 Days', skill: 'CI/CD Pipelines', resource: 'GitHub Actions + CircleCI', progress: 0, status: 'upcoming', targetDate: 'May 5, 2026' },
    { id: '7', title: 'ML Model Integration', phase: '90 Days', skill: 'Machine Learning Basics', resource: 'fast.ai Course', progress: 0, status: 'upcoming', targetDate: 'June 1, 2026' },
    { id: '8', title: 'GraphQL Schema Design', phase: '90 Days', skill: 'GraphQL API Design', resource: 'GraphQL Official Tutorial', progress: 0, status: 'upcoming', targetDate: 'June 15, 2026' },
    { id: '9', title: 'Microservices Decomposition', phase: '90 Days', skill: 'Microservices Architecture', resource: 'Building Microservices - O\'Reilly', progress: 0, status: 'upcoming', targetDate: 'June 30, 2026' },
];

export const mockChatMessages: ChatMessage[] = [
    {
        id: '1',
        role: 'ai',
        content: 'Hello Amit! I\'m your AI interview coach. Today we\'ll practice for Senior Frontend Engineer positions. Ready to begin with a technical question about React performance optimization?',
        timestamp: new Date(Date.now() - 300000),
    },
    {
        id: '2',
        role: 'user',
        content: 'Yes, I\'m ready! Let\'s start with the technical questions.',
        timestamp: new Date(Date.now() - 240000),
    },
    {
        id: '3',
        role: 'ai',
        content: 'Great! Here\'s your first question: Explain the differences between `useMemo` and `useCallback` in React. When would you use each, and what are the performance implications?',
        timestamp: new Date(Date.now() - 180000),
    },
    {
        id: '4',
        role: 'user',
        content: '`useMemo` memoizes the result of a computation, while `useCallback` memoizes a function itself. I\'d use `useMemo` for expensive calculations and `useCallback` when passing callbacks to optimized child components to prevent unnecessary re-renders.',
        timestamp: new Date(Date.now() - 120000),
    },
    {
        id: '5',
        role: 'ai',
        content: 'Excellent answer! You correctly identified the key difference. I\'d also add that `useCallback(fn, deps)` is essentially shorthand for `useMemo(() => fn, deps)`. Your answer scores 8.5/10 — concise and accurate. Ready for the next question?',
        timestamp: new Date(Date.now() - 60000),
    },
];

export const mockEvaluations = [
    { category: 'Technical Depth', score: 85 },
    { category: 'System Architecture', score: 72 },
    { category: 'Communication', score: 88 },
    { category: 'Problem Solving', score: 84 },
];

export const mockActivity: ActivityItem[] = [
    { id: '1', type: 'resume', title: 'Resume Score Updated', description: 'Your resume score improved by 12 points', time: '2 hours ago' },
    { id: '2', type: 'interview', title: 'Interview Practice Completed', description: 'System Design mock interview — Score: 82%', time: '5 hours ago' },
    { id: '3', type: 'skill', title: 'Skill Assessment Done', description: 'Docker & Kubernetes skills evaluated', time: 'Yesterday' },
    { id: '4', type: 'roadmap', title: 'Milestone Completed', description: 'Docker Fundamentals milestone marked complete', time: '2 days ago' },
    { id: '5', type: 'resume', title: 'AI Rewrite Suggested', description: '3 new bullet point rewrites generated for Work Exp.', time: '3 days ago' },
];

export const mockRadarData: RadarDataPoint[] = [
    { subject: 'React', value: 90, fullMark: 100 },
    { subject: 'TypeScript', value: 75, fullMark: 100 },
    { subject: 'System Design', value: 40, fullMark: 100 },
    { subject: 'Algorithms', value: 60, fullMark: 100 },
    { subject: 'Cloud/AWS', value: 35, fullMark: 100 },
    { subject: 'Node.js', value: 68, fullMark: 100 },
];

export const mockTrendData: TrendDataPoint[] = [
    { week: 'Week 1', score: 45, average: 55 },
    { week: 'Week 2', score: 58, average: 57 },
    { week: 'Week 3', score: 63, average: 58 },
    { week: 'Week 4', score: 71, average: 60 },
    { week: 'Week 5', score: 78, average: 62 },
    { week: 'Week 6', score: 82, average: 63 },
    { week: 'Week 7', score: 85, average: 65 },
    { week: 'Week 8', score: 88, average: 66 },
];

export const mockBarData: BarDataPoint[] = [
    { name: 'React', value: 88 },
    { name: 'TypeScript', value: 75 },
    { name: 'Node.js', value: 68 },
    { name: 'Python', value: 55 },
    { name: 'SQL', value: 70 },
    { name: 'Docker', value: 50 },
];
