-- =============================================================================
-- LECCIÓN 03: FILTRADO DE DATOS Y OPERADORES (CLÁUSULA WHERE)
-- =============================================================================
-- 
-- La cláusula WHERE filtra las filas para que solo se muestren aquellas
-- que cumplan una o más condiciones booleanas.
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- 1. OPERADORES DE COMPARACIÓN COMUNES
-- =============================================================================
-- =  (Igual)
-- != o <> (Diferente)
-- >  (Mayor que), < (Menor que), >= (Mayor o igual), <= (Menor o igual)

-- Productos con precio mayor a $80:
SELECT nombre, precio 
FROM productos 
WHERE precio > 80.00;

-- Productos que NO están activos:
SELECT nombre, esta_activo 
FROM productos 
WHERE esta_activo = FALSE;


-- =============================================================================
-- 2. OPERADORES LÓGICOS: AND, OR, NOT
-- =============================================================================

-- AND: Ambas condiciones deben cumplirse simultáneamente
-- Productos que cuesten menos de $100 Y que tengan más de 10 unidades en stock:
SELECT nombre, precio, stock 
FROM productos 
WHERE precio < 100.00 AND stock > 10;

-- OR: Basta con que se cumpla una de las dos condiciones
-- Productos que sean caros (> $200) O que tengan muy poco stock (< 5 unidades):
SELECT nombre, precio, stock 
FROM productos 
WHERE precio > 200.00 OR stock < 5;

-- NOT: Niega la condición
SELECT nombre, stock 
FROM productos 
WHERE NOT (stock = 0);


-- =============================================================================
-- 3. EL OPERADOR 'BETWEEN' (RANGOS DE VALORES INCLUSIVOS)
-- =============================================================================
-- Productos cuyo precio esté entre $50 y $150 (incluyendo 50 y 150):
SELECT nombre, precio 
FROM productos 
WHERE precio BETWEEN 50.00 AND 150.00;


-- =============================================================================
-- 4. EL OPERADOR 'IN' (LISTA DE VALORES COINCIDENTES)
-- =============================================================================
-- Busca productos cuyos códigos de barra coincidan exactamente con alguno de la lista:
SELECT nombre, codigo_barra 
FROM productos 
WHERE codigo_barra IN ('TEC-001', 'CAM-005', 'SIL-006');


-- =============================================================================
-- 5. EL OPERADOR 'LIKE' (BÚSQUEDA DE TEXTO CON COMODINES)
-- =============================================================================
-- %  -> Representa cero, uno o muchos caracteres cualesquiera.
-- _  -> Representa exactamente UN solo carácter.

-- A) Productos cuyo nombre EMPIECE con 'M':
SELECT nombre FROM productos WHERE nombre LIKE 'M%';

-- B) Productos cuyo nombre CONTENGA la palabra 'Ergonómico' en cualquier parte:
SELECT nombre FROM productos WHERE nombre LIKE '%Ergonómico%';

-- C) Productos cuyo código termine en '001':
SELECT nombre, codigo_barra FROM productos WHERE codigo_barra LIKE '%001';
