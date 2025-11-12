"use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") return <p>Loading...</p>;
//   if (!session || session.user.role !== "admin") {
//     router.push("/login");
//     return null;
//   }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-xl font-semibold mb-8">🛍️ Shopingo Admin</h1>
        <nav className="space-y-3">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              Products
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              Users
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
              Orders
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
