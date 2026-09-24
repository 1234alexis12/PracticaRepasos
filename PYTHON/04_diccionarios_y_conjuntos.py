# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 04: DICCIONARIOS Y CONJUNTOS EN PYTHON
=============================================================================

1. Diccionarios (dict): Colecciones de pares `clave: valor`. Es la estructura mas rapida
   para buscar informacion asociada a un identificador (similar a un objeto JSON).
2. Conjuntos (set): Colecciones no ordenadas de elementos UNICOS (sin duplicados).
"""
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 04: DICCIONARIOS Y CONJUNTOS")
print("=" * 60)

# =============================================================================
# 1. DICCIONARIOS (DICT) - { CLAVE: VALOR }
# =============================================================================
usuario = {
    "nombre": "Alexis",
    "edad": 25,
    "es_activo": True,
    "tecnologias": ["Python", "JavaScript", "SQL"]
}

print("\n--- Diccionario Usuario ---")
print("Nombre:", usuario["nombre"])

# Metodo seguro .get(): Si la clave no existe, no revienta el programa con un error,
# sino que devuelve un valor por defecto o None.
profesion = usuario.get("profesion", "No especificada")
print("Profesion con .get():", profesion)

# Modificar y agregar claves:
usuario["edad"] = 26                     # Actualiza valor existente
usuario["correo"] = "alexis@ejemplo.com" # Agrega nueva clave

print("Usuario actualizado:", usuario)

# Iterar sobre claves y valores con .items():
print("\nRecorriendo las propiedades del usuario:")
for clave, valor in usuario.items():
    print(f"  [+] {clave.upper()}: {valor}")


# =============================================================================
# 2. CONJUNTOS (SET) - ELEMENTOS UNICOS { }
# =============================================================================
# Los conjuntos son ideales para eliminar duplicados de una lista de inmediato.

lista_con_duplicados = [1, 2, 2, 3, 4, 4, 4, 5, 1]
conjunto_sin_duplicados = set(lista_con_duplicados)

print("\n--- Conjuntos (Sets) y Eliminacion de Duplicados ---")
print("Lista original con repetidos:", lista_con_duplicados)
print("Conjunto limpio y unico:", conjunto_sin_duplicados)

# Operaciones matematicas con conjuntos:
estudiantes_python = {"Carlos", "Ana", "Lucia", "Alexis"}
estudiantes_javascript = {"Lucia", "Alexis", "Marcos", "Elena"}

# A) Interseccion (&): Estudiantes que estan en AMBOS cursos a la vez
en_ambos = estudiantes_python & estudiantes_javascript
print("\nEstudiantes en ambos cursos (&):", en_ambos)

# B) Union (|): Todos los estudiantes inscritos sin repetir nombres
todos = estudiantes_python | estudiantes_javascript
print("Todos los estudiantes inscritos (|):", todos)

# C) Diferencia (-): Estudiantes que SOLO estudian Python
solo_python = estudiantes_python - estudiantes_javascript
print("Estudiantes solo en Python (-):", solo_python)
