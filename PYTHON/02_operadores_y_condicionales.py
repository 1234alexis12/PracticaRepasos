# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 02: OPERADORES Y ESTRUCTURAS CONDICIONALES EN PYTHON
=============================================================================

Python destaca por su sintaxis intuitiva y legible.
En lugar de signos como && o ||, Python usa palabras en ingles naturales: `and`, `or`, `not`.
"""
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 02: OPERADORES Y CONDICIONALES")
print("=" * 60)

# =============================================================================
# 1. OPERADORES ARITMETICOS
# =============================================================================
a = 10
b = 3

print("\n--- Operaciones Aritmeticas ---")
print(f"Suma (10 + 3): {a + b}")
print(f"Resta (10 - 3): {a - b}")
print(f"Multiplicacion (10 * 3): {a * b}")
print(f"Division decimal (10 / 3): {a / b:.2f}")       # 3.33
print(f"Division entera (10 // 3): {a // b}")         # 3 (descarta decimales)
print(f"Modulo / Residuo (10 % 3): {a % b}")          # 1 (el resto de la division)
print(f"Potencia (10 ** 3): {a ** b}")                # 1000 (10 elevado a la 3)


# =============================================================================
# 2. OPERADORES RELACIONALES Y LOGICOS (AND, OR, NOT)
# =============================================================================
# Relacionales: == (igual), != (diferente), > (mayor), < (menor), >= (mayor o igual), <= (menor o igual)

edad = 20
tiene_licencia = True
tiene_multas = False

# and: Ambas condiciones deben cumplirse obligatoriamente
puede_conducir = (edad >= 18) and tiene_licencia
print(f"\n¿Puede conducir?: {puede_conducir}")

# not: Invierte el valor booleano
esta_al_dia = not tiene_multas
print(f"¿Esta al dia con multas?: {esta_al_dia}")


# =============================================================================
# 3. ESTRUCTURA CONDICIONAL: IF, ELIF, ELSE
# =============================================================================
# ¡REGLA FUNDAMENTAL DE PYTHON: LA INDENTACION (SANGRIA)!
# En Python, los bloques de codigo que van dentro de un 'if' se definen con
# 4 espacios de sangria despues de los dos puntos (:).

puntuacion = 85

print("\n--- Evaluacion de Calificacion ---")
if puntuacion >= 90:
    print("Calificacion Sobresaliente (A)")
elif puntuacion >= 80:
    print("Calificacion Notable (B)")
elif puntuacion >= 70:
    print("Calificacion Aprobada (C)")
else:
    print("Calificacion Insuficiente (D)")


# =============================================================================
# 4. OPERADORES DE PERTENENCIA: 'in' y 'not in'
# =============================================================================
# Permiten verificar de forma muy rapida si un elemento esta dentro de un texto o lista.

frase = "Aprender Python es divertido"
palabra = "Python"

if palabra in frase:
    print(f"\n[OK] La palabra '{palabra}' SI esta presente en la frase.")
else:
    print(f"\n[X] La palabra '{palabra}' no se encontro.")
