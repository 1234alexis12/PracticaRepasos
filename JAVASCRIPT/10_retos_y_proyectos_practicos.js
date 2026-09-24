/**
 * =============================================================================
 * LECCIÓN 10: PROYECTOS Y RETOS PRÁCTICOS EN JAVASCRIPT
 * =============================================================================
 * "A programar se aprende programando."
 * 
 * En este archivo implementamos la lógica de 3 proyectos reales interactivos:
 * 1. Lista de Tareas (To-Do List) interactiva con eliminación y completado.
 * 2. Generador de Frases Aleatorias.
 * 3. Buscador y Filtro de Productos en Tiempo Real.
 */

// =============================================================================
// PROYECTO 1: LISTA DE TAREAS DINÁMICA (TO-DO APP)
// =============================================================================

const inputTarea = document.querySelector("#input-tarea-reto");
const btnAgregar = document.querySelector("#btn-agregar-reto");
const listaTareas = document.querySelector("#lista-tareas-reto");

if (btnAgregar) {
  btnAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();
    if (texto === "") return alert("Por favor escribe una tarea");

    // 1. Creamos el elemento <li>
    const li = document.createElement("li");
    li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #e2e8f0;";

    // 2. Texto de la tarea
    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;
    spanTexto.style.cursor = "pointer";

    // Marcar como completada al hacer clic en el texto
    spanTexto.addEventListener("click", () => {
      spanTexto.style.textDecoration = spanTexto.style.textDecoration === "line-through" ? "none" : "line-through";
      spanTexto.style.color = spanTexto.style.textDecoration === "line-through" ? "#94a3b8" : "#1e293b";
    });

    // 3. Botón de eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.style.cssText = "background: #fee2e2; border: none; border-radius: 4px; cursor: pointer; padding: 4px 8px;";
    btnEliminar.addEventListener("click", () => {
      li.remove(); // Elimina el elemento del DOM
    });

    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);

    inputTarea.value = "";
    inputTarea.focus();
  });
}


// =============================================================================
// PROYECTO 2: GENERADOR DE FRASES ALEATORIAS
// =============================================================================

const frases = [
  "«La simplicidad es el requisito previo para la fiabilidad.» — Edsger Dijkstra",
  "«Primero resuelve el problema. Entonces, escribe el código.» — John Johnson",
  "«El conocimiento es poder, pero la práctica es el maestro.»",
  "«Cualquier tonto puede escribir código que un ordenador entienda. Los buenos programadores escriben código que los humanos pueden entender.» — Martin Fowler"
];

const btnFrase = document.querySelector("#btn-generar-frase");
const contenedorFrase = document.querySelector("#frase-aleatoria-display");

if (btnFrase) {
  btnFrase.addEventListener("click", () => {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    contenedorFrase.textContent = frases[indiceAleatorio];
  });
}


// =============================================================================
// PROYECTO 3: BUSCADOR / FILTRO EN TIEMPO REAL
// =============================================================================

const catalogo = [
  { id: 1, nombre: "Laptop Dell XPS", precio: 1200, categoria: "Computadoras" },
  { id: 2, nombre: "Teclado Mecánico RGB", precio: 80, categoria: "Accesorios" },
  { id: 3, nombre: "Mouse Inalámbrico", precio: 30, categoria: "Accesorios" },
  { id: 4, nombre: "Monitor 4K LG", precio: 400, categoria: "Pantallas" },
  { id: 5, nombre: "Auriculares Sony", precio: 150, categoria: "Audio" }
];

const inputBuscar = document.querySelector("#input-buscador-live");
const listaResultados = document.querySelector("#resultados-buscador");

function renderizarProductos(productos) {
  if (!listaResultados) return;
  if (productos.length === 0) {
    listaResultados.innerHTML = "<p style='color: #ef4444;'>No se encontraron productos.</p>";
    return;
  }

  listaResultados.innerHTML = productos.map(p => `
    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; margin-bottom: 8px;">
      <strong>${p.nombre}</strong> — $${p.precio} <span style="font-size: 0.8rem; background: #e0e7ff; color: #4338ca; padding: 2px 6px; border-radius: 4px;">${p.categoria}</span>
    </div>
  `).join("");
}

if (inputBuscar) {
  renderizarProductos(catalogo); // Carga inicial
  inputBuscar.addEventListener("input", (e) => {
    const termino = e.target.value.toLowerCase().trim();
    // Filtramos usando el método .filter() de los arrays
    const filtrados = catalogo.filter(item => 
      item.nombre.toLowerCase().includes(termino) || 
      item.categoria.toLowerCase().includes(termino)
    );
    renderizarProductos(filtrados);
  });
}
