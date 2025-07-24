import { Accion } from "./accion.model";
import { Personaje } from "./personaje.model";

export class Ataque extends Accion {

    personajeAtacante: Personaje;
    personajeDefensor: Personaje;
    danio: number;
    critico: boolean;

    constructor(
        personajeAtacante: Personaje,
        personajeDefensor: Personaje,
        danio: number,
        critico: boolean,
        tipo: number,
        resultado: number
    ) {
        super(tipo, resultado);
        this.personajeAtacante = personajeAtacante;
        this.personajeDefensor = personajeDefensor;
        this.danio = danio;
        this.critico = critico;
    }
}