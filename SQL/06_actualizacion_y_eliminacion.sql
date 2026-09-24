-- =============================================================================
-- LECCIÓN 06: ACTUALIZACIÓN Y ELIMINACIÓN DE REGISTROS (UPDATE Y DELETE)
-- =============================================================================
-- 
-- ⚠️ ¡ADVERTENCIA DE SEGURIDAD EN BASES DE DATOS! ⚠️
-- 
-- Si ejecutas un 'UPDATE' o 'DELETE' SIN la cláusula 'WHERE',
-- ¡MODIFICARÁS O BORRARÁS TODAS LAS FILAS DE LA TABLA!
-- 
-- Siempre revisa dos veces el 'WHERE' antes de ejecutar estas sentencias.
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- 1. ACTUALIZAR REGISTROS (UPDATE ... SET ... WHERE)
-- =============================================================================

-- A) Actualizar el precio y stock de un producto específico por su ID:
UPDATE productos
SET 
    precio = 79.99,
    stock = 20
WHERE id = 1;

-- B) Incrementar el precio un 10% a todos los productos que cuesten menos de $50:
UPDATE productos
SET precio = precio * 1.10
WHERE precio < 50.00;

-- C) Activar todos los productos que tengan más de 0 unidades en inventario:
UPDATE productos
SET esta_activo = TRUE
WHERE stock > 0;

-- Verificamos los cambios:
SELECT id, nombre, precio, stock, esta_activo FROM productos;


-- =============================================================================
-- 2. ELIMINAR REGISTROS (DELETE FROM ... WHERE)
-- =============================================================================

-- A) Eliminar un producto específico por su código de barra:
DELETE FROM productos
WHERE codigo_barra = 'AUD-004';

-- B) Eliminar productos descontinuados con stock en cero:
DELETE FROM productos
WHERE esta_activo = FALSE AND stock = 0;


-- =============================================================================
-- 3. VACIAR UNA TABLA COMPLETA: 'TRUNCATE TABLE' VS 'DELETE'
-- =============================================================================
-- - DELETE FROM tabla; -> Borra fila por fila lentamente y mantiene el contador AUTO_INCREMENT.
-- - TRUNCATE TABLE tabla; -> Destruye y recrea la tabla al instante, reiniciando el AUTO_INCREMENT a 1.
-- (No lo ejecutaremos aquí para no perder nuestros datos de prueba).
-- TRUNCATE TABLE productos;
