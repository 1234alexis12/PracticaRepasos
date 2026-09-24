# ⚡ Guía Maestra de JavaScript Moderno (ES6+): De Cero a Ninja

> *"JavaScript es el único lenguaje que se ejecuta de forma nativa en miles de millones de navegadores de todo el planeta. Quien domina JavaScript, domina la Web."* — *Tu Profesor de Programación*

---

## 📚 Índice de Contenidos
1. [¿Cómo funciona JavaScript por dentro? (El Motor V8 y el Event Loop)](#-el-motor-de-javascript-y-el-event-loop)
2. [Tipos de Datos, Coerción y `==` vs `===`](#-tipos-de-datos-y-coerci%C3%B3n)
3. [Alcance (Scope), Hoisting y Closures](#-scope-hoisting-y-closures)
4. [Programación Funcional y Métodos de Arreglos](#-m%C3%A9todos-modernos-de-arreglos-array-methods)
5. [Manipulación del DOM y Event Delegation](#-manipulaci%C3%B3n-del-dom-y-eventos)
6. [Asincronía: Promesas, `async/await` y Fetch API](#-asincron%C3%ADa-promesas-y-asyncawait)
7. [Características Modernas de ES6+](#-caracter%C3%ADsticas-modernas-de-es6)
8. [Programación Orientada a Objetos y el Enigma de `this`](#-poo-y-el-comportamiento-de-this)
9. [Los 10 Errores Fatales en JavaScript (¡Evítalos!)](#-los-10-errores-fatales-en-javascript)
10. [Mapa de Lecciones Prácticas en esta Carpeta](#-mapa-de-lecciones-pr%C3%A1cticas-en-esta-carpeta)

---

## 🧠 El Motor de JavaScript y el Event Loop

JavaScript es un lenguaje **interpretado, monohilo (single-threaded)** y no bloqueante con un modelo de concurrencia basado en un **Event Loop**.

```
+-------------------------------------------------------------------------+
|                              MOTOR JS (V8)                              |
|                                                                         |
|  +-----------------------+              +----------------------------+  |
|  |      MEMORY HEAP      |              |         CALL STACK         |  |
|  |  (Guarda variables y  |              |    (Pila de ejecución de   |  |
|  |       objetos)        |              |          funciones)        |  |
|  +-----------------------+              +----------------------------+  |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                             WEB APIs / NODE                             |
|          (setTimeout, fetch, eventos DOM, peticiones HTTP)              |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                  COLAS DE TAREAS (TASK QUEUES)                          |
|                                                                         |
|  1. MICROTASKS QUEUE: Promesas (.then), async/await, queueMicrotask     |
|  2. MACROTASKS QUEUE: setTimeout, setInterval, eventos de UI            |
+-------------------------------------------------------------------------+
                                     |
                                     v
                           [ 🔄 EVENT LOOP 🔄 ]
       (Si el Call Stack está vacío, pasa primero las Microtareas
               y luego las Macrotareas a la pila)
```

---

## 🔍 Tipos de Datos y Coerción

En JS existen dos categorías:
1. **Primitivos (inmutables y pasados por valor):** `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
2. **Objetos / Referenciales (mutables y pasados por referencia):** `Object`, `Array`, `Function`, `Date`, `Map`, `Set`.

### 🚨 Regla de Oro: Usa SIEMPRE `===` (Igualdad Estricta)
- `==` (Igualdad débil): Intenta convertir los tipos automáticamente (coerción implícita), causando comportamientos bizarros:
  ```javascript
  0 == false         // true 😱
  "" == 0            // true 😱
  null == undefined  // true 😱
  ```
- `===` (Igualdad estricta): Compara **tipo de dato** y **valor**:
  ```javascript
  0 === false        // false ✅
  "" === 0           // false ✅
  5 === "5"          // false ✅
  ```

---

## 🔒 Scope, Hoisting y Closures

### 1. `var` vs `let` vs `const`
- `const`: Bloque local `{}`. No se puede reasignar. **Usa esto por defecto el 90% de las veces**.
- `let`: Bloque local `{}`. Permite reasignar valores (útil en bucles `for` o contadores).
- `var`: **OBSOLETO**. Tiene alcance de función, ignora bloques `if`/`for` y sufre de hoisting problemático.

### 2. ¿Qué es un Closure (Clausura)?
Un closure ocurre cuando una función recuerda y mantiene acceso a las variables de su función externa (léxica), incluso después de que esa función externa haya terminado de ejecutarse:

```javascript
function crearContador(valorInicial = 0) {
    let cuenta = valorInicial; // Variable privada protegida en el closure

    return {
        incrementar: () => ++cuenta,
        decrementar: () => --cuenta,
        obtenerValor: () => cuenta
    };
}

const miContador = crearContador(10);
console.log(miContador.incrementar()); // 11
console.log(miContador.incrementar()); // 12
console.log(miContador.obtenerValor()); // 12
```

---

## 🎯 Métodos Modernos de Arreglos (Array Methods)

¡Dile adiós a los bucles `for` imperativos antiguos! Usa métodos declarativos e inmutables:

```javascript
const productos = [
    { id: 1, nombre: "Laptop Gamer", precio: 1200, categoria: "tech" },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 30, categoria: "tech" },
    { id: 3, nombre: "Silla Ergonómica", precio: 250, categoria: "oficina" },
    { id: 4, nombre: "Teclado Mecánico", precio: 80, categoria: "tech" }
];

// 1. FILTER: Filtra elementos que cumplan una condición
const articulosTech = productos.filter(p => p.categoria === "tech");

// 2. MAP: Transforma cada elemento en uno nuevo
const nombresEnMayusculas = productos.map(p => p.nombre.toUpperCase());

// 3. REDUCE: Reduce todo el arreglo a un único valor acumulado (ej. totalizar)
const valorTotalInventario = productos.reduce((acumulador, p) => acumulador + p.precio, 0);

// 4. FIND: Encuentra el PRIMER elemento que cumpla la condición
const mouse = productos.find(p => p.id === 2);

// 5. SOME & EVERY: Comprobaciones booleanas
const hayArticuloCaro = productos.some(p => p.precio > 1000); // true
const todosSonGratis = productos.every(p => p.precio === 0);   // false
```

---

## 🖱️ Manipulación del DOM y Eventos

### Selección Rápida y Limpia
```javascript
const boton = document.querySelector("#btn-comprar");
const tarjetas = document.querySelectorAll(".card-producto");
```

### Event Delegation (Patrón de Alto Rendimiento)
En lugar de agregar 100 listeners a 100 botones individuales, agrega **un solo listener al contenedor padre**:

```javascript
const listaCarrito = document.querySelector("#lista-carrito");

listaCarrito.addEventListener("click", (event) => {
    // Verificamos si se hizo clic en el botón de eliminar
    if (event.target.matches(".btn-eliminar")) {
        const idProducto = event.target.dataset.id;
        console.log(`Eliminando producto ID: ${idProducto}`);
        event.target.closest(".item-carrito").remove();
    }
});
```

---

## ⏳ Asincronía: Promesas y `async/await`

La forma moderna y elegante de consumir APIs y datos remotos:

```javascript
async function obtenerUsuariosGithub(username) {
    try {
        const respuesta = await fetch(`https://api.github.com/users/${username}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - Usuario no encontrado`);
        }

        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Hubo un fallo en la petición:", error.message);
        throw error;
    } finally {
        console.log("Petición completada.");
    }
}
```

---

## 🚀 Características Modernas de ES6+

### 1. Desestructuración (Destructuring)
```javascript
const usuario = { nombre: "Alexis", rol: "Admin", pais: "Perú" };
const { nombre, rol } = usuario;

const coordenadas = [12.0464, -77.0428];
const [latitud, longitud] = coordenadas;
```

### 2. Operador Spread (`...`) y Rest
```javascript
// Clonación y combinación de objetos sin mutar los originales
const usuarioConEmail = { ...usuario, email: "alexis@ejemplo.com" };

// Rest parameters en funciones
function sumarTodo(...numeros) {
    return numeros.reduce((acc, n) => acc + n, 0);
}
```

### 3. Optional Chaining (`?.`) y Nullish Coalescing (`??`)
```javascript
// Evita el error 'Cannot read properties of undefined'
const ciudad = usuario?.perfil?.direccion?.ciudad ?? "Ciudad no registrada";
```

---

## ⚠️ Los 10 Errores Fatales en JavaScript

| # | Error Fatal | Forma Correcta | ¿Por qué? |
| :- | :--- | :--- | :--- |
| 1 | Usar `var` en pleno siglo XXI | Usar `const` y `let` | `var` contamina el scope global y causa bugs sutiles. |
| 2 | Mutar arreglos/objetos originales directamente | Usar `map`, `filter`, `[...arr]`, `{...obj}` | Provoca efectos secundarios difíciles de rastrear. |
| 3 | Olvidar `await` antes de una Promesa | `const data = await res.json()` | Recibes una promesa pendiente en vez de tus datos. |
| 4 | No capturar errores en llamadas asíncronas | Usar bloque `try/catch` | Si la API falla, tu aplicación entera se rompe. |
| 5 | Usar `forEach` esperando que retorne un nuevo arreglo | Usar `map()` | `forEach` siempre retorna `undefined`. |
| 6 | Confundir `null` con `undefined` | `undefined` = no inicializado; `null` = ausencia intencional de valor | Entender esto evita bugs en validaciones de API. |
| 7 | Perder el contexto de `this` en callbacks | Usar Arrow Functions `() => {}` | Las funciones flecha heredan el `this` léxico circundante. |
| 8 | Modificar el DOM dentro de un bucle grande | Usar `DocumentFragment` o actualizar de golpe | Cada manipulación causa un *reflow/repaint* costoso. |
| 9 | Comparar objetos con `===` esperando igualdad de contenido | Comparar propiedades o usar `JSON.stringify()` | Dos objetos distintos nunca tienen la misma referencia en memoria. |
| 10 | Crear fugas de memoria (Memory Leaks) con `setInterval` | Limpiar timers con `clearInterval()` al desmontar | Los timers huérfanos consumen CPU y RAM indefinidamente. |

---

## 🗺️ Mapa de Lecciones Prácticas en esta Carpeta

| Archivo HTML / JS | Nivel | Temas que aprenderás |
| :--- | :---: | :--- |
| **`00_arquitectura_y_motor_javascript`** | 🏛️ Teórico | V8 Engine, Call Stack, Memory Heap, Event Loop y Microtareas. |
| **`01_variables_y_tipos_de_datos`** | 🟢 Básico | `const`, `let`, tipos primitivos, objetos, `typeof` y coerción. |
| **`02_condicionales_y_operadores`** | 🟢 Básico | Operadores lógicos, cortocircuito (`&&`, `||`), ternarios y `switch`. |
| **`03_bucles_e_iteraciones`** | 🟢 Básico | `for`, `while`, `for...of` (iterables) y `for...in` (objetos). |
| **`04_funciones_y_alcance`** | 🟡 Intermedio | Funciones flecha, closures, valores por defecto y funciones puras. |
| **`05_arreglos_y_metodos`** | 🟡 Intermedio | `map`, `filter`, `reduce`, `find`, `some`, `every`, `flat`, `sort`. |
| **`06_objetos_y_json`** | 🟡 Intermedio | Notación literal, `Object.entries()`, `JSON.stringify()`, `JSON.parse()`. |
| **`07_manipulacion_del_dom`** | 🟡 Intermedio | Selección de nodos, creación de elementos, clases, estilos y data-attributes. |
| **`08_eventos_e_interactividad`** | 🔴 Avanzado | `addEventListener`, propagación (Bubbling), Delegation y formularios. |
| **`09_asincronia_y_fetch`** | 🔴 Avanzado | Promesas, `async/await`, Fetch API, manejo de errores y estados de carga. |
| **`10_retos_y_proyectos_practicos`** | 🏆 Proyectos | Aplicación To-Do completa, Carrito de Compras interactivo y Buscador de Usuarios de GitHub. |
| **`index.html`** | 🌟 Hub | Panel interactivo en navegador para probar todos los scripts de JS en vivo con consola visual. |

---

> 🚀 **Consejo de tu Profesor:** Abre `index.html` en tu navegador, presiona <kbd>F12</kbd> y observa la pestaña **Console**. ¡La consola es tu mejor laboratorio de experimentación!
