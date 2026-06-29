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
            INNER JOIN roles r ON u.id_rol = r.id_rol
            ORDER BY u.id_usuario DESC
        `;
        conexion.query(sql, callback);
    },

    crear(datos, callback) {
        const sql = `
            INSERT INTO usuarios (nombre, correo, usuario, contrasena, id_rol, estado)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        conexion.query(sql, [
            datos.nombre,
            datos.correo,
            datos.usuario,
            datos.contrasena,
            datos.id_rol,
            datos.estado || "Activo"
        ], callback);
    }
};

module.exports = Usuario;