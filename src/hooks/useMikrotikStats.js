import { useEffect, useState } from "react";

export default function useMikrotikStats(interval = 5000) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/mikrotik/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats(); // Initial fetch
    timer = setInterval(fetchStats, interval); // Set up interval

    return () => clearInterval(timer); // Cleanup on unmount
  }, [interval]);
  return { stats, error, loading };
}
