import Sidebar from "@/components/ui/Sidebar";
import AuthGuard from "@/components/ui/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        // Membungkus seluruh dashboard dengan AuthGuard
        <AuthGuard>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}