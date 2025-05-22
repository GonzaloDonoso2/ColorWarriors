export class Ataque {

    atacante: number;
    defensor: number;
    tipo: number;

    constructor(
        atacante: number,
        defensor: number, 
        tipo: number
    ) {

        this.atacante = atacante;
        this.defensor = defensor;
        this.tipo = tipo;
    }
}