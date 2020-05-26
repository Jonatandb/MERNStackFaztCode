const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 8888;

// Settings:
app.set("port", PORT);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));

module.exports = app;
