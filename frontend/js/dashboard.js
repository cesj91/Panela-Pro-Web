const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!token || !usuario) {
    window.location.href = "../index.html";
}

document.getElementById("bienvenida").textContent =
    `Bienvenido, ${usuario.nombre} | Rol: ${usuario.rol}`;

function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
}