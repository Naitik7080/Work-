require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notifyRoute = require("./routes/notify");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", notifyRoute);

app.get("/", (req, res) => {
  res.send("DeeTech WiFi backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`DeeTech WiFi backend listening on port ${PORT}`);
});
