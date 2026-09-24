# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 05: BUCLES Y CONTROL DE FLUJO EN PYTHON
=============================================================================

En esta leccion dominaremos la automatizacion de repeticiones:
1. Bucle for con range()
2. Bucle while
3. Funciones utilitarias clave: enumerate() y zip()
4. Comprensiones de Listas (List Comprehensions) - ¡La joya de Python!
"""
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 05: BUCLES Y CONTROL DE FLUJO")
print("=" * 60)

# =============================================================================
# 1. BUCLE FOR CON LA FUNCION range()
# =============================================================================
# range(inicio, fin, paso) genera una secuencia de numeros.

print("\n--- Bucle for con range(1, 6) ---")
for i in range(1, 6):
    print(f"Numero actual: {i}")


# =============================================================================
# 2. enumerate() - OBTENER INDICE Y ELEMENTO AL MISMO TIEMPO
# =============================================================================
lenguajes = ["Python", "JavaScript", "Rust", "Go"]

print("\n--- Recorriendo con enumerate() ---")
for indice, lenguaje in enumerate(lenguajes, start=1):
    print(f"Puesto {indice}: {lenguaje}")


# =============================================================================
# 3. zip() - COMBINAR MULTIPLES LISTAS EN PARALELO
# =============================================================================
nombres = ["Ana", "Carlos", "Alexis"]
edades = [22, 30, 25]

print("\n--- Recorriendo en paralelo con zip() ---")
for nombre, edad in zip(nombres, edades):
    print(f"Persona: {nombre} tiene {edad} anos.")


# =============================================================================
# 4. BUCLE WHILE Y SENTENCIAS BREAK / CONTINUE
# =============================================================================
print("\n--- Bucle while con break y continue ---")
contador = 0

while contador < 6:
    contador += 1
    if contador == 3:
        print("  (Saltando el 3 con continue)")
        continue
    if contador == 5:
        print("  (Deteniendo el bucle en 5 con break)")
        break
    print(f"  Contador: {contador}")


# =============================================================================
# 5. LIST COMPREHENSIONS (COMPRENSIONES DE LISTAS)
# =============================================================================
# Es una forma compacta, rapida y "pythonica" de transformar y filtrar listas en 1 sola linea.
# Sintaxis: [expresion for elemento in lista if condicion]

numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Ejemplo 1: Elevar al cuadrado todos los numeros
cuadrados = [n ** 2 for n in numeros]
print("\n--- List Comprehension (Cuadrados) ---")
print("Original:", numeros)
print("Cuadrados:", cuadrados)

# Ejemplo 2: Filtrar solo los numeros pares
pares = [n for n in numeros if n % 2 == 0]
print("\n--- List Comprehension con Filtro (Pares) ---")
print("Pares:", pares)
