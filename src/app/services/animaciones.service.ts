import { Injectable } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { Ataque } from '../models/ataque.model';
import { reproducirSonido } from '../utils/utilidades';
import { tiempoEspera } from '../utils/utilidades';
import { DimensionesEscenario } from '../models/dimensiones-escenario.model';

@Injectable({
  providedIn: 'root'
})
export class AnimacionesService {

  animarPersonajes: boolean = true;
  animarAuras: boolean  = true;
  animarPersonajePosturaObjetivo: boolean = true;

  listaIdentificadoresAnimacionesPersonajes: number[] = [];
  listaIdentificadoresAnimacionesAuras: number[] = [];
  identificadorAnimacionReatroPersonaje: number = 0;

  constructor() { }

  async animarPersonajesPosturaInicial(personajes: Personaje[]): Promise<void> {

    const rutaImagen: string = 'assets/images/personajes/posturas/inicial/';

    let numeroImagen: number = 1;

    while (this.animarPersonajes) {  

      personajes.forEach(personaje => {

        const identificadorImagen: string = `personaje${ personaje.identificador }`;
        const imagen: HTMLImageElement = document.getElementById(identificadorImagen) as HTMLImageElement;

        if (personaje.salud > 0) {

          imagen.src = `${rutaImagen}${personaje.nombre}${numeroImagen}.png`;
        }
      });

      if (numeroImagen === 4)  { numeroImagen = 1; } else { numeroImagen++ }

      await tiempoEspera(250);
    }
  }

  async animarAurasInicial(personajes: Personaje[]): Promise<void> {
   
    const rutaImagen: string = 'assets/images/auras/amarillo/';

    let numeroImagen: number = 1;

    while (this.animarAuras) {

      personajes.forEach(personaje => {
        
        const identificadorImagenAura: string = `aura${personaje.identificador}`;
        const imagen: HTMLImageElement = document.getElementById(identificadorImagenAura) as HTMLImageElement;

        imagen.src = `${rutaImagen}${numeroImagen}.png`;
      });

      if (numeroImagen === 4) { numeroImagen = 1; } else { numeroImagen++ }

      await tiempoEspera(250);
    }
  }

  borraPersonajes(personajes: Personaje[]): void {

    personajes.forEach(personaje => {

      const identificadorImagen: string = `personaje${personaje.identificador}`;
      const imagenPersonje: HTMLImageElement = document.getElementById(identificadorImagen) as HTMLImageElement;

      imagenPersonje.style.opacity = '0';

      imagenPersonje.remove();
    });
  }

  mostrarOcultarAura(personajes: Personaje[], identificador: number, mostrarAura: boolean) {

    const identificadorImagenAura: string = `aura${identificador}`;
    const imagenRetratoPersonaje: HTMLImageElement = document.getElementById(identificadorImagenAura) as HTMLImageElement;

    if (mostrarAura) {

      const personaje = personajes.find(personaje => personaje.identificador === identificador)!;

      if (personaje.saludActual > 0) { 
        
        //reproducirSonido('movimientoCursor'); 
        
        imagenRetratoPersonaje.style.opacity = '0.9';      
      }  

    } else {

      imagenRetratoPersonaje.style.opacity = '0';
    }
  }

  async animarAtaque(dimensiones: DimensionesEscenario, personajes: Personaje[], ataque: Ataque): Promise<void> {

    const personajeAtacante = personajes.find(personaje => personaje.identificador === ataque.personajeAtacante.identificador)!;
    const personajeDefensor = personajes.find(personaje => personaje.identificador === ataque.personajeDefensor.identificador)!;
    const atacanteCoordenadaX: number = Math.round((personajeAtacante.coordenadaX / 528) * dimensiones.ancho);    
    const atacanteCoordenadaY: number = Math.round((personajeAtacante.coordenadaY / 528) * dimensiones.alto);

    let coordenadaX: number;
    let coordenadaY: number;

    if (personajeAtacante.jugador) {

      coordenadaX = Math.round(((personajeDefensor.coordenadaX - 64) / 528) * dimensiones.ancho);
      coordenadaY = Math.round(((personajeDefensor.coordenadaY - 32) / 528) * dimensiones.alto);

    } else {

      coordenadaX = Math.round(((personajeDefensor.coordenadaX + 64) / 528) * dimensiones.ancho);
      coordenadaY = Math.round(((personajeDefensor.coordenadaY + 32) / 528) * dimensiones.alto);
    }

    const imagenPersonajeAtacante: HTMLImageElement = document.getElementById(`personaje${ataque.personajeAtacante.identificador}`) as HTMLImageElement;
    const imagenPersonajeDefensor: HTMLImageElement = document.getElementById(`personaje${ataque.personajeDefensor.identificador}`) as HTMLImageElement;
    const rutaImagenPersonajeAtacante: string = 'assets/images/personajes/posturas/ataque/';

    let rutaImagenPersonajeDefensor: string;

    if (ataque.danio > 0) {

      rutaImagenPersonajeDefensor = 'assets/images/personajes/posturas/herido/';

    } else {

      rutaImagenPersonajeDefensor = 'assets/images/personajes/posturas/defensa/';
    }

    imagenPersonajeAtacante.style.left = `${coordenadaX}px`;
    imagenPersonajeAtacante.style.top = `${coordenadaY}px`;

    let numeroImagen: number = 1;

    while (numeroImagen < 5) {

      imagenPersonajeAtacante.src = `${rutaImagenPersonajeAtacante}${ataque.personajeAtacante.nombre}${numeroImagen}.png`;
      imagenPersonajeDefensor.src = `${rutaImagenPersonajeDefensor}${ataque.personajeDefensor.nombre}${numeroImagen}.png`;

      if (numeroImagen === 3) { reproducirSonido('golpe'); }

      if (numeroImagen === 4) {

        imagenPersonajeAtacante.style.left = `${atacanteCoordenadaX}px`;
        imagenPersonajeAtacante.style.top = `${atacanteCoordenadaY}px`;
      }

      numeroImagen++

      await tiempoEspera(200);
    }

    return;
  }

  async animarDanio(personajes: Personaje[], ataque: Ataque) {

    const personaje = personajes.find(personaje => personaje.identificador === ataque.personajeDefensor.identificador)!;
    const contenedor: HTMLDivElement = document.getElementById(`danio${personaje.identificador}`) as HTMLDivElement;

    let texto: string;
    let color: string;
    let icono: string;
    let filtro: string;

    if (ataque.critico) {

      texto = `-${ataque.danio}`;      
      color = '#9F7B00'; 
      icono = 'Critico';      
      filtro = 'brightness(0) saturate(100%) invert(61%) sepia(100%) saturate(3200%) hue-rotate(5deg)';


    } else {

      if (ataque.danio > 0) {

        texto = `-${ataque.danio}`;
        color = '#FF0D00';
        icono = 'Corazon';
        filtro = 'brightness(0) saturate(100%) invert(16%) sepia(100%) saturate(7490%) hue-rotate(0deg)';

      } else {

        texto = '-2'
        color = '#0F70CE';
        icono = 'Escudo';
        filtro = 'brightness(0) saturate(100%) invert(30%) sepia(86%) saturate(1120%) hue-rotate(186deg)';
      }
    }

    contenedor.style.backgroundColor = 'transparent';
    contenedor.style.borderColor = 'transparent';
    contenedor.style.color = color;
    contenedor.textContent = texto;

    const imagen: HTMLImageElement = document.createElement('img');
    const rutaIcono: string = `assets/images/icons/${icono}.ico`; 
    
    imagen.style.height = '30px';
    imagen.style.width = '30px';
    imagen.style.filter = filtro;
    imagen.src = rutaIcono;

    contenedor.appendChild(imagen);
    contenedor.style.opacity = '1';

    await tiempoEspera(500);
    
    contenedor.style.opacity = '0';  
    contenedor.innerHTML = '';  
  }

  async animarInconcienciaPersonaje(personaje: Personaje): Promise<void> {

    const imagenPersonaje: HTMLImageElement = document.getElementById(`personaje${personaje.identificador}`) as HTMLImageElement;   
    const rutaImagen: string = 'assets/images/personajes/posturas/herido/';

    imagenPersonaje.src = `${rutaImagen}${personaje.nombre}5.png`;
  }

  async animarMuertePersonaje(identificadorPersonaje: number): Promise<void> {

    const imagenPersonaje: HTMLImageElement = document.getElementById(`personaje${identificadorPersonaje}`) as HTMLImageElement;
    const imagenAura: HTMLImageElement = document.getElementById(`aura${identificadorPersonaje}`) as HTMLImageElement;
    const contenedorAnimacion: HTMLDivElement = document.getElementById(`danio${identificadorPersonaje}`) as HTMLDivElement;

    await tiempoEspera(1000);

    imagenPersonaje.style.opacity = '0';
    imagenAura.style.opacity = '0';
    contenedorAnimacion.style.opacity = '0';

    imagenPersonaje.style.pointerEvents = 'none'; 
    imagenAura.style.pointerEvents = 'none'; 
    contenedorAnimacion.style.pointerEvents = 'none'; 
  }

  animarRetratoPersonaje(personaje: Personaje): void {

    const identificadorRetratoPersonaje: string = `retratoPersonaje${personaje.identificador}`;
    const retratoPersonaje: HTMLDivElement = document.getElementById(identificadorRetratoPersonaje) as HTMLDivElement;

    retratoPersonaje.style.opacity = '1';
  }

  borrarRetratosPersonajes(personajes: Personaje[]): void {

    personajes.forEach(personaje => {

      const identificadorRetratoPersonaje: string = `retratoPersonaje${personaje.identificador}`;
      const retratoPersonaje: HTMLDivElement = document.getElementById(identificadorRetratoPersonaje) as HTMLDivElement;

      retratoPersonaje.remove();
    });
  }

  borrarAuras(personajes: Personaje[]): void {

    personajes.forEach(personaje => {

      this.mostrarOcultarAura(personajes, personaje.identificador, false);
    });
  }

  async animarObjetivoAtaque(personaje: Personaje): Promise<void> {
    
    const imagen: HTMLDivElement = document.getElementById(`personaje${personaje.identificador}`) as HTMLImageElement;

    let filtro: string = 'brightness(1.5)'

    while (this.animarPersonajePosturaObjetivo) {

      imagen.style.filter = filtro;

      if (filtro === 'brightness(1.5)') { 

        filtro = 'brightness(0.5)';

      } else {

        filtro = 'brightness(1.5)';
      }

      await tiempoEspera(250);
    }
  }
}
