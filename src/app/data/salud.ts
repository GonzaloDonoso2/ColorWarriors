import { Salud } from "../models/salud.model";

export function obtenerListaSalud(): Salud[] {

  const listaSalud: Salud[] = [];

  const Salud1: Salud = {
    identificador: 1,
    coordenadaX: '232px',
    coordenadaY: '28px'
  };

  const Salud2: Salud = {
    identificador: 2,
    coordenadaX: '168px',
    coordenadaY: '60px'
  };

  const Salud3: Salud = {
    identificador: 3,
    coordenadaX: '104px',
    coordenadaY: '92px'
  };

  const Salud4: Salud = {
    identificador: 4,
    coordenadaX: '40px',
    coordenadaY: '124px'
  };

  const Salud5: Salud = {
    identificador: 5,
    coordenadaX: '424px',
    coordenadaY: '124px'
  };

  const Salud6: Salud = {
    identificador: 6,
    coordenadaX: '360px',
    coordenadaY: '156px'
  };

  const Salud7: Salud = {
    identificador: 7,
    coordenadaX: '296px',
    coordenadaY: '188px'
  };

  const Salud8: Salud = {
    identificador: 8,
    coordenadaX: '232px',
    coordenadaY: '220px'
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
