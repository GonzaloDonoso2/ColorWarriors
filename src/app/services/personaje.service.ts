import { Injectable } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { Aura } from '../models/aura.model';
import { Salud } from '../models/salud.model';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {
  
  constructor() { }

  animarImagenPersonajes(listaPersonajes: Personaje[]): void {

    for (let i = 0; i < listaPersonajes.length; i++) {

      if (listaPersonajes[i].salud > 0) {

        const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ listaPersonajes[i].identificador }`) as HTMLImageElement;
        
        let numeroImagen: number = 1;

        setInterval(() => {
    
          imagenPersonaje.src = `assets/images/personajes/posturas/inicial/${ listaPersonajes[i].nombre }${ numeroImagen }.png`;
    
          if (numeroImagen === 4) {
    
            numeroImagen = 1;
    
          } else {
    
            numeroImagen++
          }
          
        }, 250);
      }
    }
  }

  animarImagenAura(listaAuras: Aura[]): void {

    for (let i = 0; i < listaAuras.length; i++) {

      const imagenAura: HTMLImageElement = document.getElementById(`imagenAura${ listaAuras[i].identificador }`) as HTMLImageElement;

      let numeroImagen: number = 1;

      setInterval(() => {

        imagenAura.src = `assets/images/auras/${ numeroImagen }.png`;

        if (numeroImagen === 4) {

          numeroImagen = 1;

        } else {

          numeroImagen++
        }

      }, 250);
    }
  } 

  dibujarPersonajes(listaPersonajes: Personaje[]): void {

    const contenedorEscenario: HTMLDivElement = document.getElementById('contenedorEscenario') as HTMLDivElement;
    
    for (let i = 0; i < listaPersonajes.length; i++) {
  
      if (listaPersonajes[i].salud > 0) {
  
        const imagenPersonaje: HTMLImageElement = document.createElement('img');
        imagenPersonaje.id = `imagenPersonaje${ listaPersonajes[i].identificador }`;
        imagenPersonaje.src = listaPersonajes[i].imagen;  
        imagenPersonaje.style.height = '72px';
        imagenPersonaje.style.imageRendering = 'pixelated';
        imagenPersonaje.style.left = listaPersonajes[i].coordenadaX;
        imagenPersonaje.style.position = 'absolute';
        imagenPersonaje.style.top = listaPersonajes[i].coordenadaY;
        imagenPersonaje.style.width = '64px';
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

    for (let i = 0; i < listaAuras.length; i++) {

      const imagenAura: HTMLImageElement = document.createElement('img');
      imagenAura.id = `imagenAura${ listaAuras[i].identificador }`;
      imagenAura.src = listaAuras[i].imagen;
      imagenAura.style.height = '48px';
      imagenAura.style.imageRendering = 'pixelated';
      imagenAura.style.left = listaAuras[i].coordenadaX;
      imagenAura.style.opacity = "0";
      imagenAura.style.position = 'absolute';
      imagenAura.style.top = listaAuras[i].coordenadaY;
      imagenAura.style.width = '64px';
      imagenAura.style.zIndex = '0';

      contenedorEscenario.appendChild(imagenAura);
    }

    this.animarImagenAura(listaAuras);
  }

  dibujarSalud(listaSalud: Salud[]): void {

    const contenedorEscenario: HTMLDivElement = document.getElementById('contenedorEscenario') as HTMLDivElement;

    for (let i = 0; i < listaSalud.length; i++) {

      const contenedorSalud: HTMLDivElement = document.createElement('div');
      contenedorSalud.textContent = '-99';
      contenedorSalud.id = `contenedorSalud${ listaSalud[i].identificador }`;
      contenedorSalud.style.backgroundColor = 'none';
      contenedorSalud.style.borderRadius = '4px';
      contenedorSalud.style.color = 'red';
      contenedorSalud.style.fontFamily = 'Monaco';
      contenedorSalud.style.fontSize = '30px';
      contenedorSalud.style.fontWeight = 'bold';
      contenedorSalud.style.height = '30px';
      contenedorSalud.style.left = listaSalud[i].coordenadaX;
      contenedorSalud.style.lineHeight = '30px';
      contenedorSalud.style.opacity = "0";
      contenedorSalud.style.position = 'absolute';
      contenedorSalud.style.top = listaSalud[i].coordenadaY;
      contenedorSalud.style.width = '64px';
      contenedorSalud.style.zIndex = '1';

      contenedorEscenario.appendChild(contenedorSalud);
    }
  }  

  borrarPersonajes(listaPersonajes: Personaje[]): void {
  
    for (let i = 0; i < listaPersonajes.length; i++) {
  
      const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ listaPersonajes[i].identificador }`) as HTMLImageElement;
      imagenPersonaje.remove();
    }
  }
}
