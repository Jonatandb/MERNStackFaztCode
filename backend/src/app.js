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
app.get("/api", (req, res) => res.send("Bienvenido!!"));
app.get("/api/users", (req, res) => res.send("Users"));
app.get("/api/notes", (req, res) => res.send("Notes"));

module.exports = app;
