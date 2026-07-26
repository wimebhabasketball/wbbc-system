'use client';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-wbbc-navy">Dashboard Manajemen</h1>
                <p className="text-gray-500 mt-1">Pantau seluruh aktivitas operasional Wimebha Basketball Club.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border-l-4 border-wbbc-navy shadow-sm">
                    <div className="text-sm font-bold text-gray-400 uppercase">Total Player</div>
                    <div className="text-3xl font-black text-gray-800 mt-1">45</div>
                </div>
                <div className="bg-white p-6 rounded-xl border-l-4 border-wbbc-yellow shadow-sm">
                    <div className="text-sm font-bold text-gray-400 uppercase">Coach Aktif</div>
                    <div className="text-3xl font-black text-gray-800 mt-1">4</div>
                </div>
                <div className="bg-white p-6 rounded-xl border-l-4 border-wbbc-red shadow-sm">
                    <div className="text-sm font-bold text-gray-400 uppercase">Jadwal Minggu Ini</div>
                    <div className="text-3xl font-black text-gray-800 mt-1">6</div>
                </div>
                <div className="bg-wbbc-navy p-6 rounded-xl text-white shadow-sm flex flex-col justify-center">
                    <div className="text-sm font-bold text-gray-300 uppercase">Status Sistem</div>
                    <div className="text-xl font-bold text-green-400 mt-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                        Normal
                    </div>
                </div>
            </div>

            {/* Akses Cepat */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-wbbc-navy mb-4">Akses Cepat</h2>
                <div className="flex gap-4">
                    <Link href="/dashboard/admin/users" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-semibold transition">
                        Kelola Pengguna
                    </Link>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-semibold transition">
                        Atur Jadwal Baru
                    </button>
                </div>
            </div>
        </div>
    );
}