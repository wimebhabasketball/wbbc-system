'use client';
import { useState } from 'react';
import { fetchGAS } from '@/lib/api';

export default function CoachTaskPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama: '',
        deskripsi: '',
        durasi_menit: '',
        target_type: 'Semua Pemain'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                program_id: `PRG-${Date.now()}`,
                status: 'Pending',
                created_by: localStorage.getItem('userId')
            };

            // Memanggil endpoint createTask di GAS
            await fetchGAS('createTask', 'POST', payload);
            alert('Tugas berhasil didistribusikan ke pemain!');
            setFormData({ nama: '', deskripsi: '', durasi_menit: '', target_type: 'Semua Pemain' });
        } catch (error: any) {
            alert(`Gagal membuat tugas: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-wbbc-navy">Distribusi Program Latihan</h1>
                <p className="text-gray-500 mt-1">Berikan tugas mandiri (seperti dribbling drills atau physical conditioning) untuk dikerjakan pemain di rumah.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-wbbc-yellow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama Program / Tugas</label>
                        <input
                            type="text" required
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            placeholder="Contoh: 100x Crossover Dribble"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wbbc-yellow outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Instruksi Detail</label>
                        <textarea
                            required rows={3}
                            value={formData.deskripsi}
                            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                            placeholder="Jelaskan cara melakukan gerakan, set, dan repetisi..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wbbc-yellow outline-none"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Estimasi Durasi (Menit)</label>
                            <input
                                type="number" required min="1"
                                value={formData.durasi_menit}
                                onChange={(e) => setFormData({ ...formData, durasi_menit: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wbbc-yellow outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Target</label>
                            <select
                                value={formData.target_type}
                                onChange={(e) => setFormData({ ...formData, target_type: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wbbc-yellow outline-none bg-white"
                            >
                                <option>Semua Pemain</option>
                                <option>Hanya Guards</option>
                                <option>Hanya Bigman</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className={`w-full py-3 mt-4 text-white font-bold rounded-lg transition ${loading ? 'bg-wbbc-navy/70' : 'bg-wbbc-navy hover:bg-wbbc-navy-hover'
                            }`}
                    >
                        {loading ? 'Memproses...' : 'Distribusikan Tugas'}
                    </button>
                </form>
            </div>
        </div>
    );
}