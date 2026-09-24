/**
 * =============================================================================
 * LECCIÓN 00: ARQUITECTURA DEL MOTOR JAVASCRIPT (V8), EVENT LOOP Y MEMORIA
 * =============================================================================
 * 
 * Para ser un desarrollador senior en JavaScript, debes entender qué ocurre
 * "debajo del capó" del motor V8 (Google Chrome / Node.js).
 * 
 * CONCEPTOS FUNDAMENTALES:
 * 1. Call Stack (Pila de Ejecución): Estructura LIFO (Last In, First Out).
 * 2. Memory Heap (Montículo de Memoria): Dónde se almacenan los objetos y arrays.
 * 3. Paso por Valor vs Paso por Referencia.
 * 4. Closures (Clausuras Léxicas).
 * 5. El Event Loop: Microtasks (Promesas) vs Macrotasks (setTimeout).
 */

console.log("============================================================");
console.log("⚡ LECCIÓN 00: MOTOR INTERNO DE JAVASCRIPT");
console.log("============================================================");


// =============================================================================
// 1. PASO POR VALOR (PRIMITIVOS) VS PASO POR REFERENCIA (OBJETOS/ARRAYS)
// =============================================================================

// A) Primitivos (Number, String, Boolean): Se copian por VALOR en memoria independiente.
let a = 10;
let b = a; // Se crea una copia exacta del valor 10
b = 20;    // Cambiar 'b' NO afecta a 'a'

console.log("\n--- 1. Paso por Valor vs Referencia ---");
console.log(`Primitivos -> a: ${a}, b: ${b}`); // a sigue siendo 10

// B) Objetos y Arrays: Se copian por REFERENCIA (ambas variables apuntan al mismo espacio en memoria Heap).
let usuarioOriginal = { nombre: "Alexis", rol: "Admin" };
let usuarioCopia = usuarioOriginal; // ¡NO es una copia, es un puntero a la misma dirección de memoria!

usuarioCopia.nombre = "Carlos";
console.log("Objetos (mutación compartida) -> Original:", usuarioOriginal.nombre); // ¡Imprime "Carlos"!

// ¿Cómo clonar un objeto de forma segura sin compartir referencia?
// Usando el Spread Operator (...) o structuredClone():
let usuarioClonadoReal = { ...usuarioOriginal };
usuarioClonadoReal.nombre = "Beatriz";
console.log("Clon real inmutable -> Original:", usuarioOriginal.nombre, "| Clon:", usuarioClonadoReal.nombre);


// =============================================================================
// 2. CLOSURES (CLAUSURAS): FUNCIONES CON MEMORIA PRIVADA
// =============================================================================
// Un Closure ocurre cuando una función interna recuerda y tiene acceso a las
// variables de su función externa (ámbito léxico), incluso DESPUÉS de que la función externa ya terminó.

function crearContadorPrivado(valorInicial = 0) {
  let contadorOculto = valorInicial; // Variable 100% privada e inaccesible desde afuera

  return {
    incrementar: () => ++contadorOculto,
    decrementar: () => --contadorOculto,
    obtenerValor: () => contadorOculto
  };
}

const miCuenta = crearContadorPrivado(10);
miCuenta.incrementar();
miCuenta.incrementar();
console.log("\n--- 2. Closure (Estado Privado Encapsulado) ---");
console.log("Valor actual del contador privado:", miCuenta.obtenerValor()); // 12
// No hay forma de alterar 'contadorOculto' directamente: miCuenta.contadorOculto es undefined.


// =============================================================================
// 3. EL EVENT LOOP Y EL ORDEN DE EJECUCIÓN (MICROTASKS VS MACROTASKS)
// =============================================================================
// El Event Loop sigue una regla estricta de prioridades:
// 1. Código Síncrono en el Call Stack (Prioridad Máxima e Inmediata).
// 2. Cola de Microtareas (Microtasks Queue): Promesas (.then / await).
// 3. Cola de Macrotareas (Macrotasks Queue / Task Queue): setTimeout, setInterval, Eventos DOM.

console.log("\n--- 3. Demostración del Event Loop (Adivina el orden) ---");

console.log("1️⃣ [Síncrono] Inicio del script");

setTimeout(() => {
  console.log("4️⃣ [Macrotask] Callback de setTimeout (después de microtasks)");
}, 0);

Promise.resolve().then(() => {
  console.log("3️⃣ [Microtask] Promesa resuelta (alta prioridad)");
});

console.log("2️⃣ [Síncrono] Fin del script");
