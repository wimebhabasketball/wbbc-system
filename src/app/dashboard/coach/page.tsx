'use client';
import Link from 'next/link';

export default function CoachDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-wbbc-navy">Dashboard Kepelatihan</h1>
                <p className="text-gray-500 mt-1">Ringkasan kondisi tim dan program latihan terbaru.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card Kehadiran */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-wbbc-navy text-white p-4">
                        <h2 className="font-bold">Kehadiran Latihan Terakhir</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <div className="text-4xl font-black text-wbbc-navy">24<span className="text-lg text-gray-400 font-normal">/30</span></div>
                                <div className="text-sm text-gray-500 uppercase font-bold mt-1">Pemain Hadir</div>
                            </div>
                            <div className="text-right">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Tinggi (80%)</span>
                            </div>
                        </div>
                        <Link href="/dashboard/coach/absensi" className="text-wbbc-navy text-sm font-bold hover:underline">Lihat Rekap Absensi &rarr;</Link>
                    </div>
                </div>

                {/* Card Tugas */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-wbbc-yellow text-wbbc-navy p-4">
                        <h2 className="font-bold">Progress Tugas Mandiri</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <div className="text-4xl font-black text-wbbc-navy">12<span className="text-lg text-gray-400 font-normal">/30</span></div>
                                <div className="text-sm text-gray-500 uppercase font-bold mt-1">Pemain Selesai</div>
                            </div>
                            <div className="text-right">
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Perlu Perhatian</span>
                            </div>
                        </div>
                        <Link href="/dashboard/coach/programs" className="text-wbbc-navy text-sm font-bold hover:underline">Periksa Kiriman Tugas &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}