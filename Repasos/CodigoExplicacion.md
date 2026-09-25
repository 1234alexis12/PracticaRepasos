# MANUAL MAESTRO DE CÓDIGO Y ARQUITECTURA: SUMAQ SPA WEB
**Proyecto:** Sistema Web de Gestión de Citas, Inventario y Finanzas para Spa  
**Institución:** Universidad Tecnológica del Perú (UTP)  
**Curso:** Integrador II: Sistemas y Software  
**Nivel de Explicación:** Pedagógico, exhaustivo, carpeta por carpeta, bloque por bloque, relacionando Frontend, Backend y Base de Datos.

---

# TABLA DE CONTENIDOS
1. [Introducción y Fundamentos de Arquitectura](#1-introducción-y-fundamentos-de-arquitectura)
2. [Flujo de Comunicación Integral (De Extremo a Extremo)](#2-flujo-de-comunicación-integral-de-extremo-a-extremo)
3. [Carpeta Raíz del Proyecto](#3-carpeta-raíz-del-proyecto)
4. [Backend: Carpeta por Carpeta y Bloque por Bloque](#4-backend-carpeta-por-carpeta-y-bloque-por-bloque)
   - 4.1. Configuración Global (`backend/config/`)
   - 4.2. Módulo de Autenticación y Usuarios (`backend/apps/authentication/`)
   - 4.3. Módulo de Servicios (`backend/apps/services/`)
   - 4.4. Módulo de Terapeutas (`backend/apps/therapists/`)
   - 4.5. Módulo de Cabinas (`backend/apps/cabins/`)
   - 4.6. Módulo de Citas y Reservas (`backend/apps/appointments/`) — *Núcleo Concurrencia y Búsqueda*
   - 4.7. Módulo de Inventario y Recetas BOM (`backend/apps/inventory/`)
   - 4.8. Módulo de Atención y Consumo (`backend/apps/attention/`)
   - 4.9. Módulo de Finanzas y Caja (`backend/apps/finance/`)
   - 4.10. Módulo de Marketing y Fidelización (`backend/apps/marketing/`)
   - 4.11. Módulo de Reportes y Generación PDF (`backend/apps/reports/`)
   - 4.12. Base de Datos y Replicación (`backend/database/` y `backend/replication/`)
   - 4.13. Batería de Pruebas Automatizadas (`backend/tests/`)
5. [Frontend: Carpeta por Carpeta y Bloque por Bloque](#5-frontend-carpeta-por-carpeta-y-bloque-por-bloque)
   - 5.1. Raíz y Configuración de Vite/React (`frontend/`)
   - 5.2. Punto de Entrada y Rutas (`src/main.tsx` y `src/App.tsx`)
   - 5.3. Contextos Globales (`src/contexts/`) — *Auth, Inactividad y Toasts*
   - 5.4. Capa de Servicios y Conexión HTTP (`src/services/`) — *Axios e Interceptores*
   - 5.5. Componentes Reutilizables y Guardianes (`src/components/`)
   - 5.6. Diseños Base o Plantillas (`src/layouts/`)
   - 5.7. Vistas del Cliente Público (`src/pages/public/`)
   - 5.8. Vistas de la Terapeuta (`src/pages/therapist/`)
   - 5.9. Vistas del Administrador (`src/pages/admin/`)
   - 5.10. Vistas de Autenticación y Errores (`src/pages/auth/`)
6. [Matriz de Relaciones: ¿Quién se Comunica con Quién?](#6-matriz-de-relaciones-quién-se-comunica-con-quién)
7. [Guía de Preguntas Clave para la Sustentación](#7-guía-de-preguntas-clave-para-la-sustentación)

---

# 1. INTRODUCCIÓN Y FUNDAMENTOS DE ARQUITECTURA

### ¿Qué es SUMAQ SPA?
SUMAQ SPA es una plataforma web completa de grado empresarial diseñada para digitalizar, proteger y optimizar la operación integral de un centro de bienestar (Spa). Permite a los clientes reservar tratamientos en tiempo real, a las terapeutas gestionar sus agendas y atender pacientes deduciendo automáticamente los productos utilizados, y a los administradores supervisar las finanzas, el stock crítico, las cajas y los reportes gerenciales.

### La Analogía del Restaurante para Entender la Arquitectura
Para entender el código sin enredarse en términos técnicos complejos, imagina que el sistema funciona exactamente como un restaurante de alta cocina:

```
+-------------------------------------------------------------------------------+
|                             ANALOGÍA DEL RESTAURANTE                          |
+-------------------------------------------------------------------------------+
| 1. EL COMEDOR Y EL MENÚ (FRONTEND - React 19 + Vite)                          |
|    - Es lo que el cliente ve y toca (botones, formularios, colores, tarjetas).|
|    - El cliente elige un servicio y llena sus datos.                          |
+-------------------------------------------------------------------------------+
|                                      | (Petición HTTP / JSON con Axios)       |
|                                      v                                        |
+-------------------------------------------------------------------------------+
| 2. EL MESERO Y LA COCINA (BACKEND - Django Rest Framework en Python)          |
|    - URLs: El mesero recibe el pedido y sabe a qué estación llevarlo.         |
|    - Views: El cocinero que prepara el pedido y aplica las reglas del negocio.|
|    - Serializers: El emplatado (convierte ingredientes en un plato presentable|
|      o traduce el pedido del cliente al idioma de la cocina).                 |
+-------------------------------------------------------------------------------+
|                                      | (Consultas SQL mediante Django ORM)    |
|                                      v                                        |
+-------------------------------------------------------------------------------+
| 3. LA DESPENSA Y LA BODEGA (BASE DE DATOS - MySQL 8.0)                        |
|    - Donde se guarda todo de forma permanente y segura (citas, contraseñas    |
|      cifradas, insumos, clientes, terapeutas, historial de pagos).            |
+-------------------------------------------------------------------------------+
```

---

# 2. FLUJO DE COMUNICACIÓN INTEGRAL (DE EXTREMO A EXTREMO)

Veamos qué ocurre exactamente cuando un usuario hace clic en **"Confirmar Reserva"**:

```
[ NAVEGADOR WEB (Cliente) ]
        |
        | 1. El usuario llena el formulario en BookingWizardPage.tsx
        v
[ SERVICIO FRONTEND (publicService.ts) ]
        |
        | 2. Convierte los datos en un objeto JSON limpio
        v
[ INSTANCIA AXIOS (api.ts) ]
        |
        | 3. Agrega encabezados de seguridad, token JWT (si existe) y envía POST HTTP
        v
[ ENRUTADOR BACKEND (backend/config/urls.py -> apps/appointments/urls.py) ]
        |
        | 4. Recibe la URL /api/appointments/ y la deriva a la vista correspondiente
        v
[ VISTA DE DJANGO (backend/apps/appointments/views.py -> CitaViewSet.create) ]
        |
        | 5. Abre una transacción segura con transaction.atomic()
        | 6. Aplica select_for_update() para bloquear la cabina y terapeuta en ese horario
        | 7. Valida que no exista conflicto de horario ni doble reserva
        v
[ TRADUCTOR Y VALIDADOR (serializers.py -> CitaSerializer) ]
        |
        | 8. Valida tipos de datos, formato de DNI, teléfono y fechas
        v
[ MODELO Y BASE DE DATOS (models.py -> MySQL 8.0 sumaq_spa) ]
        |
        | 9. Inserta el registro en la tabla 'citas' y genera un código único de 8 caracteres
        v
[ RESPUESTA HTTP JSON 201 CREATED ]
        |
        | 10. Django devuelve { "codigo_unico": "A1B2C3D4", "mensaje": "Cita confirmada" }
        v
[ FRONTEND REACT ]
        |
        | 11. Redirige a BookingConfirmationPage.tsx mostrando el ticket digital y confirmación
```

---

# 3. CARPETA RAÍZ DEL PROYECTO

En la raíz del proyecto encontramos los archivos maestros que controlan el arranque, el entorno y la seguridad física:

### `manage.py`
- **¿Qué es?:** Es el panel de control principal de Django por línea de comandos.
- **¿Qué hace?:** Permite arrancar el servidor (`runserver`), crear migraciones (`makemigrations`), aplicarlas a MySQL (`migrate`) o crear superusuarios.
- **Bloque clave:**
```python
def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    # Carga las configuraciones del sistema y ejecuta los comandos recibidos
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
```

### `pytest.ini`
- **¿Qué es?:** Archivo de configuración para el framework de pruebas automatizadas Pytest.
- **¿Qué hace?:** Le indica a Pytest dónde está la configuración de Django (`DJANGO_SETTINGS_MODULE = config.settings`) y qué archivos buscar (`test_*.py`).

### `requirements.txt`
- **¿Qué es?:** La lista oficial de librerías de Python requeridas para ejecutar el backend.
- **Librerías principales:**
  - `Django==5.1.x`: Framework backend web robusto y seguro.
  - `djangorestframework`: Motor para crear APIs REST en formato JSON.
  - `djangorestframework-simplejwt`: Generador y validador de tokens seguros JWT.
  - `django-cors-headers`: Permite que React (puerto 5173) se comunique con Django (puerto 8000).
  - `mysqlclient`: Conector de alto rendimiento en C para MySQL.
  - `reportlab`: Motor generador de documentos PDF para reportes de citas y facturación.
  - `pytest` y `pytest-django`: Suite de pruebas unitarias y de concurrencia.

### `.env` y `.gitignore`
- **¿Qué es?:** Mecanismo de protección de secretos y credenciales (Control de Seguridad RT08).
- **¿Qué hace?:** `.env` guarda la contraseña de MySQL, la clave secreta `SECRET_KEY` de Django y el puerto `DB_PORT=3307`. `.gitignore` prohíbe que este archivo se suba a GitHub, evitando filtraciones de seguridad.

### Scripts por Lotes de Automatización (`.bat`)
- `ejecutar_todo.bat`: Abre en ventanas independientes el Backend de Django y el Frontend de Vite con solo darle doble clic.
- `ejecutar_backend.bat`: Activa el entorno virtual `.venv` y levanta el servidor Django en `http://127.0.0.1:8000`.
- `ejecutar_frontend.bat`: Entra a la carpeta `frontend/` y ejecuta `npm run dev` en `http://localhost:5173`.

### Carpeta `admin_tools/` (Herramientas de Mantenimiento y Centinela)
1. `backup_db.bat`:
   - Ejecuta `mysqldump` para hacer una copia de seguridad en caliente de la base de datos `sumaq_spa` en la carpeta `backups/` con fecha y hora exacta. Protege contra desastres (RT04).
2. `restore_db.bat`:
   - Restaura el respaldo SQL más reciente hacia MySQL de forma automatizada en caso de fallo del servidor.
3. `monitor_db.py`:
   - Script centinela que se conecta a MySQL y monitorea en tiempo real el número de conexiones abiertas (`Threads_connected`), consultas lentas (`Slow_queries`) y memoria utilizada, alertando si el sistema está bajo un ataque de saturación DoS (RT03).

---

# 4. BACKEND: CARPETA POR CARPETA Y BLOQUE POR BLOQUE

El backend está organizado siguiendo una arquitectura modular en aplicaciones (`apps/`), donde cada módulo es responsable de una función de negocio específica.

---

### 4.1. Configuración Global (`backend/config/`)

#### `backend/config/settings.py`
Es el cerebro del servidor Django. Configura la base de datos, la seguridad, los módulos activos y las políticas de comunicación.

- **Bloque 1: Aplicaciones Instaladas (`INSTALLED_APPS`)**
  Registra tanto las librerías base de Django como los módulos propios de SUMAQ:
  ```python
  INSTALLED_APPS = [
      'django.contrib.admin',
      'django.contrib.auth',
      'django.contrib.contenttypes',
      'django.contrib.sessions',
      'django.contrib.messages',
      'django.contrib.staticfiles',
      # Librerías de Terceros
      'rest_framework',
      'rest_framework_simplejwt',
      'corsheaders',
      # Módulos Propios de SUMAQ SPA
      'apps.authentication',
      'apps.services',
      'apps.therapists',
      'apps.cabins',
      'apps.appointments',
      'apps.inventory',
      'apps.attention',
      'apps.finance',
      'apps.marketing',
      'apps.reports',
  ]
  ```

- **Bloque 2: Modelo de Usuario Personalizado**
  Le indica a Django que no use el usuario por defecto, sino nuestro modelo con roles y DNI:
  ```python
  AUTH_USER_MODEL = 'authentication.Usuario'
  ```

- **Bloque 3: Conexión a Base de Datos MySQL con Detección de Pruebas**
  Si ejecutamos pruebas con Pytest, usa SQLite en memoria para máxima velocidad e inocuidad. En ejecución normal, se conecta a MySQL 8.0 en el puerto 3307 configurado en el `.env`:
  ```python
  if 'pytest' in sys.modules or 'test' in sys.argv:
      DATABASES = {
          'default': {
              'ENGINE': 'django.db.backends.sqlite3',
              'NAME': ':memory:',
          }
      }
  else:
      DATABASES = {
          'default': {
              'ENGINE': 'django.db.backends.mysql',
              'NAME': os.getenv('DB_NAME', 'sumaq_spa'),
              'USER': os.getenv('DB_USER', 'root'),
              'PASSWORD': os.getenv('DB_PASSWORD', '123456'),
              'HOST': os.getenv('DB_HOST', '127.0.0.1'),
              'PORT': os.getenv('DB_PORT', '3307'),
              'OPTIONS': {'charset': 'utf8mb4'},
          }
      }
  ```

- **Bloque 4: Throttling de Tasa (Límite de Peticiones contra Ataques de Fuerza Bruta)**
  Limita a usuarios anónimos a un máximo de 30 peticiones por minuto y a usuarios autenticados a 120 por minuto:
  ```python
  REST_FRAMEWORK = {
      'DEFAULT_AUTHENTICATION_CLASSES': (
          'rest_framework_simplejwt.authentication.JWTAuthentication',
      ),
      'DEFAULT_THROTTLE_CLASSES': [
          'rest_framework.throttling.AnonRateThrottle',
          'rest_framework.throttling.UserRateThrottle',
      ],
      'DEFAULT_THROTTLE_RATES': {
          'anon': '30/minute',
          'user': '120/minute',
      }
  }
  ```

#### `backend/config/urls.py`
Es el mapa general de rutas. Cuando una petición llega al backend (ej: `GET /api/services/`), este archivo lee el prefijo y se lo delega al `urls.py` del módulo correspondiente:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.authentication.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/therapists/', include('apps.therapists.urls')),
    path('api/cabins/', include('apps.cabins.urls')),
    path('api/appointments/', include('apps.appointments.urls')),
    path('api/inventory/', include('apps.inventory.urls')),
    path('api/attention/', include('apps.attention.urls')),
    path('api/finance/', include('apps.finance.urls')),
    path('api/marketing/', include('apps.marketing.urls')),
    path('api/reports/', include('apps.reports.urls')),
    path('api/health/', health_check, name='health_check'),
]
```

---

### 4.2. Módulo de Autenticación y Usuarios (`backend/apps/authentication/`)

Gestiona el inicio de sesión, el control de acceso basado en roles (RBAC) y la seguridad de contraseñas.

- **`models.py` (Modelo `Usuario`):**
  Hereda de `AbstractUser` de Django. Añade campos propios como `rol` (`ADMINISTRADOR`, `TERAPEUTA`, `RECEPCIONISTA`), `dni`, `telefono`, y `activo`.
  ```python
  class Usuario(AbstractUser):
      class Rol(models.TextChoices):
          ADMINISTRADOR = 'administrador', 'Administrador'
          TERAPEUTA = 'terapeuta', 'Terapeuta'
          RECEPCIONISTA = 'recepcionista', 'Recepcionista'
      
      rol = models.CharField(max_length=20, choices=Rol.choices, default=Rol.RECEPCIONISTA)
      dni = models.CharField(max_length=8, unique=True, null=True, blank=True)
      telefono = models.CharField(max_length=15, blank=True)
      activo = models.BooleanField(default=True)
  ```

- **`serializers.py` (Serializadores de Token y Usuario):**
  Personaliza el Token JWT para que cuando un usuario inicie sesión, el token contenga encriptados su nombre, su email y su **rol**, permitiendo que React sepa al instante qué menú mostrarle sin hacer peticiones adicionales.

- **`views.py` (Vistas de Autenticación):**
  - `CustomTokenObtainPairView`: Valida usuario y contraseña cifrada (con algoritmo PBKDF2/SHA256). Si son correctos, emite un `access_token` (vida útil 60 min) y un `refresh_token` (vida útil 24 horas).
  - `UserViewSet`: Permite al Administrador listar, crear, editar y desactivar usuarios del personal del spa. Bloquea el acceso a usuarios sin rol de administrador mediante permisos (`IsAdminUser`).

---

### 4.3. Módulo de Servicios (`backend/apps/services/`)

Gestiona el catálogo de tratamientos de bienestar que ofrece el spa (Masajes, Faciales, Hidroterapias, Exfoliaciones).

- **`models.py`:**
  - `CategoriaServicio`: Agrupa los servicios (ej. "Masajes Relajantes", "Tratamientos Faciales").
  - `Servicio`: Contiene nombre, descripción, duración en minutos (ej: 60 min), precio en soles (ej: S/. 120.00), imagen y estado activo/inactivo.
- **`views.py` (`ServicioViewSet`):**
  - Si la petición es pública (`GET /api/services/public_catalog/`), devuelve únicamente los servicios activos con sus categorías para que los clientes elijan en la web.
  - Si la petición es de modificación (`POST`, `PUT`, `DELETE`), exige que el usuario sea Administrador autenticado.

---

### 4.4. Módulo de Terapeutas (`backend/apps/therapists/`)

Administra a las profesionales del spa, sus especialidades y sus horarios laborales.

- **`models.py`:**
  - `Terapeuta`: Vinculada al modelo `Usuario`, con biografía, foto y especialidades asignadas.
  - `HorarioTerapeuta`: Define qué días de la semana trabaja la terapeuta y en qué rango horario (ej. Lunes a Viernes de 09:00 a 18:00).
  - `BloqueoHorario`: Permite registrar permisos, descansos médicos o refrigerios para que el sistema no permita agendar citas en esos momentos.
- **`views.py` (`TerapeutaViewSet`):**
  - Endpoint `available_slots`: Recibe una fecha y un servicio, y calcula en tiempo real qué horas libres tiene cada terapeuta cruzando sus citas ya agendadas y sus bloqueos de horario.

---

### 4.5. Módulo de Cabinas (`backend/apps/cabins/`)

Controla las salas físicas de tratamiento donde se realizan los servicios (ej: Cabina VIP 1, Cabina Hidromasaje 2).

- **`models.py`:**
  - `Cabina`: Capacidad, tipo de equipamiento, estado (`DISPONIBLE`, `MANTENIMIENTO`, `INACTIVA`).
  - `MantenimientoCabina`: Registro de desinfecciones, revisiones de equipos y reparaciones.
- **`views.py`:** Controla la asignación de cabinas para evitar que dos terapeutas utilicen la misma sala al mismo tiempo.

---

### 4.6. Módulo de Citas y Reservas (`backend/apps/appointments/`)

Es el módulo más crítico del sistema. Gestiona el ciclo de vida completo de una cita y aplica los controles de seguridad contra doble reserva y manipulación de datos.

- **`models.py` (`Cita`):**
  - Almacena el `codigo_unico` (código alfanumérico único de 8 dígitos para que el cliente consulte su cita sin exponer IDs internos), `cliente_nombre`, `cliente_dni`, `cliente_email`, `cliente_telefono`, `servicio`, `terapeuta`, `cabina`, `fecha_cita`, `hora_inicio`, `hora_fin`, `estado` (`PENDIENTE`, `CONFIRMADA`, `EN_ATENCION`, `COMPLETADA`, `CANCELADA`, `NO_ASISTIO`) y `monto_total`.

- **`views.py` — Explicación de los 2 Bloques Clave de Seguridad:**

#### Bloque A: Prevención de Doble Reserva Simultánea con Bloqueo Pesimista
¿Qué pasa si dos clientes intentan reservar la misma cabina libre al mismo milisegundo?
```python
@transaction.atomic
def create(self, request, *args, **kwargs):
    # 1. Abre una transacción ACID atómica en la base de datos
    # 2. Bloquea a nivel de fila las citas existentes con select_for_update()
    conflicto_terapeuta = Cita.objects.select_for_update().filter(
        terapeuta_id=terapeuta_id,
        fecha_cita=fecha,
        hora_inicio__lt=hora_fin,
        hora_fin__gt=hora_inicio,
        estado__in=['PENDIENTE', 'CONFIRMADA', 'EN_ATENCION']
    ).exists()

    conflicto_cabina = Cita.objects.select_for_update().filter(
        cabina_id=cabina_id,
        fecha_cita=fecha,
        hora_inicio__lt=hora_fin,
        hora_fin__gt=hora_inicio,
        estado__in=['PENDIENTE', 'CONFIRMADA', 'EN_ATENCION']
    ).exists()

    if conflicto_terapeuta or conflicto_cabina:
        return Response(
            {'error': 'El horario seleccionado acaba de ser ocupado por otro usuario.'},
            status=status.HTTP_409_CONFLICT
        )
    # 3. Si no hay conflicto, guarda la cita de forma segura y confirma la transacción
```
*Explicación:* `select_for_update()` pone un candado temporal en MySQL sobre esas filas. La segunda petición tiene que esperar una fracción de segundo a que la primera termine. Al revisar, ve que ya está ocupado y rechaza la segunda con un error `409 Conflict`, impidiendo el solapamiento.

#### Bloque B: Búsqueda Segura por DNI y Código Único (Anti-SQLi y Anti-IDOR)
```python
@action(detail=False, methods=['post'], url_path='lookup')
def lookup_appointment(self, request):
    dni = request.data.get('dni', '').strip()
    codigo = request.data.get('codigo_unico', '').strip().upper()

    # Validación estricta con Expresión Regular: DNI debe tener exactamente 8 números
    if not re.match(r'^\d{8}$', dni):
        return Response({'error': 'El DNI debe contener exactamente 8 dígitos numéricos.'}, status=400)

    # Consulta parametrizada por ORM de Django (inmune a SQL Injection)
    # Requiere obligatoriamente coincidir DNI y Código (inmune a IDOR / BOLA)
    citas = Cita.objects.filter(cliente_dni=dni, codigo_unico=codigo)
    if not citas.exists():
        return Response({'error': 'No se encontró ninguna cita con los datos proporcionados.'}, status=404)
    
    serializer = CitaSerializer(citas.first())
    return Response(serializer.data)
```

---

### 4.7. Módulo de Inventario y Recetas BOM (`backend/apps/inventory/`)

Gestiona los insumos físicos del spa (aceites esenciales, cremas faciales, sales de baño, toallas descartables).

- **`models.py`:**
  - `Insumo`: Nombre, unidad de medida (`ML`, `GR`, `UNIDAD`), `stock_actual`, `stock_minimo`, `costo_unitario`.
  - `RecetaServicio` (Bill of Materials - BOM): Define qué insumos y en qué cantidad exacta gasta un servicio (ej: *Masaje Piedras Calientes gasta 30 ml de Aceite de Almendras y 2 toallas descartables*).
  - `MovimientoInventario`: Registro tipo Kardex con tipo (`ENTRADA`, `SALIDA_ATENCION`, `AJUSTE`, `MERMA`), cantidad, fecha y usuario responsable.
- **`views.py`:** Alertas automáticas cuando el `stock_actual <= stock_minimo` para prevenir quiebres de stock (Control RT06).

---

### 4.8. Módulo de Atención y Consumo (`backend/apps/attention/`)

Conecta la cita médica con la terapeuta y el inventario en tiempo real.

- **`models.py`:**
  - `AtencionCita`: Guarda notas clínicas de la terapeuta, estado del paciente, alergias observadas y hora real de inicio y fin.
  - `ConsumoInsumoAtencion`: Registra los insumos exactos que se usaron en esa sesión.
- **`views.py` (`completar_atencion`):**
  Al momento en que la terapeuta hace clic en "Finalizar Tratamiento", el backend consulta automáticamente la receta BOM del servicio y descuenta las cantidades de la tabla de insumos, creando el movimiento de kardex en una sola operación atómica.

---

### 4.9. Módulo de Finanzas y Caja (`backend/apps/finance/`)

Controla el flujo de caja diario del spa (ingresos por servicios pagados y egresos por gastos operativos).

- **`models.py`:**
  - `Caja`: Sesión de caja abierta por un recepcionista con monto inicial (ej: S/. 200.00 de fondo de caja), fecha de apertura, fecha de cierre y monto final en efectivo.
  - `MovimientoCaja`: Cada pago de cita o ingreso extra registrado.
  - `Gasto`: Salidas de dinero por compra de insumos, pagos de servicios o mantenimiento.
- **`views.py`:** Permite realizar el cuadre de caja diario comparando el dinero del sistema contra el dinero físico recaudado.

---

### 4.10. Módulo de Marketing y Fidelización (`backend/apps/marketing/`)

Permite crear promociones para clientes recurrentes.

- **`models.py`:**
  - `Campana`: Promociones de temporada (ej. "Día de la Madre - 20% OFF").
  - `CuponDescuento`: Código de cupón (ej: `SUMAQ2026`), porcentaje de descuento, fecha de vencimiento y límite máximo de usos.
  - `FidelizacionCliente`: Acumulación de puntos por cada cita completada para canjear por servicios gratuitos.
- **`views.py`:** Endpoint para validar si un cupón ingresado en el checkout web sigue vigente y no ha superado su límite de canjes.

---

### 4.11. Módulo de Reportes y Generación PDF (`backend/apps/reports/`)

Genera analítica de negocio para la toma de decisiones gerenciales.

- **`views.py`:**
  - `DashboardMetricsView`: Retorna en un solo endpoint rápido los KPIs clave: total de ingresos del mes, citas del día, tasa de ocupación de cabinas y servicios más solicitados.
  - `AppointmentPDFView`: Utiliza la librería **ReportLab** para dibujar programáticamente un PDF con el logo de SUMAQ SPA, los datos del cliente, el terapeuta asignado, el detalle del servicio, el monto pagado y un código QR de verificación de ticket.

---

### 4.12. Base de Datos y Replicación (`backend/database/` y `backend/replication/`)

- **`01_schema.sql`:** Contiene las sentencias `CREATE TABLE` en SQL puro con restricciones de clave foránea (`FOREIGN KEY`), tipos de datos optimizados e índices para búsquedas veloces.
- **`02_seed_data.sql`:** Inserta los datos semilla iniciales (servicios del spa, categorías, insumos con stock, cabinas y el usuario Administrador).
- **`replication/`:** Contiene los archivos de configuración para desplegar un esquema de base de datos de Alta Disponibilidad:
  - `master_my.ini`: Configura el servidor MySQL principal para emitir el registro binario (`log-bin=mysql-bin`, `server-id=1`).
  - `slave_my.ini`: Configura el servidor MySQL réplica en modo solo lectura (`server-id=2`).
  - `setup_replication.sql`: Crea el usuario de replicación `repl_user` y enlaza el esclavo al maestro. Si el servidor principal se cae, la réplica asume las consultas de inmediato (Control RT04).

---

### 4.13. Batería de Pruebas Automatizadas (`backend/tests/`)

El sistema cuenta con 18 pruebas unitarias y de integración que se ejecutan con `pytest` y validan el 100% de los requisitos del sistema:

1. `test_auth.py`: Prueba login exitoso, rechazo por contraseña incorrecta y validación de expiración de token JWT.
2. `test_appointments.py`: Prueba creación de citas, cálculo automático de precios y validación de horarios.
3. `test_concurrency.py`: Simula múltiples hilos concurrentes intentando reservar la misma cabina a la misma hora, certificando que el bloqueo `select_for_update` rechaza las solicitudes duplicadas (Cero dobles reservas).
4. `test_inventory_attention.py`: Prueba que al finalizar una atención, los insumos se descuentan exactamente según la receta BOM.
5. `test_finance_dashboard.py`: Prueba la apertura de caja, registro de pagos y cuadre de balances.
6. `test_pdf.py`: Verifica que la generación de comprobantes PDF con ReportLab retorne cabeceras `application/pdf` válidas.
7. `test_rbac_security.py`: Valida que una terapeuta o un usuario anónimo reciban un error `403 Forbidden` si intentan acceder a rutas de administración.
8. `test_health.py`: Verifica que el endpoint de salud del sistema devuelva estado `HTTP 200 OK`.

---

# 5. FRONTEND: CARPETA POR CARPETA Y BLOQUE POR BLOQUE

El frontend está construido sobre **React 19**, utilizando **TypeScript** para un tipado estricto que previene errores de ejecución, **Vite** como empaquetador ultrarrápido y **TailwindCSS** para un diseño moderno y adaptable a móviles.

---

### 5.1. Raíz y Configuración de Vite/React (`frontend/`)

- `package.json`: Lista las librerías del frontend:
  - `react` y `react-dom` (v19): Biblioteca principal de interfaces reactivas.
  - `react-router-dom`: Enrutador para navegación entre páginas sin recargar el navegador (SPA).
  - `axios`: Cliente HTTP para enviar y recibir datos JSON desde el backend Django.
  - `lucide-react`: Iconografía profesional para botones y menús.
  - `tailwindcss`: Framework de estilos CSS por clases utilitarias.
- `vite.config.ts`: Configura el servidor de desarrollo en el puerto 5173 y los alias de importación.

---

### 5.2. Punto de Entrada y Rutas (`src/main.tsx` y `src/App.tsx`)

#### `src/main.tsx`
Es el primer archivo que ejecuta el navegador al cargar la página.
- Monta la aplicación React en el elemento `<div id="root"></div>` del archivo `index.html`.
- Envuelve toda la aplicación con los proveedores globales de contexto (`AuthProvider` y `ToastProvider`).

#### `src/App.tsx`
Es el conmutador central de navegación del frontend. Define todas las URLs y qué componente renderizar:

```tsx
<Routes>
  {/* RUTAS PÚBLICAS (Accesibles por cualquier persona sin iniciar sesión) */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/servicios" element={<ServicesCatalogPage />} />
    <Route path="/reservar" element={<BookingWizardPage />} />
    <Route path="/reserva-confirmada" element={<BookingConfirmationPage />} />
    <Route path="/mi-cita" element={<ManageAppointmentPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Route>

  {/* RUTAS PROTEGIDAS DEL ADMINISTRADOR */}
  <Route element={<ProtectedRoute allowedRoles={['administrador']} />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/agenda" element={<GlobalAgendaPage />} />
      <Route path="/admin/citas" element={<AdminAppointmentsPage />} />
      <Route path="/admin/servicios" element={<AdminServicesPage />} />
      <Route path="/admin/terapeutas" element={<AdminTherapistsPage />} />
      <Route path="/admin/cabinas" element={<AdminCabinsPage />} />
      <Route path="/admin/inventario" element={<AdminInventoryPage />} />
      <Route path="/admin/caja" element={<AdminCashRegisterPage />} />
      <Route path="/admin/marketing" element={<AdminMarketingPage />} />
      <Route path="/admin/reportes" element={<AdminReportsPage />} />
      <Route path="/admin/usuarios" element={<AdminUsersPage />} />
    </Route>
  </Route>

  {/* RUTAS PROTEGIDAS DE LA TERAPEUTA */}
  <Route element={<ProtectedRoute allowedRoles={['terapeuta']} />}>
    <Route element={<TherapistLayout />}>
      <Route path="/terapeuta/agenda" element={<TherapistAgendaPage />} />
      <Route path="/terapeuta/atencion/:id" element={<TherapistAppointmentDetailPage />} />
      <Route path="/terapeuta/inventario" element={<TherapistInventoryPage />} />
    </Route>
  </Route>

  {/* RUTAS DE ERROR */}
  <Route path="/no-autorizado" element={<UnauthorizedPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

---

### 5.3. Contextos Globales (`src/contexts/`)

Los contextos permiten compartir información entre todos los componentes de la aplicación sin tener que pasar datos manualmente de padre a hijo.

#### `src/contexts/AuthContext.tsx`
Controla el estado de la sesión, los datos del usuario logueado, y contiene el **Temporizador de Auto-Cierre de Sesión por Inactividad (5 Minutos)**:

```tsx
// 1. Guarda el usuario y token en el estado de React
const [user, setUser] = useState<User | null>(null);
const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

// 2. Temporizador de 5 minutos (300,000 milisegundos) de inactividad
useEffect(() => {
  if (!token) return;

  let timeoutId: NodeJS.Timeout;

  const resetTimer = () => {
    clearTimeout(timeoutId);
    // Si pasan 5 minutos sin mover el mouse ni presionar teclas, cierra sesión
    timeoutId = setTimeout(() => {
      logout();
      showToast('Sesión cerrada por inactividad (5 minutos).', 'warning');
    }, 5 * 60 * 1000);
  };

  // Escucha eventos del usuario para reiniciar el reloj si está activo
  const events = ['mousemove', 'keydown', 'scroll', 'mousedown', 'touchstart'];
  events.forEach(event => window.addEventListener(event, resetTimer));

  resetTimer();

  return () => {
    clearTimeout(timeoutId);
    events.forEach(event => window.removeEventListener(event, resetTimer));
  };
}, [token]);
```

#### `src/contexts/ToastContext.tsx`
Provee una función global `showToast(mensaje, tipo)` para mostrar mensajes flotantes elegantes en la esquina superior derecha (ej: "Cita confirmada con éxito", "Stock insuficiente").

---

### 5.4. Capa de Servicios y Conexión HTTP (`src/services/`)

Aquí reside la comunicación con el Backend.

#### `src/services/api.ts`
Crea la instancia de **Axios** y configura los interceptores de seguridad:
- **Interceptor de Petición:** Antes de que cualquier petición salga al backend, verifica si existe un token en el navegador y lo añade a la cabecera HTTP: `Authorization: Bearer <token>`.
- **Interceptor de Respuesta:** Si el backend responde con un error `401 Unauthorized` (token expirado), limpia el almacenamiento local y redirige automáticamente al usuario a `/login`.

#### Servicios Específicos:
- `authService.ts`: Funciones `login(email, password)`, `logout()`, y `getCurrentUser()`.
- `publicService.ts`: Funciones `getServices()`, `getTherapists()`, `getAvailableSlots(fecha, servicioId)`, `createAppointment(data)` y `lookupAppointment(dni, codigo)`.
- `adminService.ts`: Funciones para obtener métricas del dashboard, gestionar usuarios, crear servicios, asignar turnos y descargar reportes en PDF.
- `therapistService.ts`: Funciones para consultar las citas asignadas del día y registrar la finalización de atención clínica con consumo de insumos.

---

### 5.5. Componentes Reutilizables y Guardianes (`src/components/`)

- `ProtectedRoute.tsx`: Componente guardián de seguridad.
  - Si el usuario no ha iniciado sesión, lo manda a `/login`.
  - Si el usuario tiene sesión iniciada pero su rol no tiene permiso para esa página (ej. una terapeuta intentando entrar a `/admin/caja`), lo redirige a `/no-autorizado`.
- `Navbar.tsx`: Barra de navegación superior con enlaces dinámicos según el estado de la sesión.
- `Footer.tsx`: Pie de página con información de contacto, horarios y enlaces de interés.
- `Modal.tsx`: Ventana emergente accesible para confirmaciones y formularios rápidos.
- `Button.tsx`: Botón con variantes visuales (primario, secundario, peligro, carga animada).
- `Badge.tsx`: Etiqueta de color para mostrar estados (`PENDIENTE` en amarillo, `CONFIRMADA` en azul, `COMPLETADA` en verde, `CANCELADA` en rojo).
- `StatCard.tsx`: Tarjeta visual para mostrar métricas del Dashboard (ícono, valor numérico, porcentaje de crecimiento).

---

### 5.6. Diseños Base o Plantillas (`src/layouts/`)

- `PublicLayout.tsx`: Estructura limpia con Navbar público arriba, contenido al centro y Footer abajo.
- `AdminLayout.tsx`: Panel con barra lateral (Sidebar) con 11 opciones de gestión, barra superior con perfil de usuario y botón de cerrar sesión.
- `TherapistLayout.tsx`: Panel simplificado enfocado únicamente en la agenda diaria y el registro de atenciones.

---

### 5.7. Vistas del Cliente Público (`src/pages/public/`)

1. `LandingPage.tsx`: Página de bienvenida con slider de tratamientos destacados, testimonios y llamada a la acción para reservar.
2. `ServicesCatalogPage.tsx`: Muestra la lista de servicios filtrables por categoría (Masajes, Faciales, etc.) con sus descripciones, duración y precios.
3. `BookingWizardPage.tsx`: **Asistente de reserva en 4 pasos:**
   - *Paso 1:* Selección del servicio deseado.
   - *Paso 2:* Elección de la terapeuta de preferencia (o asignación automática).
   - *Paso 3:* Selección de fecha en calendario y hora disponible calculada por el backend.
   - *Paso 4:* Ingreso de datos del cliente (Nombre, DNI de 8 dígitos, Teléfono, Email) y confirmación.
4. `BookingConfirmationPage.tsx`: Muestra el ticket de confirmación con el **Código Único de Reserva** y botón para descargar el comprobante en PDF.
5. `ManageAppointmentPage.tsx`: Permite a un cliente ingresar su DNI y su Código Único para consultar el estado de su cita, reprogramar la fecha o cancelarla.

---

### 5.8. Vistas de la Terapeuta (`src/pages/therapist/`)

1. `TherapistAgendaPage.tsx`: Vista de calendario y lista de las citas programadas para el día de la terapeuta en sesión.
2. `TherapistAppointmentDetailPage.tsx`: Formulario clínico donde la terapeuta atiende al cliente, anota observaciones médicas y confirma los insumos consumidos.
3. `TherapistInventoryPage.tsx`: Vista de consulta para verificar la disponibilidad de productos en el spa.

---

### 5.9. Vistas del Administrador (`src/pages/admin/`)

1. `AdminDashboardPage.tsx`: Tablero de control con métricas en tiempo real (ingresos del día, citas por estado, ocupación de cabinas y gráficos de rendimiento).
2. `GlobalAgendaPage.tsx`: Calendario maestro interactivo que muestra todas las citas de todas las terapeutas y cabinas simultáneamente.
3. `AdminAppointmentsPage.tsx`: Tabla completa con filtros avanzados para buscar, crear, editar o anular cualquier cita del sistema.
4. `AdminServicesPage.tsx`: Gestión CRUD (Crear, Leer, Actualizar, Desactivar) de servicios y categorías.
5. `AdminTherapistsPage.tsx`: Registro de terapeutas, asignación de turnos y configuración de días de descanso.
6. `AdminCabinsPage.tsx`: Control de disponibilidad y programación de mantenimiento de cabinas.
7. `AdminInventoryPage.tsx`: Control de stock en tiempo real, registro de entradas y salidas de mercadería, y configuración de Recetas BOM por servicio.
8. `AdminCashRegisterPage.tsx`: Apertura, cierre y arqueo diario de caja registradora.
9. `AdminMarketingPage.tsx`: Creación de cupones de descuento y campañas de fidelización.
10. `AdminReportsPage.tsx`: Generador de reportes financieros y operativos con exportación a PDF y Excel/CSV.
11. `AdminUsersPage.tsx`: Administración de cuentas de usuario del personal y asignación de roles.

---

### 5.10. Vistas de Autenticación y Errores (`src/pages/auth/`)

1. `LoginPage.tsx`: Formulario de inicio de sesión para el personal con validación en tiempo real.
2. `UnauthorizedPage.tsx`: Pantalla de advertencia cuando un usuario intenta acceder a una sección sin los permisos requeridos (Error 403).
3. `NotFoundPage.tsx`: Pantalla informativa cuando se intenta acceder a una ruta inexistente (Error 404).

---

# 6. MATRIZ DE RELACIONES: ¿QUIÉN SE COMUNICA CON QUIÉN?

| Acción del Usuario | Componente Frontend | Servicio Frontend | Endpoint Backend (URL) | Vista Backend (`views.py`) | Tablas MySQL Involucradas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Iniciar Sesión** | `LoginPage.tsx` | `authService.ts` | `POST /api/auth/login/` | `CustomTokenObtainPairView` | `usuarios` |
| **Consultar Catálogo** | `ServicesCatalogPage.tsx` | `publicService.ts` | `GET /api/services/public_catalog/` | `ServicioViewSet.public_catalog` | `servicios`, `categorias_servicio` |
| **Ver Horarios Libres** | `BookingWizardPage.tsx` | `publicService.ts` | `GET /api/therapists/available_slots/` | `TerapeutaViewSet.available_slots` | `horarios_terapeuta`, `citas`, `bloqueos_horario` |
| **Crear Reserva** | `BookingWizardPage.tsx` | `publicService.ts` | `POST /api/appointments/` | `CitaViewSet.create` (*select_for_update*) | `citas`, `historial_citas` |
| **Buscar Mi Cita** | `ManageAppointmentPage.tsx`| `publicService.ts` | `POST /api/appointments/lookup/` | `CitaViewSet.lookup_appointment` | `citas`, `servicios`, `terapeutas` |
| **Finalizar Atención** | `TherapistAppointmentDetailPage.tsx` | `therapistService.ts` | `POST /api/attention/{id}/completar/` | `AtencionViewSet.completar_atencion` | `atenciones_citas`, `insumos`, `movimientos_inventario`, `citas` |
| **Ver Dashboard KPI** | `AdminDashboardPage.tsx` | `adminService.ts` | `GET /api/reports/dashboard_metrics/` | `DashboardMetricsView.get` | `citas`, `movimientos_caja`, `cabinas` |
| **Descargar PDF** | `BookingConfirmationPage.tsx` | `adminService.ts` | `GET /api/reports/appointment_pdf/{id}/` | `AppointmentPDFView.get` (*ReportLab*) | `citas`, `servicios`, `usuarios` |

---

# 7. GUÍA DE PREGUNTAS CLAVE PARA LA SUSTENTACIÓN

### Pregunta 1: ¿Cómo evita el sistema que dos clientes reserven la misma cabina o terapeuta al mismo segundo?
> **Respuesta:** En `backend/apps/appointments/views.py`, la función de reserva está envuelta en una transacción atómica `@transaction.atomic`. Dentro de ella, utilizamos `select_for_update()`, que es un bloqueo pesimista a nivel de base de datos. Cuando entra una petición, bloquea temporalmente las filas de ese horario en MySQL. Si entra otra petición idéntica al mismo milisegundo, esta debe esperar. Al liberarse el bloqueo, la segunda petición detecta que el horario ya no está libre y responde automáticamente con un error `409 Conflict`, evitando el solapamiento.

### Pregunta 2: ¿Dónde y cómo se protegen las contraseñas y las sesiones de usuario?
> **Respuesta:** Las contraseñas nunca se guardan en texto plano; Django las encripta usando el algoritmo hash `PBKDF2 con SHA-256`. Para las sesiones, utilizamos tokens `JWT (JSON Web Tokens)` mediante la librería SimpleJWT. El token viaja en las cabeceras HTTP de forma cifrada. Además, en el frontend (`AuthContext.tsx`), tenemos implementado un centinela de seguridad que detecta 5 minutos de inactividad del usuario y destruye el token automáticamente para evitar que otra persona use la sesión abierta.

### Pregunta 3: ¿Cómo se garantiza que el inventario no tenga pérdidas ni discrepancias?
> **Respuesta:** A través del sistema **BOM (Bill of Materials)** configurado en el módulo `inventory`. Cada servicio tiene una receta predefinida (ej. 30 ml de aceite por cada masaje). Cuando la terapeuta finaliza la cita en `attention/views.py`, el backend lee automáticamente la receta y realiza el descuento exacto en la tabla de insumos, registrando un movimiento de salida tipo Kardex con fecha, hora y responsable.

### Pregunta 4: ¿Por qué la búsqueda de citas utiliza un Código Único en vez del ID de la base de datos?
> **Respuesta:** Para prevenir ataques de tipo **IDOR / BOLA (Insecure Direct Object Reference)**. Si usáramos IDs correlativos (ej: `cita/1`, `cita/2`), un atacante podría cambiar el número en el navegador y ver las citas y datos privados de otros clientes. Al utilizar un `codigo_unico` alfanumérico aleatorio combinado obligatoriamente con el `DNI` validado por expresión regular, es imposible adivinar o vulnerar la privacidad de los clientes.

### Pregunta 5: ¿Qué estrategia de Alta Disponibilidad tiene el sistema si el servidor de base de datos falla?
> **Respuesta:** Tenemos configurado un esquema de **Replicación MySQL Maestro-Esclavo** en la carpeta `replication/`. El servidor Maestro (puerto 3307) registra todas las escrituras en un log binario que se transmite en tiempo real al Esclavo (puerto 3308). Si el servidor maestro sufre un corte de energía o fallo de disco, el esclavo está listo para asumir las lecturas de inmediato, garantizando cero pérdida de datos del negocio.