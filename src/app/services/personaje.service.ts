import { Injectable } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { Aura } from '../models/aura.model';
import { Salud } from '../models/salud.model';
import { Ataque } from '../models/ataque.model';
import { reproducirSonido } from '../utils/utilidades';
import { tiempoEsperaAnimacion } from '../utils/utilidades';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  listaIdentificadoresAnimacionesPersonajes: number[] = [];
  listaIdentificadoresAnimacionesAuras: number[] = [];
  identificadorAnimacionReatroPersonaje: number = 0;

  constructor() { }

  animarImagenPersonajes(listaPersonajes: Personaje[]): void {

    for (let i = 0; i < listaPersonajes.length; i++) {

      let numeroImagen: number = 1;

      function animar(): void {

        const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ listaPersonajes[i].identificador }`) as HTMLImageElement;

        imagenPersonaje.src = `assets/images/personajes/posturas/inicial/${ listaPersonajes[i].nombre }${ numeroImagen }.png`;

        if (numeroImagen === 4) {

          numeroImagen = 1;

        } else {

          numeroImagen++
        }
      };

      const identificadorAnimacionPersonaje: number = window.setInterval(animar, 250);

      this.listaIdentificadoresAnimacionesPersonajes.push(identificadorAnimacionPersonaje);
    }
  }

  animarImagenAuras(listaAuras: Aura[]): void {

    for (let i = 0; i < listaAuras.length; i++) {

      let numeroImagen: number = 1;

      function animar(): void {

        const imagenAura: HTMLImageElement = document.getElementById(`imagenAura${ listaAuras[i].identificador }`) as HTMLImageElement;

        imagenAura.src = `assets/images/auras/${ numeroImagen }.png`;

        if (numeroImagen === 4) {

          numeroImagen = 1;

        } else {

          numeroImagen++
        }
      };

      const identificadorAnimacionAura: number = window.setInterval(animar, 250);

      this.listaIdentificadoresAnimacionesAuras.push(identificadorAnimacionAura);
    }
  }

  dibujarPersonajes(listaPersonajes: Personaje[]): void {

    const contenedorEscenario: HTMLDivElement = document.getElementById('contenedorEscenario') as HTMLDivElement;
    const altoContenedor: number = contenedorEscenario.clientHeight;
    const anchoContenedor: number = contenedorEscenario.clientWidth;
    const altoPersonaje: number = Math.round((72 / 340) * altoContenedor);
    const anchoPersonaje: number = Math.round((64 / 528) * anchoContenedor);
    
    for (let i = 0; i < listaPersonajes.length; i++) {
  
      if (listaPersonajes[i].salud > 0) {

        const coordenadaX: number = Math.round((listaPersonajes[i].coordenadaX / 528) * anchoContenedor);
        const coordenadaY: number = Math.round((listaPersonajes[i].coordenadaY / 340) * altoContenedor);
  
        const imagenPersonaje: HTMLImageElement = document.createElement('img');
        imagenPersonaje.id = `imagenPersonaje${ listaPersonajes[i].identificador }`;
        imagenPersonaje.src = listaPersonajes[i].imagen;  
        //imagenPersonaje.style.height = '72px';
        imagenPersonaje.style.height = altoPersonaje + 'px';
        imagenPersonaje.style.imageRendering = 'pixelated';
        //imagenPersonaje.style.left = listaPersonajes[i].coordenadaX;
        imagenPersonaje.style.left = coordenadaX + 'px';
        imagenPersonaje.style.position = 'absolute';
        //imagenPersonaje.style.top = listaPersonajes[i].coordenadaY;
        imagenPersonaje.style.top = coordenadaY + 'px';
        //imagenPersonaje.style.width = '64px';
        imagenPersonaje.style.transition = 'opacity 0.5s ease';
        imagenPersonaje.style.width = anchoPersonaje + 'px';
        imagenPersonaje.style.zIndex = '1';      

        if (!listaPersonajes[i].equipo) {

          imagenPersonaje.style.transform = 'scaleX(-1)';
        }

        contenedorEscenario.appendChild(imagenPersonaje);
      }
    }

    this.animarImagenPersonajes(listaPersonajes);
  }

  dibujarAuras(listaAuras: Aura[]): void {

    const contenedorEscenario: HTMLDivElement = document.getElementById('contenedorEscenario') as HTMLDivElement;
    const altoContenedor: number = contenedorEscenario.clientHeight;
    const anchoContenedor: number = contenedorEscenario.clientWidth;
    const altoAura: number = Math.round((48 / 340) * altoContenedor);
    const anchoAura: number = Math.round((64 / 528) * anchoContenedor);

    for (let i = 0; i < listaAuras.length; i++) {

      const coordenadaX: number = Math.round((listaAuras[i].coordenadaX / 528) * anchoContenedor);
      const coordenadaY: number = Math.round((listaAuras[i].coordenadaY / 340) * altoContenedor);

      const imagenAura: HTMLImageElement = document.createElement('img');
      imagenAura.id = `imagenAura${ listaAuras[i].identificador }`;
      imagenAura.src = listaAuras[i].imagen;
      //imagenAura.style.height = '48px';
      imagenAura.style.height = altoAura + 'px';
      imagenAura.style.imageRendering = 'pixelated';
      //imagenAura.style.left = listaAuras[i].coordenadaX;
      imagenAura.style.left = coordenadaX + 'px';
      imagenAura.style.opacity = '0';
      imagenAura.style.position = 'absolute';
      //imagenAura.style.top = listaAuras[i].coordenadaY
      imagenAura.style.top = coordenadaY + 'px';
      //imagenAura.style.width = '64px';
      imagenAura.style.transition = 'opacity 0.5s ease';
      imagenAura.style.width = anchoAura + 'px';
      imagenAura.style.zIndex = '0';

      contenedorEscenario.appendChild(imagenAura);
    }

    this.animarImagenAuras(listaAuras);
  }

  dibujarSalud(listaSalud: Salud[]): void {

    const contenedorEscenario: HTMLDivElement = document.getElementById('contenedorEscenario') as HTMLDivElement;
    const altoContenedor: number = contenedorEscenario.clientHeight;
    const anchoContenedor: number = contenedorEscenario.clientWidth;
    const altoSalud: number = Math.round((30 / 340) * altoContenedor);
    const anchoSalud: number = Math.round((100 / 528) * anchoContenedor);

    for (let i = 0; i < listaSalud.length; i++) {

      const coordenadaX: number = Math.round((listaSalud[i].coordenadaX / 528) * anchoContenedor);
      const coordenadaY: number = Math.round((listaSalud[i].coordenadaY / 340) * altoContenedor);

      const contenedorSalud: HTMLDivElement = document.createElement('div');
      contenedorSalud.textContent = '-99';
      contenedorSalud.id = `contenedorSalud${ listaSalud[i].identificador }`;
      contenedorSalud.style.backgroundColor = 'none';
      contenedorSalud.style.borderRadius = '4px';
      contenedorSalud.style.color = 'red';
      contenedorSalud.style.fontFamily = 'Monaco';
      //contenedorSalud.style.fontSize = '30px';
      contenedorSalud.style.fontSize = altoSalud + 'px';
      contenedorSalud.style.fontWeight = 'bold';
      //contenedorSalud.style.height = '30px';
      contenedorSalud.style.height = altoSalud + 'px';
      //contenedorSalud.style.left = listaSalud[i].coordenadaX;
      contenedorSalud.style.left = coordenadaX + 'px';
      //contenedorSalud.style.lineHeight = '30px';
      contenedorSalud.style.lineHeight = altoSalud + 'px';
      contenedorSalud.style.opacity = '0';
      contenedorSalud.style.position = 'absolute';
      //contenedorSalud.style.top = listaSalud[i].coordenadaY;
      contenedorSalud.style.top = coordenadaY + 'px';
      //contenedorSalud.style.width = '64px';
      contenedorSalud.style.transition = 'opacity 0.5s ease';
      contenedorSalud.style.width = anchoSalud + 'px';
      contenedorSalud.style.zIndex = '1';

      contenedorEscenario.appendChild(contenedorSalud);
    }
  }  

  borrarAnimacionPersonajes(): void {

    for (let i = 0; i < this.listaIdentificadoresAnimacionesPersonajes.length; i++) {

      const identificadorAnimacionPersonaje: number = this.listaIdentificadoresAnimacionesPersonajes[i];

      clearInterval(identificadorAnimacionPersonaje);      
    }
  }

  borrarPersonajes(listaPersonajes: Personaje[]): void {

    for (let i = 0; i < this.listaIdentificadoresAnimacionesPersonajes.length; i++) {

      const identificadorAnimacionPersonaje: number = this.listaIdentificadoresAnimacionesPersonajes[i];

      clearInterval(identificadorAnimacionPersonaje);      
    }

    this.listaIdentificadoresAnimacionesPersonajes = [];
  
    for (let i = 0; i < listaPersonajes.length; i++) {
  
      const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ listaPersonajes[i].identificador }`) as HTMLImageElement;
      imagenPersonaje.remove();
    }
  }

  animarImagenRetratoPersonajes(nombrePersonaje: string): void {

    clearInterval(this.identificadorAnimacionReatroPersonaje);  

    let numeroImagen: number = 1;

    function animar(): void {

      const imagenReatroPersonaje: HTMLImageElement = document.getElementById('imagenRetratoPersonaje') as HTMLImageElement;

      imagenReatroPersonaje.src = `assets/images/personajes/retratos/${ nombrePersonaje }${ numeroImagen }.png`;

      if (numeroImagen === 4) {

        numeroImagen = 1;

      } else {

        numeroImagen++
      }
    };

    this.identificadorAnimacionReatroPersonaje = window.setInterval(animar, 250);
  }

  borrarAnimacionReatroPersonaje(): void {

    clearInterval(this.identificadorAnimacionReatroPersonaje);  
  }

  async animarAtaque(listaPersonajes: Personaje[], ataque: Ataque): Promise<void> {

    const contenedorEscenario: HTMLDivElement = document.getElementById('contenedorEscenario') as HTMLDivElement;
    const altoContenedor: number = contenedorEscenario.clientHeight;
    const anchoContenedor: number = contenedorEscenario.clientWidth;

    const indicePersonajeAtacante: number = listaPersonajes.findIndex(personaje => personaje.identificador === ataque.identificadorAtacante);
    const indicePersonajeDefensor: number = listaPersonajes.findIndex(personaje => personaje.identificador === ataque.identificadorDefensor);

    const atacanteCoordenadaX: number = Math.round((listaPersonajes[indicePersonajeAtacante].coordenadaX / 528) * anchoContenedor);
    const atacanteCoordenadaY: number = Math.round((listaPersonajes[indicePersonajeAtacante].coordenadaY / 340) * altoContenedor);

    const defensorCoordenadaX: number = listaPersonajes[indicePersonajeDefensor].coordenadaX;
    const defensorCoordenadaY: number = listaPersonajes[indicePersonajeDefensor].coordenadaY;

    const coordenadaX: number = Math.round(((defensorCoordenadaX - 64) / 528) * anchoContenedor);
    const coordenadaY: number = Math.round(((defensorCoordenadaY - 32) / 340) * altoContenedor);

    const rutaImagen: string = 'assets/images/personajes/posturas/ataque/';
    const extencionImagen: string = '.png';
    const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ ataque.identificadorAtacante}`) as HTMLImageElement;

    imagenPersonaje.style.left = coordenadaX + 'px';
    imagenPersonaje.style.top = coordenadaY + 'px';

    let numeroImagen: number = 1;

    while (numeroImagen < 5) {      

      imagenPersonaje.src = rutaImagen + ataque.nombreAtacante + numeroImagen + extencionImagen;

      console.log(rutaImagen + ataque.nombreAtacante + numeroImagen + extencionImagen);

      if (numeroImagen === 3) { reproducirSonido('golpe'); }

      if (numeroImagen === 4) { 

        imagenPersonaje.style.left = atacanteCoordenadaX + 'px';
        imagenPersonaje.style.top = atacanteCoordenadaY + 'px';
      }

      numeroImagen++

      await tiempoEsperaAnimacion(250);
    }

    return;
  }

  async animarDefensa(ataque: Ataque) {

    const contenedorSalud: HTMLParagraphElement = document.getElementById(`contenedorSalud${ ataque.identificadorDefensor }`) as HTMLParagraphElement;

    contenedorSalud.style.color = 'blue';
    contenedorSalud.textContent = '-1 ';

    const imagen: HTMLImageElement = document.createElement('img');

    imagen.style.height = '80%';
    imagen.style.width = '25%';
    imagen.src = `assets/images/icons/shield-reflect_38114.ico`;
    imagen.style.filter = 'brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(7459%) hue-rotate(234deg)';

    contenedorSalud.appendChild(imagen);
    contenedorSalud.style.opacity = '1';

    await tiempoEsperaAnimacion(1000);

    contenedorSalud.style.opacity = '0';    
  }

  async animarDanio(ataque: Ataque) {

    const contenedorSalud: HTMLParagraphElement = document.getElementById(`contenedorSalud${ ataque.identificadorDefensor }`) as HTMLParagraphElement;
   
    contenedorSalud.style.color = 'red';
    contenedorSalud.textContent = '-' + ataque.danio.toString();

    const imagen: HTMLImageElement = document.createElement('img');

    imagen.style.height = '80%';
    imagen.style.width = '25%';
    imagen.src = `assets/images/icons/Dur.ico`;
    imagen.style.filter = 'brightness(0) saturate(100%) invert(16%) sepia(100%) saturate(7490%) hue-rotate(0deg)';

    contenedorSalud.appendChild(imagen);
    contenedorSalud.style.opacity = '1';

    await tiempoEsperaAnimacion(1000);

    contenedorSalud.style.opacity = '0';    
  }

  async animarMuertePersonaje(identificadorPersonaje: number): Promise<void> {

    const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ identificadorPersonaje }`) as HTMLImageElement;
    const imagenAura: HTMLImageElement = document.getElementById(`imagenAura${ identificadorPersonaje }`) as HTMLImageElement;
    const contenedorSalud: HTMLParagraphElement = document.getElementById(`contenedorSalud${ identificadorPersonaje }`) as HTMLParagraphElement;

    await tiempoEsperaAnimacion(1000);

    imagenPersonaje.style.opacity = '0';
    imagenAura.style.opacity = '0';
    contenedorSalud.style.opacity = '0';
  }
}
