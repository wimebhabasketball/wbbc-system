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
'use client';
import { useState } from 'react';
// import { fetchGAS } from '@/lib/api'; 
import MediaUpload from '@/components/modules/MediaUpload';

export default function AttendancePage() {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  // Callback dari komponen MediaUpload
  const handleUploadSuccess = (uploadedUrl: string) => {
    setFotoUrl(uploadedUrl); // Simpan URL dari Drive ke state
  };

  const submitAbsensiFinal = async () => {
    if (!fotoUrl) {
      alert("Harap unggah bukti foto terlebih dahulu!");
      return;
    }
    
    // Lanjutkan dengan logika absensi Geolocation sebelumnya
    // Gabungkan "fotoUrl" ke dalam payload fetchGAS('submitAttendance', ...)
    alert(`Mensubmit absensi dengan foto: ${fotoUrl}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="bg-wbbc-yellow p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold text-wbbc-navy mb-2">Bukti Kehadiran / Latihan</h2>
        
        {/* Jika belum ada foto, tampilkan form upload */}
        {!fotoUrl ? (
          <MediaUpload 
            label="Unggah Foto Selfie di Lapangan" 
            onUploadSuccess={handleUploadSuccess} 
          />
        ) : (
          <div className="text-center bg-white p-4 rounded-lg">
            <p className="text-green-600 font-bold mb-3">✓ Foto berhasil diamankan</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fotoUrl} alt="Bukti" className="w-full h-auto rounded shadow-sm mb-4" />
            
            <button 
              onClick={submitAbsensiFinal}
              className="w-full bg-wbbc-red hover:bg-red-600 text-white font-bold py-2 rounded"
            >
              Kirim Absensi Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}