document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("tabla-productos");
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  // Si estamos en agregar.html -> manejar el formulario para agregar productos
  const formProducto = document.querySelector("#form-producto");
  if (formProducto) {
    formProducto.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = formProducto.querySelector("input[placeholder='Nombre del producto']").value;
      const categoria = formProducto.querySelector("input[placeholder='Categoría']").value;
      const precio = parseFloat(formProducto.querySelector("input[placeholder='Precio']").value);
      const cantidad = parseInt(formProducto.querySelector("input[placeholder='Cantidad']").value);

      const producto = { nombre, categoria, precio, cantidad };

      productos.push(producto);
      localStorage.setItem("productos", JSON.stringify(productos));

      alert("Producto guardado correctamente.");
      window.location.href = "productos.html";
    });
  }

  // Si estamos en productos.html -> mostrar productos
  if (contenedor) {
    let contenido = "";

    if (productos.length === 0) {
      contenido += "<p>No hay productos registrados.</p>";
    } else {
      contenido += `
        <table border="1" cellpadding="10">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
      `;

      productos.forEach((prod, index) => {
        contenido += `
          <tr>
            <td>${prod.nombre}</td>
            <td>${prod.categoria}</td>
            <td>$${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td>
              <button class="btn-editar" data-index="${index}">Editar</button>
              <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </td>
          </tr>
        `;
      });

      contenido += `</tbody></table>`;
    }

    contenedor.innerHTML = contenido;

    // Filtro de productos
    const inputBuscador = document.getElementById("buscador");
    if (inputBuscador) {
      inputBuscador.addEventListener("input", () => {
        const filtro = inputBuscador.value.toLowerCase();
        const filas = document.querySelectorAll("tbody tr");

        filas.forEach(fila => {
          const texto = fila.textContent.toLowerCase();
          fila.style.display = texto.includes(filtro) ? "" : "none";
        });
      });
    }

    // Botones Eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmar) {
          productos.splice(index, 1);
          localStorage.setItem("productos", JSON.stringify(productos));
          location.reload();
        }
      });
    });

    // Botones Editar
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        sessionStorage.setItem("editarProducto", index);
        window.location.href = "editar.html";
      });
    });
  }
});