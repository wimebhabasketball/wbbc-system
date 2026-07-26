'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PlayerDashboard() {
    const [userName, setUserName] = useState('');

    // State simulasi untuk data statistik (Nantinya di-fetch dari endpoint GAS 'getPlayerStats')
    const [stats, setStats] = useState({
        kehadiran: 0,
        tugasPending: 0,
        evaluasiBaru: 0
    });

    useEffect(() => {
        // Ambil nama dari sesi login
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.name) {
            setUserName(user.name);
        }

        // Simulasi Fetch Data (Ganti dengan fetchGAS di production)
        setTimeout(() => {
            setStats({
                kehadiran: 85,
                tugasPending: 2,
                evaluasiBaru: 1
            });
        }, 500);
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-wbbc-navy text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <svg className="w-48 h-48 transform translate-x-8 -translate-y-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Selamat datang kembali, {userName}!</h1>
                    <p className="text-gray-300">Tetap semangat! Berikut adalah ringkasan progres latihanmu.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Kehadiran */}
                <div className="bg-white p-6 rounded-2xl border-t-4 border-wbbc-navy shadow-sm">
                    <div className="text-gray-500 text-sm font-bold uppercase mb-1">Tingkat Kehadiran</div>
                    <div className="text-4xl font-black text-wbbc-navy flex items-baseline gap-1">
                        {stats.kehadiran}<span className="text-2xl">%</span>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-wbbc-navy h-2 rounded-full" style={{ width: `${stats.kehadiran}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Tugas Mandiri */}
                <div className="bg-white p-6 rounded-2xl border-t-4 border-wbbc-yellow shadow-sm">
                    <div className="text-gray-500 text-sm font-bold uppercase mb-1">Tugas Belum Selesai</div>
                    <div className="text-4xl font-black text-wbbc-yellow flex items-baseline gap-2">
                        {stats.tugasPending}
                    </div>
                    <div className="mt-4">
                        <Link href="/dashboard/player/tugas" className="text-sm font-bold text-wbbc-navy hover:underline">
                            Lihat Detail Tugas &rarr;
                        </Link>
                    </div>
                </div>

                {/* Card 3: Evaluasi */}
                <div className="bg-white p-6 rounded-2xl border-t-4 border-wbbc-red shadow-sm">
                    <div className="text-gray-500 text-sm font-bold uppercase mb-1">Catatan Pelatih</div>
                    <div className="text-4xl font-black text-wbbc-red flex items-baseline gap-2">
                        {stats.evaluasiBaru} <span className="text-lg font-normal text-gray-500">Baru</span>
                    </div>
                    <div className="mt-4">
                        <Link href="/dashboard/player/evaluasi" className="text-sm font-bold text-wbbc-navy hover:underline">
                            Baca Evaluasi &rarr;
                        </Link>
                    </div>
                </div>
            </div>

            {/* Aksi Cepat / Quick Actions */}
            <div>
                <h2 className="text-xl font-bold text-wbbc-navy mb-4">Aksi Cepat</h2>
                <div className="flex gap-4">
                    <Link href="/dashboard/player/absensi" className="bg-wbbc-navy hover:bg-wbbc-navy-hover text-white px-6 py-3 rounded-lg font-bold shadow transition">
                        📸 Isi Absensi Hari Ini
                    </Link>
                    <Link href="/dashboard/player/tugas" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-bold shadow transition">
                        📝 Kumpulkan Tugas
                    </Link>
                </div>
            </div>
        </div>
    );
}