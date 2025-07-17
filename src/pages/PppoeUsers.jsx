import { useEffect, useState } from "react";

export default function PppoeUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:5000/api/mikrotik/pppoe-users");
      const json = await res.json();
      setUsers(json);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">PPPoE Aktif</h1>
      <div className="overflow-auto rounded-xl border border-zinc-800">
        <table className="min-w-full text-sm text-left text-zinc-300">
          <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">IP Address</th>
              <th className="px-4 py-2">MAC</th>
              <th className="px-4 py-2">Uptime</th>
              <th className="px-4 py-2">Interface</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user[".id"]} className="border-b border-zinc-800 hover:bg-zinc-900">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">{user["mac-address"]}</td>
                <td className="px-4 py-2">{user.uptime}</td>
                <td className="px-4 py-2">{user.interface}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => alert(`Disconnect user ${user.name}`)}
                    className="text-red-400 hover:underline"
                  >
                    Disconnect
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-zinc-500">
                  Tidak ada user aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
