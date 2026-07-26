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