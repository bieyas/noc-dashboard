export default function MapControls({ onuList, odpList, onSelect, visibleStatuses, setVisibleStatuses }) {
  const statusOptions = ["online", "offline", "weak", "nonactive"];

  const handleChange = (status) => {
    if (visibleStatuses.includes(status)) {
      setVisibleStatuses(visibleStatuses.filter((s) => s !== status));
    } else {
      setVisibleStatuses([...visibleStatuses, status]);
    }
  };

  const handleSelect = (e) => {
    const id = e.target.value;
    const all = [...onuList, ...odpList];
    const found = all.find((d) => d.id === id);
    if (found) onSelect(found);
  };

  return (
    <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Cari ONU / ODP</label>
        <select onChange={handleSelect} className="bg-zinc-800 text-white px-3 py-2 rounded w-64">
          <option value="">-- Pilih Marker --</option>
          {onuList.map((onu) => (
            <option key={onu.id} value={onu.id}>
              🟢 {onu.name}
            </option>
          ))}
          {odpList.map((odp) => (
            <option key={odp.id} value={odp.id}>
              🟦 {odp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Filter Status ONU</label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <label key={status} className="flex items-center gap-1 text-sm capitalize">
              <input
                type="checkbox"
                checked={visibleStatuses.includes(status)}
                onChange={() => handleChange(status)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
