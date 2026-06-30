const Reporte = require("../models/reporte.model");

exports.resumen = (req, res) => {
    Reporte.resumen((error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados[0]);
    });
};

exports.ventas = (req, res) => {
    Reporte.ventas((error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};

exports.inventario = (req, res) => {
    Reporte.inventario((error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);
    });
};