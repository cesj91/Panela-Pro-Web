const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

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

        const tabla = document.getElementById("tablaProductos");
        tabla.innerHTML = "";

        productos.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td>${p.id_producto}</td>
                    <td>${p.codigo}</td>
                    <td>${p.nombre}</td>
                    <td>${p.categoria}</td>
                    <td>${p.unidad_medida}</td>
                    <td>$ ${Number(p.precio).toLocaleString()}</td>
                    <td>${p.stock_minimo}</td>
                    <td>${p.estado}</td>
                    <td>
                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarProducto(${p.id_producto})">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger btn-sm ms-2"
                            onclick="eliminarProducto(${p.id_producto})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}


// ===============================
// EDITAR PRODUCTO
// ===============================

function editarProducto(id) {
    const p = productos.find(x => x.id_producto == id);

    if (!p) {
        alert("Producto no encontrado");
        return;
    }

    idEditar = id;

    document.getElementById("codigo").value = p.codigo;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("unidad_medida").value = p.unidad_medida;
    document.getElementById("precio").value = p.precio;
    document.getElementById("stock_minimo").value = p.stock_minimo;
    document.getElementById("estado").value = p.estado;

    new bootstrap.Modal(
        document.getElementById("modalProducto")
    ).show();
}


// ===============================
// CREAR / ACTUALIZAR PRODUCTO
// ===============================

document.getElementById("formProducto").addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();

        const datos = {
            codigo: document.getElementById("codigo").value,
            nombre: document.getElementById("nombre").value,
            categoria: document.getElementById("categoria").value,
            unidad_medida: document.getElementById("unidad_medida").value,
            precio: document.getElementById("precio").value,
            stock_minimo: document.getElementById("stock_minimo").value,
            estado: document.getElementById("estado").value
        };

        try {

            let respuesta;

            if (idEditar == null) {

                respuesta = await fetch("/api/productos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

            } else {

                respuesta = await fetch(`/api/productos/${idEditar}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });

            }

            if (!respuesta.ok) {
                throw new Error("Error al guardar el producto");
            }

            idEditar = null;

            document.getElementById("formProducto").reset();

            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalProducto")
            );

            if (modal) {
                modal.hide();
            }

            await cargarProductos();

        } catch (error) {
            console.error("Error guardando producto:", error);
            alert("No fue posible guardar el producto");
        }
    }
);


// ===============================
// ELIMINAR PRODUCTO
// ===============================

async function eliminarProducto(id) {

    if (!confirm("¿Desea eliminar este producto?")) {
        return;
    }

    try {

        const respuesta = await fetch(`/api/productos/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar producto");
        }

        await cargarProductos();

    } catch (error) {
        console.error("Error eliminando producto:", error);
        alert("No fue posible eliminar el producto");
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