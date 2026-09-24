# ⚡ Chuleta Rápida de HTML5 (Cheat Sheet)

> *Tu referencia rápida para no tener que memorizar etiquetas ni atributos de memoria.*

---

## 📑 Tabla de Contenidos Rápida
1. [Estructura Base](#1-estructura-base)
2. [Metadatos Esenciales](#2-metadatos-esenciales)
3. [Textos y Formato Semántico](#3-textos-y-formato-sem%C3%A1ntico)
4. [Estructura y Maquetación (Layout)](#4-estructura-y-maquetaci%C3%B3n-layout)
5. [Enlaces y Navegación](#5-enlaces-y-navegaci%C3%B3n)
6. [Multimedia](#6-multimedia)
7. [Listas](#7-listas)
8. [Tablas](#8-tablas)
9. [Formularios y Controles](#9-formularios-y-controles)
10. [Atributos Globales Imprescindibles](#10-atributos-globales-imprescindibles)

---

### 1. Estructura Base
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título de la Pestaña</title>
</head>
<body>
  <!-- Contenido -->
</body>
</html>
```

---

### 2. Metadatos Esenciales
```html
<meta name="description" content="Resumen de la página para Google (máx 160 caracteres)">
<meta name="author" content="Alexis">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="estilos.css">
<script defer src="app.js"></script> <!-- 'defer' carga el JS sin bloquear el HTML -->
```

---

### 3. Textos y Formato Semántico
| Etiqueta | Significado |
| :--- | :--- |
| `<h1>` ... `<h6>` | Encabezados jerárquicos (1 al 6). |
| `<p>` | Párrafo regular. |
| `<strong>` | Importancia alta (negrita semántica). |
| `<em>` | Énfasis / entonación (cursiva semántica). |
| `<mark>` | Texto resaltado (como con marcador fluorescente). |
| `<small>` | Letra pequeña (términos legales, copyright). |
| `<code>` | Fragmento de código en línea. |
| `<pre>` | Texto preformateado (conserva espacios y saltos de línea). |
| `<blockquote>` | Cita larga en bloque (usar con `cite="url"`). |
| `<hr>` | Separador temático / línea divisoria horizontal. |
| `<br>` | Salto de línea forzado (usar con moderación). |

---

### 4. Estructura y Maquetación (Layout)
| Etiqueta | Uso |
| :--- | :--- |
| `<header>` | Cabecera del sitio o de una sección/artículo. |
| `<nav>` | Menú o barra de navegación. |
| `<main>` | Contenido principal único de la página. |
| `<section>` | Sección temática de un documento. |
| `<article>` | Contenido autónomo y reusable (noticia, post, producto). |
| `<aside>` | Barra lateral, contenido tangencial o publicitario. |
| `<footer>` | Pie de página con enlaces, autor y derechos. |
| `<div>` | Contenedor genérico en bloque sin significado (para CSS). |
| `<span>` | Contenedor genérico en línea sin significado (para CSS). |

---

### 5. Enlaces y Navegación
```html
<!-- Enlace externo seguro -->
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">Ir al sitio</a>

<!-- Enlace interno / ancla -->
<a href="#contacto">Ir a Contacto</a>

<!-- Correo y teléfono -->
<a href="mailto:hola@ejemplo.com?subject=Consulta">Enviar Email</a>
<a href="tel:+51987654321">Llamar</a>

<!-- Descargar archivo -->
<a href="manual.pdf" download>Descargar PDF</a>
```

---

### 6. Multimedia
```html
<!-- Imagen con carga diferida (lazy loading) y texto alternativo -->
<img src="foto.webp" alt="Paisaje de montañas nevadas al atardecer" width="800" height="600" loading="lazy">

<!-- Imagen adaptable con picture -->
<picture>
  <source media="(min-width: 768px)" srcset="foto-grande.webp">
  <img src="foto-movil.webp" alt="Descripción adaptable">
</picture>

<!-- Audio -->
<audio controls>
  <source src="cancion.mp3" type="audio/mpeg">
  Tu navegador no soporta audio.
</audio>

<!-- Video -->
<video controls width="640" poster="miniatura.jpg">
  <source src="video.mp4" type="video/mp4">
  Tu navegador no soporta video.
</video>
```

---

### 7. Listas
```html
<!-- Lista desordenada (viñetas) -->
<ul>
  <li>Elemento 1</li>
  <li>Elemento 2</li>
</ul>

<!-- Lista ordenada (numérica) -->
<ol start="1">
  <li>Primer paso</li>
  <li>Segundo paso</li>
</ol>

<!-- Lista de definiciones / glosario -->
<dl>
  <dt>API</dt>
  <dd>Interfaz de Programación de Aplicaciones.</dd>
</dl>
```

---

### 8. Tablas
```html
<table>
  <caption>Reporte de Ventas Mensuales</caption>
  <thead>
    <tr>
      <th scope="col">Mes</th>
      <th scope="col">Ventas ($)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enero</td>
      <td>1,500</td>
    </tr>
    <tr>
      <td>Febrero</td>
      <td>2,300</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>3,800</td>
    </tr>
  </tfoot>
</table>
```

---

### 9. Formularios y Controles
```html
<form action="/api/login" method="POST">
  <fieldset>
    <legend>Datos de Ingreso</legend>

    <label for="usr">Usuario:</label>
    <input type="text" id="usr" name="user" required minlength="3" autocomplete="username">

    <label for="pwd">Contraseña:</label>
    <input type="password" id="pwd" name="pass" required autocomplete="current-password">

    <label for="pais">País:</label>
    <select id="pais" name="pais">
      <option value="PE">Perú</option>
      <option value="MX">México</option>
    </select>

    <label for="comentarios">Mensaje:</label>
    <textarea id="comentarios" name="mensaje" rows="4" cols="50"></textarea>

    <label>
      <input type="checkbox" name="terminos" required> Acepto los términos y condiciones
    </label>

    <button type="submit">Iniciar Sesión</button>
  </fieldset>
</form>
```

---

### 10. Atributos Globales Imprescindibles
- `id="unico"`: Identificador único universal en todo el documento.
- `class="clase1 clase2"`: Clases para aplicar estilos CSS o selectores JS.
- `title="Texto flotante"`: Mensaje de tooltip al pasar el cursor por encima.
- `data-*="valor"`: Atributos personalizados para guardar datos accesibles desde JS (`data-id="42"`).
- `hidden`: Oculta el elemento visualmente y para accesibilidad.
- `tabindex="0"`: Hace que un elemento no interactivo sea enfocable con el teclado (tecla <kbd>Tab</kbd>).
