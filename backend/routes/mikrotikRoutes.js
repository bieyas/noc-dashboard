// mikrotikRoutes.js
const express = require("express");
const { getMikrotikCache } = require("../mikrotik/mikrotikCache.js");
const e = require("express");
const router = express.Router();

// Route to get Mikrotik statistics
router.get("/stats", async (req, res) => {
  try {
    const data = await getMikrotikCache();
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching Mikrotik stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get Mikrotik user online count
router.get("/user-online", async (req, res) => {
  try {
    const data = await getMikrotikCache();
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json({ userOnline: data.userOnline });
  } catch (error) {
    console.error("Error fetching Mikrotik user online count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get Mikrotik interface details
router.get("/interfaces", async (req, res) => {
  try {
    const data = await getMikrotikCache();
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data.interfaces);
  } catch (error) {
    console.error("Error fetching Mikrotik interfaces:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
