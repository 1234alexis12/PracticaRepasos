# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 07: MANEJO DE ERRORES (EXCEPCIONES) Y ARCHIVOS EN PYTHON
=============================================================================

1. Manejo de Errores:
   El bloque `try / except / else / finally` evita que tu programa se detenga abruptamente
   cuando ocurre un fallo inesperado (ej: division entre cero, archivo no encontrado).

2. Manejo de Archivos:
   La sentencia `with open(...)` (Context Manager) garantiza que el archivo se cierre
   automaticamente de forma segura tras terminar de usarlo.
"""
import sys
import os

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 07: ERRORES Y LECTURA/ESCRITURA DE ARCHIVOS")
print("=" * 60)

# =============================================================================
# 1. MANEJO DE EXCEPCIONES CON TRY / EXCEPT / FINALLY
# =============================================================================
def dividir_seguro(a, b):
    try:
        resultado = a / b
    except ZeroDivisionError:
        print("[X] Error: No es posible dividir entre cero.")
        return None
    except TypeError:
        print("[X] Error: Ambos valores deben ser numeros.")
        return None
    else:
        # Se ejecuta SOLO si no hubo ningun error en el bloque try
        print(f"[OK] Operacion exitosa. Resultado: {resultado}")
        return resultado
    finally:
        # Se ejecuta SIEMPRE, haya ocurrido error o no
        print("  [Bloque finally finalizado]")

print("\n--- Pruebas de Manejo de Excepciones ---")
dividir_seguro(10, 2)
dividir_seguro(10, 0)


# =============================================================================
# 2. ESCRITURA Y LECTURA DE ARCHIVOS CON with open()
# =============================================================================
nombre_archivo = "ejemplo_notas.txt"

# A) Escribir un archivo (modo 'w' = write / sobreescribe):
print("\n--- 1. Escribiendo en archivo ---")
with open(nombre_archivo, "w", encoding="utf-8") as archivo:
    archivo.write("Linea 1: Bienvenidos al curso de Python.\n")
    archivo.write("Linea 2: Aprender a programar paso a paso.\n")
    archivo.write("Linea 3: Manejo de archivos completado con exito.\n")
print(f"Archivo '{nombre_archivo}' creado y guardado.")

# B) Leer el archivo linea por linea (modo 'r' = read):
print("\n--- 2. Leyendo contenido del archivo ---")
try:
    with open(nombre_archivo, "r", encoding="utf-8") as archivo:
        for numero_linea, contenido in enumerate(archivo, start=1):
            print(f"  [Linea {numero_linea}]: {contenido.strip()}")
except FileNotFoundError:
    print(f"El archivo '{nombre_archivo}' no existe.")

# C) Limpieza del archivo creado para no dejar archivos residuales:
if os.path.exists(nombre_archivo):
    os.remove(nombre_archivo)
    print(f"\n[OK] Archivo temporal '{nombre_archivo}' eliminado de forma limpia.")
