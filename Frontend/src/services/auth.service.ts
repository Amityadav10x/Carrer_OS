import axios from 'axios';
import type { LoginCredentials, SignupCredentials, User } from '../types';

const API_URL = 'http://localhost:8000/v1/auth';

export interface ApiResponse<T> {
    status: 'success' | 'error';
    request_id: string;
    timestamp: string;
    data: T;
    usage?: any;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}

export interface AuthResponse {
    user: User;
    tokens: {
        access: string;
        refresh: string;
    };
}

const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await axios.post<ApiResponse<AuthResponse>>(`${API_URL}/login/`, credentials);
            if (response.data.status === 'success') {
                return response.data.data;
            }
            throw new Error(response.data.error?.message || 'Login failed');
        } catch (error: any) {
            const message = error.response?.data?.error?.message || error.message || 'Login failed';
            throw new Error(message);
        }
    },

    async signup(credentials: SignupCredentials): Promise<{ user: User }> {
        try {
            const response = await axios.post<ApiResponse<{ user: User }>>(`${API_URL}/signup/`, credentials);
            if (response.data.status === 'success') {
                return response.data.data;
            }
            throw new Error(response.data.error?.message || 'Signup failed');
        } catch (error: any) {
            const message = error.response?.data?.error?.message || error.message || 'Signup failed';
            throw new Error(message);
        }
    },

    async refresh(refreshToken: string): Promise<{ access: string }> {
        try {
            const response = await axios.post<{ access: string }>(`${API_URL}/refresh/`, { refresh: refreshToken });
            return response.data;
        } catch (error: any) {
            throw new Error('Token refresh failed');
        }
    },

    async getMe(token: string): Promise<User> {
        try {
            const response = await axios.get<ApiResponse<User>>(`${API_URL}/me/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === 'success') {
                return response.data.data;
            }
            throw new Error('Failed to fetch user profile');
        } catch (error: any) {
            const message = error.response?.data?.error?.message || 'Session invalid';
            throw new Error(message);
        }
    }
};

export default authService;
