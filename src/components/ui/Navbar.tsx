'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-wbbc-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-wbbc-yellow rounded-full flex items-center justify-center font-bold text-wbbc-navy">
              W
            </div>
            <Link href="/" className="font-bold text-2xl tracking-wider uppercase">
              WBBC<span className="text-wbbc-yellow">.</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#profil" className="hover:text-wbbc-yellow transition">Profil</Link>
            <Link href="#roster" className="hover:text-wbbc-yellow transition">Roster</Link>
            <Link href="#jadwal" className="hover:text-wbbc-yellow transition">Jadwal</Link>
            <Link href="#berita" className="hover:text-wbbc-yellow transition">Berita</Link>
            
            {/* Tombol Login ke Sistem */}
            <Link 
              href="/login" 
              className="bg-wbbc-yellow hover:bg-yellow-400 text-wbbc-navy font-bold px-6 py-2 rounded-full transition shadow-lg"
            >
              Portal Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-wbbc-yellow focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-wbbc-navy-hover pb-4 px-4 space-y-2">
          <Link href="#profil" className="block py-2 hover:text-wbbc-yellow">Profil</Link>
          <Link href="#roster" className="block py-2 hover:text-wbbc-yellow">Roster</Link>
          <Link href="#jadwal" className="block py-2 hover:text-wbbc-yellow">Jadwal</Link>
          <Link href="/login" className="block mt-4 text-center bg-wbbc-yellow text-wbbc-navy font-bold py-2 rounded-lg">
            Portal Login
          </Link>
        </div>
      )}
    </nav>
  );
}