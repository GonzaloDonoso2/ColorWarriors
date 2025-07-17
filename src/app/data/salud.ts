import { Salud } from "../models/salud.model";

export function obtenerListaSalud(): Salud[] {

  const listaSalud: Salud[] = [];
  const Salud1: Salud = { identificador: 1 };
  const Salud2: Salud = { identificador: 2 };
  const Salud3: Salud = { identificador: 3 };
  const Salud4: Salud = { identificador: 4 };
  const Salud5: Salud = { identificador: 5 };
  const Salud6: Salud = { identificador: 6 };
  const Salud7: Salud = { identificador: 7 };
  const Salud8: Salud = { identificador: 8 };

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
