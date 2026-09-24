# ⚡ Chuleta Rápida de JavaScript Moderno (ES6+ Cheat Sheet)

> *Tu acordeón de cabecera con la sintaxis más utilizada en el día a día de un desarrollador JavaScript.*

---

## 📑 Tabla de Contenidos Rápida
1. [Declaración de Variables](#1-declaraci%C3%B3n-de-variables)
2. [Funciones Flecha](#2-funciones-flecha)
3. [Arreglos: Métodos Imprescindibles](#3-arreglos-m%C3%A9todos-imprescindibles)
4. [Objetos y Desestructuración](#4-objetos-y-desestructuraci%C3%B3n)
5. [Manipulación del DOM](#5-manipulaci%C3%B3n-del-dom)
6. [Eventos](#6-eventos)
7. [Asincronía (`fetch` y `async/await`)](#7-asincron%C3%ADa-fetch-y-asyncawait)
8. [JSON](#8-json)
9. [Almacenamiento Local (`localStorage`)](#9-almacenamiento-local-localstorage)
10. [Nuevos Operadores ES2020+](#10-nuevos-operadores-es2020)

---

### 1. Declaración de Variables
```javascript
const pi = 3.1416;     // Inmutable (no reasignable)
let contador = 0;      // Reasignable
contador++;            // 1
```

---

### 2. Funciones Flecha
```javascript
// Retorno implícito (en una sola línea)
const duplicar = (x) => x * 2;

// Múltiples parámetros y bloque
const calcularArea = (base, altura) => {
  const area = (base * altura) / 2;
  return area;
};
```

---

### 3. Arreglos: Métodos Imprescindibles
```javascript
const numeros = [1, 2, 3, 4, 5];

// Map (Transformar)
const dobles = numeros.map(n => n * 2); // [2, 4, 6, 8, 10]

// Filter (Filtrar)
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]

// Reduce (Acumular)
const suma = numeros.reduce((acc, n) => acc + n, 0); // 15

// Find (Buscar primer elemento)
const mayorQueTres = numeros.find(n => n > 3); // 4

// Includes & Some
const existeCinco = numeros.includes(5); // true
const algunNegativo = numeros.some(n => n < 0); // false
```

---

### 4. Objetos y Desestructuración
```javascript
const dev = {
  nombre: "Alexis",
  skills: ["JS", "Python", "SQL"],
  contacto: { email: "alexis@dev.com" }
};

// Desestructuración y alias
const { nombre, skills, contacto: { email } } = dev;

// Clonación / Spread
const devActualizado = { ...dev, experiencia: "3 años" };
```

---

### 5. Manipulación del DOM
```javascript
// Selección
const elemento = document.querySelector("#mi-id");
const todosLosItems = document.querySelectorAll(".item");

// Modificar contenido y estilos
elemento.textContent = "Nuevo Texto Seguro";
elemento.innerHTML = "<span>Texto con <strong>HTML</strong></span>";
elemento.classList.add("activo");
elemento.classList.remove("oculto");
elemento.classList.toggle("destacado");

// Crear e insertar nodos
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Soy un párrafo dinámico";
document.body.appendChild(nuevoParrafo);
```

---

### 6. Eventos
```javascript
const boton = document.querySelector("#btn");

boton.addEventListener("click", (e) => {
  e.preventDefault(); // Evita recarga en formularios o navegación en enlaces
  console.log("Hiciste clic en:", e.target);
});
```

---

### 7. Asincronía (`fetch` y `async/await`)
```javascript
// Consumo básico con async/await
async function obtenerDatos(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error al cargar datos:", err.message);
  }
}

// Petición POST enviando JSON
async function enviarFormulario(url, datos) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  return await res.json();
}
```

---

### 8. JSON
```javascript
// Objeto JS -> String JSON (para guardar o enviar por red)
const jsonString = JSON.stringify({ id: 1, activo: true });

// String JSON -> Objeto JS
const objetoJS = JSON.parse(jsonString);
```

---

### 9. Almacenamiento Local (`localStorage`)
```javascript
// Guardar (solo admite texto, por eso usamos JSON.stringify para objetos)
localStorage.setItem("usuario", JSON.stringify({ id: 10, tema: "oscuro" }));

// Leer
const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

// Eliminar
localStorage.removeItem("usuario");
localStorage.clear(); // Borra todo
```

---

### 10. Nuevos Operadores ES2020+
```javascript
// Optional Chaining (?.)
const ciudad = usuario?.direccion?.ciudad; // undefined en vez de lanzar error

// Nullish Coalescing (??)
// Solo usa el valor por defecto si es null o undefined (no si es 0 o false)
const puerto = config.puerto ?? 3000;

// Logical Assignment
let x = null;
x ??= 10; // Asigna 10 solo si x es null o undefined
```
