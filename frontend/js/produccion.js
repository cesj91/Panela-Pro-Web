const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let produccion = [];
let idEditar = null;


// ===============================
// CARGAR PRODUCCIÓN
// ===============================

async function cargarProduccion() {

    try {

        const respuesta = await fetch("/api/produccion");

        if (!respuesta.ok) {
            throw new Error("Error al consultar producción");
        }

        produccion = await respuesta.json();

        const tabla = document.getElementById("tablaProduccion");
        tabla.innerHTML = "";

        produccion.forEach(p => {

            tabla.innerHTML += `
                <tr>

                    <td>${p.id_lote}</td>
                    <td>${p.codigo_lote}</td>
                    <td>${p.producto_final}</td>
                    <td>${p.cantidad_producida}</td>
                    <td>${new Date(p.fecha_produccion).toLocaleDateString()}</td>
                    <td>${p.estado}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarProduccion(${p.id_lote})">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger btn-sm ms-2"
                            onclick="eliminarProduccion(${p.id_lote})">
                            Eliminar
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error("Error cargando producción:", error);

    }

}


// ===============================
// EDITAR PRODUCCIÓN
// ===============================

function editarProduccion(id) {

    const p = produccion.find(x => x.id_lote == id);

    if (!p) {
        alert("Lote no encontrado");
        return;
    }

    idEditar = id;

    document.getElementById("codigo_lote").value =
        p.codigo_lote;

    document.getElementById("producto_final").value =
        p.producto_final;

    document.getElementById("cantidad_producida").value =
        p.cantidad_producida;

    if (p.fecha_produccion) {

        document.getElementById("fecha_produccion").value =
            p.fecha_produccion.substring(0, 10);

    }

    document.getElementById("estado").value =
        p.estado;

    new bootstrap.Modal(
        document.getElementById("modalProduccion")
    ).show();

}


// ===============================
// CREAR / ACTUALIZAR PRODUCCIÓN
// ===============================

document
    .getElementById("formProduccion")
    .addEventListener("submit", async function(e) {

        e.preventDefault();

        const datos = {

            codigo_lote:
                document.getElementById("codigo_lote").value,

            producto_final:
                document.getElementById("producto_final").value,

            cantidad_producida:
                document.getElementById("cantidad_producida").value,

            fecha_produccion:
                document.getElementById("fecha_produccion").value,

            estado:
                document.getElementById("estado").value

        };

        try {

            let respuesta;

            if (idEditar == null) {

                respuesta = await fetch("/api/produccion", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch(
                    `/api/produccion/${idEditar}`,
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
                    "Error al guardar el lote de producción"
                );
            }

            idEditar = null;

            document
                .getElementById("formProduccion")
                .reset();

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalProduccion")
            );

            if (modal) {
                modal.hide();
            }

            await cargarProduccion();

        } catch (error) {

            console.error(
                "Error guardando producción:",
                error
            );

            alert(
                "No fue posible guardar el lote de producción"
            );

        }

    });


// ===============================
// ELIMINAR PRODUCCIÓN
// ===============================

async function eliminarProduccion(id) {

    if (!confirm("¿Desea eliminar este lote?")) {
        return;
    }

    try {

        const respuesta = await fetch(
            `/api/produccion/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "Error al eliminar el lote"
            );
        }

        await cargarProduccion();

    } catch (error) {

        console.error(
            "Error eliminando producción:",
            error
        );

        alert(
            "No fue posible eliminar el lote"
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

cargarProduccion();