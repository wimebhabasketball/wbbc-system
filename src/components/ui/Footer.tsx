export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 border-t-4 border-wbbc-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">Wimebha Basketball Club</h2>
          <p className="text-sm">Membangun Juara, Membentuk Karakter.</p>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Sistem Informasi WBBC. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}