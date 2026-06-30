const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

let productos = [];
let idEditar = null;

async function cargarProductos() {

    const respuesta = await fetch("http://localhost:3000/api/productos");
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

}

function editarProducto(id){

    const p = productos.find(x => x.id_producto == id);

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

document.getElementById("formProducto").addEventListener("submit", async function(e){

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

    if(idEditar == null){

        await fetch("http://localhost:3000/api/productos",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

    }else{

        await fetch(`http://localhost:3000/api/productos/${idEditar}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

        idEditar = null;

    }

    document.getElementById("formProducto").reset();

    bootstrap.Modal.getInstance(
        document.getElementById("modalProducto")
    ).hide();

    cargarProductos();

});

async function eliminarProducto(id){

    if(!confirm("¿Desea eliminar este producto?")) return;

    await fetch(`http://localhost:3000/api/productos/${id}`,{

        method:"DELETE"

    });

    cargarProductos();

}

function cerrarSesion(){

    localStorage.clear();

    window.location.href="../index.html";

}

cargarProductos();