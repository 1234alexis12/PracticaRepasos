/**
 * =============================================================================
 * LECCIÓN 08: EVENTOS Y EXPERIENCIA DE USUARIO EN JAVASCRIPT
 * =============================================================================
 * 
 * ¿Qué es un evento?
 * Un evento es cualquier acción que ocurre en el navegador: un clic del usuario,
 * escribir en el teclado, mover el ratón, enviar un formulario o cargar la página.
 * 
 * La forma estándar y profesional de escuchar eventos es `addEventListener()`.
 * Sintaxis: elemento.addEventListener('nombreDelEvento', funcionManejadora);
 */

// =============================================================================
// 1. EVENTO 'CLICK' Y CONTADOR INTERACTIVO
// =============================================================================

let contador = 0;
const spanContador = document.querySelector("#contador-valor");
const btnIncrementar = document.querySelector("#btn-incrementar");
const btnResetear = document.querySelector("#btn-reset");

// Escuchar el clic para incrementar:
btnIncrementar.addEventListener("click", () => {
  contador++;
  spanContador.textContent = contador;
});

// Escuchar el clic para resetear:
btnResetear.addEventListener("click", () => {
  contador = 0;
  spanContador.textContent = contador;
});


// =============================================================================
// 2. EVENTO 'INPUT' (ESCUCHA EN TIEMPO REAL MIENTRAS SE ESCRIBE)
// =============================================================================

const inputNombre = document.querySelector("#input-nombre-en-vivo");
const textoSaludo = document.querySelector("#saludo-en-vivo");

inputNombre.addEventListener("input", (evento) => {
  // `evento.target.value` contiene el texto exacto que el usuario está tecleando
  const nombreIngresado = evento.target.value.trim();
  textoSaludo.textContent = nombreIngresado ? `¡Hola, ${nombreIngresado}! 👋` : "Esperando tu nombre...";
});


// =============================================================================
// 3. EVENTO 'SUBMIT' Y preventDefault()
// =============================================================================
// Por defecto, al enviar un formulario HTML la página se recarga por completo.
// `evento.preventDefault()` previene esa recarga para procesar los datos con JS sin parpadeos.

const formulario = document.querySelector("#mi-formulario");
const mensajeEstado = document.querySelector("#estado-formulario");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // ¡Detiene la recarga de página obligatoria del navegador!
  
  mensajeEstado.textContent = "✅ ¡Formulario validado y enviado con éxito sin recargar la página!";
  mensajeEstado.style.color = "#16a34a";
});
