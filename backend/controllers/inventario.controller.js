const Inventario=require("../models/inventario.model");

exports.listar=(req,res)=>{

Inventario.obtenerTodos((error,resultados)=>{

if(error){

return res.status(500).json(error);

}

res.json(resultados);

});

};

exports.crear=(req,res)=>{

Inventario.crear(req.body,(error)=>{

if(error){

return res.status(500).json(error);

}

res.json({
mensaje:"Inventario registrado"
});

});

};

exports.actualizar=(req,res)=>{

Inventario.actualizar(req.params.id,req.body,(error)=>{

if(error){

return res.status(500).json(error);

}

res.json({
mensaje:"Inventario actualizado"
});

});

};

exports.eliminar=(req,res)=>{

Inventario.eliminar(req.params.id,(error)=>{

if(error){

return res.status(500).json(error);

}

res.json({
mensaje:"Inventario eliminado"
});

});

};
