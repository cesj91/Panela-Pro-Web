const token=localStorage.getItem("token");

if(!token){

window.location="../index.html";

}

let proveedores=[];
let idEditar=null;

async function cargarProveedores(){

const respuesta=await fetch("http://localhost:3000/api/proveedores");

proveedores=await respuesta.json();

const tabla=document.getElementById("tablaProveedores");

tabla.innerHTML="";

proveedores.forEach(p=>{

tabla.innerHTML+=`

<tr>

<td>${p.id_proveedor}</td>

<td>${p.nombre}</td>

<td>${p.nit}</td>

<td>${p.telefono}</td>

<td>${p.correo}</td>

<td>${p.direccion}</td>

<td>${p.estado}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editarProveedor(${p.id_proveedor})">

Editar

</button>

<button
class="btn btn-danger btn-sm ms-2"
onclick="eliminarProveedor(${p.id_proveedor})">

Eliminar

</button>

</td>

</tr>

`;

});

}

function editarProveedor(id){

const p=proveedores.find(x=>x.id_proveedor==id);

idEditar=id;

nombre.value=p.nombre;
nit.value=p.nit;
telefono.value=p.telefono;
correo.value=p.correo;
direccion.value=p.direccion;
estado.value=p.estado;

new bootstrap.Modal(modalProveedor).show();

}

formProveedor.addEventListener("submit",async(e)=>{

e.preventDefault();

const datos={

nombre:nombre.value,
nit:nit.value,
telefono:telefono.value,
correo:correo.value,
direccion:direccion.value,
estado:estado.value

};

if(idEditar==null){

await fetch("http://localhost:3000/api/proveedores",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(datos)

});

}else{

await fetch(`http://localhost:3000/api/proveedores/${idEditar}`,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(datos)

});

idEditar=null;

}

formProveedor.reset();

bootstrap.Modal.getInstance(modalProveedor).hide();

cargarProveedores();

});

async function eliminarProveedor(id){

if(!confirm("¿Eliminar proveedor?")) return;

await fetch(`http://localhost:3000/api/proveedores/${id}`,{

method:"DELETE"

});

cargarProveedores();

}

function cerrarSesion(){

localStorage.clear();

window.location="../index.html";

}

cargarProveedores();argarClientes();