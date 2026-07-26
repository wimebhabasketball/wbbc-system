'use client';
import { useState } from 'react';
import { fetchGAS } from '@/lib/api';

export default function AttendancePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Hadir');

  const handleAttend = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser Anda.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const payload = {
          user_id: localStorage.getItem('userId'), // Ambil dari session RBAC
          tanggal: new Date().toISOString(),
          status: status,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          foto_url: '', // Modul Drive upload diintegrasikan terpisah
        };

        try {
          await fetchGAS('submitAttendance', 'POST', payload);
          alert('Absensi berhasil direkam!');
        } catch (error) {
          alert('Gagal merekam absensi.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        alert('Gagal mendapatkan lokasi. Izinkan akses GPS.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border-t-4 border-wbbc-navy">
      <h2 className="text-2xl font-bold text-wbbc-navy mb-4">Absensi Latihan</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Status Kehadiran</label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded border-gray-300 focus:ring-wbbc-yellow"
        >
          <option value="Hadir">Hadir</option>
          <option value="Ijin">Ijin</option>
          <option value="Sakit">Sakit</option>
        </select>
      </div>

      <button
        onClick={handleAttend}
        disabled={loading}
        className="w-full bg-wbbc-navy hover:bg-wbbc-navy-hover text-white font-bold py-3 rounded flex justify-center items-center gap-2 transition"
      >
        {loading ? 'Mengirim Data...' : 'Kirim Absensi & Lokasi'}
      </button>
    </div>
  );
}