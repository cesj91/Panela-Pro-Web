const Usuario = require("../models/usuario.model");

exports.listar = (req, res) => {
    Usuario.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: "Error al listar usuarios", error });
        }

        res.json(resultados);
    });
};

exports.crear = (req, res) => {
    const { nombre, correo, usuario, contrasena, id_rol, estado } = req.body;

    if (!nombre || !correo || !usuario || !contrasena || !id_rol) {
        return res.status(400).json({ mensaje: "Todos los campos obligatorios deben completarse" });
    }

    Usuario.crear({ nombre, correo, usuario, contrasena, id_rol, estado }, (error, resultado) => {
        if (error) {
            return res.status(500).json({ mensaje: "Error al crear usuario", error });
        }

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_usuario: resultado.insertId
        });
    });
};