# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 01: PRIMEROS PASOS, COMENTARIOS Y VARIABLES EN PYTHON
=============================================================================

¿Que es Python?
Es un lenguaje de programacion de alto nivel, interpretado y enfocado en la legibilidad
y simplicidad del codigo ("La simplicidad es mejor que lo complejo").

En Python NO necesitas punto y coma (;) al final de las lineas.
"""
import sys

# Asegurar compatibilidad con terminales de Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# 1. COMENTARIOS Y LA FUNCION PRINT()
# =============================================================================
# Los comentarios de una sola linea en Python empiezan con el simbolo numeral (#).
# La funcion print() muestra informacion en la pantalla o consola.

print("=" * 60)
print("[*] BIENVENIDO/A A LA LECCION 01 DE PYTHON")
print("=" * 60)


# =============================================================================
# 2. DECLARACION DE VARIABLES Y TIPOS BASICOS DE DATOS
# =============================================================================
# En Python creamos variables asignando directamente un valor con el signo igual (=).
# No usamos palabras clave como let, const o var.
# Convencion de nombres en Python: snake_case (letras minusculas separadas por guion bajo).

# A) Cadena de texto (String - str):
nombre_usuario = "Alexis"
ciudad = 'Madrid'

# B) Numero Entero (Integer - int):
edad = 25

# C) Numero Decimal / Flotante (Float - float):
precio_producto = 19.99

# D) Booleano (Boolean - bool):
# ¡IMPORTANTE!: En Python se escriben con la primera letra en MAYUSCULA (True / False).
es_estudiante = True
tiene_membresia = False


# =============================================================================
# 3. LA FUNCION type() (CONSULTAR EL TIPO DE DATO)
# =============================================================================
print("\n--- Tipos de Datos Detectados ---")
print("Tipo de 'nombre_usuario':", type(nombre_usuario))      # <class 'str'>
print("Tipo de 'edad':", type(edad))                          # <class 'int'>
print("Tipo de 'precio_producto':", type(precio_producto))    # <class 'float'>
print("Tipo de 'es_estudiante':", type(es_estudiante))        # <class 'bool'>


# =============================================================================
# 4. FORMATEO DE TEXTO MODERNO: F-STRINGS (f"...")
# =============================================================================
# Las f-strings (disponibles desde Python 3.6+) son la forma mas elegante y rapida
# de incrustar variables y expresiones directamente dentro de un texto.

mensaje = f"Hola, me llamo {nombre_usuario}, tengo {edad} anos y vivo en {ciudad}."
print("\n--- Uso de f-strings ---")
print(mensaje)

# Tambien puedes hacer calculos y formatear numeros dentro de las llaves {}:
total_con_descuento = precio_producto * 0.90
print(f"Precio original: ${precio_producto:.2f} | Con 10% desc: ${total_con_descuento:.2f}")


# =============================================================================
# 5. CONVERSION DE TIPOS DE DATOS (TYPE CASTING)
# =============================================================================
# A veces recibimos un numero en formato de texto (ej: "42") y necesitamos convertirlo
# a numero real para poder sumar o calcular.

numero_como_texto = "100"
# Convertimos el string a entero usando int():
numero_entero = int(numero_como_texto)

print("\n--- Conversion de Tipos (Casting) ---")
print(f"Suma matematica: {numero_entero + 50}")  # Da 150

# Funciones de conversion comunes:
# - str(x)   -> Convierte a texto
# - int(x)   -> Convierte a entero
# - float(x) -> Convierte a decimal
# - bool(x)  -> Convierte a booleano (0 o vacio es False, cualquier otro valor es True)
