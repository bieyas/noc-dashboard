export default function OdpPopup({ odp }) {
  const showOnus = () => alert(`Menampilkan ONU di ${odp.name} (simulasi)`);

  return (
    <div className="space-y-1 text-sm">
      <strong>{odp.name}</strong><br />
      Tipe: ODP
      <div className="mt-2">
        <button
          onClick={showOnus}
          className="bg-indigo-600 px-2 py-1 text-white rounded text-xs"
        >
          Lihat ONU Terkait
        </button>
      </div>
    </div>
  );
}
