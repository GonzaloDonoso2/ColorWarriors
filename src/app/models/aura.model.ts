export class Aura {

    identificador: number;
    imagen: string;
    alto: number;
    ancho: number;
    coordenadaX: number;
    coordenadaY: number;

    constructor(
        identificador: number,
        imagen: string,
        alto: number,
        ancho: number,
        coordenadaX: number,
        coordenadaY: number,
    ) {
        this.identificador = identificador;
        this.imagen = imagen;
        this.alto = alto;
        this.ancho = ancho;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
    }
}