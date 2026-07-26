'use client';
import { useState, useRef } from 'react';
import { fetchGAS } from '@/lib/api';

interface MediaUploadProps {
  onUploadSuccess: (fileUrl: string, fileId: string) => void;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
}

export default function MediaUpload({
  onUploadSuccess,
  label = "Unggah Foto / Video",
  accept = "image/*,video/mp4",
  maxSizeMB = 5 // Default 5MB (Sangat disarankan untuk stabilitas Payload Base64 GAS)
}: MediaUploadProps) {
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validasi Ukuran File
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      alert(`Ukuran file maksimal adalah ${maxSizeMB}MB!`);
      return;
    }

    setFile(selectedFile);

    // Buat local preview jika file adalah gambar
    if (selectedFile.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Hapus prefix "data:image/png;base64," agar GAS hanya menerima string datanya saja
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setProgressText("Memproses file...");

      const base64Data = await convertToBase64(file);
      
      const payload = {
        fileName: `${Date.now()}_${file.name}`,
        mimeType: file.type,
        base64Data: base64Data
      };

      setProgressText("Mengunggah ke Cloud...");
      
      // Memanggil fungsi fetchGAS yang kita buat sebelumnya
      const response = await fetchGAS('uploadMedia', 'POST', payload);
      
      if (response && response.downloadUrl) {
        alert("Upload Berhasil!");
        onUploadSuccess(response.downloadUrl, response.fileId); // Lempar URL kembali ke Parent Component
        setFile(null);
        setPreview(null);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengunggah file. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
      setProgressText("");
    }
  };

  return (
    <div className="w-full border-2 border-dashed border-wbbc-navy rounded-xl p-6 bg-white text-center">
      <label className="block text-wbbc-navy font-bold mb-4">{label}</label>
      
      {/* Preview Area */}
      {preview && (
        <div className="mb-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={preview} 
            alt="Preview" 
            className="h-40 w-auto object-cover rounded-lg shadow-sm border border-gray-200"
          />
        </div>
      )}
      
      {file && !preview && (
        <div className="mb-4 text-sm text-gray-600">
          File terpilih: <span className="font-semibold">{file.name}</span>
        </div>
      )}

      {/* Input File Hidden */}
      <input 
        type="file" 
        accept={accept}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col gap-3">
        {!isUploading && (
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded border border-gray-300 transition"
          >
            Pilih File
          </button>
        )}

        {file && (
          <button 
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full py-2 font-bold rounded text-white transition ${
              isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-wbbc-navy hover:bg-wbbc-navy-hover'
            }`}
          >
            {isUploading ? progressText : 'Mulai Unggah'}
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-wbbc-red">Maksimal ukuran file: {maxSizeMB}MB</p>
    </div>
  );
}