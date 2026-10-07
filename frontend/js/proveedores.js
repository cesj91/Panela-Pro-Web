const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let proveedores = [];
let idEditar = null;


// ===============================
// CARGAR PROVEEDORES
// ===============================

async function cargarProveedores() {

    try {

        const respuesta = await fetch("/api/proveedores");

        if (!respuesta.ok) {
            throw new Error("Error al consultar proveedores");
        }

        proveedores = await respuesta.json();

        const tabla = document.getElementById("tablaProveedores");

        tabla.innerHTML = "";

        proveedores.forEach(p => {

            tabla.innerHTML += `
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

    } catch (error) {

        console.error("Error cargando proveedores:", error);

    }

}


// ===============================
// EDITAR PROVEEDOR
// ===============================

function editarProveedor(id) {

    const p = proveedores.find(x => x.id_proveedor == id);

    if (!p) {
        alert("Proveedor no encontrado");
        return;
    }

    idEditar = id;

    document.getElementById("nombre").value = p.nombre;
    document.getElementById("nit").value = p.nit;
    document.getElementById("telefono").value = p.telefono;
    document.getElementById("correo").value = p.correo;
    document.getElementById("direccion").value = p.direccion;
    document.getElementById("estado").value = p.estado;

    new bootstrap.Modal(
        document.getElementById("modalProveedor")
    ).show();

}


// ===============================
// CREAR / ACTUALIZAR PROVEEDOR
// ===============================

document.getElementById("formProveedor").addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();

        const datos = {

            nombre: document.getElementById("nombre").value,
            nit: document.getElementById("nit").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            direccion: document.getElementById("direccion").value,
            estado: document.getElementById("estado").value

        };

        try {

            let respuesta;

            if (idEditar == null) {

                respuesta = await fetch("/api/proveedores", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch(`/api/proveedores/${idEditar}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            }

            if (!respuesta.ok) {
                throw new Error("Error al guardar proveedor");
            }

            idEditar = null;

            document.getElementById("formProveedor").reset();

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalProveedor")
            );

            if (modal) {
                modal.hide();
            }

            await cargarProveedores();

        } catch (error) {

            console.error("Error guardando proveedor:", error);
            alert("No fue posible guardar el proveedor");

        }

    }
);


// ===============================
// ELIMINAR PROVEEDOR
// ===============================

async function eliminarProveedor(id) {

    if (!confirm("¿Eliminar proveedor?")) {
        return;
    }

    try {

        const respuesta = await fetch(`/api/proveedores/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar proveedor");
        }

        await cargarProveedores();

    } catch (error) {

        console.error("Error eliminando proveedor:", error);
        alert("No fue posible eliminar el proveedor");

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

cargarProveedores();