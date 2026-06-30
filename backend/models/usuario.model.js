const conexion = require("../config/database");

const Usuario = {

    obtenerTodos(callback) {

        const sql = `
            SELECT
                u.id_usuario,
                u.nombre,
                u.usuario,
                u.correo,
                u.id_rol,
                r.nombre_rol,
                u.estado
            FROM usuarios u
            INNER JOIN roles r
                ON u.id_rol = r.id_rol
            ORDER BY u.id_usuario DESC
        `;

        conexion.query(sql, callback);

    },

    crear(datos, callback) {

        const sql = `
            INSERT INTO usuarios
            (nombre, correo, usuario, contrasena, id_rol, estado)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        conexion.query(sql, [
            datos.nombre,
            datos.correo,
            datos.usuario,
            datos.contrasena,
            datos.id_rol,
            datos.estado
        ], callback);

    },

    actualizar(id, datos, callback) {

        let sql = `
            UPDATE usuarios
            SET
                nombre=?,
                correo=?,
                usuario=?,
                id_rol=?,
                estado=?
        `;

        let valores = [
            datos.nombre,
            datos.correo,
            datos.usuario,
            datos.id_rol,
            datos.estado
        ];

        if (datos.contrasena && datos.contrasena !== "") {
            sql += ", contrasena=?";
            valores.push(datos.contrasena);
        }

        sql += " WHERE id_usuario=?";

        valores.push(id);

        conexion.query(sql, valores, callback);

    },

    eliminar(id, callback) {

        conexion.query(
            "DELETE FROM usuarios WHERE id_usuario=?",
            [id],
            callback
        );

    }

};

module.exports = Usuario;