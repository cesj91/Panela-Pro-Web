const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let ventas = [];
let clientes = [];
let productos = [];
let idEditar = null;

async function cargarClientes() {
    const respuesta = await fetch("http://localhost:3000/api/clientes");
    clientes = await respuesta.json();

    const select = document.getElementById("id_cliente");
    select.innerHTML = '<option value="">Seleccione un cliente</option>';

    clientes.forEach(c => {
        select.innerHTML += `
            <option value="${c.id_cliente}">
                ${c.nombre}
            </option>
        `;
    });
}

async function cargarProductos() {
    const respuesta = await fetch("http://localhost:3000/api/productos");
    productos = await respuesta.json();

    const select = document.getElementById("id_producto");
    select.innerHTML = '<option value="">Seleccione un producto</option>';

    productos.forEach(p => {
        select.innerHTML += `
            <option value="${p.id_producto}" data-precio="${p.precio}">
                ${p.codigo} - ${p.nombre}
            </option>
        `;
    });
}

async function cargarVentas() {
    const respuesta = await fetch("http://localhost:3000/api/ventas");
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
                <td>$ ${Number(v.precio_unitario).toLocaleString()}</td>
                <td>$ ${Number(v.total).toLocaleString()}</td>
                <td>${new Date(v.fecha_venta).toLocaleDateString()}</td>

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
}

document.getElementById("id_producto").addEventListener("change", function() {
    const precio = this.options[this.selectedIndex].getAttribute("data-precio");

    if (precio) {
        document.getElementById("precio_unitario").value = precio;
    }
});

function editarVenta(id) {
    const v = ventas.find(x => x.id_venta == id);

    idEditar = id;

    document.getElementById("id_cliente").value = v.id_cliente;
    document.getElementById("id_producto").value = v.id_producto;
    document.getElementById("cantidad").value = v.cantidad;
    document.getElementById("precio_unitario").value = v.precio_unitario;

    if (v.fecha_venta) {
        document.getElementById("fecha_venta").value = v.fecha_venta.substring(0, 10);
    }

    new bootstrap.Modal(
        document.getElementById("modalVenta")
    ).show();
}

document.getElementById("formVenta").addEventListener("submit", async function(e) {
    e.preventDefault();

    const cantidad = Number(document.getElementById("cantidad").value);
    const precio = Number(document.getElementById("precio_unitario").value);
    const total = cantidad * precio;

    const datos = {
        id_cliente: document.getElementById("id_cliente").value,
        id_producto: document.getElementById("id_producto").value,
        cantidad: cantidad,
        precio_unitario: precio,
        total: total,
        fecha_venta: document.getElementById("fecha_venta").value
    };

    if (idEditar == null) {
        await fetch("http://localhost:3000/api/ventas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
    } else {
        await fetch(`http://localhost:3000/api/ventas/${idEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        idEditar = null;
    }

    document.getElementById("formVenta").reset();

    bootstrap.Modal.getInstance(
        document.getElementById("modalVenta")
    ).hide();

    cargarVentas();
});

async function eliminarVenta(id) {
    if (!confirm("¿Desea eliminar esta venta?")) return;

    await fetch(`http://localhost:3000/api/ventas/${id}`, {
        method: "DELETE"
    });

    cargarVentas();
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "../index.html";
}

cargarClientes();
cargarProductos();
cargarVentas();