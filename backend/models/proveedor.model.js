const conexion = require("../config/database");

const Proveedor = {

    obtenerTodos(callback){

        conexion.query(

            "SELECT * FROM proveedores ORDER BY id_proveedor DESC",

            callback

        );

    },

    crear(datos,callback){

        conexion.query(

            `INSERT INTO proveedores
            (nombre,nit,telefono,correo,direccion,estado)
            VALUES (?,?,?,?,?,?)`,

            [

                datos.nombre,
                datos.nit,
                datos.telefono,
                datos.correo,
                datos.direccion,
                datos.estado

            ],

            callback

        );

    },

    actualizar(id,datos,callback){

        conexion.query(

            `UPDATE proveedores
            SET
            nombre=?,
            nit=?,
            telefono=?,
            correo=?,
            direccion=?,
            estado=?
            WHERE id_proveedor=?`,

            [

                datos.nombre,
                datos.nit,
                datos.telefono,
                datos.correo,
                datos.direccion,
                datos.estado,
                id

            ],

            callback

        );

    },

    eliminar(id,callback){

        conexion.query(

            "DELETE FROM proveedores WHERE id_proveedor=?",

            [id],

            callback

        );

    }

};

module.exports = Proveedor;