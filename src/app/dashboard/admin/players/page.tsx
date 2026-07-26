'use client';
import { useEffect, useState } from 'react';
import { fetchGAS } from '@/lib/api';
import DataTable from '@/components/ui/DataTable';

export default function MasterPlayerPage() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        try {
            setLoading(true);
            // Memanggil endpoint getPlayers yang sudah ada di Api.gs
            const data = await fetchGAS('getPlayers', 'GET');
            setPlayers(data);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data pemain');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (player: any) => {
        alert(`Membuka modal edit profil: ${player.nama}`);
    };

    const handleDelete = (player: any) => {
        if (confirm(`Yakin ingin menghapus pemain ${player.nama} dari roster?`)) {
            alert('Sistem akan mengirim perintah Hapus ke backend GAS...');
        }
    };

    const columns = [
        { header: 'Nama Pemain', accessor: 'nama' },
        { header: 'Posisi', accessor: 'posisi' },
        { header: 'Kategori Tim', accessor: 'tim' },
        { header: 'Kelas', accessor: 'kelas' },
        { header: 'Tinggi', accessor: 'tinggi' }, // Bisa diformat tambah "cm" di DataTable nantinya
        { header: 'No. HP', accessor: 'hp' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-wbbc-navy">Data Master Pemain</h1>
                    <p className="text-gray-500 mt-1">Kelola data biometrik, posisi, dan kontak seluruh roster WBBC.</p>
                </div>
                <button className="bg-wbbc-yellow hover:bg-yellow-500 text-wbbc-navy font-bold py-2 px-6 rounded-lg shadow transition flex items-center gap-2">
                    <span>+ Tambah Pemain</span>
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
                    data={players}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}