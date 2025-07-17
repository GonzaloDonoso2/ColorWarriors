import { Accion } from "./accion.model";

export class Ataque extends Accion{

    identificadorAtacante: number;
    nombreAtacante: string;
    identificadorDefensor: number;
    nombreDefensor: string;
    danio: number;
    critico: boolean;
    override tipo: number;

    constructor(
        identificadorAtacante: number,
        nombreAtacante: string,
        identificadorDefensor: number, 
        nombreDefensor: string,
        danio: number,
        critico: boolean,
        tipo: number
    ) {
        super(tipo);
        this.identificadorAtacante = identificadorAtacante;
        this.nombreAtacante = nombreAtacante;
        this.identificadorDefensor = identificadorDefensor;
        this.nombreDefensor = nombreDefensor;
        this.danio = danio;
        this.critico = critico;
        this.tipo = tipo;
    }
}