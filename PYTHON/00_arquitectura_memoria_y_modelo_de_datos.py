# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 00: ARQUITECTURA DE MEMORIA, REGLA LEGB Y MODELO DE DATOS EN PYTHON
=============================================================================

"En Python, todo es un objeto".
Para escribir codigo eficiente y evitar bugs sutiles en Python, debes entender
como gestiona la memoria y como resuelve los nombres de variables.

TEMAS CLAVE:
1. Identidad de Objetos: `id()`, operador `is` vs operador `==`.
2. Mutabilidad e Inmutabilidad en memoria.
3. La Regla de Alcance LEGB (Local, Enclosing, Global, Built-in).
4. Generadores (`yield`) vs Listas en RAM (Eficiencia computacional).
5. Modelo de Datos y Metodos Magicos (Dunder Methods).
"""
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 00: ARQUITECTURA Y MEMORIA EN PYTHON")
print("=" * 60)


# =============================================================================
# 1. IDENTIDAD (`is`) VS IGUALDAD (`==`)
# =============================================================================
# - `==` comprueba si dos variables tienen el MISMO CONTENIDO o VALOR.
# - `is` comprueba si dos variables apuntan a la MISMA DIRECCION DE MEMORIA (`id()`).

lista_a = [1, 2, 3]
lista_b = [1, 2, 3]
lista_c = lista_a # Apunta a la misma referencia en memoria

print("\n--- 1. Identidad vs Igualdad ---")
print("lista_a == lista_b (mismo contenido):", lista_a == lista_b) # True
print("lista_a is lista_b (mismo objeto en RAM):", lista_a is lista_b) # False
print("lista_a is lista_c (mismo objeto en RAM):", lista_a is lista_c) # True
print("ID en memoria de lista_a:", id(lista_a))
print("ID en memoria de lista_b:", id(lista_b))
print("ID en memoria de lista_c:", id(lista_c))


# =============================================================================
# 2. LA REGLA DE ALCANCE 'LEGB' EN PYTHON
# =============================================================================
# Cuando Python busca el valor de una variable, sigue este orden estricto:
# L -> Local (dentro de la funcion actual)
# E -> Enclosing (en funciones envolventes / anidadas)
# G -> Global (en el nivel del archivo)
# B -> Built-in (funciones reservadas como print, len, range)

x = "Global"

def exterior():
    x = "Enclosing (Envolvente)"
    
    def interior():
        x = "Local"
        print(f"Buscando 'x' desde adentro: {x}") # Encuentra primero 'Local'
    
    interior()

print("\n--- 2. Demostracion de la Regla LEGB ---")
exterior()


# =============================================================================
# 3. GENERADORES (`yield`) VS LISTAS: CONSUMO DE MEMORIA RAM
# =============================================================================
# Una Lista guarda TODOS los 1,000,000 de elementos en la memoria RAM al mismo tiempo.
# Un Generador calcula CADA elemento "bajo demanda" (Lazy Evaluation), consumiendo casi 0 MB.

def generador_numeros(limite):
    """Genera numeros uno a uno usando yield sin saturar la RAM."""
    n = 0
    while n < limite:
        yield n # Pausa la ejecucion y entrega el valor actual
        n += 1

print("\n--- 3. Generadores y Eficiencia de Memoria ---")
gen = generador_numeros(3)
print("Paso 1 con next():", next(gen))
print("Paso 2 con next():", next(gen))
print("Paso 3 con next():", next(gen))


# =============================================================================
# 4. METODOS MAGICOS (DUNDER METHODS) Y SOBRECARGA DE OPERADORES
# =============================================================================
# Permiten que tus clases personalizadas se comporten como tipos nativos de Python
# (usar len(), sumar con +, comparar con ==).

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, otro):
        """Sobrecarga del operador + para sumar dos vectores directamente."""
        return Vector2D(self.x + otro.x, self.y + otro.y)

    def __repr__(self):
        """Representacion formal para depuracion."""
        return f"Vector2D(x={self.x}, y={self.y})"

    def __eq__(self, otro):
        """Sobrecarga del operador ==."""
        return self.x == otro.x and self.y == otro.y

v1 = Vector2D(2, 4)
v2 = Vector2D(3, 1)
v3 = v1 + v2 # ¡Gracias a __add__, usamos el signo + de forma natural!

print("\n--- 4. Metodos Magicos (Dunder Methods) ---")
print("v1 + v2 =", v3) # Vector2D(x=5, y=5)
print("¿v1 es igual a v2?:", v1 == v2) # False
