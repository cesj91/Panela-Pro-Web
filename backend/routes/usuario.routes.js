const express = require("express");
const router = express.Router();
const controlador = require("../controllers/usuario.controller");

router.get("/", controlador.listar);
router.post("/", controlador.crear);

module.exports = router;