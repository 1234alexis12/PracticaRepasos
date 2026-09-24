# Guía de Estudio Integral: Sistemas de Información Empresarial (SIE)

---

## 📌 Unidad 1: Fundamentos y Rol Estratégico de los SIE (Semanas 01 y 02)

### 1.1 Definición y Enfoque Sistémico
* **Sistema de Información Empresarial (SIE):** Conjunto integrado de elementos interrelacionados que recolectan, procesan, almacenan y distribuyen datos e información para apoyar la coordinación, el control, el análisis y la toma de decisiones en una organización.
* **Fundamento en la Teoría General de Sistemas:**
  $$\text{Entrada (Input)} \longrightarrow \text{Procesamiento} \longrightarrow \text{Salida (Output)} \longrightarrow \text{Retroalimentación (Feedback)}$$
  * **Entrada:** Captura de datos en bruto del entorno interno o externo (ej. lectura de código de barras, registro de usuario).
  * **Procesamiento:** Conversión, análisis, cálculo y ordenamiento de los datos en información útil.
  * **Salida:** Distribución de reportes, alertas, órdenes de compra o interfaces visuales a los interesados.
  * **Retroalimentación:** Salida que sirve para ajustar, calibrar o validar la entrada y el procesamiento.

### 1.2 Componentes Esenciales de un SIE
1. **Hardware:** Infraestructura física y dispositivos (servidores, estaciones de trabajo, terminales POS, routers).
2. **Software:** Programas, frameworks, sistemas operativos y aplicaciones empresariales.
3. **Datos:** El activo estratégico primordial. Deben cumplir con tres atributos esenciales:
   * *Integridad:* Exactitud y coherencia de los datos.
   * *Seguridad:* Confidencialidad y protección ante accesos indebidos o fugas.
   * *Disponibilidad:* Accesibilidad en el momento requerido por los autorizados.
4. **Redes y Telecomunicaciones:** Infraestructura que conecta componentes internos y externos (LAN, WAN, Internet, arquitecturas en la nube, APIs).
5. **Personas / Usuarios:** **El componente más crítico**. Incluye usuarios finales, analistas, administradores y directores que interactúan con la solución e interpretan la información.
6. **Procesos:** Políticas, reglas de negocio y procedimientos que determinan el flujo de trabajo organizacional.

### 1.3 Evolución Histórica de los Sistemas
* **Años 1950s:** Procesamiento de datos manual y primeros sistemas de transacciones básicas (**TPS**).
* **Años 1970s:** Sistemas de Información Gerencial (**MIS**), orientados al control y la generación de reportes periódicos estructurados.
* **Años 1990s:** Sistemas integrados de Planificación de Recursos Empresariales (**ERP**), integrando compras, inventarios, finanzas y operaciones globales.
* **Actualidad:** Integración de Cloud Computing, Arquitectura de Microservicios, Big Data e Inteligencia Artificial / Analítica Avanzada.

---

### 1.4 Clasificación de los Sistemas según el Nivel Organizacional

| Sigla | Nombre Completo | Nivel Organizacional | Función y Aporte Clave | Ejemplo Real |
| :--- | :--- | :--- | :--- | :--- |
| **TPS** | *Transaction Processing System* | Operativo | Registra y procesa las transacciones repetitivas y rutinarias del día a día. Alta velocidad y confiabilidad. | Facturación en caja, venta en e-commerce, marcación de asistencia, registro de inventario. |
| **MIS** | *Management Information System* | Táctico / Administrativo | Consolida datos del TPS en resúmenes, tablas y reportes estructurados para control gerencial. | Reporte comparativo de ventas mensuales, ejecución presupuestaria trimestral. |
| **DSS** | *Decision Support System* | Táctico / Estratégico | Combina datos y modelos analíticos para apoyar la toma de decisiones no estructuradas o semiestructuradas (simulaciones "¿qué pasaría si...?"). | Proyección de demanda con cambio de precios, simulación de riesgos financieros. |
| **ESS / EIS** | *Executive Support System* | Estratégico | Cuadros de mando ejecutivos (dashboards), información agregada interna y del entorno competitivo. | KPI consolidados del holding, análisis de tendencias de mercado global. |
| **ERP** | *Enterprise Resource Planning* | Transversal / Organizacional | Sistema centralizado con base de datos única que conecta las áreas clave: Finanzas, Logística, RRHH, Manufactura. | SAP, Oracle NetSuite. |
| **CRM** | *Customer Relationship Management* | Transversal (Front-Office) | Centraliza el contacto, ciclo comercial, retención, fidelización y soporte al cliente. | Salesforce, HubSpot. |

---

### 1.5 Rol Estratégico y Ventaja Competitiva (Enfoque Michael Porter)
Los SIE no son únicamente un soporte tecnológico pasivo, sino un catalizador para obtener ventaja competitiva según el modelo de Porter:
1. **Liderazgo en costos:** Optimizar la cadena de valor mediante automatización de inventarios, reducción de mermas y procesos automatizados (ej. automatización logística).
2. **Diferenciación:** Ofrecer experiencias personalizadas al cliente mediante CRM, seguimiento en tiempo real y portales de autogestión.
3. **Enfoque o Nicho de mercado:** Capacidad de analizar segmentos específicos a través del procesamiento de datos para atender necesidades especializadas con mayor precisión.

---

## 📌 Unidad 2: Rediseño Organizacional y Toma de Decisiones (Semana 03)

### 2.1 Rediseño Organizacional con Enfoque SIE
El rediseño organizacional asistido por TI implica reconstruir flujos de trabajo, puestos, políticas y jerarquías aprovechando las capacidades digitales (automatización, eliminación de redundancias y monitoreo en tiempo real).
* **Diagnóstico AS-IS (Estado Actual):** Identificación de silos de información, tareas repetidas, reprocesos, falta de trazabilidad y dependencias burocráticas lentas.
* **Propuesta TO-BE (Estado Futuro):** Procesos optimizados soportados por un SIE integrado (ERP/CRM/BPM), con flujo continuo y trazabilidad de extremo a extremo.

### 2.2 Factores Críticos de Éxito vs. Causas de Fracaso en Implementaciones de SI

```
                ┌───────────────────────────────────────────────┐
                │ FACTORES CRÍTICOS EN IMPLEMENTACIONES DE SIE │
                └──────────────────────┬────────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
    [ Factores de Éxito ]                                 [ Causas de Fracaso ]
 • Alineación con la estrategia del negocio            • Resistencia humana al cambio
 • Respaldo y compromiso de la alta dirección          • Levantamiento deficiente de requerimientos
 • Capacitación continua a usuarios finales            • Falta de liderazgo y patrocinio gerencial
 • Gestión estructurada del cambio organizacional      • Problemas de incompatibilidad e integración
```

### 2.3 Apoyo a la Toma de Decisiones Gerenciales y Sistemas Expertos
* **Toma de decisiones gerenciales:** La disponibilidad de datos limpios y en tiempo real sustituye la intuición por analítica predictiva y descriptiva, disminuyendo los niveles de incertidumbre en el entorno de negocio.
* **Sistemas Expertos (SE):**
  * **Definición:** Aplicaciones de inteligencia artificial basadas en conocimiento que emulan el razonamiento o criterio analítico de un especialista humano.
  * **Estructura básica:** Utilizan un motor de inferencia y una base de reglas (*If-Then*) / hechos para deducir conclusiones.
  * **Casos típicos:** Aprobación automática de créditos y evaluación de perfiles de riesgo, diagnóstico en centros de salud, clasificación automática de incidencias técnicas.

---

## 📌 Unidad 3: Modelado de Procesos de Negocio con BPMN 2.0 (Semana 04)

### 3.1 Concepto e Importancia
* **Proceso de Negocio:** Conjunto estructurado y coordinado de actividades orientadas a generar un resultado que aporte valor a un cliente interno o externo.
* **Objetivo de la Optimización:** Disminuir tiempos de ciclo, eliminar reprocesos, evitar errores humanos, mejorar la visibilidad y asignar responsabilidades claras.
* **BPMN (Business Process Model and Notation):** Notación gráfica estandarizada a nivel mundial que sirve de puente de comunicación inequívoco entre el área operativa/negocio y los equipos de TI.

### 3.2 Elementos Centrales de BPMN 2.0

```
┌─────────────────┐      ┌───────────────┐      ┌─────────────┐      ┌───────────────┐
│  Evento Inicial │ ───> │   Actividad   │ ───> │  Compuerta  │ ───> │  Evento Final │
│ (Círculo verde) │      │  (Rectángulo) │      │  (Rombo X)  │      │  (Círculo rojo│
│                 │      │               │      │             │      │  borde grueso)│
└─────────────────┘      └───────────────┘      └─────────────┘      └───────────────┘
```

1. **Eventos (Círculos):**
   * *Evento de Inicio:* Círculo de línea delgada simple (indica cuándo comienza el proceso).
   * *Evento Intermedio:* Doble línea delgada (ocurre durante la ejecución, ej. espera de tiempo o recepción de mensaje).
   * *Evento de Fin:* Círculo con borde grueso o color rojo (determina la culminación del flujo).
2. **Actividades / Tareas (Rectángulos con esquinas redondeadas):** Unidad elemental de trabajo realizada por un participante o sistema automatizado (ej. "Verificar Stock", "Emitir Factura").
3. **Compuertas / Gateways (Rombos):** Mecanismos para controlar la divergencia y convergencia de secuencias de flujo.
   * *Compuerta Exclusiva (XOR - marca 'X' o vacío):* Evalúa condiciones de negocio y selecciona **únicamente un camino** excluyente (ej. ¿Solicitud aprobada? -> Sí o No).
   * *Compuerta Paralela (AND - marca '+'):* Bifurca el flujo en **todos los caminos simultáneamente** sin evaluar condiciones lógicas, o sincroniza esperando la culminación de todos los ramales entrantes.
   * *Compuerta Inclusiva (OR - marca 'O'):* Permite activar **uno o múltiples caminos** dependiendo de cuáles condiciones resulten verdaderas.
4. **Flujos y Conectores (Líneas / Flechas):**
   * *Flujo de Secuencia:* Flecha sólida continua. Expresa el orden temporal en que se realizan las tareas dentro de un mismo proceso o participante.
   * *Flujo de Mensaje:* Línea punteada con un círculo hueco al inicio y flecha hueca al final. Representa intercambio de mensajes entre organizaciones o pools independientes.
5. **Contenedores de Organización:**
   * *Pool:* Representa una entidad, participante u organización completa.
   * *Carril (Lane / Swimlane):* Subdivisiones horizontales o verticales dentro del Pool que representan roles o áreas específicas (ej. "Solicitante", "Jefe Aprobador", "Logística").

### 3.3 Relación entre BPMN y el Análisis de Requerimientos de Software

$$\text{Proceso de Negocio Real} \longrightarrow \text{Análisis de Sistemas} \longrightarrow \text{Modelado BPMN (TO-BE)} \longrightarrow \text{Requisitos de Software} \longrightarrow \text{Desarrollo e Implementación}$$

> **Principio de oro:** *"Automatizar un proceso ineficiente o erróneo solo genera errores e ineficiencias automatizadas a mayor velocidad."* Por ende, modelar y optimizar con BPMN es un prerrequisito obligatorio antes de programar cualquier sistema.

---

## 📌 Unidad 4: Desarrollo Ágil y Arquitecturas de Software (Semana 05)

### 4.1 Metodologías Tradicionales (Cascada) vs. Metodologías Ágiles (Agile)

| Criterio | Modelo Tradicional (Cascada / Secuencial) | Marco de Trabajo Ágil (Scrum / Kanban) |
| :--- | :--- | :--- |
| **Estructura** | Fases secuenciales rígidas: Requisitos $\rightarrow$ Análisis $\rightarrow$ Diseño $\rightarrow$ Programación $\rightarrow$ Pruebas $\rightarrow$ Despliegue. | Iterativo e incremental (ciclos cortos repetitivos). |
| **Respuesta al cambio** | Difícil y costoso; los cambios de requisitos suelen causar fallas o desviaciones de presupuesto/tiempo. | Adaptativo; el cambio se integra como una oportunidad de aportar mayor valor. |
| **Entrega de valor** | Al final del ciclo de vida (meses o años después de iniciar). | Entregas frecuentes de incrementos de software funcionales (cada sprint: 2 a 4 semanas). |
| **Participación del cliente** | Al inicio (requerimientos) y al final (pruebas de aceptación). | Continua e integrada en cada ciclo mediante feedback constante. |

### 4.2 Marco de Trabajo Scrum

#### A. Roles Esenciales
* **Product Owner (Dueño de Producto):** Responsable de maximizar el valor del software. Gestiona, redacta y prioriza la lista ordenada de requisitos (Product Backlog). Es la voz de los clientes y las áreas de negocio.
* **Scrum Master:** Líder servicial y facilitador. Remueve impedimentos, garantiza que se apliquen los valores y prácticas de Scrum y protege al equipo de distracciones externas.
* **Developers / Scrum Team (Equipo de Desarrollo):** Equipo multidisciplinario y autoorganizado responsable de diseñar, programar, probar y entregar un incremento de producto potencialmente desplegable.

#### B. Ceremonias / Eventos
1. **Sprint Planning (Planificación del Sprint):** Definición del objetivo del sprint (*Sprint Goal*) y selección de los ítems del Product Backlog que se transformarán en tareas concretas.
2. **Daily Scrum (Reunión Diaria):** Breve reunión de 15 minutos frente al tablero. Cada miembro comparte: ¿Qué hizo ayer?, ¿Qué hará hoy?, ¿Qué impedimento tiene?
3. **Sprint Review (Revisión del Sprint):** Demostración del software terminado y funcional a los interesados (*stakeholders*) para recibir retroalimentación.
4. **Sprint Retrospective (Retrospectiva del Sprint):** Reunión interna del equipo para analizar su rendimiento, procesos, relaciones de equipo e implementar mejoras para el siguiente sprint.

#### C. Artefactos
* **Product Backlog (Pila de Producto):** Inventario priorizado y vivo de todas las características, requerimientos, mejoras y correcciones deseadas.
* **Sprint Backlog (Pila de Sprint):** Subconjunto de ítems del Product Backlog seleccionados para el sprint en curso, junto con el plan para completarlos.
* **Burndown Chart:** Gráfico que muestra la cantidad de trabajo restante versus el tiempo asignado en el sprint para monitorear el ritmo del equipo.

#### D. Estructura Estándar de una Historia de Usuario (User Story)
$$\text{\textbf{Como }} [\text{Rol/Cargo}], \quad \text{\textbf{Quiero }} [\text{Funcionalidad/Acción}], \quad \text{\textbf{Para }} [\text{Beneficio/Valor de negocio}]$$
* Acompañada indispensablemente por sus **Criterios de Aceptación** (reglas que determinan cuándo la historia está terminada con éxito), **Prioridad** (Alta, Media, Baja) y **Estimación** (puntos de historia o tiempo).

---

### 4.3 Ecosistema Tecnológico: Frameworks, Librerías y Arquitecturas

#### Diferencia Clave: Framework vs. Librería
* **Framework (Marco de trabajo):** Estructura y arquitectura base predefinida que estandariza la solución y dicta el flujo de control (*Inversión de Control: el framework llama a tu código*).
  * *Frontend:* Angular, Vue.js.
  * *Backend:* Spring Boot (Java), Django (Python), Laravel (PHP), ASP.NET Core (C#).
* **Librería (Biblioteca):** Colección de funciones, clases y módulos reutilizables que el desarrollador invoca según su necesidad (*El programador tiene el control del flujo*).
  * *Ejemplos:* React.js (librería UI), Pandas / NumPy (manejo de datos), Matplotlib (gráficos), jQuery.

#### Arquitectura de Microservicios vs. Monolito
* **Microservicios:** Estilo arquitectónico donde una solución se descompone en un conjunto de servicios modulares pequeños e independientes.
  * Cada microservicio se enfoca en una funcionalidad de negocio única (ej. Servicio de Cuentas, Servicio de Catálogo de Productos, Servicio de Envíos).
  * Poseen su propia base de datos descentralizada.
  * Se comunican a través de protocolos ligeros y APIs HTTP/REST vía un **API Gateway**.
  * **Ventajas:** Despliegue independiente, escalabilidad modular, alta resiliencia y tolerancia a fallos, soporte para tecnologías mixtas y equipos autónomos.

---

## 📌 Cuestionario de Autoevaluación para el Examen

1. **¿Qué es un Sistema de Información Empresarial y qué rol juegan las personas en él?**
   * *Respuesta de estudio:* Es un sistema sociotécnico compuesto por hardware, software, datos, redes, procesos y personas, destinado a recopilar, procesar y distribuir información. Las personas son el elemento más crítico, pues de su adopción, uso y análisis depende el retorno de inversión y el éxito del sistema.

2. **¿Por qué la automatización de un proceso ineficiente es contraproducente?**
   * *Respuesta de estudio:* Porque la tecnología no soluciona cuellos de botella organizacionales por sí sola. Si un proceso manual tiene reprocesos o fallas de validación, automatizarlo sin rediseño previo generará errores a gran escala y con mayor velocidad.

3. **¿Cuál es la diferencia entre compuerta XOR y compuerta AND en BPMN?**
   * *Respuesta de estudio:* La compuerta XOR (Exclusiva) evalúa condiciones y elige una y solo una ruta de salida posible; la compuerta AND (Paralela) no evalúa condiciones y activa todas las ramas salientes al mismo tiempo de forma concurrente.

4. **¿Por qué Scrum responde mejor a los cambios de requerimientos en comparación con el modelo en Cascada?**
   * *Respuesta de estudio:* Porque divide el proyecto en sprints cortos de 2 a 4 semanas con entregas continuas y funcionales. El Product Backlog se reprioriza de manera flexible y el feedback constante del cliente permite corregir el rumbo sin tener que rehacer todo el sistema.

5. **¿Qué ventajas aporta la arquitectura de microservicios frente a una arquitectura monolítica tradicional?**
   * *Respuesta de estudio:* Permite que diferentes equipos trabajen y desplieguen servicios de forma autónoma, permite escalar únicamente el componente saturado (por ejemplo, el módulo de pagos en época de alta demanda) y otorga resiliencia (la caída de un microservicio no detiene la totalidad del sistema).