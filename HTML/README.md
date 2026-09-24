# 🌐 Guía Maestra de HTML5: Estructura, Semántica y Buenas Prácticas

> *"HTML no es un lenguaje de programación, es el esqueleto y la semántica de la Web. Sin una buena estructura ósea, ningún músculo (CSS) ni cerebro (JS) puede sostenerse en pie."* — *Tu Profesor de Programación*

---

## 📚 Índice de Contenidos
1. [¿Qué es realmente HTML5? (El Modelo Mental)](#-el-modelo-mental-de-html5)
2. [Anatomía de un Elemento y del Documento](#-anatom%C3%ADa-de-un-elemento-y-del-documento)
3. [Semántica Web: Por qué `<div>` no lo es todo](#-sem%C3%A1ntica-web-el-arte-del-significado)
4. [Estructura Moderna de una Página Web](#-estructura-moderna-de-una-p%C3%A1gina-web)
5. [Textos, Enlaces y Multimedia con Buenas Prácticas](#-textos-enlaces-y-multimedia)
6. [Formularios Accesibles e Interactivos](#-formularios-modernos-y-accesibles)
7. [Accesibilidad Web (A11y) y SEO](#-accesibilidad-a11y-y-seo)
8. [Los 10 Errores Más Comunes de Principiante (¡Evítalos!)](#-los-10-errores-m%C3%A1s-comunes-de-principiante)
9. [Mapa de Lecciones Prácticas en esta Carpeta](#-mapa-de-lecciones-pr%C3%A1cticas-en-esta-carpeta)

---

## 🧠 El Modelo Mental de HTML5

Imagina la construcción de un edificio o el cuerpo humano:
- 🦴 **HTML (HyperText Markup Language):** Es el esqueleto, los cimientos y las etiquetas con los nombres de cada habitación. Define **qué** hay en la página y **qué significa** cada cosa.
- 🎨 **CSS (Cascading Style Sheets):** Es la pintura, la iluminación, el diseño de interiores y la ropa. Define **cómo se ve**.
- ⚡ **JavaScript:** Es la red eléctrica, los sensores, las puertas automáticas y los electrodomésticos. Define **cómo se comporta e interactúa**.

```
+-------------------------------------------------------------+
|                          NAVEGADOR                          |
|                                                             |
|   HTML:  <header><h1>Mi Tienda</h1></header>                |
|   CSS:   header { background: #2563eb; color: white; }      |
|   JS:    button.addEventListener('click', agregarAlCarrito) |
+-------------------------------------------------------------+
```

---

## 🔍 Anatomía de un Elemento y del Documento

### 1. Anatomía de una Etiqueta HTML
Un elemento HTML generalmente se compone de una **etiqueta de apertura**, **atributos** (que agregan configuración o metadatos), el **contenido** y una **etiqueta de cierre**:

```html
<!--    Nombre   Atributo  Valor                  Contenido             Cierre -->
        <a        href="https://google.com" target="_blank">Visitar Google</a>
```

> 💡 **Elementos vacíos o autocerrados:** Algunos elementos no encierran texto y no requieren etiqueta de cierre en HTML5: `<img>`, `<input>`, `<br>`, `<hr>`, `<meta>`, `<link>`.

### 2. Estructura Obligatoria de Todo Documento HTML5
```html
<!DOCTYPE html> <!-- Indica al navegador que use el estándar moderno HTML5 -->
<html lang="es"> <!-- Idioma principal del contenido (vital para lectores de pantalla y SEO) -->
<head>
    <meta charset="UTF-8"> <!-- Codificación universal de caracteres (soporta tildes, ñ, emojis) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Esencial para Responsive Design -->
    <meta name="description" content="Aprende HTML5 desde cero con las mejores prácticas.">
    <title>Mi Primera Web Semántica</title>
    <link rel="stylesheet" href="estilos.css"> <!-- Vinculación con hojas de estilo -->
</head>
<body>
    <!-- Todo el contenido visual para el usuario va aquí -->
    <h1>¡Hola, Mundo Web!</h1>
</body>
</html>
```

---

## 🏗️ Semántica Web: El Arte del Significado

En los primeros días de la web, todo se hacía con `<div>` y `<table>`. Hoy en día, HTML5 introduce **etiquetas semánticas** que le indican a los navegadores, motores de búsqueda (Google) y lectores de pantalla para personas con discapacidad visual **qué función cumple cada sección**.

```
+-------------------------------------------------------+
|                       <header>                        |
|   <nav> Enlaces de navegación principal </nav>        |
+-------------------------------------------------------+
|                      <main>                           |
|  +-------------------------------+  +--------------+  |
|  |           <section>           |  |   <aside>    |  |
|  |  <article>                    |  | Contenido    |  |
|  |    <h2>Título de Noticia</h2> |  | lateral,     |  |
|  |    <p>Texto del artículo...</p>|  | publicidad o |  |
|  |  </article>                   |  | enlaces      |  |
|  +-------------------------------+  +--------------+  |
+-------------------------------------------------------+
|                       <footer>                        |
|   Copyright, redes sociales, políticas de privacidad  |
+-------------------------------------------------------+
```

### Cuándo usar cada etiqueta:
- `<header>`: Cabecera de la página o de una sección (`<article>` / `<section>`). Suele contener logos, títulos y navegación.
- `<nav>`: Bloque reservado exclusivamente para enlaces de navegación principal.
- `<main>`: El contenido nuclear y único de la página. **Solo debe haber uno por documento**.
- `<section>`: Agrupación temática de contenido (ej. sección "Sobre Nosotros", sección "Servicios").
- `<article>`: Contenido autocontenido e independiente que tendría sentido si se distribuye fuera del sitio (un post de blog, una tarjeta de producto, un comentario).
- `<aside>`: Información complementaria o tangencial (barras laterales, widgets, publicidad).
- `<footer>`: Pie de página con créditos, enlaces legales y contacto.

---

## 📝 Textos, Enlaces y Multimedia

### Textos con Jerarquía Real
- `<h1>` a `<h6>`: Títulos y subtítulos jerárquicos. **Regla de Oro:** Solo debe haber **un solo `<h1>`** por página, representando el tema principal.
- `<p>`: Párrafos de texto.
- `<strong>`: Texto de gran importancia o urgencia (los navegadores lo ponen en negrita y los lectores de pantalla cambian el tono de voz).
- `<em>`: Énfasis en una palabra (cursiva semántica).
- `<blockquote>`: Citas textuales de autores o fuentes externas.

### Enlaces (`<a>`)
```html
<!-- Enlace externo seguro (siempre usa rel="noopener noreferrer" con target="_blank") -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
    Aprender en MDN
</a>

<!-- Enlace interno / ancla para navegar dentro de la misma página -->
<a href="#contacto">Ir a la sección de contacto</a>

<!-- Enlace de correo y teléfono -->
<a href="mailto:profesor@ejemplo.com">Enviar Correo</a>
<a href="tel:+51999999999">Llamar a Soporte</a>
```

### Multimedia Accesible (`<img>`, `<video>`, `<audio>`)
```html
<!-- SIEMPRE incluye el atributo 'alt' descriptivo para SEO y accesibilidad -->
<img src="spaceman.jpg" alt="Astronauta flotando en el espacio exterior con la Tierra de fondo" width="600" height="400" loading="lazy">

<!-- Video con subtítulos para accesibilidad total -->
<video controls width="640" poster="portada.jpg">
    <source src="video.mp4" type="video/mp4">
    <track src="subtitulos_es.vtt" kind="subtitles" srclang="es" label="Español">
    Tu navegador no soporta el elemento de video.
</video>
```

---

## 📋 Formularios Modernos y Accesibles

Un formulario profesional debe conectar siempre cada `<label>` con su `<input>` mediante el atributo `for` e `id`:

```html
<form action="/procesar-registro" method="POST">
    <!-- Campo de texto con validación requerida -->
    <div>
        <label for="nombre-usuario">Nombre completo:</label>
        <input type="text" id="nombre-usuario" name="nombre" required minlength="3" placeholder="Ej: Alexis Gómez">
    </div>

    <!-- Campo de correo electrónico con validación de formato nativa -->
    <div>
        <label for="email-usuario">Correo Electrónico:</label>
        <input type="email" id="email-usuario" name="email" required placeholder="correo@dominio.com">
    </div>

    <!-- Selector desplegable -->
    <div>
        <label for="pais">País de residencia:</label>
        <select id="pais" name="pais" required>
            <option value="" disabled selected>Selecciona tu país</option>
            <option value="PE">Perú</option>
            <option value="MX">México</option>
            <option value="CO">Colombia</option>
            <option value="ES">España</option>
        </select>
    </div>

    <!-- Botón de envío -->
    <button type="submit">Crear Cuenta</button>
</form>
```

---

## ♿ Accesibilidad (A11y) y SEO

1. **Jerarquía de Encabezados:** No saltes de `<h1>` a `<h4>` solo para que se vea más pequeño (para tamaños usa CSS).
2. **Textos alternativos (`alt`):** Describe qué muestra la imagen con precisión. Si la imagen es puramente decorativa, usa `alt=""` con `aria-hidden="true"`.
3. **Contrastes y Botones:** Usa `<button>` para acciones (`click`) y `<a>` para navegación a otras URLs.
4. **Metadatos Open Graph:** Para que tus páginas se vean atractivas al compartirse en WhatsApp, Twitter, LinkedIn o Facebook:
```html
<meta property="og:title" content="Curso Práctico de Desarrollo Web">
<meta property="og:description" content="Aprende HTML, CSS y JS con proyectos reales.">
<meta property="og:image" content="https://misitio.com/banner.jpg">
```

---

## ⚠️ Los 10 Errores Más Comunes de Principiante

| # | Error Común | Forma Correcta | ¿Por qué es un error? |
| :- | :--- | :--- | :--- |
| 1 | Usar múltiples `<h1>` en una página | Usar solo un `<h1>` principal | Confunde a Google y destruye la jerarquía SEO. |
| 2 | Divitis aguda: usar `<div>` para todo | Usar `<header>`, `<nav>`, `<article>`, `<main>` | Hace que el código sea ilegible e inaccesible. |
| 3 | Olvidar el atributo `alt` en `<img>` | Siempre poner `alt="descripción"` | Personas con ceguera no sabrán qué hay en la imagen. |
| 4 | Usar `<b>` e `<i>` para estilo | Usar `<strong>`, `<em>` o estilizar con CSS | `<b>` no aporta significado semántico. |
| 5 | Usar `<a>` como botón de acción JS | Usar `<button type="button">` | Los lectores de pantalla esperan que un enlace lleve a una URL. |
| 6 | No enlazar `<label>` con `<input>` | Usar `<label for="id">` e `<input id="id">` | Al hacer clic en el texto de la etiqueta, el campo no se activa. |
| 7 | Anidar elementos de bloque dentro de elementos en línea (ej. `<span><div>...</div></span>`) | `<div><span>...</span></div>` | Viola las reglas del DOM y produce renderizados impredecibles. |
| 8 | Olvidar `<meta name="viewport">` | Incluirlo siempre en `<head>` | La página no se adaptará a teléfonos celulares. |
| 9 | Usar mayúsculas en nombres de etiquetas (`<DIV>`) | Siempre minúsculas (`<div>`) | Buena práctica y estándar del consorcio W3C. |
| 10 | Dejar etiquetas sin cerrar | Cerrar todas las etiquetas que lo requieran | Provoca fallos en cascada en la renderización del navegador. |

---

## 🗺️ Mapa de Lecciones Prácticas en esta Carpeta

Abre y practica con cada uno de los archivos en orden:

| Archivo | Nivel | Contenido Práctico |
| :--- | :---: | :--- |
| **[`01_estructura_basica.html`](./01_estructura_basica.html)** | 🟢 Básico | Doctype, cabeceras, etiquetas meta, visualización en navegador. |
| **[`02_textos_y_titulos.html`](./02_textos_y_titulos.html)** | 🟢 Básico | Jerarquía tipográfica de `h1`-`h6`, párrafos, citas y énfasis. |
| **[`03_enlaces_e_imagenes.html`](./03_enlaces_e_imagenes.html)** | 🟢 Básico | Rutas relativas vs absolutas, anclas, optimización y carga de imágenes. |
| **[`04_contenedores_y_clases.html`](./04_contenedores_y_clases.html)** | 🟡 Intermedio | Elementos en bloque vs elementos en línea, `div`, `span`, IDs y clases. |
| **[`05_listas_y_tablas.html`](./05_listas_y_tablas.html)** | 🟡 Intermedio | Listas ordenadas (`ol`), desordenadas (`ul`), de definición (`dl`) y tablas estructuradas (`thead`, `tbody`). |
| **[`06_formularios_e_inputs.html`](./06_formularios_e_inputs.html)** | 🟡 Intermedio | Todos los tipos de input (email, date, number, range), validaciones y accesibilidad. |
| **[`07_html_semantico.html`](./07_html_semantico.html)** | 🔴 Avanzado | Maquetación moderna completa con `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`. |
| **[`08_retos_y_proyectos_practicos.html`](./08_retos_y_proyectos_practicos.html)** | 🏆 Proyecto | Retos paso a paso: Tarjeta de perfil, tabla de precios y landing page accesible. |
| **[`index.html`](./index.html)** | 🌟 Hub | Panel interactivo visual para navegar todas las lecciones de HTML desde el navegador. |

---

> 🚀 **Consejo de tu Profesor:** Abre cualquier archivo en tu navegador haciendo doble clic o usando la extensión **Live Server** de VS Code. ¡Inspecciona el código con <kbd>F12</kbd> para ver el DOM en vivo!
