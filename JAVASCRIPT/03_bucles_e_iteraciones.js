/**
 * =============================================================================
 * LECCIÓN 03: BUCLES E ITERACIONES EN JAVASCRIPT
 * =============================================================================
 * 
 * Un bucle es una estructura que permite repetir un bloque de código muchas veces
 * de forma automática, ahorrándonos tener que escribir las mismas líneas una y otra vez.
 */

// =============================================================================
// 1. EL BUCLE FOR TRADICIONAL
// =============================================================================
// Se compone de 3 partes:
// for (inicialización; condición_de_parada; incremento) { ... }

console.log("--- 1. Bucle FOR clásico (Contar del 1 al 5) ---");
for (let i = 1; i <= 5; i++) {
  console.log(`Número actual: ${i}`);
}


// =============================================================================
// 2. EL BUCLE WHILE (MIENTRAS)
// =============================================================================
// Se repite mientras la condición entre paréntesis sea verdadera.
// ¡CUIDADO!: Si olvidas actualizar la variable de control dentro del bucle,
// crearás un "bucle infinito" que congelará tu navegador o programa.

console.log("\n--- 2. Bucle WHILE (Cuenta regresiva) ---");
let cuenta = 3;
while (cuenta > 0) {
  console.log(`Despegue en: ${cuenta}...`);
  cuenta--; // Restamos 1 en cada iteración
}
console.log("🚀 ¡Despegue!");


// =============================================================================
// 3. EL BUCLE DO-WHILE
// =============================================================================
// A diferencia del while, el DO-WHILE siempre se ejecuta AL MENOS UNA VEZ,
// porque comprueba la condición al final, no al principio.

console.log("\n--- 3. Bucle DO-WHILE ---");
let numero = 10;
do {
  console.log("Esto se ejecuta al menos 1 vez aunque la condición sea falsa");
} while (numero < 5);


// =============================================================================
// 4. BUCLE FOR...OF (PARA RECORRER COLECCIONES / ARREGLOS)
// =============================================================================
// Es la forma más limpia y moderna en JavaScript para recorrer elementos de una lista.

console.log("\n--- 4. Bucle FOR...OF con Array de frutas ---");
const frutas = ["Manzana", "Plátano", "Fresa", "Uva"];

for (const fruta of frutas) {
  console.log(`Fruta disponible: ${fruta}`);
}


// =============================================================================
// 5. CONTROL DE FLUJO: BREAK Y CONTINUE
// =============================================================================
// - `break`: Detiene el bucle por completo y sale de él inmediatamente.
// - `continue`: Se salta la vuelta actual y continúa directamente con la siguiente.

console.log("\n--- 5. Uso de CONTINUE y BREAK ---");
for (let i = 1; i <= 6; i++) {
  if (i === 3) {
    console.log(`(Nos saltamos el número ${i} con continue)`);
    continue; // Salta el resto del código para el 3 y va al 4
  }
  
  if (i === 5) {
    console.log(`(Detenemos el bucle en ${i} con break)`);
    break; // Termina el bucle
  }

  console.log(`Valor procesado: ${i}`);
}
