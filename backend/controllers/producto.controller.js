const Producto = require("../models/producto.model");

exports.listar = (req, res) => {

    Producto.obtenerTodos((error, resultados) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al listar productos",
                error
            });
        }

        res.json(resultados);

    });

};

exports.crear = (req, res) => {

    Producto.crear(req.body, (error, resultado) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al crear producto",
                error
            });
        }

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            id: resultado.insertId
        });

    });

};

exports.actualizar = (req, res) => {

    Producto.actualizar(req.params.id, req.body, (error) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al actualizar producto",
                error
            });
        }

        res.json({
            mensaje: "Producto actualizado correctamente"
        });

    });

};

exports.eliminar = (req, res) => {

    Producto.eliminar(req.params.id, (error) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar producto",
                error
            });
        }

        res.json({
            mensaje: "Producto eliminado correctamente"
        });

    });

};