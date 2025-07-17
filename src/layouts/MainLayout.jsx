// src/layouts/MainLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Users, Map, Settings, Network, Server, Menu, Wifi } from "lucide-react";
import Header from "../components/Header";

const menu = [
  { name: "Dashboard", path: "/", icon: <Home size={18} /> },
  { name: "Monitoring OLT", path: "/olt", icon: <Server size={18} /> },
  { name: "Monitoring Mikrotik", path: "/mikrotik", icon: <Network size={18} /> },
  { name: "PPPoE Users", path: "/pppoe", icon: <Wifi size={18} /> },
  { name: "Peta", path: "/map", icon: <Map size={18} /> },
  { name: "Pelanggan", path: "/pelanggan", icon: <Users size={18} /> },
  { name: "Pengaturan", path: "/settings", icon: <Settings size={18} /> }
];

export default function MainLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMapPage = pathname === "/map";

  useEffect(() => {
    document.title = menu.find((m) => m.path === pathname)?.name || "NOC ISP";
    // Tutup sidebar otomatis saat navigasi di mobile
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-zinc-900 p-4 border-r border-zinc-800 z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-xl font-bold mb-6">NOC ISP</h1>
        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-800 transition ${
                pathname === item.path ? "bg-zinc-800 font-semibold" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && !isMapPage && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Topbar Header */}
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="text-white w-6 h-6" />
          </button>
        <h2 className="text-white text-lg font-bold">NOC ISP</h2>
      </div>

        <main className={`flex-1 p-6 overflow-auto`}>
            <Header />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
