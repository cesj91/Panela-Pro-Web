const conexion = require("../config/database");

const Venta = {

    obtenerTodos(callback) {
        const sql = `
        SELECT
            v.id_venta,
            c.nombre AS cliente,
            p.nombre AS producto,
            v.cantidad,
            v.precio_unitario,
            v.total,
            v.fecha_venta
        FROM ventas v
        INNER JOIN clientes c ON v.id_cliente = c.id_cliente
        INNER JOIN productos p ON v.id_producto = p.id_producto
        ORDER BY v.id_venta DESC
        `;

        conexion.query(sql, callback);
    },

    crear(datos, callback) {
        conexion.query(
            `INSERT INTO ventas
            (id_cliente, id_producto, cantidad, precio_unitario, total, fecha_venta)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                datos.id_cliente,
                datos.id_producto,
                datos.cantidad,
                datos.precio_unitario,
                datos.total,
                datos.fecha_venta
            ],
            callback
        );
    },

    actualizar(id, datos, callback) {
        conexion.query(
            `UPDATE ventas
            SET id_cliente = ?, id_producto = ?, cantidad = ?, precio_unitario = ?, total = ?, fecha_venta = ?
            WHERE id_venta = ?`,
            [
                datos.id_cliente,
                datos.id_producto,
                datos.cantidad,
                datos.precio_unitario,
                datos.total,
                datos.fecha_venta,
                id
            ],
            callback
        );
    },

    eliminar(id, callback) {
        conexion.query(
            "DELETE FROM ventas WHERE id_venta = ?",
            [id],
            callback
        );
    }

};

module.exports = Venta;