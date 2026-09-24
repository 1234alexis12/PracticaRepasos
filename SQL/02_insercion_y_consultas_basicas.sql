-- =============================================================================
-- LECCIÓN 02: INSERCIÓN DE DATOS Y CONSULTAS BÁSICAS (DML)
-- =============================================================================

USE tienda_tecnologia;

-- =============================================================================
-- 1. INSERTAR DATOS (INSERT INTO)
-- =============================================================================
-- Sintaxis: INSERT INTO nombre_tabla (columna1, columna2, ...) VALUES (valor1, valor2, ...);

-- A) Insertar un solo producto:
INSERT INTO productos (nombre, codigo_barra, precio, stock, esta_activo)
VALUES ('Teclado Mecánico RGB', 'TEC-001', 89.99, 15, TRUE);

-- B) Inserción Múltiple (Insertar varios productos en una sola sentencia más rápido):
INSERT INTO productos (nombre, codigo_barra, precio, stock, esta_activo)
VALUES 
    ('Mouse Inalámbrico Ergonómico', 'MOU-002', 45.50, 25, TRUE),
    ('Monitor 27 Pulgadas 144Hz',    'MON-003', 249.99, 8,  TRUE),
    ('Auriculares Bluetooth Pro',    'AUD-004', 79.90, 0,   FALSE),
    ('Webcam Full HD 1080p',         'CAM-005', 55.00, 12, TRUE),
    ('Silla Gamer Ergonómica',       'SIL-006', 180.00, 4,  TRUE);


-- =============================================================================
-- 2. CONSULTAS BÁSICAS (SELECT)
-- =============================================================================

-- A) Consultar ABSOLUTAMENTE TODAS las columnas y filas:
-- El asterisco (*) significa "todas las columnas".
SELECT * FROM productos;

-- B) Consultar ÚNICAMENTE columnas específicas (Buena práctica para optimizar velocidad y memoria):
SELECT nombre, precio, stock FROM productos;

-- C) Usar Alias de Columnas con 'AS' (Renombra la columna en el resultado para mayor claridad):
SELECT 
    nombre AS producto,
    precio AS precio_unitario,
    (precio * 1.16) AS precio_con_iva
FROM productos;

-- D) Eliminar valores duplicados en el resultado con 'DISTINCT':
-- Si hubiera varios productos con el mismo precio, solo mostrará una fila por cada precio único.
SELECT DISTINCT precio FROM productos;
