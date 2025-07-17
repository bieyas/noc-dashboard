import { Wifi, XCircle, AlertTriangle, Cpu, MemoryStick, Users, Layers } from "lucide-react";


const iconMap = {
  wifi: Wifi,
  "x-circle": XCircle,
  "alert-triangle": AlertTriangle,
  cpu: Cpu,
  memory: MemoryStick,
  users: Users,
  layers: Layers,
};

export default function StatCard({ title, value, icon, color }) {
  const Icon = iconMap[icon];
  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-md flex items-center gap-4 border border-zinc-700">
      <Icon className={`w-8 h-8 text-${color}-400`} />
      <div>
        <p className="text-zinc-400 text-sm">{title}</p>
        <h2 className="text-white text-xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}
