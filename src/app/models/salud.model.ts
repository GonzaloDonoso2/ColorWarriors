export class Salud {

    identificador: number;
    coordenadaX: string;
    coordenadaY: string;

    constructor(
        identificador: number,
        coordenadaX: string,
        coordenadaY: string,
    ) {
        this.identificador = identificador;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
    }
}