import { requireAdmin } from "@/app/lib/adminGuard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white px-6 py-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
