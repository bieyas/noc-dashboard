// cache/mikrotikCache.js
const redis = require("../utils/redisCache.js");

let memoryCache = null; // ✅ fallback cache lokal

const keyPrefix = "mikrotik:";
const getCacheKey = (key) => `${keyPrefix}${key}`;

const CACHE_KEY = getCacheKey("stats");

async function setMikrotikCache(data) {
  memoryCache = { ...data, timestamp: Date.now() };

  try {
    await redis.set(CACHE_KEY, JSON.stringify(memoryCache));
  } catch (err) {
    console.warn("⚠️ Redis set gagal, pakai in-memory cache:", err.message);
  }
}

async function getMikrotikCache() {
  try {
    const raw = await redis.get(CACHE_KEY);
    if (raw) {
      return JSON.parse(raw);
    } else {
      console.warn("⚠️ Redis kosong, fallback ke in-memory cache");
      return memoryCache;
    }
  } catch (err) {
    console.warn(
      "⚠️ Redis get gagal, fallback ke in-memory cache:",
      err.message
    );
    return memoryCache;
  }
}

module.exports = {
  setMikrotikCache,
  getMikrotikCache,
};
