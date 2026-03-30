const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/grievance")
  .then(() => console.log("Mongo Connected"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(process.cwd(), "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "client/build/index.html"));
});

app.listen(5000, () => console.log("Server running"));