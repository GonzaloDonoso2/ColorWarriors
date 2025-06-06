import { Aura } from "../models/aura.model";

export function obtenerListaAuras(): Aura[] {

  const listaAuras: Aura[] = [];

  const aura1: Aura = {
    identificador: 1,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 234,
    coordenadaY: 88
  };

  const aura2: Aura = {
    identificador: 2,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 170,
    coordenadaY: 120
  };

  const aura3: Aura = {
    identificador: 3,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 106,
    coordenadaY: 152
  };

  const aura4: Aura = {
    identificador: 4,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 42,
    coordenadaY: 184
  };

  const aura5: Aura = {
    identificador: 5,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 422,
    coordenadaY: 184
  };

  const aura6: Aura = {
    identificador: 6,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 358,
    coordenadaY: 216
  };

  const aura7: Aura = {
    identificador: 7,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 294,
    coordenadaY: 248
  };

  const aura8: Aura = {
    identificador: 8,
    imagen: 'assets/images/auras/1.png',
    coordenadaX: 230,
    coordenadaY: 280
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