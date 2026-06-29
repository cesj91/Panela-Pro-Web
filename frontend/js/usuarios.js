const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../index.html";
}

async function cargarUsuarios() {
    const tabla = document.getElementById("tablaUsuarios");

    try {
        const respuesta = await fetch("http://localhost:3000/api/usuarios");
        const usuarios = await respuesta.json();

        tabla.innerHTML = "";

        usuarios.forEach(usuario => {
            tabla.innerHTML += `
                <tr>
                    <td>${usuario.id_usuario}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.nombre_rol}</td>
                    <td>
                        <span class="badge ${usuario.estado === "Activo" ? "bg-success" : "bg-secondary"}">
                            ${usuario.estado}
                        </span>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Error al cargar usuarios
                </td>
            </tr>
        `;
    }
}

document.getElementById("formUsuario").addEventListener("submit", async function(e) {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        id_rol: document.getElementById("id_rol").value,
        estado: document.getElementById("estado").value
    };

    const mensaje = document.getElementById("mensajeUsuario");

    try {
        const respuesta = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.style.color = "red";
            mensaje.textContent = resultado.mensaje || "Error al guardar";
            return;
        }

        mensaje.style.color = "green";
        mensaje.textContent = "Usuario guardado correctamente";

        document.getElementById("formUsuario").reset();
        cargarUsuarios();

        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalUsuario"));
            modal.hide();
            mensaje.textContent = "";
        }, 800);

    } catch (error) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error de conexión con el servidor";
    }
});

function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
}

cargarUsuarios();