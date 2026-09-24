-- =============================================================================
-- LECCIÓN 04: ORDENAMIENTO (ORDER BY) Y LÍMITES (LIMIT / OFFSET)
-- =============================================================================
-- 
-- En esta lección aprenderás a:
-- 1. Ordenar los resultados alfabética o numéricamente (ascendente o descendente).
-- 2. Limitar el número de filas mostradas (ideal para TOP 5 o paginación web).
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- 1. CLÁUSULA 'ORDER BY' (ORDENAMIENTO)
-- =============================================================================
-- ASC  (Ascendente: de menor a mayor / de A a Z). Es la opción por defecto.
-- DESC (Descendente: de mayor a menor / de Z a A).

-- A) Ordenar productos del más barato al más caro (Ascendente):
SELECT nombre, precio 
FROM productos 
ORDER BY precio ASC;

-- B) Ordenar productos del más caro al más barato (Descendente):
SELECT nombre, precio 
FROM productos 
ORDER BY precio DESC;

-- C) Ordenar alfabéticamente por nombre:
SELECT nombre, stock 
FROM productos 
ORDER BY nombre ASC;

-- D) Ordenamiento por múltiples columnas:
-- Primero ordena por 'esta_activo' (activos primero) y luego por 'precio' descendente:
SELECT nombre, esta_activo, precio 
FROM productos 
ORDER BY esta_activo DESC, precio DESC;


-- =============================================================================
-- 2. CLÁUSULA 'LIMIT' Y 'OFFSET' (LÍMITE Y PAGINACIÓN)
-- =============================================================================

-- A) Obtener el "Top 3" de productos más caros de la tienda:
SELECT nombre, precio 
FROM productos 
ORDER BY precio DESC 
LIMIT 3;

-- B) Paginación de resultados: LIMIT [cantidad] OFFSET [desplazamiento]
-- Supón que en tu tienda muestras 2 productos por página:

-- Página 1 (Los primeros 2 productos):
SELECT id, nombre, precio 
FROM productos 
ORDER BY id ASC 
LIMIT 2 OFFSET 0;

-- Página 2 (Saltar los primeros 2 y mostrar los siguientes 2):
SELECT id, nombre, precio 
FROM productos 
ORDER BY id ASC 
LIMIT 2 OFFSET 2;

-- Forma abreviada en MySQL: LIMIT [offset], [cantidad]
-- Equivale a: saltar 4 filas y traer las siguientes 2 (Página 3)
SELECT id, nombre, precio 
FROM productos 
ORDER BY id ASC 
LIMIT 4, 2;
