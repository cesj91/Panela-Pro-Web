const jwt = require("jsonwebtoken");
const conexion = require("../config/database");

exports.login = (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ mensaje: "Usuario y contraseña son obligatorios" });
    }

    const sql = `
        SELECT u.id_usuario, u.nombre, u.usuario, u.correo, u.contrasena, r.nombre_rol
        FROM usuarios u
        INNER JOIN roles r ON u.id_rol = r.id_rol
        WHERE u.usuario = ? AND u.estado = 'Activo'
    `;

    conexion.query(sql, [usuario], (error, resultados) => {
        if (error) {
            return res.status(500).json({ mensaje: "Error en el servidor", error });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        const user = resultados[0];

        if (contrasena !== user.contrasena) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                usuario: user.usuario,
                rol: user.nombre_rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            mensaje: "Login correcto",
            token,
            usuario: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                usuario: user.usuario,
                correo: user.correo,
                rol: user.nombre_rol
            }
        });
    });
};