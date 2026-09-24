# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 06: FUNCIONES, PARAMETROS, *ARGS, **KWARGS Y LAMBDA
=============================================================================

Una funcion en Python se define con la palabra clave `def`.
Permite encapsular logica reutilizable, recibir argumentos y devolver valores con `return`.
"""
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 06: FUNCIONES Y MODULARIDAD")
print("=" * 60)

# =============================================================================
# 1. FUNCION BASICA CON PARAMETROS POR DEFECTO
# =============================================================================
def saludar_usuario(nombre: str, saludo: str = "Hola") -> str:
    """
    Docstring: Explica que hace la funcion y que retorna.
    Saluda al usuario con un mensaje personalizado.
    """
    return f"{saludo}, {nombre}! Bienvenido a Python."

print("\n--- Funcion Basica y Argumentos ---")
print(saludar_usuario("Alexis"))
print(saludar_usuario("Alexis", saludo="Buenos dias"))


# =============================================================================
# 2. RETORNO MULTIPLE DE VALORES (EMPAQUETADO EN TUPLA)
# =============================================================================
def calcular_estadisticas(numeros: list):
    """Calcula el minimo, maximo y promedio de una lista de numeros."""
    minimo = min(numeros)
    maximo = max(numeros)
    promedio = sum(numeros) / len(numeros)
    return minimo, maximo, promedio

datos = [10, 20, 30, 40, 50]
val_min, val_max, val_prom = calcular_estadisticas(datos)

print("\n--- Retorno Multiple ---")
print(f"Minimo: {val_min} | Maximo: {val_max} | Promedio: {val_prom}")


# =============================================================================
# 3. ARGUMENTOS VARIABLES: *args y **kwargs
# =============================================================================
# *args (Argumentos Posicionales Variables): Permite recibir cualquier cantidad de numeros en una tupla.
# **kwargs (Keyword Arguments Variables): Permite recibir argumentos con nombre en un diccionario.

def sumar_todos(*numeros):
    """Suma una cantidad infinita o variable de argumentos numericos."""
    total = sum(numeros)
    return total

print("\n--- Uso de *args ---")
print("Suma de 3 numeros:", sumar_todos(5, 10, 15))
print("Suma de 6 numeros:", sumar_todos(1, 2, 3, 4, 5, 6))

def mostrar_perfil(**detalles):
    """Muestra los datos de un usuario recibidos como pares clave-valor."""
    print("\n--- Uso de **kwargs ---")
    for clave, valor in detalles.items():
        print(f"  [+] {clave}: {valor}")

mostrar_perfil(nombre="Alexis", rol="Desarrollador", experiencia="Junior", pais="Espana")


# =============================================================================
# 4. FUNCIONES ANONIMAS (LAMBDA)
# =============================================================================
# Son funciones pequenas de una sola linea sin nombre formal.
# Sintaxis: lambda argumentos: expresion

multiplicar = lambda x, y: x * y
print("\n--- Funcion Lambda ---")
print("Multiplicacion 6 x 7:", multiplicar(6, 7))
