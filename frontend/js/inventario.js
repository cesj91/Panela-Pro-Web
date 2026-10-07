const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let inventario = [];
let productos = [];
let idEditar = null;


// ===============================
// CARGAR PRODUCTOS
// ===============================

async function cargarProductos() {

    try {

        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) {
            throw new Error("Error al consultar productos");
        }

        productos = await respuesta.json();

        const select = document.getElementById("id_producto");

        select.innerHTML =
            '<option value="">Seleccione un producto</option>';

        productos.forEach(p => {

            select.innerHTML += `
                <option value="${p.id_producto}">
                    ${p.codigo} - ${p.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error("Error cargando productos:", error);

    }

}


// ===============================
// CARGAR INVENTARIO
// ===============================

async function cargarInventario() {

    try {

        const respuesta = await fetch("/api/inventario");

        if (!respuesta.ok) {
            throw new Error("Error al consultar inventario");
        }

        inventario = await respuesta.json();

        const tabla = document.getElementById("tablaInventario");

        tabla.innerHTML = "";

        inventario.forEach(i => {

            tabla.innerHTML += `
                <tr>

                    <td>${i.id_inventario}</td>
                    <td>${i.codigo}</td>
                    <td>${i.nombre}</td>
                    <td>${i.cantidad_disponible}</td>
                    <td>
                        ${new Date(i.fecha_actualizacion).toLocaleString()}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarInventario(${i.id_inventario})">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger btn-sm ms-2"
                            onclick="eliminarInventario(${i.id_inventario})">
                            Eliminar
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error("Error cargando inventario:", error);

    }

}


// ===============================
// EDITAR INVENTARIO
// ===============================

function editarInventario(id) {

    const i = inventario.find(
        x => x.id_inventario == id
    );

    if (!i) {
        alert("Registro de inventario no encontrado");
        return;
    }

    idEditar = id;

    document.getElementById("id_producto").value =
        i.id_producto;

    document.getElementById("cantidad_disponible").value =
        i.cantidad_disponible;

    new bootstrap.Modal(
        document.getElementById("modalInventario")
    ).show();

}


// ===============================
// CREAR / ACTUALIZAR INVENTARIO
// ===============================

document
    .getElementById("formInventario")
    .addEventListener("submit", async function(e) {

        e.preventDefault();

        const datos = {

            id_producto:
                document.getElementById("id_producto").value,

            cantidad_disponible:
                document.getElementById("cantidad_disponible").value

        };

        try {

            let respuesta;

            if (idEditar == null) {

                respuesta = await fetch("/api/inventario", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch(
                    `/api/inventario/${idEditar}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(datos)

                    }
                );

            }

            if (!respuesta.ok) {
                throw new Error(
                    "Error al guardar el registro de inventario"
                );
            }

            idEditar = null;

            document
                .getElementById("formInventario")
                .reset();

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalInventario")
            );

            if (modal) {
                modal.hide();
            }

            await cargarInventario();

        } catch (error) {

            console.error(
                "Error guardando inventario:",
                error
            );

            alert(
                "No fue posible guardar el registro de inventario"
            );

        }

    });


// ===============================
// ELIMINAR INVENTARIO
// ===============================

async function eliminarInventario(id) {

    if (
        !confirm(
            "¿Desea eliminar este registro de inventario?"
        )
    ) {
        return;
    }

    try {

        const respuesta = await fetch(
            `/api/inventario/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "Error al eliminar registro de inventario"
            );
        }

        await cargarInventario();

    } catch (error) {

        console.error(
            "Error eliminando inventario:",
            error
        );

        alert(
            "No fue posible eliminar el registro de inventario"
        );

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

cargarProductos();
cargarInventario();