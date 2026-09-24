/**
 * =============================================================================
 * LECCIÓN 06: OBJETOS LITERALES, DESESTRUCTURACIÓN Y JSON EN JAVASCRIPT
 * =============================================================================
 * 
 * ¿Qué es un Objeto?
 * Es una estructura de datos que representa una entidad del mundo real
 * agrupando propiedades (características) y métodos (acciones) mediante pares `clave: valor`.
 */

// =============================================================================
// 1. CREACIÓN Y ACCESO A PROPIEDADES
// =============================================================================

const usuario = {
  nombre: "Alexis",
  edad: 25,
  estaActivo: true,
  habilidades: ["HTML", "CSS", "JS"],
  direccion: {
    ciudad: "Madrid",
    pais: "España"
  },
  // Método dentro de un objeto (función)
  saludar: function() {
    return `Hola, mi nombre es ${this.nombre} y vivo en ${this.direccion.ciudad}.`;
  }
};

// Acceso con notación de punto (.):
console.log("Nombre del usuario:", usuario.nombre);
console.log("Ciudad anidada:", usuario.direccion.ciudad);
console.log("Método saludar():", usuario.saludar());

// Acceso con notación de corchetes ['clave'] (útil cuando la clave viene en una variable):
const propiedadABuscar = "edad";
console.log("Acceso dinámico:", usuario[propiedadABuscar]);


// =============================================================================
// 2. DESESTRUCTURACIÓN (DESTRUCTURING) DE OBJETOS
// =============================================================================
// Permite extraer variables directamente de las propiedades del objeto de forma limpia.

const { nombre, edad, estaActivo } = usuario;
console.log(`\nDesestructurado -> Nombre: ${nombre}, Edad: ${edad}, Activo: ${estaActivo}`);


// =============================================================================
// 3. OPERADOR DE PROPAGACIÓN / SPREAD OPERATOR (...)
// =============================================================================
// Permite copiar objetos o combinarlos sin modificar el original.

const usuarioActualizado = {
  ...usuario,
  rol: "Administrador", // Nueva propiedad
  edad: 26             // Sobreescribe la edad original
};

console.log("\nObjeto original inalterado (edad):", usuario.edad);
console.log("Nuevo objeto clonado con cambios (edad):", usuarioActualizado.edad);
console.log("Nuevo rol agregado:", usuarioActualizado.rol);


// =============================================================================
// 4. JSON (JAVASCRIPT OBJECT NOTATION)
// =============================================================================
// JSON es el formato estándar universal para intercambiar datos entre el frontend y el backend en internet.

// A) JSON.stringify(): Convierte un Objeto de JS a un texto plano JSON
const stringJSON = JSON.stringify(usuario);
console.log("\nTexto JSON (para enviar por internet a un servidor):");
console.log(stringJSON);

// B) JSON.parse(): Convierte un texto plano JSON recibido de vuelta a un Objeto JS real
const objetoRecibido = JSON.parse(stringJSON);
console.log("\nObjeto reconstruido desde JSON:", objetoRecibido.nombre);
