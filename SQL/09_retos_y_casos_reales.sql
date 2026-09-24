-- =============================================================================
-- LECCIÓN 09: RETOS Y CASOS REALES DE NEGOCIO EN SQL / MYSQL
-- =============================================================================
-- "A consultar bases de datos se aprende resolviendo problemas reales de negocio."
-- 
-- Aquí tienes 4 retos reales de analítica para un e-commerce.
-- Intenta escribir la consulta por tu cuenta antes de revisar la solución comentada.
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- RETO 1: ALERTA DE REABASTECIMIENTO DE INVENTARIO
-- =============================================================================
-- PROBLEMA DE NEGOCIO:
-- El gerente del almacén necesita un reporte urgente con los nombres, códigos y stock
-- de todos los productos activos que tengan MENOS de 10 unidades en stock,
-- ordenados del que tiene menor inventario al que tiene más.

-- 👇 Tu consulta aquí:
SELECT 
    nombre, 
    codigo_barra, 
    stock 
FROM productos 
WHERE esta_activo = TRUE AND stock < 10 
ORDER BY stock ASC;


-- =============================================================================
-- RETO 2: REPORTE DE FACTURACIÓN TOTAL POR CLIENTE (CON JOINS Y AGREGACIONES)
-- =============================================================================
-- PROBLEMA DE NEGOCIO:
-- El departamento de contabilidad necesita saber cuánto dinero total ha gastado cada cliente.
-- Debe mostrar: Nombre del cliente, Correo y Total Gastado ($), ordenado del mayor comprador al menor.

-- 👇 Tu consulta aquí:
SELECT 
    c.nombre AS cliente,
    c.email,
    SUM(p.cantidad * pr.precio) AS total_gastado
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
INNER JOIN productos pr ON p.producto_id = pr.id
GROUP BY c.id, c.nombre, c.email
ORDER BY total_gastado DESC;


-- =============================================================================
-- RETO 3: DETECTAR CLIENTES INACTIVOS (SIN COMPRAS)
-- =============================================================================
-- PROBLEMA DE NEGOCIO:
-- El equipo de Marketing quiere enviar un cupón de descuento a los usuarios
-- registrados que NUNCA han realizado ningún pedido.

-- 👇 Tu consulta aquí (usando LEFT JOIN y buscando pedidos nulos):
SELECT 
    c.id,
    c.nombre,
    c.email,
    c.ciudad
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;


-- =============================================================================
-- RETO 4: CATEGORIZAR PRODUCTOS POR GAMA DE PRECIO CON 'CASE'
-- =============================================================================
-- PROBLEMA DE NEGOCIO:
-- Crear una columna calculada llamada 'gama' que etiquete:
-- - Menos de $50 -> 'Económico'
-- - Entre $50 y $150 -> 'Gama Media'
-- - Más de $150 -> 'Gama Alta / Premium'

-- 👇 Tu consulta aquí:
SELECT 
    nombre,
    precio,
    CASE 
        WHEN precio < 50.00 THEN 'Económico'
        WHEN precio BETWEEN 50.00 AND 150.00 THEN 'Gama Media'
        ELSE 'Gama Alta / Premium'
    END AS categoria_gama
FROM productos
ORDER BY precio DESC;
