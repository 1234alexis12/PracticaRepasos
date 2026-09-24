-- =============================================================================
-- LECCIÓN 05: FUNCIONES DE AGREGACIÓN Y AGRUPAMIENTO (GROUP BY Y HAVING)
-- =============================================================================
-- 
-- Las funciones de agregación toman un conjunto de filas y devuelven UN SOLO resultado:
--   - COUNT(): Cuenta el número total de filas.
--   - SUM(): Suma los valores numéricos.
--   - AVG(): Calcula el promedio aritmético.
--   - MIN(): Obtiene el valor más pequeño.
--   - MAX(): Obtiene el valor más grande.
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- 1. FUNCIONES DE AGREGACIÓN GLOBALES
-- =============================================================================

SELECT 
    COUNT(*)                AS total_productos,
    SUM(stock)              AS total_unidades_inventario,
    AVG(precio)             AS precio_promedio,
    MIN(precio)             AS producto_mas_barato,
    MAX(precio)             AS producto_mas_caro
FROM productos;


-- =============================================================================
-- 2. CLÁUSULA 'GROUP BY' (AGRUPAMIENTO DE DATOS)
-- =============================================================================
-- Agrupa filas que tienen valores idénticos en columnas específicas para
-- calcular estadísticas por categoría, estado, proveedor, etc.

-- Contar cuántos productos están activos vs cuántos están inactivos:
SELECT 
    esta_activo,
    COUNT(*) AS cantidad_productos,
    AVG(precio) AS precio_promedio
FROM productos 
GROUP BY esta_activo;


-- =============================================================================
-- 3. DIFERENCIA CRUCIAL ENTRE 'WHERE' Y 'HAVING'
-- =============================================================================
-- REGLA DE ORO:
-- - 'WHERE' filtra filas INDIVIDUALES ANTES de hacer el agrupamiento.
-- - 'HAVING' filtra GRUPOS ENTEROS DESPUÉS de que se hayan calculado las funciones de agregación.

-- Ejemplo: Agrupar por estado 'esta_activo', pero SOLO mostrar aquellos grupos
-- donde la cantidad de productos sea mayor a 2:
SELECT 
    esta_activo,
    COUNT(*) AS total_en_grupo,
    SUM(stock) AS stock_total
FROM productos 
GROUP BY esta_activo 
HAVING COUNT(*) > 2;
