import { Personaje } from '../models/personaje.model';

export function obtenerPersonajesPrimeraEtapa(): Personaje[] {

  const listaPersonajes: Personaje[] = [];

  const personaje1: Personaje = {
    identificador: 1,
    nombre: 'Amarillo',
    ataque: 16,
    danio: 8,
    defensa: 14,
    iniciativa: 8,
    salud: 24,
    estado: '',
    equipo: true,
    imagen: 'assets/images/personajes/posturas/inicial/Amarillo1.png',
    coordenadaX: '232px',
    coordenadaY: '48px'
  };

  const personaje2: Personaje = {
    identificador: 2,
    nombre: 'Azul',
    ataque: 12,
    danio: 6,
    defensa: 16,
    iniciativa: 4,
    salud: 60,
    estado: '',
    equipo: true,
    imagen: 'assets/images/personajes/posturas/inicial/Azul1.png',
    coordenadaX: '168px',
    coordenadaY: '80px'
  };

  const personaje3: Personaje = {
    identificador: 3,
    nombre: 'Rojo',
    ataque: 14,
    danio: 10,
    defensa: 12,
    iniciativa: 4,
    salud: 48,
    estado: '',
    equipo: true,
    imagen: 'assets/images/personajes/posturas/inicial/Rojo1.png',
    coordenadaX: '104px',
    coordenadaY: '112px'
  };

  const personaje4: Personaje = {
    identificador: 4,
    nombre: 'Verde',
    ataque: 10,
    danio: 4,
    defensa: 10,
    iniciativa: 6,
    salud: 36,
    estado: '',
    equipo: true,
    imagen: 'assets/images/personajes/posturas/inicial/Verde1.png',
    coordenadaX: '40px',
    coordenadaY: '144px'
  };

  const personaje5: Personaje = {
    identificador: 5,
    nombre: 'Nigromante',
    ataque: 8,
    danio: 4,
    defensa: 8,
    iniciativa: 8,
    salud: 24,
    estado: '',
    equipo: false,
    imagen: 'assets/images/personajes/posturas/inicial/Nigromante1.png',
    coordenadaX: '424px',
    coordenadaY: '144px'
  };

  const personaje6: Personaje = {
    identificador: 6,
    nombre: 'Zombi',
    ataque: 14,
    danio: 8,
    defensa: 8,
    iniciativa: 2,
    salud: 36,
    estado: '',
    equipo: false,
    imagen: 'assets/images/personajes/posturas/inicial/Zombi1.png',
    coordenadaX: '360px',
    coordenadaY: '176px'
  };

  const personaje7: Personaje = {
    identificador: 7,
    nombre: 'Zombi',
    ataque: 14,
    danio: 8,
    defensa: 8,
    iniciativa: 2,
    salud: 36,
    estado: '',
    equipo: false,
    imagen: 'assets/images/personajes/posturas/inicial/Zombi1.png',
    coordenadaX: '296px',
    coordenadaY: '208px'
  };

  const personaje8: Personaje = {
    identificador: 8,
    nombre: 'Zombi',
    ataque: 14,
    danio: 8,
    defensa: 8,
    iniciativa: 2,
    salud: 36,
    estado: '',
    equipo: false,
    imagen: 'assets/images/personajes/posturas/inicial/Zombi1.png',
    coordenadaX: '232px',
    coordenadaY: '240px'
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
