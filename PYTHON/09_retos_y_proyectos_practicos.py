# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 09: RETOS Y PROYECTOS PRACTICOS EN PYTHON
=============================================================================
"A programar se aprende programando."

Este archivo contiene 3 mini-proyectos completos y ejecutables en consola:
1. Generador de Contrasenas Seguras y Aleatorias.
2. Simulador de Cuenta Bancaria / Cajero con Validaciones.
3. Analizador de Texto y Frecuencia de Palabras.
"""
import sys
import random
import string

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 09: TALLER DE PROYECTOS EN PYTHON")
print("=" * 60)


# =============================================================================
# PROYECTO 1: GENERADOR DE CONTRASENAS SEGURAS
# =============================================================================
def generar_contrasena(longitud: int = 12, incluir_simbolos: bool = True) -> str:
    """Genera una contrasena aleatoria combinando letras, numeros y simbolos."""
    caracteres = string.ascii_letters + string.digits
    if incluir_simbolos:
        caracteres += "!@#$%&*-_=+"
    
    # Elegimos caracteres aleatorios y los unimos en una sola cadena
    password = "".join(random.choice(caracteres) for _ in range(longitud))
    return password

print("\n--- 1. Generador de Contrasenas Seguras ---")
pass_1 = generar_contrasena(longitud=10, incluir_simbolos=False)
pass_2 = generar_contrasena(longitud=16, incluir_simbolos=True)
print("Contrasena basica (10 caracteres):", pass_1)
print("Contrasena fuerte (16 caracteres con simbolos):", pass_2)


# =============================================================================
# PROYECTO 2: SIMULADOR DE CUENTA BANCARIA
# =============================================================================
class CuentaBancaria:
    """Modela una cuenta con saldo, depositos y retiros controlados."""
    
    def __init__(self, titular: str, saldo_inicial: float = 0.0):
        self.titular = titular
        self.saldo = saldo_inicial
        self.historial = []

    def depositar(self, monto: float):
        if monto <= 0:
            print("[X] El monto a depositar debe ser mayor a 0.")
            return
        self.saldo += monto
        self.historial.append(f"Deposito: +${monto:.2f}")
        print(f"[OK] Deposito de ${monto:.2f} exitoso. Saldo actual: ${self.saldo:.2f}")

    def retirar(self, monto: float):
        if monto <= 0:
            print("[X] El monto a retirar debe ser mayor a 0.")
            return
        if monto > self.saldo:
            print(f"[X] Fondos insuficientes. Intentaste retirar ${monto:.2f} pero tienes ${self.saldo:.2f}")
            return
        self.saldo -= monto
        self.historial.append(f"Retiro: -${monto:.2f}")
        print(f"[OK] Retiro de ${monto:.2f} exitoso. Saldo restante: ${self.saldo:.2f}")

    def ver_resumen(self):
        print(f"\n--- Resumen de Cuenta: {self.titular} ---")
        print(f"Saldo disponible: ${self.saldo:.2f}")
        print("Movimientos:")
        for mov in self.historial:
            print(f"  * {mov}")

print("\n--- 2. Simulador de Cuenta Bancaria ---")
cuenta = CuentaBancaria("Alexis", 100.0)
cuenta.depositar(50.0)
cuenta.retirar(30.0)
cuenta.retirar(200.0) # Intento de sobregiro
cuenta.ver_resumen()


# =============================================================================
# PROYECTO 3: ANALIZADOR DE FRECUENCIA DE PALABRAS
# =============================================================================
def analizar_texto(texto: str) -> dict:
    """Limpia un texto y cuenta cuantas veces aparece cada palabra."""
    # Convertimos a minusculas y limpiamos signos
    texto_limpio = texto.lower().replace(".", "").replace(",", "").replace("!", "")
    palabras = texto_limpio.split()
    
    frecuencias = {}
    for palabra in palabras:
        frecuencias[palabra] = frecuencias.get(palabra, 0) + 1
    return frecuencias

print("\n--- 3. Analizador de Texto ---")
frase_prueba = "Aprender Python es genial. Quien aprende Python domina la logica y domina el codigo."
resultado_conteo = analizar_texto(frase_prueba)
print("Frecuencia de palabras:")
for pal, cantidad in sorted(resultado_conteo.items(), key=lambda x: x[1], reverse=True):
    print(f"  '{pal}': {cantidad} vez/veces")
