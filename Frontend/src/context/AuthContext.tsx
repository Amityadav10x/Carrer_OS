import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import authService from '../services/auth.service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('career_os_access_token');
            if (token) {
                try {
                    const userData = await authService.getMe(token);
                    setUser(userData);
                } catch (e) {
                    console.error('Session expired or invalid', e);
                    logout();
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const { user, tokens } = await authService.login({ email, password });
            setUser(user);
            localStorage.setItem('career_os_access_token', tokens.access);
            localStorage.setItem('career_os_refresh_token', tokens.refresh);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            await authService.signup({ name, email, password });
            // We no longer set user or store tokens here.
            // User must manually log in.
        } catch (error) {
            console.error('Signup failed', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('career_os_access_token');
        localStorage.removeItem('career_os_refresh_token');
    };

    const refreshUser = async () => {
        const token = localStorage.getItem('career_os_access_token');
        if (token) {
            try {
                const userData = await authService.getMe(token);
                setUser(userData);
            } catch (e) {
                console.error('Failed to refresh user data', e);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
