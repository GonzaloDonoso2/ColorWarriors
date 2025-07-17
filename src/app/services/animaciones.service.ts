import { Injectable } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { Aura } from '../models/aura.model';
import { Ataque } from '../models/ataque.model';
import { reproducirSonido } from '../utils/utilidades';
import { tiempoEspera } from '../utils/utilidades';

@Injectable({
  providedIn: 'root'
})
export class AnimacionesService {

  animarPersonajes: boolean = true;
  animarAuras: boolean  = true;

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

  async animarAurasInicial(auras: Aura[]): Promise<void> {

    const rutaImagen: string = 'assets/images/auras/';

    let numeroImagen: number = 1;

    while (this.animarAuras) {

      auras.forEach(aura => {

        const identificadorImagenAura: string = `aura${aura.identificador}`;
        const imagen: HTMLImageElement = document.getElementById(identificadorImagenAura) as HTMLImageElement;

        imagen.src = `${rutaImagen}${numeroImagen}.png`;
      });

      if (numeroImagen === 4) { numeroImagen = 1; } else { numeroImagen++ }

      await tiempoEspera(250);
    }
  }

  async animarRetratoPersonaje(nombrePersonajeTurno: string): Promise<void> {

    const rutaImagen: string = 'assets/images/personajes/retratos/';

    let numeroImagen: number = 1;

    while (this.animarPersonajes) {

      const identificadorImagen: string = 'imagenRetratoPersonaje';
      const imagenRetratoPersonaje: HTMLImageElement = document.getElementById(identificadorImagen) as HTMLImageElement;

      imagenRetratoPersonaje.src = `${rutaImagen}${nombrePersonajeTurno}${numeroImagen}.png`;

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

      const personaje = personajes.find(x => x.identificador === identificador)!;

      if (personaje.saludActual > 0) { 
        
        reproducirSonido('movimientoCursor'); 
        
        imagenRetratoPersonaje.style.opacity = '0.8';      
      }  

    } else {

      imagenRetratoPersonaje.style.opacity = '0';
    }
  }

  async animarAtaque(alto: number, ancho: number, personajes: Personaje[], ataque: Ataque): Promise<void> {

    this.animarPersonajes = false;

    const personajeAtacante = personajes.find(personaje => personaje.identificador === ataque.identificadorAtacante)!;

    if (personajeAtacante.saludActual > 0) {

      const personajeDefensor = personajes.find(personaje => personaje.identificador === ataque.identificadorDefensor)!;
      const atacanteCoordenadaX: number = Math.round((personajeAtacante.coordenadaX / 528) * ancho);
      const atacanteCoordenadaY: number = Math.round((personajeAtacante.coordenadaY / 340) * alto);
      const defensorCoordenadaX: number = personajeDefensor.coordenadaX;
      const defensorCoordenadaY: number = personajeDefensor.coordenadaY;

      let coordenadaX: number;
      let coordenadaY: number;

      if (personajeAtacante.jugador) {

        coordenadaX = Math.round(((defensorCoordenadaX - 64) / 528) * ancho);
        coordenadaY = Math.round(((defensorCoordenadaY - 32) / 340) * alto);

      } else {

        coordenadaX = Math.round(((defensorCoordenadaX + 64) / 528) * ancho);
        coordenadaY = Math.round(((defensorCoordenadaY + 32) / 340) * alto);
      }

      const imagenPersonajeAtacante: HTMLImageElement = document.getElementById(`personaje${ataque.identificadorAtacante}`) as HTMLImageElement;
      const imagenPersonajeDefensor: HTMLImageElement = document.getElementById(`personaje${ataque.identificadorDefensor}`) as HTMLImageElement;
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

        imagenPersonajeAtacante.src = `${rutaImagenPersonajeAtacante}${ataque.nombreAtacante}${numeroImagen}.png`;
        imagenPersonajeDefensor.src = `${rutaImagenPersonajeDefensor}${ataque.nombreDefensor}${numeroImagen}.png`;

        if (numeroImagen === 3) { reproducirSonido('golpe'); }

        if (numeroImagen === 4) {

          imagenPersonajeAtacante.style.left = `${atacanteCoordenadaX}px`;
          imagenPersonajeAtacante.style.top = `${atacanteCoordenadaY}px`;
        }

        numeroImagen++

        await tiempoEspera(200);
      }

      return;

    } else {

      return;
    } 
  }

  async animarSaludDefensa(personajes: Personaje[], ataque: Ataque) {

    const personaje = personajes.find(personaje => personaje.identificador === ataque.identificadorDefensor)!;
    const fragmentoParrafoSalud: HTMLSpanElement = document.getElementById(`saludFragmentoParrafo${personaje.identificador}`) as HTMLSpanElement;
    const fragmentoParrafoDefensa: HTMLSpanElement = document.getElementById(`defensaFragmentoParrafo${personaje.identificador}`) as HTMLSpanElement;
    const contenedorAnimacion: HTMLDivElement = document.getElementById(`animacion${personaje.identificador}`) as HTMLDivElement;

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

        texto = '-1'
        color = '#0F70CE';
        icono = 'Escudo';
        filtro = 'brightness(0) saturate(100%) invert(30%) sepia(86%) saturate(1120%) hue-rotate(186deg)';
      }
    }

    contenedorAnimacion.style.color = color;
    contenedorAnimacion.textContent = texto;

    const imagen: HTMLImageElement = document.createElement('img');
    const rutaIcono: string = `assets/images/icons/${icono}.ico`; 
    
    imagen.style.height = '50%';
    imagen.style.width = '50%';
    imagen.style.filter = filtro;
    imagen.src = rutaIcono;

    contenedorAnimacion.appendChild(imagen);
    contenedorAnimacion.style.opacity = '1';

    await tiempoEspera(200);

    fragmentoParrafoSalud.textContent = `${personaje.salud}/${personaje.saludActual}`;
    fragmentoParrafoDefensa.textContent = `${personaje.defensa}/${personaje.defensaActual}`;
    contenedorAnimacion.innerHTML = '';    
  }

  async animarMuertePersonaje(identificadorPersonaje: number): Promise<void> {

    const imagenPersonaje: HTMLImageElement = document.getElementById(`personaje${identificadorPersonaje}`) as HTMLImageElement;
    const imagenAura: HTMLImageElement = document.getElementById(`aura${identificadorPersonaje}`) as HTMLImageElement;
    const contenedorSalud: HTMLDivElement = document.getElementById(`salud${identificadorPersonaje}`) as HTMLDivElement;
    const contenedorDefensa: HTMLDivElement = document.getElementById(`defensa${identificadorPersonaje}`) as HTMLDivElement;
    const contenedorAnimacion: HTMLDivElement = document.getElementById(`animacion${identificadorPersonaje}`) as HTMLDivElement;

    await tiempoEspera(200);

    imagenPersonaje.style.opacity = '0';
    imagenAura.style.opacity = '0';
    contenedorSalud.style.opacity = '0';
    contenedorDefensa.style.opacity = '0';
    contenedorAnimacion.style.opacity = '0';

    imagenPersonaje.style.pointerEvents = 'none'; 
    imagenAura.style.pointerEvents = 'none'; 
    contenedorSalud.style.pointerEvents = 'none'; 
    contenedorDefensa.style.pointerEvents = 'none'; 
    contenedorAnimacion.style.pointerEvents = 'none'; 
  }
}
