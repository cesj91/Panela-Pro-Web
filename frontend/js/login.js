const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        const respuesta = await fetch("http://localhost:3000/api/auth/login",  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, contrasena })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.style.color = "red";
            mensaje.textContent = datos.mensaje;
            return;
        }

        localStorage.setItem("token", datos.token);
        localStorage.setItem("usuario", JSON.stringify(datos.usuario));

        window.location.href = "pages/dashboard.html";

    } catch (error) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error de conexión con el servidor";
    }
});