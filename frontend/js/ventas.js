const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let ventas = [];
let clientes = [];
let productos = [];
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

        const select = document.getElementById("id_cliente");

        select.innerHTML =
            '<option value="">Seleccione un cliente</option>';

        clientes.forEach(c => {

            select.innerHTML += `
                <option value="${c.id_cliente}">
                    ${c.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error("Error cargando clientes:", error);

    }

}


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
                <option
                    value="${p.id_producto}"
                    data-precio="${p.precio}">
                    ${p.codigo} - ${p.nombre}
                </option>
            `;

        });

    } catch (error) {

        console.error("Error cargando productos:", error);

    }

}


// ===============================
// CARGAR VENTAS
// ===============================

async function cargarVentas() {

    try {

        const respuesta = await fetch("/api/ventas");

        if (!respuesta.ok) {
            throw new Error("Error al consultar ventas");
        }

        ventas = await respuesta.json();

        const tabla = document.getElementById("tablaVentas");

        tabla.innerHTML = "";

        ventas.forEach(v => {

            tabla.innerHTML += `
                <tr>

                    <td>${v.id_venta}</td>
                    <td>${v.cliente}</td>
                    <td>${v.producto}</td>
                    <td>${v.cantidad}</td>

                    <td>
                        $ ${Number(v.precio_unitario).toLocaleString()}
                    </td>

                    <td>
                        $ ${Number(v.total).toLocaleString()}
                    </td>

                    <td>
                        ${new Date(v.fecha_venta).toLocaleDateString()}
                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarVenta(${v.id_venta})">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger btn-sm ms-2"
                            onclick="eliminarVenta(${v.id_venta})">
                            Eliminar
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error("Error cargando ventas:", error);

    }

}


// ===============================
// PRECIO AUTOMÁTICO DEL PRODUCTO
// ===============================

document
    .getElementById("id_producto")
    .addEventListener("change", function() {

        const opcion =
            this.options[this.selectedIndex];

        const precio =
            opcion.getAttribute("data-precio");

        if (precio) {

            document.getElementById(
                "precio_unitario"
            ).value = precio;

        } else {

            document.getElementById(
                "precio_unitario"
            ).value = "";

        }

    });


// ===============================
// EDITAR VENTA
// ===============================

function editarVenta(id) {

    const v = ventas.find(
        x => x.id_venta == id
    );

    if (!v) {

        alert("Venta no encontrada");
        return;

    }

    idEditar = id;

    document.getElementById("id_cliente").value =
        v.id_cliente;

    document.getElementById("id_producto").value =
        v.id_producto;

    document.getElementById("cantidad").value =
        v.cantidad;

    document.getElementById("precio_unitario").value =
        v.precio_unitario;

    if (v.fecha_venta) {

        document.getElementById("fecha_venta").value =
            v.fecha_venta.substring(0, 10);

    }

    new bootstrap.Modal(
        document.getElementById("modalVenta")
    ).show();

}


// ===============================
// CREAR / ACTUALIZAR VENTA
// ===============================

document
    .getElementById("formVenta")
    .addEventListener("submit", async function(e) {

        e.preventDefault();

        const cantidad = Number(
            document.getElementById("cantidad").value
        );

        const precio = Number(
            document.getElementById("precio_unitario").value
        );

        const total = cantidad * precio;

        const datos = {

            id_cliente:
                document.getElementById("id_cliente").value,

            id_producto:
                document.getElementById("id_producto").value,

            cantidad: cantidad,

            precio_unitario: precio,

            total: total,

            fecha_venta:
                document.getElementById("fecha_venta").value

        };

        try {

            let respuesta;

            if (idEditar == null) {

                respuesta = await fetch("/api/ventas", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

            } else {

                respuesta = await fetch(
                    `/api/ventas/${idEditar}`,
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

                let mensaje = "Error al guardar la venta";

                try {

                    const errorServidor =
                        await respuesta.json();

                    mensaje =
                        errorServidor.mensaje || mensaje;

                } catch (e) {
                    // La respuesta no contenía JSON
                }

                throw new Error(mensaje);

            }

            idEditar = null;

            document
                .getElementById("formVenta")
                .reset();

            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById("modalVenta")
                );

            if (modal) {
                modal.hide();
            }

            await cargarVentas();

        } catch (error) {

            console.error(
                "Error guardando venta:",
                error
            );

            alert(
                error.message ||
                "No fue posible guardar la venta"
            );

        }

    });


// ===============================
// ELIMINAR VENTA
// ===============================

async function eliminarVenta(id) {

    if (!confirm("¿Desea eliminar esta venta?")) {
        return;
    }

    try {

        const respuesta = await fetch(
            `/api/ventas/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!respuesta.ok) {

            throw new Error(
                "Error al eliminar la venta"
            );

        }

        await cargarVentas();

    } catch (error) {

        console.error(
            "Error eliminando venta:",
            error
        );

        alert(
            "No fue posible eliminar la venta"
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

cargarClientes();
cargarProductos();
cargarVentas();