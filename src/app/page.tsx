import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative bg-wbbc-navy h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Ornamen Latar Belakang (Opsional/Placeholder Image) */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop')" }}
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight">
            Wimebha <span className="text-wbbc-yellow">Basketball</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 font-light">
            Sistem Informasi Manajemen Tim & Pembinaan Prestasi Terpadu.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#profil" className="px-8 py-3 bg-wbbc-red hover:bg-red-600 text-white font-bold rounded-full transition">
              Kenali Kami
            </Link>
            <Link href="/login" className="px-8 py-3 bg-white hover:bg-gray-100 text-wbbc-navy font-bold rounded-full transition">
              Masuk Sistem
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PLAYER OF THE MONTH (POTM) */}
      <section id="potm" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Foto Player */}
            <div className="w-full md:w-1/3 bg-wbbc-yellow p-8 flex justify-center">
              <div className="w-64 h-64 bg-gray-300 rounded-full border-8 border-white shadow-inner overflow-hidden relative">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/300?img=11" alt="POTM" className="object-cover w-full h-full" />
              </div>
            </div>
            {/* Info Player */}
            <div className="w-full md:w-2/3 p-8 md:p-12">
              <div className="uppercase text-wbbc-red font-bold tracking-widest text-sm mb-2">Player of the Month</div>
              <h2 className="text-4xl font-bold text-wbbc-navy mb-4">Ahmad "The Flash" Santoso</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Konsistensi kehadiran 100%, peningkatan vertical jump tertinggi bulan ini, dan memimpin tim dalam perolehan assist selama uji coba. Dedikasi Ahmad adalah standar emas WBBC.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-2xl font-black text-wbbc-navy">PG</div>
                  <div className="text-xs text-gray-500 uppercase">Posisi</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-2xl font-black text-wbbc-navy">185<span className="text-sm font-normal">cm</span></div>
                  <div className="text-xs text-gray-500 uppercase">Tinggi</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-2xl font-black text-wbbc-navy">12</div>
                  <div className="text-xs text-gray-500 uppercase">Kelas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. JADWAL LATIHAN & PERTANDINGAN */}
      <section id="jadwal" className="py-20 bg-wbbc-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-wbbc-yellow mb-2">Jadwal Terdekat</h2>
              <p className="text-gray-300">Agenda latihan dan pertandingan tim bulan ini.</p>
            </div>
            <Link href="/login" className="hidden md:block text-sm font-bold text-white hover:text-wbbc-yellow transition">
              Lihat Kalender Penuh &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Jadwal (Di-loop dari API nantinya) */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-wbbc-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Latihan Rutin</div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-wbbc-yellow">2{item}</div>
                    <div className="text-xs uppercase">Agu 2026</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Fundamental & Conditioning</h3>
                <div className="flex items-center text-sm text-gray-300 mb-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  15:30 - 18:00 WIB
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Lapangan Utama Wimebha
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BERITA & KEGIATAN TERBARU */}
      <section id="berita" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-wbbc-navy mb-12 text-center">Berita & Kegiatan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Berita 1 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="h-48 bg-gray-300 w-full relative">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop" alt="News" className="object-cover w-full h-full" />
              </div>
              <div className="p-6">
                <div className="text-wbbc-red text-xs font-bold mb-2 uppercase">Turnamen</div>
                <h3 className="text-xl font-bold text-wbbc-navy mb-3">Tim Putra Lolos ke Semifinal DBL 2026</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Perjuangan keras anak-anak WBBC membuahkan hasil manis setelah berhasil menumbangkan juara bertahan di babak kuarter final.
                </p>
                <button className="text-wbbc-navy font-bold text-sm hover:text-wbbc-yellow transition">Baca Selengkapnya &rarr;</button>
              </div>
            </div>
            
            {/* Anda dapat menambahkan Card Berita 2 dan 3 di sini (struktur sama dengan di atas) */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
               <div className="h-48 bg-wbbc-navy w-full flex items-center justify-center text-white/50">Gambar Kegiatan</div>
               <div className="p-6">
                 <div className="text-wbbc-red text-xs font-bold mb-2 uppercase">Program</div>
                 <h3 className="text-xl font-bold text-wbbc-navy mb-3">Coaching Clinic bersama Legenda Timnas</h3>
                 <p className="text-gray-600 text-sm mb-4">Kegiatan berbagi ilmu dan fundamental basket yang dihadiri oleh seluruh roster WBBC dari tingkat SMP hingga SMA.</p>
               </div>
            </div>

            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
               <div className="h-48 bg-wbbc-yellow w-full flex items-center justify-center text-wbbc-navy/50">Gambar Kegiatan</div>
               <div className="p-6">
                 <div className="text-wbbc-red text-xs font-bold mb-2 uppercase">Fasilitas</div>
                 <h3 className="text-xl font-bold text-wbbc-navy mb-3">Renovasi Lapangan Utama Selesai</h3>
                 <p className="text-gray-600 text-sm mb-4">Untuk menunjang performa pemain, lapangan utama WBBC kini dilengkapi dengan sistem penerangan baru standar FIBA.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}