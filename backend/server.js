const express = require("express");
const cors = require("cors");
const mikrotikRoutes = require("./routes/mikrotikRoutes.js");
const startWorker = require("./mikrotik/mikrotikWorker.js");

const app = express();
app.use(cors());

app.use("/mikrotik", mikrotikRoutes);

startWorker(); // Start the Mikrotik worker

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
