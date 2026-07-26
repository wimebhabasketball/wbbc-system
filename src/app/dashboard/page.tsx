'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardIndex() {
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');

        if (!userData) {
            router.push('/login');
            return;
        }

        try {
            const user = JSON.parse(userData);

            // Auto-Routing berdasarkan Role
            switch (user.role) {
                case 'admin':
                    router.replace('/dashboard/admin');
                    break;
                case 'coach':
                    router.replace('/dashboard/coach');
                    break;
                case 'player':
                    router.replace('/dashboard/player');
                    break;
                case 'parent':
                    router.replace('/dashboard/parent');
                    break;
                default:
                    router.replace('/');
            }
        } catch (e) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
            <div className="text-center animate-pulse">
                <div className="w-12 h-12 border-4 border-wbbc-navy border-t-wbbc-yellow rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Mengarahkan ke Dashboard Anda...</p>
            </div>
        </div>
    );
}