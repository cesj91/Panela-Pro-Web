const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let clientes = [];
let idEditar = null;


// ===============================
// CARGAR CLIENTES
// ===============================

async function cargarClientes() {

    try {

        const respuesta = await fetch("/api/clientes");

        if (!respuesta.ok) {
            throw new Error("Error al consultar clientes");
        }

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

    } catch (error) {

        console.error("Error cargando clientes:", error);

    }

}


// ===============================
// EDITAR CLIENTE
// ===============================

function editarCliente(id) {

    const cliente = clientes.find(c => c.id_cliente == id);

    if (!cliente) {
        alert("Cliente no encontrado");
        return;
    }

    idEditar = id;

    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("documento").value = cliente.documento;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("estado").value = cliente.estado;

    new bootstrap.Modal(
        document.getElementById("modalCliente")
    ).show();

}


// ===============================
// CREAR / ACTUALIZAR CLIENTE
// ===============================

document.getElementById("formCliente").addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();

        const datos = {

            nombre: document.getElementById("nombre").value,
            documento: document.getElementById("documento").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            direccion: document.getElementById("direccion").value,
            estado: document.getElementById("estado").value

        };

        try {

            let respuesta;

            if (idEditar == null) {

                respuesta = await fetch("/api/clientes", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch(`/api/clientes/${idEditar}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            }

            if (!respuesta.ok) {
                throw new Error("Error al guardar cliente");
            }

            idEditar = null;

            document.getElementById("formCliente").reset();

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalCliente")
            );

            if (modal) {
                modal.hide();
            }

            await cargarClientes();

        } catch (error) {

            console.error("Error guardando cliente:", error);
            alert("No fue posible guardar el cliente");

        }

    }
);


// ===============================
// ELIMINAR CLIENTE
// ===============================

async function eliminarCliente(id) {

    if (!confirm("¿Desea eliminar este cliente?")) {
        return;
    }

    try {

        const respuesta = await fetch(`/api/clientes/${id}`, {

            method: "DELETE"

        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar cliente");
        }

        await cargarClientes();

    } catch (error) {

        console.error("Error eliminando cliente:", error);
        alert("No fue posible eliminar el cliente");

    }

}


// ===============================
// CERRAR SESIÓN
// ===============================

function cerrarSesion() {

    localStorage.clear();

    window.location.href = "../index.html";

}


// ===============================
// INICIAR MÓDULO
// ===============================

cargarClientes();