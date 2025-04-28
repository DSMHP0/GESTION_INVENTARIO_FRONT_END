// LOGIN DE USUARIO
document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.querySelector("form");

  if (formLogin && window.location.pathname.includes("login.html")) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = formLogin.querySelector("input[type='email']").value;
      const password = formLogin.querySelector("input[type='password']").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = usuarios.find(u => u.email === email && u.password === password);

      if (usuario) {
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("Inicio de sesión exitoso");
        window.location.href = "productos.html";
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    });
  }
});

// REGISTRO DE USUARIO
document.addEventListener("DOMContentLoaded", function () {
  const registroForm = document.querySelector("#registro-form");

  if (registroForm) {
    registroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = registroForm.querySelector("input[placeholder='Nombre completo']").value;
      const email = registroForm.querySelector("input[placeholder='Correo electrónico']").value;
      const password = registroForm.querySelector("input[placeholder='Contraseña']").value;
      const rol = registroForm.querySelector("select").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const yaExiste = usuarios.find(u => u.email === email);
      if (yaExiste) {
        alert("Este correo ya está registrado.");
        return;
      }

      const nuevoUsuario = { nombre, email, password, rol };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuario registrado con éxito.");
      window.location.href = "login.html";
    });
  }
});