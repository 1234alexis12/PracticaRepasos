/**
 * =============================================================================
 * LECCIÓN 07: MANIPULACIÓN DEL DOM (DOCUMENT OBJECT MODEL)
 * =============================================================================
 * 
 * ¿Qué es el DOM?
 * El DOM es la representación en forma de árbol de objetos que el navegador
 * crea a partir del código HTML.
 * A través de JavaScript podemos "leer", "modificar", "crear" y "borrar"
 * cualquier etiqueta HTML en tiempo real.
 */

// =============================================================================
// 1. SELECCIONAR ELEMENTOS DEL DOCUMENTO
// =============================================================================
// document.getElementById('id'): Selecciona por ID.
// document.querySelector('selector_css'): Selecciona el PRIMER elemento que coincida con cualquier selector CSS (.clase, #id, tag).
// document.querySelectorAll('selector_css'): Selecciona TODOS los elementos coincidentes (NodeList).

const titulo = document.querySelector("#titulo-principal");
const contenedorLista = document.querySelector("#lista-tareas");


// =============================================================================
// 2. MODIFICAR CONTENIDO Y ESTILOS
// =============================================================================

function cambiarTitulo() {
  // .textContent: Cambia el texto interno sin interpretar etiquetas HTML (más seguro contra inyecciones XSS)
  titulo.textContent = "🚀 ¡DOM Modificado con Éxito!";
  
  // .style.propiedad: Aplica estilos CSS en línea directamente desde JS
  titulo.style.color = "#16a34a";
}


// =============================================================================
// 3. AGREGAR Y QUITAR CLASES CSS (.classList)
// =============================================================================
// ¡La mejor práctica es NO cambiar estilos directamente con .style, sino alternar clases CSS!

function alternarResaltado() {
  // .classList.toggle(): Si la clase existe la quita; si no existe, la añade.
  titulo.classList.toggle("resaltado");
}


// =============================================================================
// 4. CREAR Y AGREGAR NUEVOS ELEMENTOS DINÁMICAMENTE
// =============================================================================

function agregarTarea() {
  const inputTexto = document.querySelector("#input-nueva-tarea");
  const texto = inputTexto.value.trim();

  if (texto === "") {
    alert("Por favor escribe una tarea");
    return;
  }

  // 1. Crear el nuevo elemento en memoria
  const nuevoLi = document.createElement("li");
  
  // 2. Asignarle contenido de texto
  nuevoLi.textContent = texto;
  
  // 3. Insertarlo dentro del contenedor padre en la pantalla
  contenedorLista.appendChild(nuevoLi);

  // 4. Limpiar la caja de texto
  inputTexto.value = "";
  inputTexto.focus();
}
