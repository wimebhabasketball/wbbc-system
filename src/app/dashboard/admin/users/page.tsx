'use client';
import { useEffect, useState } from 'react';
import { fetchGAS } from '@/lib/api';
import DataTable from '@/components/ui/DataTable';

export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchGAS('getUsers', 'GET');
            // Filter password agar tidak tampil di frontend
            const safeData = data.map((u: any) => ({ ...u, password: '***' }));
            setUsers(safeData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: any) => {
        alert(`Buka modal edit untuk: ${user.name}`);
        // Integrasi form modal edit di sini
    };

    const handleDelete = (user: any) => {
        if (confirm(`Yakin ingin menghapus user ${user.username}?`)) {
            alert('Fitur hapus (POST action) dipanggil ke GAS...');
            // fetchGAS('deleteUser', 'POST', { id: user.id })
        }
    };

    const columns = [
        { header: 'Nama Lengkap', accessor: 'name' },
        { header: 'Username', accessor: 'username' },
        { header: 'Role', accessor: 'role' },
        { header: 'Status', accessor: 'status' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-wbbc-navy">Manajemen Pengguna</h1>
                    <p className="text-gray-500 mt-1">Atur hak akses admin, pelatih, pemain, dan orang tua.</p>
                </div>
                <button className="bg-wbbc-yellow hover:bg-yellow-500 text-wbbc-navy font-bold py-2 px-6 rounded-lg shadow transition">
                    + Tambah User
                </button>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-wbbc-navy rounded-full animate-spin"></div>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}