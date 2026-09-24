# ⚡ Chuleta Rápida de Python 3 (Cheat Sheet)

> *Referencia rápida con la sintaxis, métodos y trucos más utilizados en Python.*

---

## 📑 Tabla de Contenidos Rápida
1. [Tipos Básicos y F-Strings](#1-tipos-b%C3%A1sicos-y-f-strings)
2. [Listas y Slicing](#2-listas-y-slicing)
3. [Diccionarios y Conjuntos](#3-diccionarios-y-conjuntos)
4. [Condicionales y Ternarios](#4-condicionales-y-ternarios)
5. [Bucles y Utilidades de Iteración](#5-bucles-y-utilidades-de-iteraci%C3%B3n)
6. [Funciones y Lambdas](#6-funciones-y-lambdas)
7. [Manejo de Errores](#7-manejo-de-errores)
8. [Archivos con `with`](#8-archivos-con-with)
9. [Clases y Métodos Mágicos](#9-clases-y-m%C3%A9todos-m%C3%A1gicos)
10. [Trucos Pythonic Clave](#10-trucos-pythonic-clave)

---

### 1. Tipos Básicos y F-Strings
```python
entero: int = 42
decimal: float = 3.14
texto: str = "Python"
booleano: bool = True

# F-Strings formateados:
nombre = "Alexis"
precio = 149.99
print(f"Hola {nombre}, total: S/ {precio:.2f}") # Formato 2 decimales
```

---

### 2. Listas y Slicing
```python
nums = [10, 20, 30, 40, 50]

# Slicing: [inicio : fin_exclusivo : paso]
nums[1:4]      # [20, 30, 40]
nums[::-1]     # [50, 40, 30, 20, 10] (Invertir lista)

# Métodos comunes:
nums.append(60)       # Agrega al final
nums.insert(0, 5)     # Inserta en índice 0
nums.pop()            # Extrae el último elemento
nums.sort(reverse=True) # Ordena descendente
```

---

### 3. Diccionarios y Conjuntos
```python
# Diccionario:
usuario = {"id": 1, "nombre": "Alexis", "rol": "Admin"}
email = usuario.get("email", "sin_email@dominio.com") # Seguro contra KeyError

for clave, valor in usuario.items():
    print(f"{clave}: {valor}")

# Conjuntos (Set - Elementos únicos):
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b) # Unión: {1, 2, 3, 4, 5, 6}
print(a & b) # Intersección: {3, 4}
```

---

### 4. Condicionales y Ternarios
```python
edad = 20

# Operador Ternario (en una línea):
estado = "Mayor de edad" if edad >= 18 else "Menor de edad"

# Validación encadenada:
if 18 <= edad < 65:
    print("Edad laboral activa")
```

---

### 5. Bucles y Utilidades de Iteración
```python
# Range
for i in range(1, 6): # 1, 2, 3, 4, 5
    pass

# Enumerate (Índice + Elemento)
frutas = ["Manzana", "Plátano", "Mango"]
for index, fruta in enumerate(frutas, start=1):
    print(f"{index}. {fruta}")

# Zip (Combinar iterables en paralelo)
nombres = ["Ana", "Beto"]
notas = [18, 15]
for n, nota in zip(nombres, notas):
    print(f"{n}: {nota}")
```

---

### 6. Funciones y Lambdas
```python
# *args (múltiples posicionales) y **kwargs (múltiples nombrados)
def reporte(titulo, *numeros, **metadata):
    total = sum(numeros)
    return {"titulo": titulo, "total": total, "detalles": metadata}

# Función Lambda (anónima)
al_cuadrado = lambda x: x ** 2
```

---

### 7. Manejo de Errores
```python
try:
    numero = int("abc")
except ValueError as e:
    print(f"Error de conversión: {e}")
except Exception as e:
    print(f"Error inesperado: {e}")
else:
    print("Se ejecutó sin errores!")
finally:
    print("Siempre se ejecuta.")
```

---

### 8. Archivos con `with`
```python
# Escritura
with open("notas.txt", "w", encoding="utf-8") as f:
    f.write("Línea 1\nLínea 2\n")

# Lectura
with open("notas.txt", "r", encoding="utf-8") as f:
    lineas = f.readlines()
```

---

### 9. Clases y Métodos Mágicos
```python
class Producto:
    def __init__(self, nombre: str, precio: float):
        self.nombre = nombre
        self.precio = precio

    def __repr__(self):
        return f"Producto(nombre='{self.nombre}', precio={self.precio})"

    def __lt__(self, otro):
        return self.precio < otro.precio
```

---

### 10. Trucos Pythonic Clave
```python
# 1. Desempaquetado e intercambio de variables sin variable temporal:
a, b = 10, 20
a, b = b, a # a = 20, b = 10

# 2. Desempaquetado extendido con asterisco (*):
primero, *resto, ultimo = [1, 2, 3, 4, 5]
# primero = 1, resto = [2, 3, 4], ultimo = 5

# 3. Unir cadenas con join:
palabras = ["Hola", "Mundo", "Python"]
frase = " ".join(palabras) # "Hola Mundo Python"
```
