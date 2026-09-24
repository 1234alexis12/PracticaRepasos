-- =============================================================================
-- LECCIÓN 08: SUBCONSULTAS, VISTAS (VIEWS) Y TRANSACCIONES (ACID)
-- =============================================================================
-- 
-- 1. Subconsultas: Consultas anidadas dentro de otra consulta mayor.
-- 2. Vistas (VIEW): Consultas guardadas como "tablas virtuales" para simplificar reportes.
-- 3. Transacciones: Operaciones atómicas ("todo o nada") indispensables para pagos y bancos.
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- 1. SUBCONSULTAS (SUBQUERIES)
-- =============================================================================

-- Encontrar los productos cuyo precio sea MAYOR al precio promedio de toda la tienda:
SELECT nombre, precio 
FROM productos 
WHERE precio > (
    SELECT AVG(precio) FROM productos -- Esta subconsulta calcula el promedio primero
);


-- =============================================================================
-- 2. VISTAS (VIEWS) - TABLAS VIRTUALES
-- =============================================================================
-- Una vista guarda la lógica de una consulta compleja con un nombre sencillo.
-- No duplica datos físicos, sino que ejecuta la consulta en tiempo real al consultarla.

CREATE OR REPLACE VIEW vista_resumen_pedidos AS
SELECT 
    p.id AS pedido_id,
    c.nombre AS cliente,
    c.email,
    pr.nombre AS producto,
    p.cantidad,
    pr.precio,
    (p.cantidad * pr.precio) AS total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
INNER JOIN productos pr ON p.producto_id = pr.id;

-- Ahora cualquier desarrollador o reporte puede consultarla como si fuera una tabla normal:
SELECT * FROM vista_resumen_pedidos WHERE total > 100.00;


-- =============================================================================
-- 3. TRANSACCIONES ACID (START TRANSACTION, COMMIT, ROLLBACK)
-- =============================================================================
-- Imagina que ocurre una compra:
-- Paso 1: Reducir stock del producto.
-- Paso 2: Crear el pedido en la tabla de pedidos.
-- Si la base de datos se apaga o falla a la mitad, ¡el dinero o el stock quedarían corruptos!
-- Una transacción asegura que si algo falla, TODO se cancela (`ROLLBACK`), y si todo sale bien, se guarda permanentemente (`COMMIT`).

START TRANSACTION;

-- Paso A: Descontamos 1 unidad de stock del producto 1
UPDATE productos 
SET stock = stock - 1 
WHERE id = 1;

-- Paso B: Registramos el nuevo pedido para el cliente 3
INSERT INTO pedidos (cliente_id, producto_id, cantidad) 
VALUES (3, 1, 1);

-- Si todo salió perfecto, confirmamos y aplicamos los cambios a la base de datos:
COMMIT;

-- Si hubiera ocurrido un fallo, habríamos ejecutado:
-- ROLLBACK; -- Cancela todos los cambios realizados desde START TRANSACTION como si nada hubiera pasado.
