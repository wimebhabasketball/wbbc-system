'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Definisi Struktur Menu Berdasarkan Role
const MENU_MAP = {
    admin: [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Manajemen User', path: '/dashboard/admin/users' },
        { label: 'Data Master Player', path: '/dashboard/admin/players' },
        { label: 'Jadwal & Agenda', path: '/dashboard/admin/schedules' },
    ],
    coach: [
        { label: 'Dashboard', path: '/dashboard/coach' },
        { label: 'Absensi Tim', path: '/dashboard/coach/absensi' },
        { label: 'Program Latihan', path: '/dashboard/coach/programs' },
        { label: 'Evaluasi Player', path: '/dashboard/coach/evaluasi' },
    ],
    player: [
        { label: 'Dashboard', path: '/dashboard/player' },
        { label: 'Isi Absensi', path: '/dashboard/player/absensi' },
        { label: 'Tugas Mandiri', path: '/dashboard/player/tugas' },
        { label: 'Statistik Saya', path: '/dashboard/player/statistik' },
    ],
    parent: [
        { label: 'Dashboard', path: '/dashboard/parent' },
        { label: 'Progress Anak', path: '/dashboard/parent/progress' },
        { label: 'Galeri Tim', path: '/dashboard/parent/galeri' },
    ]
};

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Ambil data user dari localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Proteksi rute jika tidak ada sesi
            router.push('/login');
        }
    }, [router]);

    if (!user) return <div className="w-64 bg-wbbc-navy text-white min-h-screen p-4">Memuat...</div>;

    // Dapatkan menu sesuai role, fallback ke array kosong jika role tidak dikenali
    const roleMenu = MENU_MAP[user.role as keyof typeof MENU_MAP] || [];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <aside className="w-64 bg-wbbc-navy text-white min-h-screen flex flex-col shadow-xl">
            <div className="p-6 border-b border-white/10 text-center">
                <h2 className="text-xl font-bold tracking-widest text-wbbc-yellow">WBBC.</h2>
                <p className="text-xs text-gray-300 mt-1 capitalize">Mode: {user.role}</p>
            </div>

            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex-shrink-0"></div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {roleMenu.map((menu, idx) => {
                    const isActive = pathname.startsWith(menu.path);
                    return (
                        <Link
                            key={idx}
                            href={menu.path}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-wbbc-yellow text-wbbc-navy font-bold'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {menu.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-wbbc-red hover:bg-red-600 text-white rounded text-sm font-bold transition"
                >
                    Keluar (Logout)
                </button>
            </div>
        </aside>
    );
}