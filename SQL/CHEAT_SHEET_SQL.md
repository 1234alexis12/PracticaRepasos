# ⚡ Chuleta Rápida de SQL (Cheat Sheet)

> *Referencia rápida con la sintaxis esencial de DDL, DML, filtros, agrupaciones y cruces en SQL.*

---

## 📑 Tabla de Contenidos Rápida
1. [Definición de Datos (DDL)](#1-definici%C3%B3n-de-datos-ddl)
2. [Manipulación de Datos (DML)](#2-manipulaci%C3%B3n-de-datos-dml)
3. [Consultas y Filtros (`WHERE`)](#3-consultas-y-filtros-where)
4. [Orden y Paginación](#4-orden-y-paginaci%C3%B3n)
5. [Funciones de Agregación y `GROUP BY`](#5-funciones-de-agregaci%C3%B3n-y-group-by)
6. [JOINs (Cruces de Tablas)](#6-joins-cruces-de-tablas)
7. [Subconsultas y Cláusula `IN` / `EXISTS`](#7-subconsultas-y-cl%C3%A1usula-in--exists)
8. [Estructura Condicional (`CASE`)](#8-estructura-condicional-case)
9. [Transacciones](#9-transacciones)
10. [Mantenimiento y Rendimiento](#10-mantenimiento-y-rendimiento)

---

### 1. Definición de Datos (DDL)
```sql
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tienda_online CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_online;

-- Crear tabla con restricciones
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    edad TINYINT UNSIGNED,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modificar tabla
ALTER TABLE usuarios ADD COLUMN activo BOOLEAN DEFAULT TRUE;
ALTER TABLE usuarios DROP COLUMN edad;
```

---

### 2. Manipulación de Datos (DML)
```sql
-- Insertar un registro
INSERT INTO usuarios (nombre, email) 
VALUES ('Alexis', 'alexis@correo.com');

-- Insertar múltiples registros de golpe
INSERT INTO usuarios (nombre, email) VALUES 
('Lucía', 'lucia@correo.com'),
('Carlos', 'carlos@correo.com');

-- Actualizar (¡SIEMPRE CON WHERE!)
UPDATE usuarios 
SET activo = FALSE 
WHERE id = 3;

-- Eliminar fila (¡SIEMPRE CON WHERE!)
DELETE FROM usuarios 
WHERE id = 3;

-- Vaciar tabla completa rápidamente
TRUNCATE TABLE usuarios;
```

---

### 3. Consultas y Filtros (`WHERE`)
```sql
-- Consulta básica con alias y filtro
SELECT nombre AS cliente, email 
FROM usuarios 
WHERE activo = TRUE;

-- Operadores de comparación y lógicos
SELECT * FROM productos 
WHERE precio >= 100 AND stock > 0;

-- Rango (BETWEEN) y Lista de valores (IN)
SELECT * FROM productos WHERE precio BETWEEN 50 AND 200;
SELECT * FROM usuarios WHERE pais IN ('PE', 'MX', 'CO');

-- Búsqueda por patrón de texto (LIKE)
SELECT * FROM clientes WHERE nombre LIKE 'A%';     -- Empieza con A
SELECT * FROM clientes WHERE email LIKE '%@gmail%'; -- Contiene @gmail
```

---

### 4. Orden y Paginación
```sql
-- Ordenar por precio descendente y nombre ascendente
SELECT * FROM productos 
ORDER BY precio DESC, nombre ASC;

-- Paginación (Página 2, 10 elementos por página: LIMIT 10 OFFSET 10)
SELECT * FROM productos 
ORDER BY id ASC 
LIMIT 10 OFFSET 10;
```

---

### 5. Funciones de Agregación y `GROUP BY`
```sql
-- Conteo, suma, promedio, mínimo y máximo
SELECT 
    categoria,
    COUNT(*) AS total_articulos,
    AVG(precio) AS precio_promedio,
    MIN(precio) AS precio_minimo,
    MAX(precio) AS precio_maximo,
    SUM(stock) AS inventario_total
FROM productos
GROUP BY categoria
HAVING COUNT(*) >= 5; -- Filtra solo categorías con 5 o más productos
```

---

### 6. JOINs (Cruces de Tablas)
```sql
-- INNER JOIN (Solo coincidencias)
SELECT p.id, p.fecha, c.nombre 
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id;

-- LEFT JOIN (Todos los clientes, tengan o no pedidos)
SELECT c.nombre, COUNT(p.id) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre;
```

---

### 7. Subconsultas y Cláusula `IN` / `EXISTS`
```sql
-- Obtener los productos con precio mayor al precio promedio general
SELECT nombre, precio 
FROM productos 
WHERE precio > (SELECT AVG(precio) FROM productos);

-- Clientes que han realizado al menos un pedido
SELECT * FROM clientes c
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);
```

---

### 8. Estructura Condicional (`CASE`)
```sql
SELECT 
    nombre, 
    stock,
    CASE 
        WHEN stock = 0 THEN 'Agotado ❌'
        WHEN stock < 10 THEN 'Stock Bajo ⚠️'
        ELSE 'Disponible ✅'
    END AS estado_inventario
FROM productos;
```

---

### 9. Transacciones
```sql
START TRANSACTION;

UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;

-- Si todo está OK:
COMMIT;

-- Si algo falló:
-- ROLLBACK;
```

---

### 10. Mantenimiento y Rendimiento
```sql
-- Crear índice para acelerar consultas por email
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Analizar plan de ejecución de la consulta
EXPLAIN SELECT * FROM usuarios WHERE email = 'alexis@correo.com';

-- Eliminar índice
DROP INDEX idx_usuarios_email ON usuarios;
```
