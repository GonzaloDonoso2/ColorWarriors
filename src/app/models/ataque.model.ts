import { Accion } from "./accion.model";
import { Personaje } from "./personaje.model";

export class Ataque extends Accion {

    personajeAtacante: Personaje;
    personajeDefensor: Personaje;
    danio: number;
    critico: boolean;
    override tipo: number;

    constructor(
        personajeAtacante: Personaje,
        personajeDefensor: Personaje,
        danio: number,
        critico: boolean,
        tipo: number
    ) {
        super(tipo);
        this.personajeAtacante = personajeAtacante;
        this.personajeDefensor = personajeDefensor;
        this.danio = danio;
        this.critico = critico;
        this.tipo = tipo;
    }
}