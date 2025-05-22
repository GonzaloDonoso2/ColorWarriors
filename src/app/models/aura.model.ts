export class Aura {

    identificador: number;
    imagen: string;
    coordenadaX: string;
    coordenadaY: string;

    constructor(
        identificador: number,
        imagen: string,
        coordenadaX: string,
        coordenadaY: string,
    ) {
        this.identificador = identificador;
        this.imagen = imagen;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
    }
}