import { Personaje } from '../models/personaje.model';

export function obtenerPersonajesPrimeraEtapa(): Personaje[] {

  const listaPersonajes: Personaje[] = [];

  const personaje1: Personaje = {
    identificador: 1,
    nombre: 'Amarillo',
    ataque: 16,
    ataqueActual: 16,
    danio: 8,
    danioActual: 8,
    defensa: 14,
    defensaActual: 14,
    iniciativa: 8,
    iniciativaActual: 8,
    salud: 24,
    saludActual: 24,
    estado: '',
    jugador: true,
    imagen: 'assets/images/personajes/posturas/inicial/Amarillo1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 232,
    coordenadaY: 178
  };

  const personaje2: Personaje = {
    identificador: 2,
    nombre: 'Azul',
    ataque: 12,
    ataqueActual: 12,
    danio: 6,
    danioActual: 6,
    defensa: 16,
    defensaActual: 16,
    iniciativa: 4,
    iniciativaActual: 4,
    salud: 60,
    saludActual: 60,
    estado: '',
    jugador: true,
    imagen: 'assets/images/personajes/posturas/inicial/Azul1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 168,
    coordenadaY: 210
  };

  const personaje3: Personaje = {
    identificador: 3,
    nombre: 'Rojo',
    ataque: 14,
    ataqueActual: 14,
    danio: 10,
    danioActual: 10,
    defensa: 12,
    defensaActual: 12,
    iniciativa: 4,
    iniciativaActual: 4,
    salud: 48,
    saludActual: 48,
    estado: '',
    jugador: true,
    imagen: 'assets/images/personajes/posturas/inicial/Rojo1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 104,
    coordenadaY: 242
  };

  const personaje4: Personaje = {
    identificador: 4,
    nombre: 'Verde',
    ataque: 10,
    ataqueActual: 10,
    danio: 4,
    danioActual: 4,
    defensa: 10,
    defensaActual: 10,
    iniciativa: 6,
    iniciativaActual: 6,
    salud: 36,
    saludActual: 36,
    estado: '',
    jugador: true,
    imagen: 'assets/images/personajes/posturas/inicial/Verde1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 40,
    coordenadaY: 274
  };

  const personaje5: Personaje = {
    identificador: 5,
    nombre: 'Morado',
    ataque: 14,
    ataqueActual: 14,
    danio: 8,
    danioActual: 8,
    defensa: 2,
    defensaActual: 2,
    iniciativa: 2,
    iniciativaActual: 2,
    salud: 10,
    saludActual: 10,
    estado: '',
    jugador: false,
    imagen: 'assets/images/personajes/posturas/inicial/Morado1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 420,
    coordenadaY: 274
  };

  const personaje6: Personaje = {
    identificador: 6,
    nombre: 'Morado',
    ataque: 14,
    ataqueActual: 14,
    danio: 8,
    danioActual: 8,
    defensa: 2,
    defensaActual: 2,
    iniciativa: 2,
    iniciativaActual: 2,
    salud: 10,
    saludActual: 10,
    estado: '',
    jugador: false,
    imagen: 'assets/images/personajes/posturas/inicial/Morado1.png',
    alto: 72,
    ancho: 64,
    coordenadaX: 356,
    coordenadaY: 306
  };

  const personaje7: Personaje = {
    identificador: 7,
    nombre: 'Morado',
    ataque: 14,
    ataqueActual: 14,
    danio: 8,
    danioActual: 8,
    defensa: 2,
    defensaActual: 2,
    iniciativa: 2,
    iniciativaActual: 2,
    salud: 10,
    saludActual: 10,
    estado: '',
    jugador: false,
    imagen: 'assets/images/personajes/posturas/inicial/Morado1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 292,
    coordenadaY: 338
  };

  const personaje8: Personaje = {
    identificador: 8,
    nombre: 'Morado',
    ataque: 14,
    ataqueActual: 14,
    danio: 8,
    danioActual: 8,
    defensa: 2,
    defensaActual: 2,
    iniciativa: 2,
    iniciativaActual: 2,
    salud: 10,
    saludActual: 10,
    estado: '',
    jugador: false,
    imagen: 'assets/images/personajes/posturas/inicial/Morado1.png',
    alto: 72,
    ancho: 72,
    coordenadaX: 228,
    coordenadaY: 370
  };

  listaPersonajes.push(personaje1);
  listaPersonajes.push(personaje2);
  listaPersonajes.push(personaje3);
  listaPersonajes.push(personaje4);
  listaPersonajes.push(personaje5);
  listaPersonajes.push(personaje6);
  listaPersonajes.push(personaje7);
  listaPersonajes.push(personaje8);

  return listaPersonajes;
}
