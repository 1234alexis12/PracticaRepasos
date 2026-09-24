/**
 * =============================================================================
 * LECCIÓN 05: ARREGLOS (ARRAYS) Y MÉTODOS DE ORDEN SUPERIOR EN JS
 * =============================================================================
 * 
 * Un arreglo (Array) es una lista ordenada de elementos entre corchetes [ ].
 * En JavaScript, el primer elemento SIEMPRE empieza en el índice 0.
 */

const lenguajes = ["HTML", "CSS", "JavaScript", "Python"];

console.log("Primer lenguaje (índice 0):", lenguajes[0]); // "HTML"
console.log("Cantidad total de elementos (.length):", lenguajes.length); // 4


// =============================================================================
// 1. MÉTODOS BÁSICOS DE MUTACIÓN (MODIFICAN EL ARRAY ORIGINAL)
// =============================================================================

// push(): Agrega un elemento al FINAL de la lista
lenguajes.push("SQL");
console.log("Después de push('SQL'):", lenguajes);

// pop(): Elimina y devuelve el ÚLTIMO elemento
const eliminadoUltimo = lenguajes.pop();
console.log("Elemento eliminado con pop():", eliminadoUltimo);

// unshift(): Agrega al PRINCIPIO
lenguajes.unshift("Git");
console.log("Después de unshift('Git'):", lenguajes);

// shift(): Elimina el PRIMERO
lenguajes.shift();
console.log("Después de shift():", lenguajes);


// =============================================================================
// 2. MÉTODOS MODERNOS DE ITERACIÓN (NO MUTAN, DEVUELVEN NUEVOS DATOS)
// =============================================================================
// ¡Estos son los métodos que usarás todos los días en desarrollo web profesional!

const numeros = [1, 2, 3, 4, 5, 6];

// A) .map(): Transforma cada elemento y genera un NUEVO array con los resultados
// Analogía: Pasa una lista de ingredientes por una máquina procesadora y obtén productos listos.
const duplicados = numeros.map(num => num * 2);
console.log("Original:", numeros);
console.log(".map() (duplicados):", duplicados); // [2, 4, 6, 8, 10, 12]

// B) .filter(): Filtra elementos que cumplan una condición booleana
// Analogía: Un colador o filtro que solo deja pasar los elementos que cumplen la regla.
const pares = numeros.filter(num => num % 2 === 0);
console.log(".filter() (números pares):", pares); // [2, 4, 6]

// C) .find(): Busca y devuelve el PRIMER elemento que coincida con la condición
const encontrado = numeros.find(num => num > 3);
console.log(".find() (primer número mayor a 3):", encontrado); // 4

// D) .includes(): Devuelve true si el elemento existe en el arreglo
console.log("¿Existe el 5 en la lista?:", numeros.includes(5)); // true

// E) .reduce(): Reduce todo el array a UN SOLO VALOR acumulado (ej: sumar todo)
const sumaTotal = numeros.reduce((acumulador, actual) => acumulador + actual, 0);
console.log(".reduce() (suma acumulada):", sumaTotal); // 21

// F) .forEach(): Itera sobre cada elemento simplemente para ejecutar una acción (como imprimir)
console.log("\nImprimiendo con .forEach():");
lenguajes.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});
