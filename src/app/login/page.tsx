'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGAS } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Panggil endpoint GAS
            const data = await fetchGAS('login', 'POST', { username, password });

            // Simpan session ke localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // user berisi: id, username, role, name

            // Redirect ke dashboard utama (nanti dilogika ulang berdasarkan role di layout)
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Username atau password salah.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Login */}
                <div className="bg-wbbc-navy p-8 text-center">
                    <div className="w-16 h-16 bg-wbbc-yellow rounded-full flex items-center justify-center font-bold text-wbbc-navy text-2xl mx-auto mb-4">
                        W
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">Portal WBBC</h2>
                    <p className="text-wbbc-yellow text-sm">Sistem Informasi Manajemen Terpadu</p>
                </div>

                {/* Form Login */}
                <div className="p-8">
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-wbbc-red p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username / ID</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wbbc-yellow focus:border-wbbc-yellow outline-none transition"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wbbc-yellow focus:border-wbbc-yellow outline-none transition"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-bold text-white transition ${loading ? 'bg-wbbc-navy/70 cursor-not-allowed' : 'bg-wbbc-navy hover:bg-wbbc-navy-hover'
                                }`}
                        >
                            {loading ? 'Memverifikasi...' : 'Masuk Sistem'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-wbbc-navy transition">&larr; Kembali ke Beranda</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}