// src/components/Header.jsx
import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-white">👨‍💻 Network Operation Center</h2>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-6 h-6 text-zinc-400 hover:text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <UserCircle className="w-7 h-7 text-zinc-400" />
          <div className="text-sm">
            <p className="text-white font-medium">Teknisi A</p>
            <p className="text-zinc-400 text-xs">NOC Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
