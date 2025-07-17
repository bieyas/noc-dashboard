export default function OnuPopup({ onu }) {
  const handlePing = () => alert(`Ping ke ${onu.name} berhasil! (simulasi)`);
  const handleTiket = () => alert(`Tiket untuk ${onu.name} telah dibuat.`);
  const handleDetail = () => alert(`Grafik sinyal ${onu.name} (dummy)`);

  return (
    <div className="space-y-1 text-sm">
      <strong>{onu.name}</strong><br />
      Status: <span className="capitalize">{onu.status}</span>
      <div className="mt-2 flex flex-col gap-1">
        <button onClick={handlePing} className="bg-green-600 px-2 py-1 text-white rounded text-xs">
          Ping ONU
        </button>
        <button onClick={handleDetail} className="bg-blue-600 px-2 py-1 text-white rounded text-xs">
          Lihat Grafik
        </button>
        <button onClick={handleTiket} className="bg-yellow-600 px-2 py-1 text-black rounded text-xs">
          Buat Tiket
        </button>
      </div>
    </div>
  );
}
