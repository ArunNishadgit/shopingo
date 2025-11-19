"use client";

export default function AdminSidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5">
      <ul className="space-y-4">
        <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-400 cursor-pointer">Products</li>
        <li className="hover:text-blue-400 cursor-pointer">Orders</li>
        <li className="hover:text-blue-400 cursor-pointer">Users</li>
      </ul>
    </aside>
  );
}
