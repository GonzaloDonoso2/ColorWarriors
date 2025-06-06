import { Accion } from "./accion.model";

export class Ataque extends Accion{

    identificadorAtacante: number;
    nombreAtacante: string;
    identificadorDefensor: number;
    nombreDefensor: string;
    override tipo: number;

    constructor(
        identificadorAtacante: number,
        nombreAtacante: string,
        identificadorDefensor: number, 
        nombreDefensor: string,
        tipo: number
    ) {

        super(tipo);
        this.identificadorAtacante = identificadorAtacante;
        this.nombreAtacante = nombreAtacante;
        this.identificadorDefensor = identificadorDefensor;
        this.nombreDefensor = nombreDefensor;
        this.tipo = tipo;
    }
}