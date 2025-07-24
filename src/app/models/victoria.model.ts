import { Accion } from "./accion.model";

export class Victoria extends Accion {

    estado: boolean;
    jugador: boolean;
    override tipo: number;

    constructor(
        estado: boolean,
        jugador: boolean,
        tipo: number
    ) {
        super(tipo);
        this.estado = estado;
        this.jugador = jugador;
        this.tipo = tipo;
    }
}