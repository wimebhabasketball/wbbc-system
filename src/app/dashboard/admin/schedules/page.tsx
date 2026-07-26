'use client';
import { useEffect, useState } from 'react';
import { fetchGAS } from '@/lib/api';
import DataTable from '@/components/ui/DataTable';

export default function SchedulesPage() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        try {
            setLoading(true);
            const data = await fetchGAS('getSchedules', 'GET');

            // Formatting tanggal agar lebih manusiawi saat dibaca di tabel
            const formattedData = data.map((item: any) => {
                // Asumsi start_time adalah string ISO date dari GAS
                const dateObj = new Date(item.start_time);
                const formattedDate = dateObj.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return {
                    ...item,
                    formatted_time: formattedDate !== 'Invalid Date' ? formattedDate : item.start_time
                };
            });

            setSchedules(formattedData);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat jadwal kegiatan');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (schedule: any) => {
        alert(`Edit agenda: ${schedule.title}`);
    };

    const handleDelete = (schedule: any) => {
        if (confirm(`Hapus agenda ${schedule.title}?`)) {
            alert('Sistem akan menghapus agenda dari database...');
        }
    };

    const columns = [
        { header: 'Agenda / Kegiatan', accessor: 'title' },
        { header: 'Waktu Pelaksanaan', accessor: 'formatted_time' },
        { header: 'Lokasi', accessor: 'location' },
        { header: 'Tipe Kegiatan', accessor: 'type' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-wbbc-navy">Jadwal & Agenda Tim</h1>
                    <p className="text-gray-500 mt-1">Atur kalender latihan rutin, pertandingan, dan kegiatan klub lainnya.</p>
                </div>
                <button className="bg-wbbc-navy hover:bg-wbbc-navy-hover text-white font-bold py-2 px-6 rounded-lg shadow transition">
                    + Buat Jadwal Baru
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-wbbc-navy rounded-full animate-spin"></div>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={schedules}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}