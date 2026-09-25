# REQUISITOS DEL SISTEMA — SUMAQ SPA
**Estado:** Actualizado  
**Módulos:** Backend (Django REST Framework) / Frontend (React + TypeScript) / Base de Datos (MySQL InnoDB)

---

## 1. REQUISITOS FUNCIONALES (RF)

### a. Marketing y Ventas

| Código | Requisito | Descripción Técnica / Criterio de Aceptación | Componente / Endpoint |
| :---: | :--- | :--- | :--- |
| **RF-01** | Catálogo Público de Servicios | Listar servicios activos con imagen, precio, duración (minutos), descripción e insumos. Filtro por categoría (Faciales, Corporales, Relajantes, Holísticos). | `GET /api/servicios/`<br>`apps.services` |
| **RF-02** | Gestión de Promociones y Cupones | CRUD para administradores: creación de cupones de descuento con código único alfanumérico, porcentaje de descuento y fechas de vigencia. | `apps.marketing`<br>`PromocionViewSet` |
| **RF-03** | Promociones Activas Públicas | Endpoint público que lista únicamente cupones y ofertas vigentes para la landing page. | `GET /api/promociones/activas/` |
| **RF-04** | Wizard de Reserva Web (4 Pasos) | Flujo paso a paso para clientes: 1) Datos (DNI, nombres, teléfono, correo), 2) Servicio y terapeuta, 3) Fecha y turno libre, 4) Cupón y método de pago (Efectivo, Tarjeta, Yape, Plin). | `POST /api/citas/reservar-web/`<br>`apps.appointments` |
| **RF-05** | Validación y Recálculo de Descuento | Validación en vivo del cupón en checkout; recálculo automático de subtotal, monto descontado y total. | `ReservaService.crear_reserva_web` |
| **RF-06** | Portal de Autogestión ("Mis Citas") | Consulta de estado de cita para clientes mediante doble factor: `Código de Reserva` (SQ-YYYYMMDD-XXXX) + `DNI`. Sin login obligatorio. | `POST /api/citas/consultar/` |
| **RF-07** | Cancelación Web Autónoma | El cliente puede cancelar su cita desde la web si restan más de 24 horas para el turno. Libera el slot de cabina y terapeuta. | `POST /api/citas/cancelar-web/` |
| **RF-08** | Reprogramación Web Autónoma | El cliente puede cambiar fecha y hora si restan más de 24 horas, validando disponibilidad de cabina y terapeuta en el nuevo horario. | `POST /api/citas/reprogramar-web/` |
| **RF-09** | Descarga Pública de Comprobante PDF | Descarga inmediata de constancia de reserva en PDF tras confirmar la cita en la web. | `GET /api/citas/comprobante-pdf/<codigo>/` |

---

### b. Logística y Almacén

| Código | Requisito | Descripción Técnica / Criterio de Aceptación | Componente / Endpoint |
| :---: | :--- | :--- | :--- |
| **RF-10** | Catálogo de Insumos y Productos | CRUD de insumos con nombre, unidad de medida (ml, gr, und), stock actual, stock mínimo y costo unitario. | `apps.inventory`<br>`ProductoAdminViewSet` |
| **RF-11** | Recetas Técnicas por Servicio (BOM) | Asignación de insumos y cantidades exactas requeridas para cada servicio (Bill of Materials). | `apps.services`<br>`RecetaServicio` |
| **RF-12** | Kárdex Transaccional de Movimientos | Registro inmutable de entradas, salidas por atención de citas, mermas y ajustes manuales con fecha, costo y referencia de cita. | `apps.inventory`<br>`MovimientoInventarioViewSet` |
| **RF-13** | Registro de Entradas por Compra | Registro de compras a proveedores con incremento automático de stock físico y actualización de costos. | `POST /api/admin/inventario/movimientos/` |
| **RF-14** | Ajustes Manuales de Stock | Regularización manual de inventario por roturas, vencimiento o auditoría física. | `apps.inventory.models` |
| **RF-15** | Semáforo de Stock Crítico | Clasificación automática de insumos en `NORMAL`, `BAJO` y `CRITICO` según el stock mínimo fijado. | `ProductoSerializer`<br>`admin_tools/monitor_db.py` |
| **RF-16** | Consulta de Insumos por Terapeutas | Vista de solo lectura para terapeutas para consultar insumos disponibles y recetas de sus tratamientos. | `GET /api/terapeuta/inventario/` |

---

### c. Producción y Operaciones

| Código | Requisito | Descripción Técnica / Criterio de Aceptación | Componente / Endpoint |
| :---: | :--- | :--- | :--- |
| **RF-17** | Cálculo de Disponibilidad en Tiempo Real | Cálculo de slots libres entre 09:00 y 20:00 para una fecha seleccionada, excluyendo solapamientos de cabina o terapeuta. | `GET /api/disponibilidad/` |
| **RF-18** | Agenda Diaria del Terapeuta | Visualización de citas programadas del día asignadas a la terapeuta autenticada, con filtro por estado (`PENDIENTE`, `ATENDIDA`, `CANCELADA`). | `GET /api/terapeuta/mi-agenda/` |
| **RF-19** | Detalle de Sesión Asistencial | Consulta de datos del cliente, servicio, cabina, franja horaria y servicios extra agregados. | `GET /api/terapeuta/citas/<id>/` |
| **RF-20** | Ficha Clínica de Atención Estética | Registro confidencial de diagnóstico de piel (Grasa, Mixta, Seca, Sensible), alergias conocidas y notas de evolución clínica. | `apps.attention`<br>`TerapeutaFichaView` |
| **RF-21** | Adición de Tratamientos en Sesión | Agregar servicios complementarios durante la atención, recalculando el monto de la cita y generando el asiento contable en caja. | `POST /api/terapeuta/citas/<id>/agregar-servicio/` |
| **RF-22** | Finalización y Descuento de Stock | Al pasar a `ATENDIDA`, descuenta automáticamente los insumos según receta técnica BOM. Bloquea con error si no hay stock suficiente. | `PATCH /api/terapeuta/citas/<id>/completar/`<br>`AtencionService.completar_cita` |
| **RF-23** | Regla Anti-Acaparamiento (1 Cita/DNI/Día) | El sistema bloquea el registro si el mismo DNI ya tiene una cita activa para la misma fecha. | `apps.appointments.services` |
| **RF-24** | Agenda Global Multi-Cabina | Tablero matricial en paralelo que muestra la ocupación simultánea de las 3 cabinas físicas en tiempo real. | `frontend/pages/admin/GlobalAgendaPage` |
| **RF-25** | Gestión de Citas en Mostrador / Recepción | Registro presencial de citas, reasignación de horarios y actualización de estados (`PENDIENTE`, `CONFIRMADA`, `ATENDIDA`, `CANCELADA`, `NO_ASISTIO`). | `apps.appointments`<br>`CitaAdminViewSet` |
| **RF-26** | Asignación y Gestión de Terapeutas | Registro de terapeutas, asignación de cabina física y vinculación con su usuario de sistema. | `apps.therapists`<br>`TerapeutaViewSet` |
| **RF-27** | Gestión y Estado de Cabinas | Parametrización de cabinas (tipo: Holística, Dermoestética, Relax) y estado operativo (activa o mantenimiento). | `apps.cabins`<br>`CabinaViewSet` |

---

### d. Dirección o Gerencia General

| Código | Requisito | Descripción Técnica / Criterio de Aceptación | Componente / Endpoint |
| :---: | :--- | :--- | :--- |
| **RF-28** | Dashboard Ejecutivo de KPIs | Visualización en tiempo real de: Ingresos Brutos, Costo de Insumos, Ganancia Operativa, Ocupación de Cabinas y Tendencia a 7 días. | `GET /api/admin/dashboard/`<br>`AdminDashboardAnalyticsView` |
| **RF-29** | Reportes Financieros Consolidados | Balances por rango de fechas con desglose por terapeuta, por método de pago y por categoría de servicio. | `GET /api/admin/reportes/`<br>`AdminReportesView` |
| **RF-30** | Ranking de Servicios Demandados | Clasificación de servicios más vendidos por volumen y facturación acumulada. | `apps.finance.services` |
| **RF-31** | Control de Caja Diaria | Apertura y cierre de caja, registro automático de ingresos por citas/extras, egresos manuales y balance en vivo. | `apps.finance`<br>`MovimientoCajaViewSet` |

---

### e. Otros (Seguridad, IAM y Gestión del Sistema)

| Código | Requisito | Descripción Técnica / Criterio de Aceptación | Componente / Endpoint |
| :---: | :--- | :--- | :--- |
| **RF-32** | Autenticación JWT Stateless | Login con credenciales cifradas; emisión de Access Token (120 min) y Refresh Token (7 días) con rotación obligatoria. | `POST /api/auth/login/`<br>`apps.accounts` |
| **RF-33** | Auto-Refresh Silencioso de Tokens | Interceptor frontend que captura respuestas `401 Unauthorized` y renueva el token en background sin interrumpir la sesión. | `frontend/services/api.ts` |
| **RF-34** | Control de Acceso RBAC Multinivel | Segregación de accesos en backend y frontend para roles `ADMIN`, `RECEPCIONISTA` y `TERAPEUTA`. Secure by Default. | `apps.common.permissions`<br>`ProtectedRoute.tsx` |
| **RF-35** | Control a Nivel de Objeto (Anti-IDOR) | Restringe a las terapeutas para que solo puedan visualizar, editar fichas o completar citas que les hayan sido asignadas. | `IsAssignedTherapistOrAdmin` |
| **RF-36** | Administración de Usuarios | Creación de cuentas de colaboradores, asignación de roles, cambio de claves y desactivación inmediata (`activo=False`). | `apps.accounts`<br>`UserAdminViewSet` |
| **RF-37** | Historial de Clientes | Directorio de clientes con DNI, teléfono, email y trazabilidad de atenciones históricas. | `apps.clients`<br>`ClienteAdminViewSet` |
| **RF-38** | Generación Vectorial de PDFs | Emisión de comprobantes oficiales generados en memoria mediante ReportLab (sin motores HTML-to-PDF). | `apps.common.pdf` |

---

## 2. REQUISITOS NO FUNCIONALES (RNF)

| Código | Categoría | Requisito | Criterio de Aceptación y Métrica | Implementación |
| :---: | :--- | :--- | :--- | :--- |
| **RNF-01** | Concurrencia | Cero Doble Reserva (Anti-Double Booking) | Bloqueo pesimista a nivel de fila (`select_for_update`) dentro de transacciones atómicas InnoDB (`transaction.atomic`). Ante peticiones simultáneas, exactamente 1 pasa y las demás reciben `HTTP 409 Conflict`. | `apps.appointments.services`<br>`tests/test_concurrency.py` |
| **RNF-02** | Rendimiento | Tiempos de Respuesta y Latencia BD | Respuestas de API < 1.5s bajo carga normal. Latencia de base de datos en `/api/health/` < 100 ms (promedio verificado: 45–65 ms). | `apps.common.health`<br>`admin_tools/monitor_db.py` |
| **RNF-03** | Exactitud | Precisión Decimal Absoluta | Cálculos financieros con tipo `Decimal` en Python y `DECIMAL(10,2)` en MySQL. Prohibido el uso de flotantes para evitar errores de redondeo. | `apps.finance`<br>`apps.attention.services` |
| **RNF-04** | Seguridad | Cifrado de Contraseñas (NIST) | Algoritmo PBKDF2 con HMAC-SHA256, sal aleatoria individual y >600,000 iteraciones (Estándar NIST SP 800-63B). | `apps.accounts.models`<br>`settings.py` |
| **RNF-05** | Seguridad Web | Mitigación OWASP Top 10 | Prepared Statements obligatorios contra SQLi; auto-escape JSX contra XSS; tokens Bearer en cabecera contra CSRF; `X-Frame-Options: SAMEORIGIN` contra Clickjacking. | `settings.py`<br>`apps.common.pdf` |
| **RNF-06** | Disponibilidad | Resiliencia y Backups 3-2-1 | Uptime objetivo >= 99.9%. Respaldos diarios no bloqueantes (`mysqldump --single-transaction`) con retención de 7 días y soporte para replicación Master-Slave. | `admin_tools/backup_db.bat`<br>`setup_replication.sql` |
| **RNF-07** | Usabilidad | Diseño Responsivo y Compatibilidad | Compatible al 100% con Chrome, Firefox, Safari y Edge. Layout responsive para móviles, tablets y escritorio. React 19 + TypeScript. | `frontend/src/` |
| **RNF-08** | Mantenibilidad | Arquitectura Modular y Testing | Monolito modular con dominios desacoplados. Cobertura de pruebas unitarias y de integración automatizadas con Pytest. | `apps/`<br>`backend/tests/` |
| **RNF-09** | Integridad | Manejo Seguro de Excepciones | Respuestas de error JSON normalizadas `{success: false, error: {...}}`. Prohibida la exposición de stack traces de Django o esquemas de BD. | `apps.common.exceptions` |
