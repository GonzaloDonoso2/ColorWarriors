import { Aura } from "../models/aura.model";

export function obtenerListaAuras(): Aura[] {

  const listaAuras: Aura[] = [];

  const aura1: Aura = {
    identificador: 1,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '234px',
    coordenadaY: '88px'
  };

  const aura2: Aura = {
    identificador: 2,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '170px',
    coordenadaY: '120px'
  };

  const aura3: Aura = {
    identificador: 3,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '106px',
    coordenadaY: '152px'
  };

  const aura4: Aura = {
    identificador: 4,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '42px',
    coordenadaY: '184px'
  };

  const aura5: Aura = {
    identificador: 5,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '422px',
    coordenadaY: '184px'
  };

  const aura6: Aura = {
    identificador: 6,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '358px',
    coordenadaY: '216px'
  };

  const aura7: Aura = {
    identificador: 7,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '294px',
    coordenadaY: '248px'
  };

  const aura8: Aura = {
    identificador: 8,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: '230px',
    coordenadaY: '280px'
  };

  listaAuras.push(aura1);
  listaAuras.push(aura2);
  listaAuras.push(aura3);
  listaAuras.push(aura4);
  listaAuras.push(aura5);
  listaAuras.push(aura6);
  listaAuras.push(aura7);
  listaAuras.push(aura8);

  return listaAuras;
}