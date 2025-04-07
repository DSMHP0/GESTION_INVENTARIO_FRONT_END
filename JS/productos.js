document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("tabla-productos");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
  
    // Botón para agregar producto
    let contenido = `
      <div style="text-align: right; margin-bottom: 20px;">
        <a href="agregar.html" class="btn">+ Agregar Producto</a>
      </div>
    `;
  
    if (productos.length === 0) {
      contenido += "<p>No hay productos registrados.</p>";
      contenedor.innerHTML = contenido;
      return;
    }
  
    let tabla = `
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
      tabla += `
        <tr>
          <td>${prod.nombre}</td>
          <td>${prod.categoria}</td>
          <td>$${prod.precio}</td>
          <td>${prod.cantidad}</td>
          <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
        </tr>
      `;
    });
  
    tabla += `</tbody></table>`;
    contenido += tabla;
  
    contenedor.innerHTML = contenido;
  
    // Eventos para los botones "Eliminar"
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmar) {
          productos.splice(index, 1);
          localStorage.setItem("productos", JSON.stringify(productos));
          location.reload(); // Recarga para actualizar la tabla
        }
      });
    });
  });