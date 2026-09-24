-- =============================================================================
-- LECCIÓN 01: CREACIÓN DE BASES DE DATOS Y TABLAS (DDL: DATA DEFINITION LANGUAGE)
-- =============================================================================
-- 
-- En SQL, los comentarios de una sola línea inician con dos guiones (-- ).
-- Los comentarios de bloque usan /* ... */.
-- 
-- ¿Qué es una Base de Datos Relacional?
-- Es un conjunto organizado de información estructurada en "Tablas" (similares
-- a hojas de cálculo con filas y columnas) que pueden relacionarse entre sí.
-- =============================================================================

-- 1. CREACIÓN Y SELECCIÓN DE LA BASE DE DATOS
-- 'IF NOT EXISTS' evita que el comando falle si la base de datos ya fue creada previamente.
CREATE DATABASE IF NOT EXISTS tienda_tecnologia 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 'USE' le indica a MySQL sobre qué base de datos vamos a trabajar a partir de ahora.
USE tienda_tecnologia;


-- 2. TIPOS DE DATOS COMUNES EN MYSQL:
--   - INT / BIGINT: Números enteros (ej: 1, 45, 1000).
--   - VARCHAR(N): Texto de longitud variable de hasta N caracteres (ej: VARCHAR(100)).
--   - DECIMAL(M, D): Números decimales exactos. Ideal para dinero (M = dígitos totales, D = decimales).
--   - DATE: Fechas (YYYY-MM-DD).
--   - DATETIME / TIMESTAMP: Fechas con hora exacta (YYYY-MM-DD HH:MM:SS).
--   - BOOLEAN / TINYINT(1): Verdadero (1) o Falso (0).


-- 3. CREACIÓN DE UNA TABLA CON RESTRICCIONES (CONSTRAINTS)
-- Eliminamos la tabla si ya existía para empezar desde cero y limpio:
DROP TABLE IF EXISTS productos;

CREATE TABLE productos (
    -- id: Identificador único de cada fila.
    -- INT: Tipo numérico entero.
    -- AUTO_INCREMENT: MySQL le suma 1 automáticamente a cada nuevo registro (1, 2, 3...).
    -- PRIMARY KEY: Llave Primaria (no puede haber dos filas con el mismo id ni puede ser nulo).
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- nombre: Nombre del producto.
    -- VARCHAR(100): Hasta 100 caracteres.
    -- NOT NULL: Obligatorio (no se permite dejarlo vacío).
    nombre VARCHAR(100) NOT NULL,

    -- codigo_barra: Código único del producto.
    -- UNIQUE: No permite que dos productos tengan el mismo código de barra.
    codigo_barra VARCHAR(50) NOT NULL UNIQUE,

    -- precio: Precio de venta.
    -- DECIMAL(10, 2): Hasta 10 dígitos en total, de los cuales 2 son decimales (ej: 1299.99).
    precio DECIMAL(10, 2) NOT NULL,

    -- stock: Cantidad disponible en almacén.
    -- DEFAULT 0: Si no se especifica stock al insertar, por defecto pondrá 0.
    stock INT NOT NULL DEFAULT 0,

    -- esta_activo: Indica si el producto está a la venta o descontinuado.
    esta_activo BOOLEAN NOT NULL DEFAULT TRUE,

    -- fecha_creacion: Registra la fecha y hora exacta en que se dio de alta.
    -- CURRENT_TIMESTAMP: MySQL toma la hora actual del servidor automáticamente.
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. VERIFICAR LA ESTRUCTURA DE LA TABLA CREADA
-- Muestra el diseño de columnas, tipos y restricciones:
DESCRIBE productos;
