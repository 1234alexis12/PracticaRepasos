# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 03: ESTRUCTURAS DE DATOS EN PYTHON - LISTAS Y TUPLAS
=============================================================================

En esta leccion aprenderas las dos formas fundamentales de almacenar colecciones
ordenadas en Python:
1. Listas (list): Mutables (se pueden modificar, agregar o borrar elementos).
2. Tuplas (tuple): Inmutables (una vez creadas, NO se pueden modificar).
"""
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 03: LISTAS Y TUPLAS")
print("=" * 60)

# =============================================================================
# 1. LISTAS (LIST) - MUTABLES [ ]
# =============================================================================
frutas = ["Manzana", "Banana", "Cereza", "Durazno"]
print("\nLista inicial de frutas:", frutas)

# Acceso por indice (empieza en 0):
print("Primera fruta (indice 0):", frutas[0])

# Indexacion Negativa (¡caracteristica genial de Python!):
# -1 es el ultimo elemento, -2 el penultimo, etc.
print("Ultima fruta (indice -1):", frutas[-1])


# =============================================================================
# 2. REBANADO O SLICING ([inicio:fin:paso])
# =============================================================================
# Permite extraer una porcion o sub-lista. El indice 'fin' NO se incluye.
numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print("\n--- Slicing de Listas ---")
print("Del indice 2 al 6:", numeros[2:6])       # [2, 3, 4, 5]
print("Los primeros 4 elementos:", numeros[:4])   # [0, 1, 2, 3]
print("Desde el indice 6 en adelante:", numeros[6:]) # [6, 7, 8, 9]
print("De 2 en 2 (paso = 2):", numeros[::2])       # [0, 2, 4, 6, 8]
print("Lista invertida:", numeros[::-1])          # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]


# =============================================================================
# 3. METODOS PRINCIPALES DE LISTAS
# =============================================================================
lenguajes = ["Python", "JavaScript"]

# append(x): Agrega un elemento al final
lenguajes.append("SQL")
print("\nDespues de append('SQL'):", lenguajes)

# insert(posicion, x): Inserta en un indice especifico
lenguajes.insert(1, "HTML")
print("Despues de insert(1, 'HTML'):", lenguajes)

# remove(x): Elimina la primera coincidencia del valor
lenguajes.remove("HTML")
print("Despues de remove('HTML'):", lenguajes)

# pop(): Elimina y retorna el ultimo elemento (o del indice indicado)
ultimo = lenguajes.pop()
print(f"Elemento extraido con pop(): {ultimo} | Lista actual: {lenguajes}")

# sort(): Ordena la lista alfabetica o numericamente
desordenados = [42, 10, 5, 88, 23]
desordenados.sort()
print("Lista ordenada con .sort():", desordenados)


# =============================================================================
# 4. TUPLAS (TUPLE) - INMUTABLES ( )
# =============================================================================
# ¿Por que usar una tupla en vez de una lista?
# 1. Seguridad: Nadie puede modificar accidentalmente sus valores.
# 2. Rendimiento: Ocupan menos memoria y son mas rapidas.
# 3. Ideales para coordenadas geograficas, colores RGB fijos, configuraciones.

coordenadas_gps = (40.4168, -3.7038) # Latitud y longitud de Madrid
print("\n--- Tupla Inmutable ---")
print("Coordenadas:", coordenadas_gps)
print("Latitud:", coordenadas_gps[0])

# Si intentas: coordenadas_gps[0] = 50.0 -> TypeError: 'tuple' object does not support item assignment

# Desempaquetado de Tuplas (Unpacking):
latitud, longitud = coordenadas_gps
print(f"Desempaquetado -> Lat: {latitud}, Lon: {longitud}")
