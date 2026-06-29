const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./backend/config/database");

const app = express();

// Configuración
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("🚀 Bienvenido a Panela Pro Web");
});

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});