const conexion = require("../config/database");

const Producto = {

    obtenerTodos(callback) {

        conexion.query(
            "SELECT * FROM productos ORDER BY id_producto DESC",
            callback
        );

    },

    crear(datos, callback) {

        conexion.query(

            `INSERT INTO productos
            (codigo,nombre,categoria,unidad_medida,precio,stock_minimo,estado)
            VALUES (?,?,?,?,?,?,?)`,

            [
                datos.codigo,
                datos.nombre,
                datos.categoria,
                datos.unidad_medida,
                datos.precio,
                datos.stock_minimo,
                datos.estado
            ],

            callback

        );

    },

    actualizar(id, datos, callback) {

        conexion.query(

            `UPDATE productos
            SET
            codigo=?,
            nombre=?,
            categoria=?,
            unidad_medida=?,
            precio=?,
            stock_minimo=?,
            estado=?
            WHERE id_producto=?`,

            [

                datos.codigo,
                datos.nombre,
                datos.categoria,
                datos.unidad_medida,
                datos.precio,
                datos.stock_minimo,
                datos.estado,
                id

            ],

            callback

        );

    },

    eliminar(id, callback){

        conexion.query(

            "DELETE FROM productos WHERE id_producto=?",

            [id],

            callback

        );

    }

};

module.exports = Producto;