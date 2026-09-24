/**
 * =============================================================================
 * LECCIÓN 09: ASINCRONÍA, PROMESAS, ASYNC/AWAIT Y FETCH API
 * =============================================================================
 * 
 * ¿Qué es la Asincronía?
 * En JavaScript, el código se ejecuta línea por línea de forma síncrona.
 * Pero ciertas tareas tardan tiempo en completarse (ej: pedir datos a un servidor
 * en otro país, consultar una base de datos o esperar un temporizador).
 * 
 * Si JavaScript se congelara esperando la respuesta, la página web dejaría de responder.
 * Para solucionar esto usamos la programación asíncrona: JavaScript continúa
 * ejecutando el resto de la interfaz y atiende el resultado tan pronto como llegue.
 */

// =============================================================================
// 1. TEMPORIZADORES ASÍNCRONOS: setTimeout()
// =============================================================================
console.log("1. Inicio del script síncrono");

setTimeout(() => {
  console.log("3. (Asíncrono tras 2 segundos): ¡Temporizador finalizado! ⏱️");
}, 2000);

console.log("2. Fin del bloque inmediato");


// =============================================================================
// 2. PROMESAS (PROMISES)
// =============================================================================
// Una promesa es un objeto que representa la terminación o el fracaso de una operación asíncrona.
// Estados de una promesa: Pending (pendiente) -> Fulfilled (resuelta) o Rejected (rechazada).

const simularConsultaServidor = (exito = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (exito) {
        resolve({ id: 101, producto: "Laptop Gamer", precio: 1200 });
      } else {
        reject("Error 500: No se pudo conectar a la base de datos.");
      }
    }, 1500);
  });
};

// Consumir con .then() y .catch():
simularConsultaServidor(true)
  .then(datos => {
    console.log("Promesa resuelta con .then():", datos.producto);
  })
  .catch(error => {
    console.error("Promesa rechazada con .catch():", error);
  });


// =============================================================================
// 3. LA FORMA MODERNA: ASYNC / AWAIT Y FETCH REAL DE UNA API
// =============================================================================
// `async`: Marca una función para que siempre devuelva una promesa.
// `await`: Hace una "pausa limpia" dentro de la función hasta que la promesa se resuelva.
// `try / catch`: Atrapa cualquier error de red o servidor de manera elegante.

async function obtenerUsuariosDeInternet() {
  const contenedor = document.querySelector("#resultado-api");
  if (contenedor) contenedor.textContent = "⏳ Descargando datos desde la API pública de JSONPlaceholder...";

  try {
    // Consumimos una API pública real y gratuita de internet
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
    
    // Si la respuesta del servidor no fue exitosa (ej: 404, 500)
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: Estado ${respuesta.status}`);
    }

    // Convertimos la respuesta cruda a JSON utilizable por JS
    const usuarios = await respuesta.json();
    console.log("Usuarios descargados vía fetch:", usuarios);

    if (contenedor) {
      contenedor.innerHTML = usuarios.map(u => `
        <div style="background: white; padding: 10px; margin: 8px 0; border-radius: 4px; border: 1px solid #cbd5e1;">
          <strong>👤 ${u.name}</strong> (${u.username})<br>
          <small>📧 ${u.email} | 🏢 Compañía: ${u.company.name}</small>
        </div>
      `).join("");
    }

  } catch (error) {
    console.error("Ocurrió un error al obtener los datos:", error.message);
    if (contenedor) contenedor.textContent = "❌ Error al descargar datos: " + error.message;
  }
}
