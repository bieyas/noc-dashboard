import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Sen", online: 120, offline: 5 },
  { name: "Sel", online: 140, offline: 2 },
  { name: "Rab", online: 130, offline: 4 },
  { name: "Kam", online: 135, offline: 1 },
  { name: "Jum", online: 138, offline: 3 }
];

const Card = ({ title, value, color }) => (
  <div className={`bg-zinc-800 rounded-xl p-4 flex flex-col gap-1 border-l-4 ${color}`}>
    <p className="text-sm text-zinc-400">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Pelanggan Online" value="138" color="border-green-500" />
        <Card title="Pelanggan Offline" value="3" color="border-red-500" />
        <Card title="ONU Alarm" value="2" color="border-yellow-500" />
        <Card title="Load CPU Mikrotik" value="43%" color="border-blue-500" />
      </div>

      <div className="bg-zinc-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Grafik Status Pelanggan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Bar dataKey="online" stackId="a" fill="#22c55e" />
            <Bar dataKey="offline" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}