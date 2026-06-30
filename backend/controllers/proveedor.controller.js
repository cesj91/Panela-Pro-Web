const Proveedor=require("../models/proveedor.model");

exports.listar=(req,res)=>{

    Proveedor.obtenerTodos((error,resultados)=>{

        if(error){

            return res.status(500).json(error);

        }

        res.json(resultados);

    });

};

exports.crear=(req,res)=>{

    Proveedor.crear(req.body,(error,resultado)=>{

        if(error){

            return res.status(500).json(error);

        }

        res.json(resultado);

    });

};

exports.actualizar=(req,res)=>{

    Proveedor.actualizar(req.params.id,req.body,(error)=>{

        if(error){

            return res.status(500).json(error);

        }

        res.json({
            mensaje:"Proveedor actualizado"
        });

    });

};

exports.eliminar=(req,res)=>{

    Proveedor.eliminar(req.params.id,(error)=>{

        if(error){

            return res.status(500).json(error);

        }

        res.json({
            mensaje:"Proveedor eliminado"
        });

    });

};