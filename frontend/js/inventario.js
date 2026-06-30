const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let inventario = [];
let productos = [];
let idEditar = null;

async function cargarProductos() {

    const respuesta = await fetch("http://localhost:3000/api/productos");
    productos = await respuesta.json();

    const select = document.getElementById("id_producto");
    select.innerHTML = '<option value="">Seleccione un producto</option>';

    productos.forEach(p => {

        select.innerHTML += `
            <option value="${p.id_producto}">
                ${p.codigo} - ${p.nombre}
            </option>
        `;

    });
}

async function cargarInventario() {

    const respuesta = await fetch("http://localhost:3000/api/inventario");
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
                <td>${new Date(i.fecha_actualizacion).toLocaleString()}</td>

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
}

function editarInventario(id) {

    const i = inventario.find(x => x.id_inventario == id);

    idEditar = id;

    document.getElementById("id_producto").value = i.id_producto;
    document.getElementById("cantidad_disponible").value = i.cantidad_disponible;

    new bootstrap.Modal(
        document.getElementById("modalInventario")
    ).show();
}

document.getElementById("formInventario").addEventListener("submit", async function(e) {

    e.preventDefault();

    const datos = {
        id_producto: document.getElementById("id_producto").value,
        cantidad_disponible: document.getElementById("cantidad_disponible").value
    };

    if (idEditar == null) {

        await fetch("http://localhost:3000/api/inventario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

    } else {

        await fetch(`http://localhost:3000/api/inventario/${idEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        idEditar = null;
    }

    document.getElementById("formInventario").reset();

    bootstrap.Modal.getInstance(
        document.getElementById("modalInventario")
    ).hide();

    cargarInventario();
});

async function eliminarInventario(id) {

    if (!confirm("¿Desea eliminar este registro de inventario?")) return;

    await fetch(`http://localhost:3000/api/inventario/${id}`, {
        method: "DELETE"
    });

    cargarInventario();
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "../index.html";
}

cargarProductos();
cargarInventario();