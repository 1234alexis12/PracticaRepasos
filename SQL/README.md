# 🐬 Guía Maestra de SQL y MySQL: De Cero a Arquitecto de Datos

> *"El código va y viene, pero los datos de una empresa son su activo más valioso e insustituible. Quien sabe diseñar y consultar bases de datos eficientes, domina el corazón de cualquier sistema."* — *Tu Profesor de Programación*

---

## 📚 Índice de Contenidos
1. [El Modelo Mental Relacional y Diseño de Tablas](#-el-modelo-mental-relacional)
2. [Normalización de Datos: 1FN, 2FN y 3FN con Ejemplos Reales](#-normalizaci%C3%B3n-de-bases-de-datos)
3. [El Orden Real de Ejecución de una Consulta SQL](#-el-orden-real-de-ejecuci%C3%B3n-de-una-consulta)
4. [La Guía Visual Definitiva de los JOINs](#-gu%C3%ADa-visual-de-los-joins)
5. [Agrupaciones y el Dilema: `WHERE` vs `HAVING`](#-agrupaciones-group-by-y-having)
6. [Subconsultas, Vistas y Tablas Temporales](#-subconsultas-y-vistas)
7. [Transacciones Seguras y Principios ACID](#-transacciones-y-principios-acid)
8. [Índices B-Tree y Optimización con `EXPLAIN`](#-optimización-e-índices-b-tree)
9. [Los 10 Errores Fatales en SQL (¡Salva tu Empleo!)](#-los-10-errores-fatales-en-sql)
10. [Mapa de Lecciones Prácticas en esta Carpeta](#-mapa-de-lecciones-pr%C3%A1cticas-en-esta-carpeta)

---

## 🧠 El Modelo Mental Relacional

Una Base de Datos Relacional organiza la información en **Tablas bidimensionales (Entidades)** conectadas mediante **Claves (Relaciones)**:

```
[ TABLA: clientes ]                      [ TABLA: pedidos ]
+----+---------+-------------------+     +----+------------+------------+--------+
| id | nombre  | email             |     | id | cliente_id | fecha      | total  |
+----+---------+-------------------+     +----+------------+------------+--------+
| 1  | Alexis  | alexis@correo.com |<----+--| 101| 1          | 2026-09-20 | 250.00 |
| 2  | Carlos  | carlos@correo.com |     | 102| 1          | 2026-09-22 | 80.00  |
+----+---------+-------------------+     | 103| 2          | 2026-09-24 | 1200.00|
   ^                                     +----+------------+------------+--------+
   | (PRIMARY KEY)                                  | (FOREIGN KEY)
```

- 🔑 **PRIMARY KEY (Clave Primaria):** Identificador único e irrepetible para cada fila (ej. `id`, DNI, UUID).
- 🔗 **FOREIGN KEY (Clave Foránea):** Columna que hace referencia a la clave primaria de otra tabla, garantizando la **Integridad Referencial**.

---

## 📐 Normalización de Bases de Datos

La normalización elimina la **redundancia de datos** y evita anomalías al insertar, actualizar o eliminar registros:

```
[ BASE DE DATOS SIN NORMALIZAR (Un caos con datos repetidos) ]
| id_venta | cliente | direccion | productos_comprados (malo!) | total |

                             ⬇️ APLICANDO 1FN, 2FN y 3FN ⬇️

[ 1FN: Atomicidad ] -> Cada columna almacena un solo valor atómico (sin listas separadas por comas).
[ 2FN: Dependencia Total ] -> Todos los atributos dependen de la clave primaria completa.
[ 3FN: Cero Dependencias Transitivas ] -> Ninguna columna no clave depende de otra columna no clave.
```

---

## ⚙️ El Orden Real de Ejecución de una Consulta

¿Sabías que el motor SQL **no** ejecuta el `SELECT` primero? Comprender este orden te evitará horas de frustración al usar alias:

```
[ ORDEN EN QUE ESCRIBES ]          [ ORDEN EN QUE EL MOTOR SQL LO EJECUTA ]
1. SELECT                          1. FROM & JOINs (Ubica y cruza las tablas)
2. FROM                            2. WHERE (Filtra filas individuales antes de agrupar)
3. WHERE                           3. GROUP BY (Agrupa filas en bloques)
4. GROUP BY                        4. HAVING (Filtra los grupos calculados)
5. HAVING                          5. SELECT (Elige y calcula las columnas)
6. ORDER BY                        6. DISTINCT (Elimina duplicados de la salida)
7. LIMIT                           7. ORDER BY (Ordena los resultados finales)
                                   8. LIMIT / OFFSET (Corta la cantidad de filas)
```

> 🚨 **Por qué falla esto:** `WHERE precio * 1.18 > 100 AS precio_igv` fallará en el `WHERE` porque el alias `precio_igv` se crea en el paso 5 (`SELECT`), ¡pero el filtro `WHERE` se ejecuta en el paso 2!

---

## 🔗 Guía Visual de los JOINs

```
       TABLA A (Izquierda)              TABLA B (Derecha)
          +-----------+                  +-----------+
          |     A     |      ( A ∩ B )   |     B     |
          +-----------+                  +-----------+

1. INNER JOIN:
   Devuelve ÚNICAMENTE las filas que tienen coincidencia en AMBAS tablas (la intersección).

2. LEFT JOIN (Left Outer Join):
   Devuelve TODAS las filas de la tabla izquierda (A), y los datos coincidentes de B.
   Si no hay coincidencia en B, rellena sus columnas con NULL.

3. RIGHT JOIN:
   Devuelve TODAS las filas de la tabla derecha (B), y los datos coincidentes de A.

4. FULL OUTER JOIN:
   Devuelve todas las filas de ambas tablas. Si no coinciden, rellena con NULL.
```

```sql
-- Ejemplo: Listar todos los clientes y sus pedidos (incluso si el cliente no ha comprado nada todavía)
SELECT 
    c.id AS cliente_id,
    c.nombre,
    p.id AS pedido_id,
    COALESCE(p.total, 0.00) AS total_pedido
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id;
```

---

## 📊 Agrupaciones: `GROUP BY` y `HAVING`

- **`WHERE`**: Filtra **filas individuales** antes de realizar cualquier cálculo de agregación (`COUNT`, `SUM`, `AVG`).
- **`HAVING`**: Filtra **los resultados agrupados** después de haber aplicado las funciones de agregación:

```sql
-- Queremos los clientes que hayan gastado más de $1,000 en total:
SELECT 
    cliente_id,
    COUNT(id) AS total_compras,
    SUM(monto) AS gasto_acumulado
FROM ventas
WHERE estado = 'COMPLETADO'     -- Filtro 1: Solo ventas completadas
GROUP BY cliente_id            -- Agrupamos por cliente
HAVING SUM(monto) > 1000       -- Filtro 2: Solo grupos cuyo total supere 1000
ORDER BY gasto_acumulado DESC;
```

---

## 🔒 Transacciones y Principios ACID

Una transacción es una unidad de trabajo indivisible. O se completa todo, o no se guarda nada:

- **A**tomicity (Atomicidad): Todo o nada.
- **C**onsistency (Consistencia): Respeta todas las reglas y restricciones de la BD.
- **I**solation (Aislamiento): Las transacciones concurrentes no interfieren entre sí.
- **D**urability (Durabilidad): Una vez confirmado (`COMMIT`), los datos sobreviven a apagones.

```sql
START TRANSACTION;

-- 1. Descontar saldo de la cuenta de origen
UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1;

-- 2. Acreditar saldo en la cuenta de destino
UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;

-- Si todo está correcto:
COMMIT;

-- Si ocurrió cualquier error en el camino:
-- ROLLBACK;
```

---

## ⚡ Optimización e Índices B-Tree

Cuando una tabla tiene millones de filas, un `SELECT * FROM usuarios WHERE email = 'test@correo.com'` sin índice obliga al motor a escanear el disco entero (**Full Table Scan** - $O(N)$).

Crear un índice crea una estructura en árbol balanceado (**B-Tree** - $O(\log N)$) que encuentra el registro en microsegundos:

```sql
-- Crear un índice para búsquedas instantáneas por correo:
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Analizar cómo ejecuta el motor la consulta:
EXPLAIN SELECT * FROM usuarios WHERE email = 'alexis@correo.com';
```

---

## ⚠️ Los 10 Errores Fatales en SQL

| # | Error Fatal | Forma Correcta | Peligro |
| :- | :--- | :--- | :--- |
| 1 | `UPDATE` o `DELETE` sin `WHERE` | SIEMPRE usar `WHERE id = ...` | **Modifica o borra TODA la base de datos de producción.** |
| 2 | Usar `SELECT *` en aplicaciones reales | Seleccionar solo columnas necesarias `SELECT id, nombre` | Desperdicia memoria RAM, ancho de banda de red y anula el uso de índices. |
| 3 | Inyección SQL (Concatenar strings en código) | Usar Prepared Statements / Parámetros | Permite a atacantes robar o destruir la base de datos completa. |
| 4 | Guardar contraseñas en texto plano | Guardar hashes seguros (Bcrypt, Argon2) | Fuga masiva de seguridad. |
| 5 | Guardar dinero en tipos `FLOAT` o `DOUBLE` | Usar `DECIMAL(10, 2)` o `NUMERIC` | Los tipos de coma flotante causan errores de redondeo de centavos. |
| 6 | No crear índices en columnas de `JOIN` y `WHERE` | Indexar Claves Foráneas y campos de búsqueda frecuente | Provoca bloqueos de servidor bajo tráfico medio/alto. |
| 7 | Guardar fechas como texto (`VARCHAR`) | Usar `DATE`, `DATETIME` o `TIMESTAMP` | Impide hacer comparaciones y cálculos temporales nativos. |
| 8 | Olvidar `AUTO_INCREMENT` en claves primarias numéricas | Asignar `id INT AUTO_INCREMENT PRIMARY KEY` | Falla al insertar registros concurrentes. |
| 9 | Confundir `COUNT(*)` con `COUNT(columna)` | Saber que `COUNT(columna)` ignora valores `NULL` | Reportes de conteo inexactos. |
| 10 | No realizar copias de seguridad periódicas (`mysqldump`) | Automatizar backups diarios en almacenamiento secundario | Pérdida irreparable ante fallos de hardware o humanos. |

---

## 🗺️ Mapa de Lecciones Prácticas en esta Carpeta

| Archivo | Nivel | Temas que aprenderás |
| :--- | :---: | :--- |
| **[`00_teoria_diseno_y_normalizacion.sql`](./00_teoria_diseno_y_normalizacion.sql)** | 🏛️ Arquitectura | Normalización (1FN, 2FN, 3FN), índices B-Tree, `EXPLAIN`, integridad referencial y ACID. |
| **[`01_bases_de_datos_y_tablas.sql`](./01_bases_de_datos_y_tablas.sql)** | 🟢 Básico | `CREATE DATABASE`, `CREATE TABLE`, tipos de datos (`INT`, `VARCHAR`, `DECIMAL`), `PRIMARY KEY`. |
| **[`02_insercion_y_consultas_basicas.sql`](./02_insercion_y_consultas_basicas.sql)** | 🟢 Básico | `INSERT INTO`, `SELECT`, alias `AS`, filtrado de duplicados con `DISTINCT`. |
| **[`03_filtrado_y_operadores.sql`](./03_filtrado_y_operadores.sql)** | 🟢 Básico | Cláusula `WHERE`, comparadores, operadores lógicos (`AND`, `OR`, `NOT`), `BETWEEN`, `IN`, `LIKE`. |
| **[`04_ordenamiento_y_limites.sql`](./04_ordenamiento_y_limites.sql)** | 🟡 Intermedio | `ORDER BY` (`ASC`/`DESC`), `LIMIT` y `OFFSET` para paginación de datos. |
| **[`05_funciones_de_agregacion_y_agrupamiento.sql`](./05_funciones_de_agregacion_y_agrupamiento.sql)** | 🟡 Intermedio | `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, `GROUP BY` y filtros con `HAVING`. |
| **[`06_actualizacion_y_eliminacion.sql`](./06_actualizacion_y_eliminacion.sql)** | 🟡 Intermedio | `UPDATE`, `DELETE`, `TRUNCATE` y uso seguro de condiciones. |
| **[`07_relaciones_y_joins.sql`](./07_relaciones_y_joins.sql)** | 🔴 Avanzado | `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, claves foráneas y consultas multitabla. |
| **[`08_subconsultas_vistas_y_transacciones.sql`](./08_subconsultas_vistas_y_transacciones.sql)** | 🔴 Avanzado | Subconsultas escalares y correlacionadas, Vistas (`VIEW`), transacciones seguras con `COMMIT`/`ROLLBACK`. |
| **[`09_retos_y_casos_reales.sql`](./09_retos_y_casos_reales.sql)** | 🏆 Casos Reales | Casos prácticos de negocio: Alertas de stock, métricas de retención de clientes y categorización con `CASE`. |

---

### 🚀 ¿Cómo ejecutar estos scripts?
- **En MySQL Workbench / DBeaver:** Abre cualquier archivo `.sql` y presiona <kbd>Ctrl + Enter</kbd> sobre las sentencias.
- **En Terminal MySQL:**
  ```sql
  source C:/Users/alexi/.../SQL/01_bases_de_datos_y_tablas.sql;
  ```
