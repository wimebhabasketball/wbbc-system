'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');

        // 1. Cek apakah user sudah login
        if (!userData) {
            router.replace('/login');
            return;
        }

        try {
            const user = JSON.parse(userData);
            const role = user.role;

            // 2. Definisi Aturan Restriksi Akses Berdasarkan Prefix URL
            // Jika user mencoba mengakses URL yang bukan role-nya, tendang ke /dashboard
            if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
                router.replace('/dashboard');
                return;
            }
            if (pathname.startsWith('/dashboard/coach') && role !== 'coach') {
                router.replace('/dashboard');
                return;
            }
            if (pathname.startsWith('/dashboard/player') && role !== 'player') {
                router.replace('/dashboard');
                return;
            }
            if (pathname.startsWith('/dashboard/parent') && role !== 'parent') {
                router.replace('/dashboard');
                return;
            }

            // Jika lolos semua pengecekan, izinkan render
            setIsAuthorized(true);
        } catch (e) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.replace('/login');
        }
    }, [pathname, router]);

    // Tampilkan layar loading skeleton/spinner selama pengecekan otorisasi
    if (!isAuthorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-wbbc-navy border-t-wbbc-yellow rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">Memverifikasi Akses...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}