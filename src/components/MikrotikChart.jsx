import { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useMikrotikStats from "../hooks/useMikrotikStats";

export default function MikrotikChart() {
  const { stats, error, loading } = useMikrotikStats();
  const [data, setData] = useState([]);
  const prevStatsRef = useRef(null);

  useEffect(() => {
    if (stats) {
      const newData = {
        cpuLoad: stats.system.cpuLoad,
        totalMemory: stats.system.totalMemory,
        freeMemory: stats.system.freeMemory,
        timestamp: new Date().toLocaleTimeString(),
      };

      setData((prevData) => [...prevData, newData].slice(-20)); // Keep last 20 entries
      prevStatsRef.current = stats;
    }
  }, [stats]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cpuLoad" stroke="#8884d8" />
        <Line type="monotone" dataKey="totalMemory" stroke="#82ca9d" />
        <Line type="monotone" dataKey="freeMemory" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}