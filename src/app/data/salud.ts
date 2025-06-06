import { Salud } from "../models/salud.model";

export function obtenerListaSalud(): Salud[] {

  const listaSalud: Salud[] = [];

  const Salud1: Salud = {
    identificador: 1,
    coordenadaX: 232,
    coordenadaY: 28
  };

  const Salud2: Salud = {
    identificador: 2,
    coordenadaX: 168,
    coordenadaY: 60
  };

  const Salud3: Salud = {
    identificador: 3,
    coordenadaX: 104,
    coordenadaY: 92
  };

  const Salud4: Salud = {
    identificador: 4,
    coordenadaX: 40,
    coordenadaY: 124
  };

  const Salud5: Salud = {
    identificador: 5,
    coordenadaX: 424,
    coordenadaY: 124
  };

  const Salud6: Salud = {
    identificador: 6,
    coordenadaX: 360,
    coordenadaY: 156
  };

  const Salud7: Salud = {
    identificador: 7,
    coordenadaX: 296,
    coordenadaY: 188
  };

  const Salud8: Salud = {
    identificador: 8,
    coordenadaX: 232,
    coordenadaY: 220
  };

  listaSalud.push(Salud1);
  listaSalud.push(Salud2);
  listaSalud.push(Salud3);
  listaSalud.push(Salud4);
  listaSalud.push(Salud5);
  listaSalud.push(Salud6);
  listaSalud.push(Salud7);
  listaSalud.push(Salud8);

  return listaSalud;
}
