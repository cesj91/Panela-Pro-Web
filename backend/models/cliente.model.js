const conexion = require("../config/database");

const Cliente = {

    obtenerTodos(callback) {

        conexion.query(
            "SELECT * FROM clientes ORDER BY id_cliente DESC",
            callback
        );

    },

    crear(datos, callback) {

        conexion.query(

            `INSERT INTO clientes
            (nombre,documento,telefono,correo,direccion,estado)
            VALUES (?,?,?,?,?,?)`,

            [
                datos.nombre,
                datos.documento,
                datos.telefono,
                datos.correo,
                datos.direccion,
                datos.estado
            ],

            callback

        );

    },

    actualizar(id, datos, callback) {

        conexion.query(

            `UPDATE clientes
            SET
            nombre=?,
            documento=?,
            telefono=?,
            correo=?,
            direccion=?,
            estado=?
            WHERE id_cliente=?`,

            [
                datos.nombre,
                datos.documento,
                datos.telefono,
                datos.correo,
                datos.direccion,
                datos.estado,
                id
            ],

            callback

        );

    },

    eliminar(id, callback) {

        conexion.query(

            "DELETE FROM clientes WHERE id_cliente=?",

            [id],

            callback

        );

    }

};

module.exports = Cliente;