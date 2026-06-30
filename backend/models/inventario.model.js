const conexion = require("../config/database");

const Inventario = {

    obtenerTodos(callback){

        const sql=`
        SELECT

        i.id_inventario,
        p.nombre,
        p.codigo,
        i.cantidad_disponible,
        i.fecha_actualizacion

        FROM inventario i

        INNER JOIN productos p
        ON i.id_producto=p.id_producto

        ORDER BY i.id_inventario DESC
        `;

        conexion.query(sql,callback);

    },

    crear(datos,callback){

        conexion.query(

        `INSERT INTO inventario
        (id_producto,cantidad_disponible)
        VALUES (?,?)`,

        [

        datos.id_producto,
        datos.cantidad_disponible

        ],

        callback

        );

    },

    actualizar(id,datos,callback){

        conexion.query(

        `UPDATE inventario
        SET
        id_producto=?,
        cantidad_disponible=?
        WHERE id_inventario=?`,

        [

        datos.id_producto,
        datos.cantidad_disponible,
        id

        ],

        callback

        );

    },

    eliminar(id,callback){

        conexion.query(

        "DELETE FROM inventario WHERE id_inventario=?",

        [id],

        callback

        );

    }

};

module.exports=Inventario;