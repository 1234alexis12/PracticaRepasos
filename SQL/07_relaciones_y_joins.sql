-- =============================================================================
-- LECCIÓN 07: RELACIONES ENTRE TABLAS Y CONSULTAS CON JOINS
-- =============================================================================
-- 
-- El verdadero poder de las bases de datos "relacionales" es vincular
-- diferentes tablas entre sí mediante Llaves Foráneas (FOREIGN KEY) para
-- no duplicar información y mantener la integridad de los datos.
-- =============================================================================

USE tienda_tecnologia;

-- 1. CREAMOS UNA TABLA DE 'CLIENTES' Y UNA DE 'PEDIDOS'
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    ciudad VARCHAR(50) NOT NULL
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL, -- Hace referencia al 'id' de la tabla 'clientes'
    producto_id INT NOT NULL, -- Hace referencia al 'id' de la tabla 'productos'
    cantidad INT NOT NULL DEFAULT 1,
    fecha_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Restricción de Llave Foránea (Integridad Referencial):
    -- Si intentas crear un pedido con un cliente_id que no existe, MySQL rechazará la operación.
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);


-- 2. INSERTAMOS DATOS DE PRUEBA
INSERT INTO clientes (nombre, email, ciudad) VALUES
    ('Alexis García', 'alexis@ejemplo.com', 'Madrid'),
    ('Beatriz López', 'beatriz@ejemplo.com', 'Barcelona'),
    ('Carlos Ruiz',   'carlos@ejemplo.com',  'Valencia');

INSERT INTO pedidos (cliente_id, producto_id, cantidad) VALUES
    (1, 1, 2), -- Alexis compró 2 Teclados
    (1, 2, 1), -- Alexis compró 1 Mouse
    (2, 3, 1); -- Beatriz compró 1 Monitor
    -- Carlos Ruiz aún no ha hecho ninguna compra.


-- =============================================================================
-- 3. TIPOS DE JOINS (CRUCE DE TABLAS)
-- =============================================================================

-- A) INNER JOIN (Intersección):
-- Muestra ÚNICAMENTE las filas que tienen coincidencia en AMBAS tablas.
-- (No muestra a Carlos porque Carlos no tiene pedidos).
SELECT 
    pedidos.id AS num_pedido,
    clientes.nombre AS cliente,
    productos.nombre AS producto,
    pedidos.cantidad,
    productos.precio,
    (pedidos.cantidad * productos.precio) AS total_a_pagar
FROM pedidos
INNER JOIN clientes ON pedidos.cliente_id = clientes.id
INNER JOIN productos ON pedidos.producto_id = productos.id;


-- B) LEFT JOIN (Todo lo de la izquierda + coincidencias de la derecha):
-- Muestra a TODOS los clientes sin importar si han comprado algo o no.
-- Para Carlos, las columnas de pedido saldrán con valor 'NULL'.
SELECT 
    clientes.nombre AS cliente,
    clientes.email,
    pedidos.id AS id_pedido,
    pedidos.cantidad
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;
