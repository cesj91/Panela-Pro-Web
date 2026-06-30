const express = require("express");

const router = express.Router();

const controlador = require("../controllers/reporte.controller");

router.get("/resumen", controlador.resumen);
router.get("/ventas", controlador.ventas);
router.get("/inventario", controlador.inventario);

module.exports = router;