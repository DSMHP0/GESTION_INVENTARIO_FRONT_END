// LOGIN DE USUARIO
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    if (form && window.location.pathname.includes("login.html")) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = form.querySelector("input[type='email']").value;
        const password = form.querySelector("input[type='password']").value;
  
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
  
        const nombre = registroForm.querySelector("input[type='text']").value;
        const email = registroForm.querySelector("input[type='email']").value;
        const password = registroForm.querySelector("input[type='password']").value;
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