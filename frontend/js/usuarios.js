const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let usuarios = [];
let idEditar = null;

async function cargarUsuarios() {

    const respuesta = await fetch("http://localhost:3000/api/usuarios");
    usuarios = await respuesta.json();

    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    usuarios.forEach(u => {

        tabla.innerHTML += `
            <tr>
                <td>${u.id_usuario}</td>
                <td>${u.nombre}</td>
                <td>${u.usuario}</td>
                <td>${u.correo}</td>
                <td>${u.nombre_rol}</td>
                <td>${u.estado}</td>

                <td>

                    <button class="btn btn-warning btn-sm"
                        onclick="editarUsuario(${u.id_usuario})">

                        Editar

                    </button>

                    <button class="btn btn-danger btn-sm ms-2"
                        onclick="eliminarUsuario(${u.id_usuario})">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;

    });

}

function editarUsuario(id){

    const usuario = usuarios.find(x => x.id_usuario == id);

    idEditar = id;

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("usuario").value = usuario.usuario;
    document.getElementById("contrasena").value = "";
    document.getElementById("id_rol").value = usuario.id_rol;
    document.getElementById("estado").value = usuario.estado;

    new bootstrap.Modal(document.getElementById("modalUsuario")).show();

}

document.getElementById("formUsuario").addEventListener("submit", async(e)=>{

    e.preventDefault();

    const datos = {

        nombre:document.getElementById("nombre").value,
        correo:document.getElementById("correo").value,
        usuario:document.getElementById("usuario").value,
        contrasena:document.getElementById("contrasena").value,
        id_rol:document.getElementById("id_rol").value,
        estado:document.getElementById("estado").value

    };

    if(idEditar==null){

        await fetch("http://localhost:3000/api/usuarios",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

    }else{

        await fetch(`http://localhost:3000/api/usuarios/${idEditar}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

        idEditar=null;

    }

    document.getElementById("formUsuario").reset();

    bootstrap.Modal.getInstance(document.getElementById("modalUsuario")).hide();

    cargarUsuarios();

});

async function eliminarUsuario(id){

    if(!confirm("¿Desea eliminar este usuario?")) return;

    await fetch(`http://localhost:3000/api/usuarios/${id}`,{

        method:"DELETE"

    });

    cargarUsuarios();

}

function cerrarSesion(){

    localStorage.clear();

    window.location="../index.html";

}

cargarUsuarios();