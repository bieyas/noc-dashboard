import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { level: "-18 dBm", count: 150 },
  { level: "-20 dBm", count: 210 },
  { level: "-22 dBm", count: 120 },
  { level: "-24 dBm", count: 75 },
  { level: "-26 dBm", count: 40 },
];

export default function PowerChart() {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h3 className="text-white mb-2 font-semibold">Distribusi Power ONU</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="level" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="count" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
