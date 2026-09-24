# -*- coding: utf-8 -*-
"""
=============================================================================
LECCION 08: PROGRAMACION ORIENTADA A OBJETOS (POO) EN PYTHON
=============================================================================

¿Que es la Programacion Orientada a Objetos?
Es un paradigma de programacion que modela entidades del mundo real mediante
"Clases" y "Objetos".

Analogia:
- Una CLASE es el plano arquitectonico de una casa.
- Un OBJETO o INSTANCIA es la casa real construida a partir de ese plano.
"""
import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("[*] LECCION 08: PROGRAMACION ORIENTADA A OBJETOS (POO)")
print("=" * 60)

# =============================================================================
# 1. DEFINICION DE CLASE Y CONSTRUCTOR __init__
# =============================================================================
class Coche:
    """Clase base que representa un vehiculo."""
    
    # Atributo de clase (compartido por todas las instancias):
    ruedas = 4

    def __init__(self, marca: str, modelo: str, color: str):
        """
        Metodo constructor: Se ejecuta automaticamente al crear un nuevo objeto.
        'self' hace referencia a la instancia especifica que se esta creando.
        """
        # Atributos de instancia (propios de cada coche):
        self.marca = marca
        self.modelo = modelo
        self.color = color
        self.velocidad = 0
        self.encendido = False

    def encender(self):
        """Metodo para cambiar el estado del coche."""
        self.encendido = True
        print(f"[+] El {self.marca} {self.modelo} ha sido encendido.")

    def acelerar(self, incremento: int):
        """Aumenta la velocidad si el coche esta encendido."""
        if not self.encendido:
            print(f"[!] No puedes acelerar: el {self.marca} esta apagado.")
            return
        self.velocidad += incremento
        print(f"[*] Acelerando: Velocidad actual es {self.velocidad} km/h.")

    def __str__(self):
        """Representacion en texto del objeto (se usa al hacer print(objeto))."""
        return f"{self.marca} {self.modelo} ({self.color})"


# Creando objetos (instancias):
coche1 = Coche("Toyota", "Corolla", "Rojo")
coche2 = Coche("Tesla", "Model 3", "Blanco")

print("\n--- Instancias Creadas ---")
print("Coche 1:", coche1)
print("Coche 2:", coche2)

coche1.encender()
coche1.acelerar(50)
coche1.acelerar(30)


# =============================================================================
# 2. HERENCIA Y POLIMORFISMO
# =============================================================================
# La herencia permite crear una clase "hija" que reutiliza y extiende los atributos
# y metodos de una clase "padre".

class CocheElectrico(Coche):
    """Clase hija especializada que hereda de Coche."""
    
    def __init__(self, marca: str, modelo: str, color: str, autonomia_km: int):
        # super().__init__ invoca al constructor de la clase padre (Coche)
        super().__init__(marca, modelo, color)
        self.autonomia_km = autonomia_km
        self.bateria_porcentaje = 100

    # Sobreescritura o adicion de nuevos metodos:
    def cargar_bateria(self):
        self.bateria_porcentaje = 100
        print(f"[+] Bateria del {self.marca} cargada al 100%. Autonomia estimada: {self.autonomia_km} km.")


print("\n--- Herencia con CocheElectrico ---")
mi_tesla = CocheElectrico("Tesla", "Cybertruck", "Plateado", 500)
print(mi_tesla)
mi_tesla.encender()
mi_tesla.acelerar(100)
mi_tesla.cargar_bateria()
