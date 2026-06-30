const Cliente = require("../models/cliente.model");

exports.listar = (req, res) => {

    Cliente.obtenerTodos((error, resultados) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al listar clientes",
                error
            });

        }

        res.json(resultados);

    });

};

exports.crear = (req, res) => {

    Cliente.crear(req.body, (error, resultado) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al crear cliente",
                error
            });

        }

        res.status(201).json({
            mensaje: "Cliente creado correctamente",
            id: resultado.insertId
        });

    });

};

exports.actualizar = (req, res) => {

    Cliente.actualizar(req.params.id, req.body, (error) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al actualizar cliente",
                error
            });

        }

        res.json({
            mensaje: "Cliente actualizado correctamente"
        });

    });

};

exports.eliminar = (req, res) => {

    Cliente.eliminar(req.params.id, (error) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al eliminar cliente",
                error
            });

        }

        res.json({
            mensaje: "Cliente eliminado correctamente"
        });

    });

};