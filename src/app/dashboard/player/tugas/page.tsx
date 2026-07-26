'use client';
import { useState, useEffect } from 'react';
import { fetchGAS } from '@/lib/api';
import MediaUpload from '@/components/modules/MediaUpload';

export default function PlayerTasksPage() {
    const [activeTask, setActiveTask] = useState<any>(null); // Tugas yang sedang dikerjakan
    const [catatan, setCatatan] = useState('');
    const [loadingAction, setLoadingAction] = useState(false);

    // State simulasi data tugas (Nantinya di fetch dari GAS 'getPlayerTasks')
    const [tasks, setTasks] = useState([
        { id: 'T-001', nama: '100x Crossover Dribble', durasi_menit: 15, status: 'Pending', deskripsi: 'Rekam video minimal 30 detik saat melakukan crossover secara nonstop.' },
        { id: 'T-002', nama: 'Push Up & Core', durasi_menit: 20, status: 'Selesai', deskripsi: 'Lakukan 3 set repetisi maksimal.' }
    ]);

    // Callback dari komponen MediaUpload ketika file berhasil terunggah ke Google Drive
    const handleSubmission = async (fileUrl: string) => {
        setLoadingAction(true);
        try {
            const payload = {
                taskId: activeTask.id,
                buktiUrl: fileUrl,
                catatan: catatan
            };

            await fetchGAS('submitTask', 'POST', payload);

            alert('Tugas berhasil dikumpulkan!');

            // Update UI state secara lokal agar tidak perlu fetch ulang seluruh tabel
            setTasks(tasks.map(t => t.id === activeTask.id ? { ...t, status: 'Selesai' } : t));
            setActiveTask(null);
            setCatatan('');

        } catch (error: any) {
            alert(`Gagal submit tugas: ${error.message}`);
        } finally {
            setLoadingAction(false);
        }
    };

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-wbbc-navy">Tugas Mandiri</h1>
                <p className="text-gray-500 mt-1">Selesaikan program latihan di bawah ini dan unggah bukti video/foto.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom Kiri: Daftar Tugas */}
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`p-5 rounded-xl border transition ${task.status === 'Selesai'
                                ? 'bg-gray-50 border-gray-200'
                                : 'bg-white border-gray-200 hover:border-wbbc-yellow hover:shadow-md cursor-pointer'
                                } ${activeTask?.id === task.id ? 'ring-2 ring-wbbc-yellow' : ''}`}
                            onClick={() => task.status === 'Pending' && setActiveTask(task)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`font-bold ${task.status === 'Selesai' ? 'text-gray-500 line-through' : 'text-wbbc-navy'}`}>
                                    {task.nama}
                                </h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${task.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{task.deskripsi}</p>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                ⏱️ Estimasi: {task.durasi_menit} Menit
                            </div>
                        </div>
                    ))}
                </div>

                {/* Kolom Kanan: Area Pengumpulan (Akan muncul jika tugas di-klik) */}
                <div>
                    {activeTask ? (
                        <div className="bg-wbbc-navy p-6 rounded-xl text-white sticky top-6 shadow-xl">
                            <h2 className="text-xl font-bold text-wbbc-yellow mb-2">Kumpulkan: {activeTask.nama}</h2>
                            <p className="text-sm text-gray-300 mb-6">Pastikan kualitas foto/video jelas sebelum diunggah.</p>

                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2">Catatan untuk Pelatih (Opsional)</label>
                                <textarea
                                    rows={2}
                                    value={catatan}
                                    onChange={(e) => setCatatan(e.target.value)}
                                    placeholder="Misal: Saya kesulitan di menit ke-2..."
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-wbbc-yellow outline-none text-white placeholder-gray-400"
                                ></textarea>
                            </div>

                            <div className="bg-white rounded-lg p-2 text-gray-800">
                                {/* Memanggil Komponen MediaUpload yang sudah dibuat sebelumnya */}
                                <MediaUpload
                                    label="Unggah Bukti Latihan (Maks 5MB)"
                                    accept="image/*,video/mp4"
                                    onUploadSuccess={handleSubmission}
                                />
                            </div>

                            {loadingAction && (
                                <div className="mt-4 text-center text-wbbc-yellow text-sm font-bold animate-pulse">
                                    Sedang menyimpan data ke database...
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                            <p className="text-center font-medium">Pilih tugas yang 'Pending' di sebelah kiri untuk mulai mengumpulkan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}