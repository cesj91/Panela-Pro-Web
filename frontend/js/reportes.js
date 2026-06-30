const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

async function cargarResumen() {
    const respuesta = await fetch("http://localhost:3000/api/reportes/resumen");
    const r = await respuesta.json();

    document.getElementById("resumenReportes").innerHTML = `
        <div class="col-md-3 mb-3">
            <div class="card p-3">
                <h5>Productos</h5>
                <p>${r.total_productos}</p>
            </div>
        </div>

        <div class="col-md-3 mb-3">
            <div class="card p-3">
                <h5>Clientes</h5>
                <p>${r.total_clientes}</p>
            </div>
        </div>

        <div class="col-md-3 mb-3">
            <div class="card p-3">
                <h5>Ventas</h5>
                <p>${r.total_ventas}</p>
            </div>
        </div>

        <div class="col-md-3 mb-3">
            <div class="card p-3">
                <h5>Ingresos</h5>
                <p>$ ${Number(r.total_ingresos).toLocaleString()}</p>
            </div>
        </div>
    `;
}

async function cargarReporteVentas() {
    const respuesta = await fetch("http://localhost:3000/api/reportes/ventas");
    const ventas = await respuesta.json();

    const tabla = document.getElementById("tablaReporteVentas");
    tabla.innerHTML = "";

    ventas.forEach(v => {
        tabla.innerHTML += `
            <tr>
                <td>${v.id_venta}</td>
                <td>${v.cliente}</td>
                <td>${new Date(v.fecha_venta).toLocaleDateString()}</td>
                <td>$ ${Number(v.total).toLocaleString()}</td>
                <td>${v.estado}</td>
            </tr>
        `;
    });
}

async function cargarReporteInventario() {
    const respuesta = await fetch("http://localhost:3000/api/reportes/inventario");
    const inventario = await respuesta.json();

    const tabla = document.getElementById("tablaReporteInventario");
    tabla.innerHTML = "";

    inventario.forEach(i => {
        tabla.innerHTML += `
            <tr>
                <td>${i.codigo}</td>
                <td>${i.nombre}</td>
                <td>${i.categoria}</td>
                <td>${i.cantidad_disponible}</td>
                <td>${i.stock_minimo}</td>
            </tr>
        `;
    });
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = "../index.html";
}

cargarResumen();
cargarReporteVentas();
cargarReporteInventario();