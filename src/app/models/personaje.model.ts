export class Personaje {

    identificador: number;
    nombre: string;
    ataque: number;
    ataqueActual: number;
    danio: number;
    danioActual: number;
    defensa: number;
    defensaActual: number;
    iniciativa: number;
    iniciativaActual: number;
    salud: number;
    saludActual: number;
    estado: string;
    jugador: boolean;
    imagen: string;
    alto: number;
    ancho: number;
    coordenadaX: number;
    coordenadaY: number;

    constructor(
        identificador: number,
        nombre: string,
        ataque: number,
        ataqueActual: number,
        danio: number,
        danioActual: number,
        defensa: number,
        defensaActual: number,
        iniciativa: number,
        iniciativaActual: number,
        salud: number,
        saludActual: number,
        estado: string,
        jugador: boolean,
        imagen: string,
        alto: number,
        ancho: number,
        coordenadaX: number,
        coordenadaY: number,
    ) {
        this.identificador = identificador;
        this.nombre = nombre;
        this.ataque = ataque;
        this.ataqueActual = ataqueActual;
        this.danio = danio;
        this.danioActual = danioActual;
        this.defensa = defensa;
        this.defensaActual = defensaActual;
        this.iniciativa = iniciativa;
        this.iniciativaActual = iniciativaActual;
        this.salud = salud;
        this.saludActual = saludActual;
        this.estado = estado;
        this.jugador = jugador;
        this.imagen = imagen;        
        this.alto = alto;
        this.ancho = ancho;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
    }
}