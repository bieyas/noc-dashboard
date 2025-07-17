import StatCard from "../components/StatCard";
import MikrotikChart from "../components/MikrotikChart";
import useMikrotikStats from "../hooks/useMikrotikStats";

export default function MikrotikPage() {
  const { stats, error, loading } = useMikrotikStats();
  const cpuLoad = stats ? stats.system.cpuLoad : 0;
  const totalMemory = stats ? stats.system.totalMemory : 0;
  const freeMemory = stats ? stats.system.freeMemory : 0;
  const userPPPoE = stats ? stats.userPPPoE : 0;


  return (
    <div className="mikrotik-page">
      <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="CPU Load"
          value={`${cpuLoad}%`}
          icon="cpu"
          color="bg-blue-500"
        />
        <StatCard
          title="Total Memory"
          value={`${(totalMemory / 1024 / 1024).toFixed(2)} MB`}
          icon="memory"
          color="bg-green-500"
        />
        <StatCard
          title="Free Memory"
          value={`${(freeMemory / 1024 / 1024).toFixed(2)} MB`}
          icon="memory"
          color="bg-yellow-500"
        />
        <StatCard
          title="Online Users"
          value={`${userPPPoE}`}
          icon="users"
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}