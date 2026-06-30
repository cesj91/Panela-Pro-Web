const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let clientes = [];
let idEditar = null;

async function cargarClientes() {

    const respuesta = await fetch("http://localhost:3000/api/clientes");
    clientes = await respuesta.json();

    const tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = "";

    clientes.forEach(c => {

        tabla.innerHTML += `
            <tr>

                <td>${c.id_cliente}</td>
                <td>${c.nombre}</td>
                <td>${c.documento}</td>
                <td>${c.telefono}</td>
                <td>${c.correo}</td>
                <td>${c.direccion}</td>
                <td>${c.estado}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editarCliente(${c.id_cliente})">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-sm ms-2"
                        onclick="eliminarCliente(${c.id_cliente})">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;

    });

}

function editarCliente(id){

    const cliente = clientes.find(c => c.id_cliente == id);

    idEditar = id;

    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("documento").value = cliente.documento;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("estado").value = cliente.estado;

    new bootstrap.Modal(document.getElementById("modalCliente")).show();

}

document.getElementById("formCliente").addEventListener("submit", async function(e){

    e.preventDefault();

    const datos = {

        nombre: document.getElementById("nombre").value,
        documento: document.getElementById("documento").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        direccion: document.getElementById("direccion").value,
        estado: document.getElementById("estado").value

    };

    if(idEditar == null){

        await fetch("http://localhost:3000/api/clientes",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

    }else{

        await fetch(`http://localhost:3000/api/clientes/${idEditar}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

        idEditar = null;

    }

    document.getElementById("formCliente").reset();

    bootstrap.Modal.getInstance(document.getElementById("modalCliente")).hide();

    cargarClientes();

});

async function eliminarCliente(id){

    if(!confirm("¿Desea eliminar este cliente?")) return;

    await fetch(`http://localhost:3000/api/clientes/${id}`,{

        method:"DELETE"

    });

    cargarClientes();

}

function cerrarSesion(){

    localStorage.clear();

    window.location.href="../index.html";

}

cargarClientes();