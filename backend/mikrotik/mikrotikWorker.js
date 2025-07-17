// workers/mikrotikWorker.js
const RouterOSClient = require("ros-client");
const { getMikrotikCache } = require("./mikrotikCache.js");
const { setMikrotikCache } = require("./mikrotikCache");
const command = require("./cmdReferences.js");
const { setIntervalAsync } = require("set-interval-async/dynamic");
const { mtxConfig } = require("./mtxConfig.js");
require("dotenv").config();

// Konfigurasi koneksi Mikrotik
let client = null;
let isConnected = false;
let backoffDelay = 5000; // Awal 5 detik
const NORMAL_INTERVAL = 10000; // Normal fetch tiap 10 detik
const MAX_BACKOFF = 60000; // Maks 60 detik

const connectMikrotik = async () => {
  if (isConnected && client) return client; // ✅ pakai koneksi lama jika masih aktif

  try {
    client = new RouterOSClient(mtxConfig);
    await client.connect();
    isConnected = true;
    console.log("🟢 Mikrotik connected");
    backoffDelay = NORMAL_INTERVAL; // Reset backoff delay
    return client;
  } catch (err) {
    console.error("❌ Mikrotik connection error:", err.message);
    isConnected = false;
    client = null; // Koneksi gagal, return null
    throw err; // Lempar error untuk ditangani di atas
  }
};

const fetchMikrotikStats = async () => {
  try {
    const client = await connectMikrotik();
    const resources = await client.send(command.SYSTEM.getResources);
    const interfaces = await client.send(command.INTERFACE.getAll);
    const userOnline = await client.send(command.PPP.getActive);

    const data = {
      system: {
        cpuLoad: resources[0]["cpu-load"],
        totalMemory: resources[0]["total-memory"],
        freeMemory: resources[0]["free-memory"],
      },
      interfaces: interfaces.map((i) => ({
        name: i.name,
        type: i.type,
        tx: i["tx-byte"],
        rx: i["rx-byte"],
      })),
      userPPPoE: userOnline.length,
    };

    await setMikrotikCache(data);
    console.log(
      `✅ Mikrotik data updated at ${new Date().toLocaleTimeString()}`
    );

    // ✅ Reset backoff jika berhasil
    backoffDelay = NORMAL_INTERVAL;
  } catch (error) {
    console.error(`[MikrotikWorker] Error: ${err.message}`);
    console.log(`⏳ Retry in ${backoffDelay / 1000}s...`);

    // ✅ Naikkan delay dengan exponential backoff
    backoffDelay = Math.min(backoffDelay * 2, MAX_BACKOFF);
  } finally {
    // ✅ Set interval untuk fetch berikutnya
    setTimeout(fetchMikrotikStats, backoffDelay);
  }
};

const startWorker = () => {
  console.log("🟢 Mikrotik worker aktif - fetch tiap 5 detik");
  fetchMikrotikStats(); // first run
  setIntervalAsync(fetchMikrotikStats, 5000); // fetch every 5 seconds
};

module.exports = startWorker;
