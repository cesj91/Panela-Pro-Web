const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./backend/config/database");

const authRoutes = require("./backend/routes/auth.routes");
const usuarioRoutes = require("./backend/routes/usuario.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});