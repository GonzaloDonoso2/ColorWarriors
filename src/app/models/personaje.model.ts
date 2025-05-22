export class Personaje {

    identificador: number;
    nombre: string;
    ataque: number;
    danio: number;
    defensa: number;
    iniciativa: number;
    salud: number;
    estado: string;
    equipo: boolean;
    imagen: string;
    coordenadaX: string;
    coordenadaY: string;

    constructor(
        identificador: number,
        nombre: string,
        ataque: number,
        danio: number,
        defensa: number,
        iniciativa: number,
        salud: number,
        estado: string,
        equipo: boolean,
        imagen: string,
        coordenadaX: string,
        coordenadaY: string,
    ) {
        this.identificador = identificador;
        this.nombre = nombre;
        this.ataque = ataque;
        this.danio = danio;
        this.defensa = defensa;
        this.iniciativa = iniciativa;
        this.salud = salud;
        this.estado = estado;
        this.equipo = equipo;
        this.imagen = imagen;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
    }
}