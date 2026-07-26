'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchGAS } from '@/lib/api';

export default function ParentDashboard() {
    const [parentName, setParentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State untuk menyimpan struktur data respons API
    const [childData, setChildData] = useState<{
        profil: any;
        statistik: any;
        evaluasi: any[];
    } | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const userData = localStorage.getItem('user');

                if (!userData) {
                    throw new Error('Sesi tidak ditemukan. Silakan login kembali.');
                }

                const user = JSON.parse(userData);
                setParentName(user.name);

                // Memanggil API getParentDashboard dengan mengirimkan ID Parent
                const data = await fetchGAS('getParentDashboard', 'POST', { parentId: user.id });
                setChildData(data);

            } catch (err: any) {
                setError(err.message || 'Gagal memuat data dari server.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // 1. Tampilan Loading State
    if (loading) {
        return (
            <div className="flex h-full min-h-[50vh] items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-wbbc-navy rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-bold text-sm animate-pulse">Menyiapkan Data Rapor Anak...</p>
                </div>
            </div>
        );
    }

    // 2. Tampilan Error State
    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-red-700">
                <h2 className="font-bold text-lg mb-2">Terjadi Kesalahan</h2>
                <p>{error}</p>
            </div>
        );
    }

    // 3. Tampilan Jika Relasi Anak Belum Diset oleh Admin
    if (!childData) {
        return (
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-yellow-800">
                <h2 className="font-bold text-lg mb-2">Data Belum Terhubung</h2>
                <p>Akun Anda belum dikaitkan dengan profil pemain manapun. Silakan hubungi Manajemen/Admin WBBC untuk menghubungkan data anak Anda.</p>
            </div>
        );
    }

    // Ekstrak evaluasi terbaru (jika ada)
    const evaluasiTerbaru = childData.evaluasi.length > 0 ? childData.evaluasi[0] : null;

    // 4. Tampilan Utama Dashboard Parent
    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-white border-l-8 border-wbbc-navy p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Halo, {parentName}</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Pantau perkembangan dan statistik ananda <span className="font-bold text-wbbc-navy">{childData.profil.nama}</span>.
                    </p>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase">Kategori Tim</div>
                    <div className="text-wbbc-navy font-black">{childData.profil.kelas}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Modul Absensi (Visual) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="font-bold text-wbbc-navy mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-wbbc-yellow" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                        Disiplin & Kehadiran
                    </h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Persentase Kehadiran Latihan</span>
                        <span className="font-black text-2xl text-wbbc-navy">{childData.statistik.persentaseKehadiran}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                        <div
                            className={`h-3 rounded-full transition-all duration-1000 ${childData.statistik.persentaseKehadiran >= 80 ? 'bg-green-500' :
                                    childData.statistik.persentaseKehadiran >= 60 ? 'bg-wbbc-yellow' : 'bg-wbbc-red'
                                }`}
                            style={{ width: `${childData.statistik.persentaseKehadiran}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 italic">*Kehadiran saat ini: {childData.statistik.totalKehadiran} kali pertemuan.</p>
                </div>

                {/* Modul Sorotan Evaluasi */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-wbbc-yellow/10 rounded-bl-full -z-0"></div>
                    <h2 className="font-bold text-wbbc-navy mb-4 relative z-10">Evaluasi Pelatih Terbaru</h2>

                    {evaluasiTerbaru ? (
                        <div className="relative z-10 space-y-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <span className="text-sm font-bold text-wbbc-navy bg-gray-100 px-2 py-1 rounded">
                                    Tipe: {evaluasiTerbaru.tipe}
                                </span>
                                <span className="text-xs text-gray-500">{new Date(evaluasiTerbaru.created_at).toLocaleDateString('id-ID')}</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-wbbc-yellow pl-3">
                                "{evaluasiTerbaru.catatan}"
                            </p>
                            <div className="pt-2">
                                <Link href="/dashboard/parent/progress" className="text-wbbc-navy text-sm font-bold hover:underline">
                                    Lihat Semua Catatan &rarr;
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-400 text-sm relative z-10">
                            Belum ada evaluasi yang diberikan oleh pelatih bulan ini.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}