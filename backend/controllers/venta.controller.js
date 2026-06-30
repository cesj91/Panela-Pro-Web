const Venta = require("../models/venta.model");

exports.listar = (req, res) => {
    Venta.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};

exports.crear = (req, res) => {
    Venta.crear(req.body, (error) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json({ mensaje: "Venta registrada correctamente" });
    });
};

exports.actualizar = (req, res) => {
    Venta.actualizar(req.params.id, req.body, (error) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json({ mensaje: "Venta actualizada correctamente" });
    });
};

exports.eliminar = (req, res) => {
    Venta.eliminar(req.params.id, (error) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json({ mensaje: "Venta eliminada correctamente" });
    });
};