import axios from 'axios';
import { ApiResponse } from './auth.service';

const API_URL = 'http://localhost:8000/v1/skills';

export interface SkillGapAnalysis {
    role: string;
    overall_gap_score: number;
    normalized: boolean;
    confirmed_skills: {
        name: string;
        confidence: number;
        priority_score: number;
        market_demand: number;
    }[];
    missing_skills: {
        name: string;
        priority_score: number;
        market_demand: number;
        weighted_importance: number;
    }[];
    analysis_id: string;
}

const skillService = {
    async analyzeGap(targetRole?: string, resumeId?: string): Promise<SkillGapAnalysis> {
        const token = localStorage.getItem('career_os_access_token');
        const response = await axios.post<ApiResponse<SkillGapAnalysis>>(
            `${API_URL}/analyze/`,
            { target_role: targetRole, resume_id: resumeId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.status === 'success') {
            return response.data.data;
        }
        throw new Error(response.data.error?.message || 'Gap analysis failed');
    }
};

export default skillService;
