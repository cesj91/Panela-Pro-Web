const conexion = require("../config/database");

const Reporte = {

    resumen(callback) {
        const sql = `
        SELECT
            (SELECT COUNT(*) FROM productos) AS total_productos,
            (SELECT COUNT(*) FROM clientes) AS total_clientes,
            (SELECT COUNT(*) FROM proveedores) AS total_proveedores,
            (SELECT COUNT(*) FROM inventario) AS total_inventario,
            (SELECT COUNT(*) FROM lotes) AS total_lotes,
            (SELECT COUNT(*) FROM ventas) AS total_ventas,
            (SELECT IFNULL(SUM(total),0) FROM ventas) AS total_ingresos
        `;

        conexion.query(sql, callback);
    },

    ventas(callback) {
        const sql = `
        SELECT
            v.id_venta,
            c.nombre AS cliente,
            v.fecha_venta,
            v.total,
            v.estado
        FROM ventas v
        INNER JOIN clientes c ON v.id_cliente = c.id_cliente
        ORDER BY v.fecha_venta DESC
        `;

        conexion.query(sql, callback);
    },

    inventario(callback) {
        const sql = `
        SELECT
            p.codigo,
            p.nombre,
            p.categoria,
            i.cantidad_disponible,
            p.stock_minimo
        FROM inventario i
        INNER JOIN productos p ON i.id_producto = p.id_producto
        ORDER BY p.nombre ASC
        `;

        conexion.query(sql, callback);
    }

};

module.exports = Reporte;