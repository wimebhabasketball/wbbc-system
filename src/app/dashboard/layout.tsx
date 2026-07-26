import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Gunakan background abu-abu muda untuk membedakan area konten dengan sidebar
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar tetap di kiri */}
            <Sidebar />

            {/* Area Konten Utama dinamis sesuai rute anak (children) */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}