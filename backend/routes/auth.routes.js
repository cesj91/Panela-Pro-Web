const express = require("express");

const router = express.Router();

const controlador = require("../controllers/auth.controller");

router.post("/login", controlador.login);

module.exports = router;