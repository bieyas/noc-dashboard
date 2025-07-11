import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "08:00", rx: 240, tx: 120 },
  { time: "09:00", rx: 300, tx: 160 },
  { time: "10:00", rx: 280, tx: 150 },
  { time: "11:00", rx: 350, tx: 200 },
  { time: "12:00", rx: 400, tx: 220 },
];

export default function TrafficChart() {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h3 className="text-white mb-2 font-semibold">Traffic Mikrotik</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="rx" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="tx" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
