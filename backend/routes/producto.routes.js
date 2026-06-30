const express = require("express");
const router = express.Router();

const controlador = require("../controllers/producto.controller");

router.get("/", controlador.listar);

router.post("/", controlador.crear);

router.put("/:id", controlador.actualizar);

router.delete("/:id", controlador.eliminar);

module.exports = router;