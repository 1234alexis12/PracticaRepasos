# ⚡ Chuleta Rápida de CSS3 (Cheat Sheet)

> *Referencia rápida para maquetar interfaces modernas sin dudar en sintaxis.*

---

## 📑 Tabla de Contenidos Rápida
1. [Reset Básico Universal](#1-reset-b%C3%A1sico-universal)
2. [Unidades de Medida](#2-unidades-de-medida)
3. [Selectores Frecuentes](#3-selectores-frecuentes)
4. [Centrado de Elementos](#4-t%C3%A9cnicas-de-centrado)
5. [Flexbox en 1 Minuto](#5-flexbox-en-1-minuto)
6. [CSS Grid en 1 Minuto](#6-css-grid-en-1-minuto)
7. [Posicionamiento (`position`)](#7-posicionamiento-position)
8. [Variables CSS](#8-variables-css)
9. [Breakpoints Responsive Típicos](#9-breakpoints-responsive-t%C3%ADpicos)
10. [Sombras y Filtros Visuales](#10-sombras-y-filtros-visuales)

---

### 1. Reset Básico Universal
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

---

### 2. Unidades de Medida
- `px`: Píxeles absolutos fijos (usar para bordes finos o sombras).
- `rem`: Relativo al tamaño de fuente raíz del `html` (por defecto `1rem = 16px`). **Ideal para tipografía y espaciados**.
- `em`: Relativo al tamaño de fuente del propio elemento padre.
- `%`: Porcentaje del contenedor padre.
- `vw` / `vh`: 1% del ancho / alto de la ventana del navegador (viewport).
- `dvh` / `dvw`: *Dynamic Viewport* (se adapta a la barra de direcciones en móviles).

---

### 3. Selectores Frecuentes
```css
/* Básicos */
.clase          /* Elementos con class="clase" */
#id             /* Elemento único con id="id" */
div p           /* Cualquier <p> descendiente dentro de un <div> */
div > p         /* Solo hijos DIRECTOS */
h2 + p          /* El primer <p> inmediatamente después de un <h2> */
h2 ~ p          /* Todos los <p> hermanos posteriores a un <h2> */

/* Pseudo-clases */
a:hover         /* Al pasar el mouse */
button:active   /* Al hacer clic y mantener presionado */
input:focus     /* Cuando el campo tiene el foco de escritura */
li:first-child  /* El primer elemento de la lista */
li:last-child   /* El último elemento de la lista */
li:nth-child(2n)/* Elementos pares (2, 4, 6...) */
:not(.activo)   /* Todo lo que NO tenga la clase activo */
:has(> img)     /* El elemento padre que contenga una imagen hija */
```

---

### 4. Técnicas de Centrado
```css
/* Opción 1: Con Flexbox (Más versátil) */
.contenedor-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Opción 2: Con Grid (La más corta en 2 líneas) */
.contenedor-grid {
  display: grid;
  place-items: center;
}

/* Opción 3: Bloque de ancho fijo centrado horizontalmente */
.bloque {
  max-width: 600px;
  margin-inline: auto; /* margin-left: auto; margin-right: auto; */
}
```

---

### 5. Flexbox en 1 Minuto
```css
.contenedor {
  display: flex;
  flex-direction: row; /* row | column */
  justify-content: space-between; /* flex-start | center | flex-end | space-between | space-around | space-evenly */
  align-items: center; /* stretch | center | flex-start | flex-end */
  gap: 1rem;
  flex-wrap: wrap;
}

.item {
  flex: 1; /* Crece para ocupar el espacio restante */
  align-self: flex-end; /* Alineación individual sobreescribe align-items */
}
```

---

### 6. CSS Grid en 1 Minuto
```css
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tarjeta-destacada {
  grid-column: span 2; /* Ocupa 2 columnas */
}
```

---

### 7. Posicionamiento (`position`)
- `static`: Valor por defecto. Sigue el flujo normal.
- `relative`: Sigue el flujo normal, pero permite desplazarse con `top`, `right`, `bottom`, `left` sin alterar a los demás elementos. Sirve de ancla para hijos absolutos.
- `absolute`: Se sale del flujo normal y se posiciona respecto al ancestro posicionado (`relative`, `absolute`, `fixed`) más cercano.
- `fixed`: Se fija en la pantalla respecto a la ventana del navegador. No se mueve al hacer scroll.
- `sticky`: Se comporta como `relative` hasta que alcanza cierto scroll (`top: 0`), momento en el que se vuelve `fixed`.

---

### 8. Variables CSS
```css
:root {
  --color-brand: #6366f1;
  --color-dark: #0f172a;
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: var(--color-brand);
  box-shadow: var(--shadow-lg);
}
```

---

### 9. Breakpoints Responsive Típicos
```css
/* Smartphones grandes / Phablets */
@media (min-width: 640px) { ... }

/* Tablets */
@media (min-width: 768px) { ... }

/* Laptops / Desktops */
@media (min-width: 1024px) { ... }

/* Pantallas Grandes / Monitores */
@media (min-width: 1280px) { ... }
```

---

### 10. Sombras y Filtros Visuales
```css
/* Sombra elegante y suave */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);

/* Efecto Glassmorphism (Efecto Cristal esmerilado) */
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```
