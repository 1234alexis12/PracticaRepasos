-- =============================================================================
-- LECCIÓN 00: TEORÍA DE BASES DE DATOS, MODELADO Y NORMALIZACIÓN (1FN, 2FN, 3FN)
-- =============================================================================
-- 
-- ANTES DE ESCRIBIR UNA SOLA LÍNEA DE SQL, ES OBLIGATORIO SABER DISEÑAR LA BASE DE DATOS.
-- 
-- Un mal diseño de base de datos provoca:
--   1. Datos duplicados (Redundancia).
--   2. Inconsistencias (Ej: el cliente cambia de dirección en una fila pero no en otra).
--   3. Anomalías de inserción, actualización y borrado.
--   4. Consultas lentas e ineficientes.
-- =============================================================================

-- =============================================================================
-- PARTE 1: ¿QUÉ ES LA NORMALIZACIÓN?
-- =============================================================================
-- La Normalización es el proceso formal de organizar las columnas y tablas
-- de una base de datos relacional para minimizar la redundancia de datos
-- y evitar anomalías de actualización.
-- 
-- ANALOGÍA SENCILLA:
-- Imagina un armario desordenado donde guardas zapatos, ropa limpia, comida y herramientas
-- todo en el mismo cajón gigante. Cada vez que buscas un zapato, manchas la ropa limpia.
-- Normalizar es crear cajones separados con etiquetas específicas (Cajón de Ropa,
-- Cajón de Calzado, Despensa) conectados de forma ordenada.
-- =============================================================================

-- =============================================================================
-- EJEMPLO PRÁCTICO PASO A PASO: DE UNA TABLA "HORRIBLE" A UNA TOTALMENTE NORMALIZADA
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ESTADO 0: TABLA NO NORMALIZADA (¡CÓMO NUNCA DEBES DISEÑAR!)
-- -----------------------------------------------------------------------------
-- Mira esta tabla llamada 'pedidos_desastre'. Todo está mezclado en una sola sábana:
--
--  id_pedido | cliente_nombre | cliente_telefono | productos_comprados            | proveedor_nombre | proveedor_ciudad
-- -----------+----------------+------------------+--------------------------------+------------------+-----------------
--  101       | Alexis Garcia  | 555-1234         | Teclado ($80), Mouse ($30)     | TechCorp         | Tokio
--  102       | Beatriz Lopez  | 555-9876         | Monitor ($250)                 | ScreenPro        | Seul
--  103       | Alexis Garcia  | 555-1234         | Teclado ($80)                  | TechCorp         | Tokio
--
-- PROBLEMAS DE ESTA TABLA:
-- 1. En 'productos_comprados' hay múltiples valores en una sola celda (no son atómicos).
-- 2. Los datos de Alexis (nombre y teléfono) y de TechCorp (nombre y ciudad) se repiten en cada pedido.
-- 3. Si TechCorp cambia de ciudad a "Osaka", tenemos que actualizar miles de filas una por una.


-- =============================================================================
-- PASO 1: PRIMERA FORMA NORMAL (1FN) - "ATOMICIDAD DE DATOS"
-- =============================================================================
-- REGLAS DE LA 1FN:
-- 1. Cada columna debe contener un ÚNICO valor indivisible (Valor Atómico).
--    ¡Prohibido guardar listas como "Teclado, Mouse" o "555-111, 555-222" en un solo campo!
-- 2. Cada fila debe ser única mediante una Clave Primaria (Primary Key).
-- 3. No debe haber grupos repetitivos de columnas (ej: producto_1, producto_2, producto_3).

-- Aplicando 1FN: Separamos los productos en filas individuales.
-- id_pedido | producto_nombre | precio | cliente_nombre | cliente_telefono | proveedor_nombre | proveedor_ciudad
-- ----------+-----------------+--------+----------------+------------------+------------------+-----------------
-- 101       | Teclado         | 80     | Alexis Garcia  | 555-1234         | TechCorp         | Tokio
-- 101       | Mouse           | 30     | Alexis Garcia  | 555-1234         | TechCorp         | Tokio
-- 102       | Monitor         | 250    | Beatriz Lopez  | 555-9876         | ScreenPro        | Seul
-- 103       | Teclado         | 80     | Alexis Garcia  | 555-1234         | TechCorp         | Tokio


-- =============================================================================
-- PASO 2: SEGUNDA FORMA NORMAL (2FN) - "DEPENDENCIA COMPLETA DE LA CLAVE"
-- =============================================================================
-- REGLAS DE LA 2FN:
-- 1. La tabla ya debe estar en 1FN.
-- 2. Todas las columnas que no son clave deben depender de la Clave Primaria COMPLETA,
--    no de una parte de ella (eliminar dependencias parciales).
--
-- En la tabla anterior, la clave primaria compuesta sería (id_pedido + producto_nombre).
-- Pero el 'cliente_nombre' depende solo del 'id_pedido', NO del producto.
-- Y el 'precio' depende solo del 'producto_nombre', NO del pedido.
--
-- SOLUCIÓN EN 2FN: Separamos en tablas independientes:
--  - Tabla 'pedidos'
--  - Tabla 'productos'
--  - Tabla intermedia 'detalle_pedidos' (para la relación muchos a muchos)


-- =============================================================================
-- PASO 3: TERCERA FORMA NORMAL (3FN) - "CERO DEPENDENCIAS TRANSITIVAS"
-- =============================================================================
-- REGLAS DE LA 3FN:
-- 1. La tabla ya debe estar en 2FN.
-- 2. Ninguna columna no clave debe depender de OTRA columna no clave.
--    (Regla de oro: "Cada atributo debe depender de la clave, de toda la clave y de nada más que de la clave").
--
-- En la tabla de productos teníamos: (id_producto, nombre, precio, proveedor_nombre, proveedor_ciudad).
-- 'proveedor_ciudad' depende de 'proveedor_nombre', NO directamente del producto.
-- Si un producto cambia, el proveedor sigue existiendo en su ciudad.
--
-- SOLUCIÓN EN 3FN: Creamos una tabla exclusiva para 'proveedores'.


-- =============================================================================
-- IMPLEMENTACIÓN REAL EN CÓDIGO SQL 100% NORMALIZADO (3FN)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS arquitectura_tienda_3fn
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE arquitectura_tienda_3fn;

-- 1. TABLA PROVEEDORES (Independiente)
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(80) NOT NULL,
    contacto_email VARCHAR(100) UNIQUE
);

-- 2. TABLA CLIENTES (Independiente)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- 3. TABLA PRODUCTOS (Depende de proveedores mediante FK)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    proveedor_id INT NOT NULL,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

-- 4. TABLA PEDIDOS (Cabecera del pedido - Depende de clientes)
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- 5. TABLA DETALLE_PEDIDOS (Relación Muchos a Muchos entre Pedidos y Productos)
-- Un pedido puede tener muchos productos, y un producto puede estar en muchos pedidos.
CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_al_momento_compra DECIMAL(10, 2) NOT NULL, -- Histórico de precio inmutable
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);


-- =============================================================================
-- PARTE 2: ÍNDICES Y RENDIMIENTO (INDEXACIÓN B-TREE)
-- =============================================================================
-- ¿Qué es un Índice en MySQL?
-- Es como el índice alfabético al final de un libro de 1000 páginas.
-- Sin índice: MySQL hace un "Full Table Scan" (revisa 1,000,000 de filas una por una).
-- Con índice: MySQL salta directamente a la fila exacta en microsegundos usando un árbol B-Tree.

-- Crear un índice en la columna 'email' de clientes para que los inicios de sesión sean instantáneos:
CREATE INDEX idx_clientes_email ON clientes(email);

-- Crear un índice compuesto para búsquedas por proveedor y precio:
CREATE INDEX idx_productos_prov_precio ON productos(proveedor_id, precio);

-- Para auditar si MySQL está usando un índice, usamos 'EXPLAIN':
EXPLAIN SELECT * FROM clientes WHERE email = 'alexis@ejemplo.com';


-- =============================================================================
-- PARTE 3: PRINCIPIOS ACID EN BASES DE DATOS
-- =============================================================================
-- ACID es el estándar de oro de fiabilidad en motores de bases de datos relacionales:
-- 
-- 1. A - Atomicidad (Atomicity): La operación es "todo o nada". Si una transferencia
--    bancaria descuenta dinero de tu cuenta pero falla antes de depositarlo en la otra,
--    la transacción completa se revierte (ROLLBACK).
-- 2. C - Consistencia (Consistency): Todos los datos deben cumplir las reglas y claves foráneas.
-- 3. I - Aislamiento (Isolation): Dos transacciones simultáneas no se interfieren entre sí.
-- 4. D - Durabilidad (Durability): Una vez que se confirma un COMMIT, los datos sobreviven
--    incluso si se corta la electricidad del servidor al milisegundo siguiente.
