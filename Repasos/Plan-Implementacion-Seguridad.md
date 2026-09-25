# PLAN DE IMPLEMENTACIÓN TÉCNICA DE SEGURIDAD Y DIAPOSITIVAS — SUMAQ SPA
**Proyecto:** SUMAQ Spa & Centro de Bienestar  
**Objetivo:** Guía de modificaciones de código, creación de nuevos componentes y generación de la presentación ejecutiva requerida en la Diapositiva 41 (Unidades 1, 2 y 3).

---

## 1. Archivos Existentes a Modificar

### A. `backend/config/settings.py`
- **Objetivo:** Activar políticas de defensa ante Fuerza Bruta (Diapositiva 29), revocación persistente de tokens JWT (Diapositiva 23), auditoría de logs (Diapositiva 35) y cabeceras de hardening web (Diapositiva 34).
- **Modificaciones requeridas:**
  1. **Throttling / Rate Limiting (Mitigación de Fuerza Bruta y DoS):**
     Configurar en el diccionario `REST_FRAMEWORK`:
     ```python
     'DEFAULT_THROTTLE_CLASSES': [
         'rest_framework.throttling.AnonRateThrottle',
         'rest_framework.throttling.UserRateThrottle'
     ],
     'DEFAULT_THROTTLE_RATES': {
         'anon': '60/minute',
         'user': '600/minute',
         'login_burst': '5/minute',  # Para frenar ataques de diccionario
     }
     ```
  2. **Token Blacklist (Revocación Inmediata de Sesiones Comprometidas):**
     Agregar `'rest_framework_simplejwt.token_blacklist'` a `INSTALLED_APPS` y configurar `'BLACKLIST_AFTER_ROTATION': True` dentro de `SIMPLE_JWT`.
  3. **Logging de Seguridad Centralizado (Auditoría / Control Detectivo):**
     Definir el diccionario `LOGGING` para capturar eventos de autenticación fallida, peticiones bloqueadas (403/429) y excepciones no controladas en un archivo dedicado `logs/security.log`.
  4. **Directivas Seguras de Producción (`DEBUG = False`):**
     Añadir variables condicionales para forzar redirección HTTPS (`SECURE_SSL_REDIRECT = True`), HSTS y cookies seguras con atributo `SameSite='Lax'`.

### B. `backend/apps/accounts/views.py` y `urls.py`
- **Objetivo:** Aplicar el rate limiting específico en el endpoint de autenticación y permitir el cierre de sesión seguro mediante invalidación de tokens en la lista negra.
- **Modificaciones requeridas:**
  1. En `LoginView`: Aplicar `throttle_scope = 'login_burst'` para que si una IP intenta más de 5 inicios de sesión en un minuto, el servidor responda automáticamente con **HTTP 429 Too Many Requests**.
  2. Crear la vista `LogoutView` (`POST /api/auth/logout/`): Recibe el `refresh_token`, lo invalida en base de datos usando `token.blacklist()` y destruye la sesión, impidiendo ataques de repetición (*replay attacks*).

### C. `backend/apps/appointments/views.py`
- **Objetivo:** Blindar el endpoint público de reservas web contra bots acaparadores de citas y denegación de servicio.
- **Modificaciones requeridas:**
  - En la vista `ReservaWebCreateView`, vincular un limitador de tasa de peticiones anónimas (`AnonRateThrottle` o un `ReservaWebRateThrottle` específico de 10 peticiones/hora por IP).

### D. `frontend/src/services/api.ts`
- **Objetivo:** Gestionar adecuadamente las respuestas de seguridad del backend (ataques de fuerza bruta bloqueados con 429) y coordinar el logout seguro.
- **Modificaciones requeridas:**
  1. En el interceptor de respuestas de Axios: Capturar el código `HTTP 429 Too Many Requests` para notificar al usuario de forma amigable (*"Demasiados intentos fallidos. Por seguridad, espere 1 minuto antes de reintentar"*).
  2. En la función `logout()`: Enviar la petición de revocación a `/api/auth/logout/` antes de limpiar el `localStorage` del cliente.

### E. `frontend/src/pages/Login.tsx`
- **Objetivo:** Mostrar mensajes preventivos de seguridad sin filtrar datos técnicos ni revelar si el usuario existe o no (principio de Diapositiva 32).
- **Modificaciones requeridas:**
  - Manejar el estado de bloqueo temporal por fuerza bruta y advertencias en caso de cuentas inactivadas administrativamente (`USER_INACTIVE`).

### F. `final/docs/S03-02-v2.pptx` (Actualización de Slides 5, 6 y 7)
- **Objetivo:** Alinear el marco conceptual inicial con el código real y robustecido.
- **Modificaciones requeridas:**
  - **Diapositiva 5:** Enriquecer la lista de riesgos agregando los factores humanos (credenciales débiles, ingeniería social, falta de revocación de accesos) y amenazas web (SQLi, XSS, Fuerza Bruta, IDOR).
  - **Diapositiva 6:** Cambiar la estrategia de **R5 (Inconsistencia de caja)** de *"Aceptar"* a *"Mitigar"*, y reajustar el nivel de riesgo de **R4 (Exposición de datos)** a prioridad crítica.
  - **Diapositiva 7:** Describir la prevención real implementada: **bloqueo pesimista a nivel de fila (`select_for_update`) con transacciones atómicas ACID** y validación Anti-IDOR.

---

## 2. Archivos Nuevos a Crear

### A. `backend/apps/common/throttling.py`
- **Contenido y Funcionalidad:**
  Clases de limitación de tasa de peticiones heredadas de `rest_framework.throttling.SimpleRateThrottle`:
  - `LoginBurstThrottle`: Aplica la regla estricta de 5 intentos por minuto por IP para el formulario de login.
  - `ReservaWebThrottle`: Previene la creación automatizada de reservas fraudulentas por scripts.

### B. `backend/tests/test_security_attacks.py`
- **Contenido y Funcionalidad:**
  Suite de pruebas automatizadas que valida formalmente las defensas ante los ataques exigidos por el docente:
  1. `test_sql_injection_defense()`: Intenta inyectar `' OR 1=1 --` en parámetros de búsqueda y login, validando que el ORM bloquee la inyección y no devuelva datos indebidos.
  2. `test_xss_sanitization()`: Envía payloads `<script>alert('xss')</script>` en campos de notas de terapeuta y comprueba que se persistan desinfectados y escapados.
  3. `test_brute_force_rate_limiting()`: Ejecuta 6 peticiones consecutivas a `/api/auth/login/` y comprueba que la 6ta responda con `429 Too Many Requests`.
  4. `test_csrf_and_stateless_jwt()`: Verifica que peticiones sin el header `Authorization: Bearer` sean rechazadas con 401.
  5. `test_idor_fichas_clinicas()`: Comprueba que una terapeuta autenticada reciba un `403 Forbidden` si intenta leer la ficha de una cita ajena.

### C. `admin_tools/generate_security_presentation.py`
- **Contenido y Funcionalidad:**
  Script automatizado en Python utilizando la biblioteca `python-pptx`.
  - Construye la presentación oficial en formato `.pptx` aplicando la paleta de colores corporativa de SUMAQ (Tonos tierra/spa: `#8C6F55`, `#2C2725`, `#FAF8F5`, `#C8907E`), tablas de riesgos estructuradas, tarjetas de control TIC e iconografía.

### D. `final/docs/PRESENTACION_SEGURIDAD_SUMAQ_CASO_ESTUDIO.pptx`
- **Contenido y Funcionalidad:**
  Archivo ejecutable de la presentación final para la sustentación ante el docente supervisor.

### E. `files/GUION_SUSTENTACION_SEGURIDAD_SUMAQ.md`
- **Contenido y Funcionalidad:**
  Libreto/guion detallado para la exposición oral del equipo, explicando diapositiva por diapositiva qué decir, cómo defender las decisiones técnicas y cómo responder a las preguntas críticas del docente.

---

## 3. Estructura de la Presentación PPTX (12 Diapositivas según Diapositiva 41)

1. **Diapositiva 1: Portada y Contexto del Caso**
   - Título: *Estrategia Integral de Seguridad y Mecanismos de Defensa — Sistema Web SUMAQ Spa*.
   - Contexto: Plataforma de ventas, reservas y atención clínica con manejo de datos sensibles (datos personales, transacciones, historias estéticas).
2. **Diapositiva 2: Tríada CIA y Enfoque Security by Design**
   - Confidencialidad (RBAC/Anti-IDOR), Integridad (Transacciones ACID/Prepared Statements), Disponibilidad (Health check/Backups 3-2-1).
3. **Diapositiva 3: Identificación de Riesgos Técnicos vs. Humanos**
   - Clasificación formal entre fallas de código/arquitectura y vectores de error humano/ingeniería social.
4. **Diapositiva 4: Matriz de Impacto / Probabilidad Jerarquizada**
   - Cálculo de $P \times I$, niveles de prioridad, corrección del riesgo de caja (a mitigar) y categorización de riesgos residuales tras controles.
5. **Diapositiva 5: Tipología de Controles TIC (Preventivos, Detectivos y Correctivos)**
   - Mapeo de candado (preventivo), lupa/monitoreo (detectivo) y herramientas (correctivo) con componentes de código reales de SUMAQ.
6. **Diapositiva 6: Mecanismos de Defensa I — SQL Injection y XSS**
   - Prepared Statements en el ORM de Django y generación vectorial en memoria con ReportLab (sin motores HTML vulnerables).
7. **Diapositiva 7: Mecanismos de Defensa II — Fuerza Bruta y CSRF**
   - Hashing NIST PBKDF2 (>600k iteraciones), Throttling en login, y tokens JWT inmunes a CSRF.
8. **Diapositiva 8: Defensas Avanzadas Propias — Anti-IDOR y Anti-Double Booking**
   - Demostración técnica de `has_object_permission` (`IsAssignedTherapistOrAdmin`) y bloqueo pesimista `select_for_update()` en reservas web.
9. **Diapositiva 9: Arquitectura de Autenticación, RBAC y Cifrado**
   - Tokens JWT con rotación obligatoria, principio de mínimo privilegio (`IsAuthenticated` por omisión) y cifrado en tránsito (TLS) y reposo.
10. **Diapositiva 10: Validación y Análisis Crítico (Preguntas Clave de la Diapositiva 41)**
    - Qué protege cada control, suficiencia del nivel propuesto y componentes faltantes.
11. **Diapositiva 11: Plan de Mitigación y Hardening para Producción**
    - Throttling activo, Token Blacklist en base de datos, WAF perimetral, MFA para administradores y centralización de logs.
12. **Diapositiva 12: Conclusiones y Demostración Práctica**
    - Resumen del éxito de las defensas y referencia a la suite de pruebas unitarias automatizadas (`test_rbac_security.py`, `test_concurrency.py`, `test_auth.py`).
