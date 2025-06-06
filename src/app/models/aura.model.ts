export class Aura {

    identificador: number;
    imagen: string;
    coordenadaX: number;
    coordenadaY: number;

    constructor(
        identificador: number,
        imagen: string,
        coordenadaX: number,
        coordenadaY: number,
    ) {
        this.identificador = identificador;
        this.imagen = imagen;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
    }
}