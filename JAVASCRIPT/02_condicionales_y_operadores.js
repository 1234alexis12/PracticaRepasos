/**
 * =============================================================================
 * LECCIÓN 02: OPERADORES Y ESTRUCTURAS CONDICIONALES EN JAVASCRIPT
 * =============================================================================
 * 
 * Las estructuras condicionales permiten que un programa "tome decisiones".
 * Ejecutan un bloque de código SOLO si se cumple una condición verdadera (true).
 */

// =============================================================================
// 1. OPERADORES DE COMPARACIÓN: ¿== vs ===?
// =============================================================================
// REGLA DE ORO DE JAVASCRIPT: ¡SIEMPRE USA === Y !== (ESTRICTOS)!
// - `==` (Igualdad débil): Convierte los tipos automáticamente antes de comparar (genera bugs).
// - `===` (Igualdad estricta): Compara tanto el VALOR como el TIPO de dato sin conversiones mágicas.

console.log("5 == '5' (débil):", 5 == "5");       // true (¡peligroso! número vs texto)
console.log("5 === '5' (estricto):", 5 === "5");   // false (correcto: 5 es número y '5' es string)
console.log("5 !== 10 (diferente estricto):", 5 !== 10); // true

// Operadores relacionales comunes:
// > (mayor que), < (menor que), >= (mayor o igual), <= (menor o igual)


// =============================================================================
// 2. OPERADORES LÓGICOS (AND, OR, NOT)
// =============================================================================
// Permiten combinar múltiples condiciones booleanas.

let tieneBoleto = true;
let tieneIdentificacion = true;
let estaAcompaniado = false;

// AND (&&): Ambas condiciones deben ser obligatoriamente TRUE
let puedeEntrar = tieneBoleto && tieneIdentificacion;
console.log("¿Puede entrar con boleto e ID?:", puedeEntrar); // true

// OR (||): Al menos UNA de las condiciones debe ser TRUE
let accesoEspecial = tieneBoleto || estaAcompaniado;
console.log("¿Tiene acceso por alguna vía?:", accesoEspecial); // true

// NOT (!): Invierte el valor (lo que es true pasa a false y viceversa)
let estaBloqueado = false;
console.log("¿Está desbloqueado?:", !estaBloqueado); // true


// =============================================================================
// 3. ESTRUCTURAS IF / ELSE IF / ELSE
// =============================================================================
let calificacion = 85;

if (calificacion >= 90) {
  console.log("Excelente: Obtuviste una A 🏆");
} else if (calificacion >= 80) {
  console.log("Muy bien: Obtuviste una B 👍");
} else if (calificacion >= 70) {
  console.log("Aprobado: Obtuviste una C ⚖️");
} else {
  console.log("Reprobado: Necesitas estudiar más 📚");
}


// =============================================================================
// 4. OPERADOR TERNARIO (? :)
// =============================================================================
// Es una forma compacta y elegante de escribir un if-else simple en 1 sola línea.
// Sintaxis: condicion ? resultadoSiEsTrue : resultadoSiEsFalse

let edadUsuario = 18;
let estadoAcceso = (edadUsuario >= 18) ? "Acceso Permitido" : "Acceso Denegado";
console.log("Resultado ternario:", estadoAcceso);


// =============================================================================
// 5. ESTRUCTURA SWITCH / CASE
// =============================================================================
// Útil cuando comparamos una SOLA variable contra muchos valores discretos posibles.
let diaSemana = "Lunes";

switch (diaSemana) {
  case "Lunes":
    console.log("Inicio de semana laboral");
    break; // 'break' es indispensable para que no siga ejecutando los siguientes casos
  case "Viernes":
    console.log("¡Por fin es viernes!");
    break;
  case "Sábado":
  case "Domingo":
    console.log("Fin de semana de descanso");
    break;
  default:
    console.log("Día intermedio de la semana");
    break;
}
