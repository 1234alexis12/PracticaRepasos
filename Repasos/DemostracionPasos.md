# 📘 GUÍA DE DEMOSTRACIÓN Y SUSTENTACIÓN PASO A PASO
## Sistema Web: SUMAQ SPA — Curso Integrador II (Semana 07)

> **Ubicación:** `C:\Users\alexi\Downloads\DemostracionPasos.md`  
> **Propósito:** Guía práctica con palabras sencillas, comandos exactos de copiar y pegar, y explicaciones claras para realizar cada prueba en vivo y responder con éxito ante el docente.

---

## 🧭 MAPA RÁPIDO DE LOS 5 PUNTOS DE LA EVALUACIÓN

```
1. LISTA DE RIESGOS DEFINIDOS        ➡️ ¿Qué cosas malas amenazan al spa? (Técnicas y Humanas).
2. IMPLEMENTACIÓN DE CONTROLES       ➡️ ¿Qué candados, alarmas y extintores pusimos?
3. LISTA DE ATAQUES                  ➡️ ¿Cómo intentaría un hacker atacarnos? (Los 6 de OWASP).
4. ESTRATEGIA DE SEGURIDAD           ➡️ ¿Cómo protegemos las llaves, roles y contraseñas?
5. ESTRATEGIA DE DEFENSA EN VIVO     ➡️ Demostración con pruebas automatizadas (pytest) y monitor.
```

---

# 1️⃣ PASO 1: LISTA DE RIESGOS DEFINIDOS

### 💡 ¿Cómo explicarlo con palabras sencillas?
> *"Profesor, un riesgo es cualquier peligro que pueda hacer que el spa pierda dinero, que la web se caiga o que se revelen diagnósticos médicos privados de los pacientes. Siguiendo la norma ISO 27005 y los requerimientos de la UTP, los dividimos en dos grupos: lo que puede fallarle al software/hardware (Técnicos) y los descuidos de las personas (Humanos)."*

---

### A. Riesgos Técnicos (Fallas de Software o Servidores)
1. **Inyección SQL (RT01):** Un atacante escribe comandos SQL maliciosos en la caja de búsqueda de DNI para vaciar la base de datos.
2. **Doble Reserva / Concurrencia (RT02):** Dos clientes hacen clic en "Reservar" en el mismo segundo y se les asigna la misma cabina física.
3. **Saturación / DoS (RT03):** Cientos de personas entrando a la vez por una promoción del Día de la Madre y saturando la memoria de MySQL.
4. **Falla del Nodo de Base de Datos (RT04):** El disco duro del servidor se malogra o el servicio MySQL principal se apaga.
5. **Inyección XSS (RT05):** Inserción de código JavaScript maligno en las observaciones dérmicas del paciente.
6. **Quiebre de Stock BOM (RT06):** Cobrar un masaje cuando ya no queda crema ni aceite en el almacén.
7. **Intercepción MitM (RT07):** Que un espía capture contraseñas en la red Wi-Fi del spa.
8. **Fuga de Secretos en Git (RT08):** Subir accidentalmente el archivo `.env` con las contraseñas a GitHub público.
9. **Acceso a Objetos Rotos / IDOR (RT09):** Cambiar el número de cita en la URL (`/citas/24/` por `/citas/25/`) para ver fichas de otros pacientes.
10. **Subida de Archivos Maliciosos (RT10):** Subir un archivo ejecutable `.exe` camuflado como foto de perfil.
11. **Librerías Obsoletas (RT11):** Paquetes de software desactualizados con vulnerabilidades conocidas (CVE).

---

### B. Riesgos Humanos (Descuidos o Errores del Personal)
1. **Fuerza Bruta / Claves Débiles (RH01):** Empleados que usan contraseñas predecibles (`123456`, `admin`).
2. **Curiosidad Indebida (RH02):** Una recepcionista revisando diagnósticos de piel privados de clientas sin permiso médico.
3. **Sesión Desatendida (RH03):** La recepcionista deja la pantalla de administración abierta y se va a almorzar.
4. **Descuadre en Caja POS (RH04):** Cobran en efectivo y no registran el movimiento en el sistema.
5. **Comando Destructivo (RH05):** Un programador ejecuta accidentalmente `DROP TABLE` en la base de datos real.
6. **Ingeniería Social / Phishing (RH06):** Llamadas engañosas a la recepcionista para sacarle contraseñas. *(Medida humana: Capacitación)*.
7. **Fuga Interna de Clientes (RH07):** Un empleado vendiendo la lista de clientes a la competencia. *(Medida legal: Ley N° 29733 y NDA)*.
8. **Cuentas Compartidas (RH08):** Dos terapeutas usando la misma cuenta para ahorrarse el login. *(Medida humana: Cuentas nominativas obligatorias)*.
9. **Olvido de Respaldos (RH09):** El encargado de TI olvida sacar copias de seguridad. *(Medida humana/operativa: Tarea programada en Windows)*.

---

# 2️⃣ PASO 2: IMPLEMENTACIÓN DE CONTROLES DEFINIDOS

### 💡 La analogía de los 3 controles:
```
🛡️ PREVENTIVOS  ➡️ El candado (Evita que el problema ocurra).
🔍 DETECTIVOS    ➡️ La alarma  (Te avisa en tiempo real cuando algo anda mal).
🔄 CORRECTIVOS   ➡️ El extintor (Apaga el fuego y recupera los datos si algo falló).
```

---

### 🧪 Cómo demostrar cada control en vivo ante el profesor:

#### 1. Demostrar Controles Preventivos:
* **Candado 1 (Anti-Doble Reserva):** Abre el archivo `backend/apps/appointments/services.py` y muestra las líneas 115-125 con `select_for_update()` y `@transaction.atomic`.
  * *Explicación:* Bloquea la fila del horario por una fracción de segundo para que nadie más pueda meterse en el mismo turno.
* **Candado 2 (Cierre de Sesión por Inactividad de 5 Minutos):** Abre `frontend/src/contexts/AuthContext.tsx` y muestra el `useEffect` con `INACTIVITY_LIMIT_MS = 5 * 60 * 1000`.
  * *Explicación:* Si la recepcionista no mueve el mouse ni toca el teclado durante 5 minutos, la sesión se cierra sola automáticamente para evitar curiosos.
* **Candado 3 (Throttling / Freno de Intentos):** Abre `backend/config/settings.py` y muestra `DEFAULT_THROTTLE_RATES = {'anon': '30/minute', 'user': '120/minute'}`.
  * *Explicación:* Si un robot intenta meter 50 claves en un segundo, Django lo frena en seco.

#### 2. Demostrar Controles Detectivos (La alarma en vivo):
Abre una terminal y corre:
```bash
python admin_tools/monitor_db.py
```
* **Lo que verás en pantalla:**
  ```text
  Diagnóstico de base de datos (root@127.0.0.1:3307/sumaq_spa)
  [ok] Conexión establecida (41.05 ms)
  Métricas InnoDB:
    Buffer Pool Hit Ratio: 97.2%
    Conexiones activas: 3
  Integridad estructural (CHECK TABLE):
    citas: OK
    usuarios: OK
    movimientos_caja: OK
  Alertas de stock:
    [ok] Insumos por encima del umbral mínimo.
  ```
* *Qué decirle al profesor:* *"Este monitor detectivo mide la velocidad de respuesta en milisegundos, verifica que ninguna tabla esté corrupta (`OK`) y nos alerta en amarillo si el stock de cremas cae por debajo de 5 unidades."*

#### 3. Demostrar Controles Correctivos (El extintor):
* **Replicación Master-Slave:** Muestra `backend/replication/setup_replication.sql`. Si el servidor del puerto `3306` se quema, la réplica en el puerto `3307` toma el control en menos de 5 minutos.
* **Backups Automáticos:** Muestra `admin_tools/backup_db.bat`. Crea volcados completos de MySQL bajo el estándar **3-2-1** con purga automática de copias viejas.
* **Rollback de Inventario:** Si un paciente va a atenderse pero el stock de cremas se acabó en ese instante, el sistema revierte la cita para no dejar datos inconsistentes.

---

# 3️⃣ PASO 3: LISTA DE ATAQUES (OWASP TOP 10)

| Ataque | ¿Qué intenta el atacante? | Ejemplo de la Vida Real | Cómo lo defiende SUMAQ SPA |
| :--- | :--- | :--- | :--- |
| **1. SQL Injection** | Escribe `' OR 1=1 --` en el buscador de DNI para engañar a la BD y sacar contraseñas. | Pedir una orden con una frase trampa que confunde al mozo para que te dé comida gratis. | **Django ORM** usa consultas parametrizadas precompiladas. El texto trampa se trata como simple texto inofensivo. |
| **2. Cross-Site Scripting (XSS)** | Mete código `<script>` en las notas de evolución para que se ejecute en la pantalla del doctor. | Dejar una carta con polvo urticante en el buzón que afecta a quien la abra. | **React 19 JSX** escapa automáticamente cualquier etiqueta antes de pintarla en la pantalla. |
| **3. Fuerza Bruta** | Un robot envía 10,000 contraseñas por minuto hasta acertar la clave del administrador. | Un ladrón probando todas las llaves de un llavero gigante hasta abrir la puerta. | Hashing **PBKDF2_SHA256** (600,000 vueltas criptográficas) + **Throttling de 30 peticiones/min**. |
| **4. CSRF** | Te manda un link falso por correo que usa tu sesión abierta para cancelar citas. | Usar tu firma ya estampada en una hoja en blanco para escribir una orden a tu nombre. | **Arquitectura SPA sin cookies:** Toda petición exige la cabecera `Authorization: Bearer <token_JWT>`. |
| **5. IDOR (Permisos Rotos)** | El cliente cambia el número en la URL (`/citas/24/` a `/citas/25/`) para ver fichas de otros. | Cambiar el número de tu casillero para abrir el casillero del vecino. | Permiso `IsAssignedTherapistOrAdmin`: el backend verifica si el usuario es realmente el dueño de la cita. |
| **6. Colisión Concurrente** | Dos personas en dos PCs dan clic a "Pagar" al mismo milisegundo para la misma cabina. | Dos personas sentándose en la misma silla al mismo tiempo. | Bloqueo pesimista `select_for_update()` a nivel de fila en MySQL. |

---

# 4️⃣ PASO 4: IMPLEMENTACIÓN DE ESTRATEGIA DE SEGURIDAD

### 1. Autenticación Moderna con Tokens JWT
* No usamos sesiones antiguas con cookies en el servidor.
* Al iniciar sesión en `http://localhost:5173/login`, el backend entrega un **Access Token (JWT)** válido por **120 minutos** y un **Refresh Token** de **7 días**.
* **Cómo mostrarlo en vivo:**
  1. Entra a la web, presiona `F12` en el navegador.
  2. Ve a la pestaña **Application (Aplicación)** ➡️ **Local Storage** ➡️ `http://localhost:5173`.
  3. Muestra la clave `sumaq_access_token` con el JWT firmado.

### 2. Control de Acceso por Roles (RBAC)
Demuestra la jerarquía de roles:
* **👑 Administrador (`admin@sumaqspa.pe` / `AdminSumaq2026!`):** Acceso total a Finanzas, Reportes de Ganancias, Usuarios y Kardex.
* **👩‍💼 Recepcionista (`recepcion@sumaqspa.pe` / `Sumaq2026!`):** Solo ve la Agenda y la Caja POS del día. No puede ver balances de dinero generales.
* **💆‍♀️ Terapeuta (`elena.morales@sumaqspa.pe` / `Sumaq2026!`):** Solo ve sus propias citas asignadas en su cabina.

### 3. Cifrado de Contraseñas en Base de Datos
Abre **MySQL Workbench** (puerto `3307`) y corre:
```sql
USE sumaq_spa;
SELECT id, email, password, rol FROM usuarios;
```
* **Lo que verás:** Las claves se ven como `pbkdf2_sha256$600000$...`. Nadie puede ver la contraseña en texto plano.

---

# 5️⃣ PASO 5: IMPLEMENTACIÓN DE ESTRATEGIA DE DEFENSA EN VIVO

Esta es la **demostración práctica fundamental** para sustentar ante el profesor:

### 🧪 Prueba 1: Batería de 18 Tests Automatizados (Pytest)
Abre la terminal en la carpeta del proyecto y ejecuta:
```bash
cd backend
python -m pytest
```

### 📺 Lo que saldrá en la terminal:
```text
============================= test session starts =============================
platform win32 -- Python 3.14.5, pytest-9.1.1, django-5.1.15
collected 18 items

tests/test_appointments.py::test_reserva_web_successful PASSED           [  5%]
tests/test_appointments.py::test_reserva_web_dni_rule_same_day_rejected PASSED [ 11%]
tests/test_appointments.py::test_consultar_y_cancelar_cita_web_24h_rule PASSED [ 16%]
tests/test_auth.py::test_login_successful_admin PASSED                   [ 22%]
tests/test_auth.py::test_login_invalid_password PASSED                   [ 27%]
tests/test_auth.py::test_login_inactive_user_rejected PASSED             [ 33%]
tests/test_finance_dashboard.py::test_financial_analytics_dashboard PASSED [ 38%]
tests/test_finance_dashboard.py::test_admin_reportes_therapist_breakdown PASSED [ 44%]
tests/test_health.py::test_health_check_endpoint PASSED                  [ 50%]
tests/test_inventory_attention.py::test_completar_cita_consumes_inventory PASSED [ 55%]
tests/test_inventory_attention.py::test_completar_cita_insufficient_stock_rollback PASSED [ 61%]
tests/test_pdf.py::test_generar_comprobante_pdf_binary PASSED            [ 66%]
tests/test_pdf.py::test_public_pdf_download_by_codigo_reserva PASSED     [ 72%]
tests/test_pdf.py::test_query_param_token_pdf_download PASSED            [ 77%]
tests/test_rbac_security.py::test_therapist_cannot_access_admin_dashboard PASSED [ 83%]
tests/test_rbac_security.py::test_unauthenticated_cannot_access_therapist_agenda PASSED [ 88%]
tests/test_rbac_security.py::test_therapist_cannot_modify_other_therapist_appointment PASSED [ 94%]
tests/test_concurrency.py::test_concurrency_anti_double_booking PASSED   [100%]

======================= 18 passed in 19.56s =======================
```

### 🗣️ Qué decirle al profesor mientras pasan los tests:
1. *"`test_concurrency_anti_double_booking` simula dos hilos simultáneos intentando reservar la misma cabina al mismo segundo y comprueba que solo uno tenga éxito."*
2. *"`test_rbac_security` valida que una terapeuta no pueda ingresar al panel de finanzas del administrador ni alterar citas de otras colegas."*
3. *"`test_consultar_y_cancelar_cita_web_24h_rule` valida la regla de negocio que rechaza cancelaciones con menos de 24 horas de antelación."*
4. *"`test_inventory_attention` comprueba que al atender a un paciente se descuenten los insumos de la receta médica (BOM), y si falta stock hace rollback automático."*

---

### 🚀 Prueba 2: Iniciar y Navegar en la Aplicación Web
Haz doble clic en:
```bash
ejecutar_todo.bat
```
1. Abre tu navegador en **http://localhost:5173/**.
2. Muestra el catálogo de servicios de masajes e hidroterapia.
3. Haz una reserva web seleccionando terapeuta, fecha y turno horario.
4. Muestra cómo se genera el código de reserva oficial `SQ-YYYYMMDD-XXXX` y se descarga el comprobante en PDF.

---

## ⚡ RESUMEN DE COMANDOS RÁPIDOS PARA LA SUSTENTACIÓN

| Demostración | Comando a ejecutar | Resultado |
| :--- | :--- | :--- |
| **1. Pasar los 18 tests de seguridad** | `cd backend && python -m pytest` | **18 PASSED** (100% verde). |
| **2. Mostrar monitor detectivo de BD** | `python admin_tools/monitor_db.py` | Latencia, salud de tablas y stock crítico. |
| **3. Probar telemetría del Backend** | `python -c "import urllib.request; print(urllib.request.urlopen('http://127.0.0.1:8000/api/health/').read().decode())"` | `{"status": "healthy", "database": "healthy"}` |
| **4. Iniciar todo el sistema web** | Doble clic en `ejecutar_todo.bat` | Abre Backend (8000), Frontend (5173) y web. |

---

### 📂 Tus Documentos Oficiales Listos:
* 📄 **Informe Técnico Word:** `C:\Users\alexi\Downloads\SeguridadSUMAQ.docx`
* 📘 **Esta Guía de Demostración Markdown:** `C:\Users\alexi\Downloads\DemostracionPasos.md`
* 📊 **Diapositivas PPTX de 5 Minutos:** `PRESENTACION_SEMANA_07_SEGURIDAD_SUMAQ_SPA.pptx`
