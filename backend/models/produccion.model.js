const conexion = require("../config/database");

const Produccion = {

    obtenerTodos(callback) {

        const sql = `
        SELECT
            id_lote,
            codigo_lote,
            producto_final,
            cantidad_producida,
            fecha_produccion,
            estado
        FROM lotes
        ORDER BY id_lote DESC
        `;

        conexion.query(sql, callback);

    },

    crear(datos, callback) {

        conexion.query(

            `INSERT INTO lotes
            (codigo_lote, producto_final, cantidad_producida, fecha_produccion, estado)
            VALUES (?, ?, ?, ?, ?)`,

            [
                datos.codigo_lote,
                datos.producto_final,
                datos.cantidad_producida,
                datos.fecha_produccion,
                datos.estado
            ],

            callback

        );

    },

    actualizar(id, datos, callback) {

        conexion.query(

            `UPDATE lotes
            SET
                codigo_lote = ?,
                producto_final = ?,
                cantidad_producida = ?,
                fecha_produccion = ?,
                estado = ?
            WHERE id_lote = ?`,

            [
                datos.codigo_lote,
                datos.producto_final,
                datos.cantidad_producida,
                datos.fecha_produccion,
                datos.estado,
                id
            ],

            callback

        );

    },

    eliminar(id, callback) {

        conexion.query(
            "DELETE FROM lotes WHERE id_lote = ?",
            [id],
            callback
        );

    }

};

module.exports = Produccion;