/**
 * =============================================================================
 * LECCIÓN 01: VARIABLES, CONSTANTES Y TIPOS DE DATOS EN JAVASCRIPT
 * =============================================================================
 * 
 * ¿Qué es una variable?
 * Una variable es una "caja con etiqueta" en la memoria de la computadora donde
 * podemos guardar un dato (un número, un texto, etc.) para usarlo más adelante.
 * 
 * FORMAS DE DECLARAR VARIABLES:
 * 1. `let`: Crea una variable cuyo valor PUEDE cambiar a lo largo del tiempo.
 * 2. `const`: Crea una CONSTANTE cuyo valor NO puede ser reasignado una vez establecido.
 * 3. `var`: (Forma antigua de JavaScript antes de 2015). NO se recomienda su uso
 *           porque tiene problemas de alcance (scope) y puede causar errores silenciosos.
 */

// =============================================================================
// 1. DECLARACIÓN CON LET Y CONST
// =============================================================================

// Usamos `let` cuando sabemos que el valor va a variar (ej: edad, puntos de un juego)
let edad = 25;
console.log("Edad inicial:", edad);

// Reasignamos el valor de la variable edad:
edad = 26; 
console.log("Edad después de cumplir años:", edad);

// Usamos `const` para valores fijos que jamás deberían cambiar (ej: PI, URLs de API, nombres fijos)
const NOMBRE = "Alexis";
console.log("Nombre del usuario:", NOMBRE);

// Si intentamos hacer: NOMBRE = "Carlos"; -> JavaScript lanzará un error: TypeError: Assignment to constant variable.


// =============================================================================
// 2. TIPOS DE DATOS PRIMITIVOS EN JAVASCRIPT
// =============================================================================
// JavaScript es un lenguaje de "tipado dinámico", lo que significa que no necesitas
// especificar si una variable es de tipo número o texto; JavaScript lo deduce solo.

// A) String (Cadena de texto): Va entre comillas simples, dobles o backticks
let lenguaje = "JavaScript";
let ciudad = 'Madrid';

// B) Number (Números enteros y decimales):
let precio = 19.99;
let cantidad = 3;

// C) Boolean (Verdadero o Falso): Solo tiene dos valores posibles
let esMayorDeEdad = true;
let tieneDescuento = false;

// D) Undefined (Indefinido): Una variable declarada a la que aún no se le asignó valor
let variableSinDefinir;
console.log("Valor no definido:", variableSinDefinir); // Imprime: undefined

// E) Null (Nulo): Representa intencionalmente la ausencia de cualquier valor o un "vacío explícito"
let valorVacio = null;


// =============================================================================
// 3. EL OPERADOR typeof
// =============================================================================
// Nos permite consultar de qué tipo de dato es cualquier variable en tiempo de ejecución.
console.log("Tipo de lenguaje:", typeof lenguaje);      // "string"
console.log("Tipo de precio:", typeof precio);          // "number"
console.log("Tipo de esMayorDeEdad:", typeof esMayorDeEdad); // "boolean"
console.log("Tipo de variableSinDefinir:", typeof variableSinDefinir); // "undefined"


// =============================================================================
// 4. TEMPLATE LITERALS (PLANTILLAS DE TEXTO CON BACKTICKS ` `)
// =============================================================================
// Antes se concatenaba texto con el signo más (+):
let mensajeAntiguo = "Hola, mi nombre es " + NOMBRE + " y tengo " + edad + " años.";
console.log("Forma antigua:", mensajeAntiguo);

// Forma moderna con backticks (`) e interpolación ${variable}:
// Mucho más limpia, legible y permite saltos de línea directos.
let mensajeModerno = `Hola, mi nombre es ${NOMBRE} y tengo ${edad} años.`;
console.log("Forma moderna:", mensajeModerno);

// Operaciones dentro del template literal:
console.log(`El total a pagar es: $${precio * cantidad}`);
