const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./backend/config/database");

const authRoutes = require("./backend/routes/auth.routes");
const usuarioRoutes = require("./backend/routes/usuario.routes");
const clienteRoutes = require("./backend/routes/cliente.routes");
const productoRoutes = require("./backend/routes/producto.routes");
const proveedorRoutes=require("./backend/routes/proveedor.routes");
const inventarioRoutes=require("./backend/routes/inventario.routes");
const produccionRoutes = require("./backend/routes/produccion.routes");
const ventaRoutes = require("./backend/routes/venta.routes");
const reporteRoutes = require("./backend/routes/reporte.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/proveedores",proveedorRoutes);
app.use("/api/inventario",inventarioRoutes);
app.use("/api/produccion", produccionRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/reportes", reporteRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});