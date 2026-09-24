# 🐍 Guía Maestra de Python 3: Del Cero al Desarrollador Profesional

> *"Simple es mejor que complejo. Complejo es mejor que complicado. La legibilidad cuenta."* — *El Zen de Python (PEP 20)*

---

## 📚 Índice de Contenidos
1. [El Modelo Mental de Python (Todo es un Objeto)](#-el-modelo-mental-de-python)
2. [Mutabilidad vs Inmutabilidad y Paso por Referencia](#-mutabilidad-vs-inmutabilidad)
3. [Estructuras de Datos Nativas y su Complejidad Algorítmica](#-estructuras-de-datos-y-rendimiento)
4. [Control de Flujo y Comprehensions Elegantes](#-control-de-flujo-y-comprehensions)
5. [Funciones Avanzadas, Regla LEGB y Decoradores](#-funciones-avanzadas-scope-legb-y-decoradores)
6. [Programación Orientada a Objetos y Métodos Dunder](#-programaci%C3%B3n-orientada-a-objetos-poo)
7. [Manejo Profesional de Errores y Context Managers (`with`)](#-errores-y-context-managers-with)
8. [Entornos Virtuales y Gestión de Dependencias](#-entornos-virtuales-venv)
9. [Los 10 Errores Clásicos en Python (¡Evítalos!)](#-los-10-errores-cl%C3%A1sicos-en-python)
10. [Mapa de Lecciones Prácticas en esta Carpeta](#-mapa-de-lecciones-pr%C3%A1cticas-en-esta-carpeta)

---

## 🧠 El Modelo Mental de Python

En Python, **las variables no son cajas que guardan valores**; son **etiquetas con nombre (punteros)** que apuntan a un objeto que vive en la memoria Heap:

```
Variable 'a' ----> [ Objeto Entero: 42 ] (dirección en memoria: 0x7ffd1a...)
                      ^
Variable 'b' --------/ (ambas apuntan al mismo objeto en memoria)
```

Puedes comprobar la dirección exacta de memoria con la función integrada `id()`:
```python
a = [1, 2, 3]
b = a # b apunta exactamente a la misma lista en memoria
b.append(4)
print(a) # [1, 2, 3, 4] -> ¡'a' también cambió!
print(id(a) == id(b)) # True
```

---

## 🧊 Mutabilidad vs Inmutabilidad

Entender la mutabilidad es la diferencia entre un programador novato y un profesional:

| Tipo de Objeto | ¿Es Mutable? | Ejemplos | Comportamiento |
| :--- | :---: | :--- | :--- |
| **Inmutables** | ❌ NO | `int`, `float`, `str`, `tuple`, `bool`, `frozenset` | Al "modificarlos", Python crea un objeto completamente nuevo en memoria. |
| **Mutables** | ✅ SÍ | `list`, `dict`, `set`, instancias de clases | Se modifican en el mismo espacio de memoria *(in-place)* sin crear un nuevo objeto. |

---

## 📊 Estructuras de Datos y Rendimiento

| Estructura | Sintaxis | Ordenada | Duplicados | Búsqueda `in` | Inserción |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Lista (`list`)** | `[1, 2, 3]` | ✅ Sí | ✅ Permite | $O(N)$ (lento en millones) | $O(1)$ con `append` |
| **Tupla (`tuple`)** | `(1, 2, 3)` | ✅ Sí | ✅ Permite | $O(N)$ | Inmutable (más ligera) |
| **Diccionario (`dict`)** | `{"id": 1}` | ✅ Sí (desde 3.7) | ❌ Claves únicas | **$O(1)$ (ultrarrápido)** | **$O(1)$** |
| **Conjunto (`set`)** | `{1, 2, 3}` | ❌ No | ❌ No permite | **$O(1)$ (ultrarrápido)** | **$O(1)$** |

> 💡 **Consejo de Rendimiento:** Si necesitas buscar elementos con frecuencia (`if elemento in coleccion`), convierte tu lista en un `set` o `dict` para pasar de una búsqueda lineal $O(N)$ a una búsqueda instantánea $O(1)$.

---

## ✨ Control de Flujo y Comprehensions

Escribe código legible y conciso al estilo *Pythonic*:

```python
# 1. List Comprehension: [expresion for elemento in iterable if condicion]
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
cuadrados_pares = [n ** 2 for n in numeros if n % 2 == 0]
# Resultado: [4, 16, 36, 64, 100]

# 2. Dict Comprehension:
usuarios = [("usr1", "Alexis"), ("usr2", "Carlos"), ("usr3", "Lucia")]
mapa_usuarios = {clave: nombre for clave, nombre in usuarios}

# 3. Generadores (Ahorran gigabytes de memoria RAM):
# En lugar de crear 10 millones de números en RAM con [], usamos ():
generador_gigante = (x * 2 for x in range(10_000_000))
print(next(generador_gigante)) # 0
print(next(generador_gigante)) # 2
```

---

## 🎯 Funciones Avanzadas, Scope (LEGB) y Decoradores

### 1. La Regla de Búsqueda de Variables: LEGB
Cuando usas una variable, Python la busca en este orden estricto:
1. **L**ocal: Dentro de la función actual.
2. **E**nclosing: En funciones anidadas envolventes (closures).
3. **G**lobal: En el nivel superior del archivo/módulo.
4. **B**uilt-in: En las funciones nativas de Python (`len`, `print`, `range`).

### 2. ¿Qué es un Decorador?
Un decorador es una función que envuelve a otra para extender su comportamiento sin modificar su código:

```python
import time

def medir_tiempo(funcion_original):
    def envoltura(*args, **kwargs):
        inicio = time.time()
        resultado = funcion_original(*args, **kwargs)
        fin = time.time()
        print(f"⏱️ La función '{funcion_original.__name__}' tardó {fin - inicio:.4f} segundos.")
        return resultado
    return envoltura

@medir_tiempo
def proceso_pesado():
    time.sleep(0.5)
    return "Completado"

proceso_pesado()
```

---

## 🏛️ Programación Orientada a Objetos (POO)

```python
class CuentaBancaria:
    """Representa una cuenta bancaria con saldo encapsulado."""
    
    def __init__(self, titular: str, saldo_inicial: float = 0.0):
        self.titular = titular
        self._saldo = saldo_inicial # Atributo protegido por convención

    def depositar(self, monto: float) -> None:
        if monto <= 0:
            raise ValueError("El monto a depositar debe ser positivo.")
        self._saldo += monto

    # Método Dunder para representar el objeto como texto amigable:
    def __str__(self) -> str:
        return f"Cuenta de {self.titular} | Saldo: S/ {self._saldo:.2f}"

    # Método Dunder para comparar igualdad (==):
    def __eq__(self, otro) -> bool:
        if isinstance(otro, CuentaBancaria):
            return self._saldo == otro._saldo
        return False
```

---

## 🛡️ Errores y Context Managers (`with`)

Usa siempre el bloque `with` para asegurar que recursos como archivos o conexiones de red se cierren automáticamente, incluso si ocurre un error inesperado:

```python
try:
    with open("datos_estudiantes.txt", "w", encoding="utf-8") as archivo:
        archivo.write("Alexis - Promedio: 19.5\n")
        archivo.write("María - Promedio: 18.0\n")
except IOError as err:
    print(f"Error de entrada/salida: {err}")
finally:
    print("Operación finalizada de forma segura.")
```

---

## 📦 Entornos Virtuales (`venv`)

Para no contaminar tu instalación global de Python con paquetes de diferentes proyectos:

```powershell
# 1. Crear el entorno virtual en la carpeta .venv
python -m venv .venv

# 2. Activar en Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# 3. Instalar paquetes de forma aislada
pip install requests pandas

# 4. Guardar dependencias en un archivo congelado
pip freeze > requirements.txt
```

---

## ⚠️ Los 10 Errores Clásicos en Python

| # | Error Clásico | Solución Correcta | ¿Por qué es un error? |
| :- | :--- | :--- | :--- |
| 1 | Usar argumentos mutables por defecto `def f(lista=[])` | `def f(lista=None): if lista is None: lista = []` | La lista mutable se comparte entre todas las llamadas futuras de la función. |
| 2 | Confundir `==` con `is` | Usar `==` para valores y `is` para identidad (`is None`) | `is` compara si son exactamente la misma dirección de memoria. |
| 3 | Modificar una lista mientras se itera sobre ella | Iterar sobre una copia `for x in lista[:]:` | Salta elementos y descalibra los índices del bucle. |
| 4 | Capturar excepciones genéricas con `except:` vacío | `except (ValueError, KeyError) as e:` | Oculta errores de sintaxis o interrupciones de teclado (<kbd>Ctrl+C</kbd>). |
| 5 | Abrir archivos sin `with` | Usar siempre `with open(...) as f:` | Deja archivos bloqueados en el sistema operativo. |
| 6 | Concatenar strings grandes con `+` en bucles | Usar `''.join(lista_cadenas)` | La concatenación con `+` crea un nuevo string en cada iteración ($O(N^2)$). |
| 7 | Ignorar las guías de estilo PEP 8 | Usar nombres `snake_case` para variables y funciones | Dificulta la lectura en equipos de desarrollo. |
| 8 | Olvidar `encoding="utf-8"` al leer/escribir archivos | `open("f.txt", encoding="utf-8")` | En Windows puede romper tildes y caracteres especiales. |
| 9 | Confundir variables globales sin la palabra clave `global` | Declarar `global var` o retornar el nuevo valor | Python crea una variable local sombra por defecto. |
| 10 | Reimplementar algoritmos existentes | Usar módulos nativos (`math`, `collections`, `itertools`, `pathlib`) | La librería estándar de Python está optimizada en C. |

---

## 🗺️ Mapa de Lecciones Prácticas en esta Carpeta

| Archivo | Nivel | Contenido Práctico |
| :--- | :---: | :--- |
| **[`00_arquitectura_memoria_y_modelo_de_datos.py`](./00_arquitectura_memoria_y_modelo_de_datos.py)** | 🏛️ Teórico | Identidad `id()`, mutabilidad, modelo de datos, LEGB, generadores y dunders. |
| **[`01_primeros_pasos_y_variables.py`](./01_primeros_pasos_y_variables.py)** | 🟢 Básico | `print()`, tipos primitivos (`int`, `str`, `float`, `bool`), f-strings y casting. |
| **[`02_operadores_y_condicionales.py`](./02_operadores_y_condicionales.py)** | 🟢 Básico | Aritmética, comparadores, operadores lógicos (`and`, `or`, `not`), `if`/`elif`/`else`. |
| **[`03_estructuras_de_datos_listas_y_tuplas.py`](./03_estructuras_de_datos_listas_y_tuplas.py)** | 🟡 Intermedio | Indexación negativa, slicing `[start:stop:step]`, métodos de listas y tuplas. |
| **[`04_diccionarios_y_conjuntos.py`](./04_diccionarios_y_conjuntos.py)** | 🟡 Intermedio | Diccionarios clave-valor, `.get()`, conjuntos `set` y operaciones de conjuntos. |
| **[`05_bucles_y_control_de_flujo.py`](./05_bucles_y_control_de_flujo.py)** | 🟡 Intermedio | `for`, `while`, `range()`, `enumerate()`, `zip()`, List Comprehensions. |
| **[`06_funciones_y_modularidad.py`](./06_funciones_y_modularidad.py)** | 🟡 Intermedio | `def`, `*args`, `**kwargs`, funciones `lambda`, Scope y retorno múltiple. |
| **[`07_manejo_de_errores_y_archivos.py`](./07_manejo_de_errores_y_archivos.py)** | 🔴 Avanzado | `try`/`except`/`finally`, lectura y escritura con `with open(...)`. |
| **[`08_programacion_orientada_a_objetos.py`](./08_programacion_orientada_a_objetos.py)** | 🔴 Avanzado | Clases, `__init__`, encapsulación, métodos de instancia, herencia y polimorfismo. |
| **[`09_retos_y_proyectos_practicos.py`](./09_retos_y_proyectos_practicos.py)** | 🏆 Proyectos | Generador de Contraseñas Seguras, Cajero Automático y Analizador de Texto. |

---

### 🚀 ¿Cómo ejecutar cualquier lección?
Abre PowerShell o terminal en esta carpeta y corre:
```powershell
python 01_primeros_pasos_y_variables.py
```
