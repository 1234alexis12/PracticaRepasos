/**
 * =============================================================================
 * LECCIÓN 04: FUNCIONES, PARÁMETROS, RETORNO Y SCOPE (ALCANCE)
 * =============================================================================
 * 
 * ¿Qué es una función?
 * Una función es una "receta" o bloque de código reutilizable que realiza una tarea específica.
 * Puede recibir "ingredientes" (parámetros) y devolver un "platillo terminado" (valor retornado).
 */

// =============================================================================
// 1. FUNCIÓN DECLARADA (FORMA CLÁSICA CON PALABRA 'function')
// =============================================================================
// Sintaxis: function nombre(param1, param2) { ... return resultado; }

function saludar(nombre) {
  return `¡Hola, ${nombre}! Bienvenido/a a la programación.`;
}

// Invocamos / llamamos a la función:
const mensaje1 = saludar("Alexis");
console.log(mensaje1);


// =============================================================================
// 2. PARÁMETROS POR DEFECTO (DEFAULT PARAMETERS)
// =============================================================================
// Si no se le pasa un argumento al llamar la función, toma el valor asignado por defecto.
function calcularPrecioTotal(precio, impuesto = 0.16) {
  const total = precio + (precio * impuesto);
  return total;
}

console.log("Precio con impuesto por defecto (16%):", calcularPrecioTotal(100)); // 116
console.log("Precio con impuesto especial (8%):", calcularPrecioTotal(100, 0.08)); // 108


// =============================================================================
// 3. FUNCIONES DE FLECHA (ARROW FUNCTIONS: () => {})
// =============================================================================
// Introducidas en ES6, son la forma moderna, compacta y más usada en React / Node / JS actual.

// Versión normal de flecha:
const sumar = (a, b) => {
  return a + b;
};
console.log("Suma con Arrow Function:", sumar(10, 5));

// Versión ultra-corta con retorno implícito (sin llaves ni palabra return):
const duplicar = x => x * 2;
console.log("Duplicar 7:", duplicar(7)); // 14


// =============================================================================
// 4. SCOPE (ALCANCE DE VARIABLES): GLOBAL VS BLOQUE
// =============================================================================
// Las variables declaradas con let y const dentro de llaves { } (funciones, ifs, bucles)
// SOLO existen dentro de esas llaves y no se pueden leer desde afuera.

let variableGlobal = "Soy visible en todo el archivo";

function demoScope() {
  let variableLocal = "Soy privada dentro de esta función";
  console.log("Dentro de la función:", variableGlobal);
  console.log("Dentro de la función:", variableLocal);
}

demoScope();
// console.log(variableLocal); // ❌ Error: variableLocal is not defined (fuera de alcance)
