const Produccion = require("../models/produccion.model");

exports.listar = (req, res) => {

    Produccion.obtenerTodos((error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

exports.crear = (req, res) => {

    Produccion.crear(req.body, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Lote registrado correctamente"
        });

    });

};

exports.actualizar = (req, res) => {

    Produccion.actualizar(req.params.id, req.body, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Lote actualizado correctamente"
        });

    });

};

exports.eliminar = (req, res) => {

    Produccion.eliminar(req.params.id, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Lote eliminado correctamente"
        });

    });

};