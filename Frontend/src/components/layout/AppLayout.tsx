import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0B1120]">
            <Sidebar />
            <TopNavbar />
            <main className="ml-[280px] pt-[68px] min-h-screen">
                <div className="max-w-[1200px] mx-auto px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppLayout;
