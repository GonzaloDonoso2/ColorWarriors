import { Accion } from "./accion.model";

export class Victoria {

    estado: boolean;
    jugador: boolean;

    constructor(
        estado: boolean,
        jugador: boolean,
    ) {
        this.estado = estado;
        this.jugador = jugador;
    }
}