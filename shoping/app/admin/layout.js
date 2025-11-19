import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex w-full h-screen">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Side Content */}
      <div className="flex flex-col flex-1">

        {/* Admin Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-5 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
