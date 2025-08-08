import { Injectable } from '@angular/core';
import { DimensionesEscenario } from '../models/dimensiones-escenario.model';
import { Personaje } from '../models/personaje.model';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor() { }

  dibujarPersonaje(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLImageElement {

    const imagenAnterior: HTMLImageElement = document.getElementById(`personaje${personaje.identificador}`) as HTMLImageElement;

    if (imagenAnterior) { imagenAnterior.remove(); }

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);
    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);
    const coordenadaY: number = Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto);    
    const imagen: HTMLImageElement = document.createElement('img');

    let opacidad: string = '';
    let trasnformador: string = '';

    if (personaje.saludActual > 0) { opacidad = '1'; } else { opacidad = '0'; }

    if (!personaje.jugador) { trasnformador = 'scaleX(-1)'; }

    imagen.id = `personaje${personaje.identificador}`;
    imagen.src = personaje.imagen;
    imagen.style.height = `${alto}px`;
    imagen.style.imageRendering = 'pixelated';
    imagen.style.left = `${coordenadaX}px`;
    imagen.style.opacity = opacidad;
    imagen.style.position = 'absolute';
    imagen.style.top = `${coordenadaY}px`;
    imagen.style.transform = trasnformador;
    imagen.style.transition = 'opacity 0.5s ease';
    imagen.style.width = `${ancho}px`;
    imagen.style.zIndex = '1';

    return imagen;
  }

  dibujarAura(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLImageElement {

    const imagenAnterior: HTMLImageElement = document.getElementById(`aura${personaje.identificador}`) as HTMLImageElement;

    if (imagenAnterior) { imagenAnterior.remove(); }

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);    
    const coordenadaY: number = Math.round(((personaje.coordenadaY + 8) / 528) * dimensionesEscenario.alto);
    const imagen: HTMLImageElement = document.createElement('img');

    let coordenadaX: number;

    if (personaje.jugador) {

      coordenadaX = Math.round(((personaje.coordenadaX - 4) / 528) * dimensionesEscenario.ancho);

    } else {

      coordenadaX = Math.round(((personaje.coordenadaX + 4) / 528) * dimensionesEscenario.ancho);
    }    

    imagen.id = `aura${personaje.identificador}`;
    imagen.src = 'assets/images/auras/amarillo/1.png';
    imagen.style.height = `${alto}px`;
    imagen.style.imageRendering = 'pixelated';
    imagen.style.left = `${coordenadaX}px`;
    imagen.style.opacity = '0';
    imagen.style.pointerEvents = 'none';
    imagen.style.position = 'absolute';
    imagen.style.top = `${coordenadaY}px`;
    imagen.style.transition = 'opacity 0.5s ease';
    imagen.style.width = `${ancho}px`;
    imagen.style.zIndex = '0';

    return imagen;
  }

  dibujarDanio(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {

    const contenedorAnterior: HTMLDivElement = document.getElementById(`danio${personaje.identificador}`) as HTMLDivElement;

    if (contenedorAnterior) { contenedorAnterior.remove(); }

    const alto: number = Math.round((50 / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);
    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);
    const coordenadaY: number = Math.round(((personaje.coordenadaY - 32) / 528) * dimensionesEscenario.alto);
    const contenedor: HTMLDivElement = document.createElement('div');

    contenedor.id = `danio${personaje.identificador}`;
    contenedor.style.alignItems = 'center';
    contenedor.style.display = 'flex';
    contenedor.style.fontSize = '40px';
    contenedor.style.fontWeight = 'bold';
    contenedor.style.height = `${alto}px`;
    contenedor.style.justifyContent = 'center';
    contenedor.style.left = `${coordenadaX}px`;
    contenedor.style.lineHeight = '40px';
    contenedor.style.opacity = '1';
    contenedor.style.pointerEvents = 'none';
    contenedor.style.position = 'absolute';
    contenedor.style.textAlign = 'left';
    contenedor.style.top = `${coordenadaY}px`;
    contenedor.style.transition = 'opacity 0.5s ease';
    contenedor.style.width = `${ancho}px`;
    contenedor.style.zIndex = '2';
    //contenedor.style.border = '1px solid red';    

    return contenedor;
  } 

  dibujarRetratoPersonaje(pantallaPC: boolean, pantallaHorizontal: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {

    const anteriorRetratoPersonaje: HTMLDivElement = document.getElementById(`retratoPersonaje${personaje.identificador}`) as HTMLDivElement;

    if (anteriorRetratoPersonaje) { anteriorRetratoPersonaje.remove(); }

    const contenedorMarco: HTMLDivElement = document.createElement('div');
    const contenedorParrafos: HTMLDivElement = document.createElement('div');
    const imagen: HTMLImageElement = document.createElement('img');
    const fragmentoParrafoSalud: HTMLSpanElement = document.createElement('span');

    let alto: number;
    let ancho: number;
    let coordenadaX: number;
    let tamanioFuente: number;
    
    if (pantallaPC) {

      alto = Math.round((90 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho - 10) / 8);  
      
      if (pantallaHorizontal === false) {

        tamanioFuente = 20;

      } else {

        tamanioFuente = 16;
      }

    } else {

      alto = Math.round((90 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho - 10) / 4);
      tamanioFuente = 16;
    }

    if (personaje.identificador === 1) {

      coordenadaX = 2;

    } else {

      coordenadaX = (ancho * (personaje.identificador - 1) + (2 + (2  * (personaje.identificador - 1))));
    }

    let opacidad: string = '0';

    if (personaje.saludActual > 0) { opacidad = '0.5' } else { opacidad = '0.1' }

    contenedorMarco.id = `retratoPersonaje${personaje.identificador}`;
    contenedorMarco.style.backgroundColor = 'white';
    contenedorMarco.style.border = '2px solid white';    
    contenedorMarco.style.borderRadius = '4px';
    contenedorMarco.style.height = `${alto}px`;
    contenedorMarco.style.left = `${coordenadaX}px`; 
    contenedorMarco.style.opacity = opacidad;
    contenedorMarco.style.position = 'absolute';
    contenedorMarco.style.top = '2px';
    contenedorMarco.style.transition = 'opacity 0.5s ease';
    contenedorMarco.style.width = `${ancho}px`;
    contenedorMarco.style.zIndex = '0';

    contenedorParrafos.style.color = 'white';
    contenedorParrafos.style.backgroundColor = 'blue';
    contenedorParrafos.style.borderRadius = '4px';
    contenedorParrafos.style.fontSize = `${tamanioFuente}px`;
    contenedorParrafos.style.height = '100%';
    contenedorParrafos.style.lineHeight = `${tamanioFuente}px`;
    contenedorParrafos.style.transition = 'opacity 0.5s ease';
    contenedorParrafos.style.width = '100%';
    contenedorParrafos.style.border = '1px solid gray';
    contenedorParrafos.textContent = personaje.nombre;

    contenedorParrafos.style.alignItems = 'center';
    contenedorParrafos.style.display = 'flex';
    contenedorParrafos.style.flexDirection = 'column';
    contenedorParrafos.style.justifyContent = 'center';
    
    imagen.src = `assets/images/personajes/retratos/${personaje.nombre}.png`;
    imagen.style.imageRendering = 'pixelated';
    imagen.style.height = '50%';
    imagen.style.width = '100%';

    fragmentoParrafoSalud.textContent = `Salud: ${personaje.saludActual}/${personaje.salud}`;
    fragmentoParrafoSalud.style.textAlign = 'left';

    contenedorMarco.appendChild(contenedorParrafos);
    contenedorParrafos.appendChild(imagen);
    contenedorParrafos.appendChild(fragmentoParrafoSalud);

    return contenedorMarco;
  }

  dibujarRetratoPersonajeTurno(pantallaPC: boolean, pantallaHorizontal: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {

    const anteriorRetratoPersonajeTurno: HTMLDivElement = document.getElementById('retratoPersonajeTurno') as HTMLDivElement;

    if (anteriorRetratoPersonajeTurno) { anteriorRetratoPersonajeTurno.remove(); }

    const marcoContenedorParrafos: HTMLDivElement = document.createElement('div');
    const contenedorParrafos: HTMLDivElement = document.createElement('div');
    const imagen: HTMLImageElement = document.createElement('img');
    const fragmentoParrafoNombre: HTMLSpanElement = document.createElement('span');

    let alto: number;
    let ancho: number; 
    let tamanioFuente: number;
    let coordenadaX: number;
    let coordenadaY: number;

    if (pantallaPC) {

      alto = Math.round((126 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho / 5) - 8);
      coordenadaX = 2;
      coordenadaY = (dimensionesEscenario.alto - alto - 2);

      if (pantallaHorizontal === false) {

        tamanioFuente = 20;

      } else {

        tamanioFuente = 14;
      }

    } else {

      alto = Math.round((120 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho / 3) - 4);
      tamanioFuente = 14;
      coordenadaX = 2;
      coordenadaY = (dimensionesEscenario.alto - alto - 2);
    }
    
    marcoContenedorParrafos.style.height = `${alto}px`;
    marcoContenedorParrafos.style.width = `${ancho}px`;
    marcoContenedorParrafos.style.left = `${coordenadaX}px`;    
    marcoContenedorParrafos.style.top = `${coordenadaY}px`;

    marcoContenedorParrafos.id = 'retratoPersonajeTurno';
    marcoContenedorParrafos.style.backgroundColor = 'white';
    marcoContenedorParrafos.style.borderRadius = '4px';
    marcoContenedorParrafos.style.border = '2px solid white';
    marcoContenedorParrafos.style.opacity = '1';
    marcoContenedorParrafos.style.position = 'absolute';
    marcoContenedorParrafos.style.transition = 'opacity 0.5s ease';
    marcoContenedorParrafos.style.zIndex = '0';

    contenedorParrafos.id = 'interiorRetratoPersonajeTurno';
    contenedorParrafos.style.color = 'white';
    contenedorParrafos.style.backgroundColor = 'blue';
    contenedorParrafos.style.borderRadius = '4px';
    contenedorParrafos.style.fontSize = `${tamanioFuente}px`;
    contenedorParrafos.style.height = '100%';
    contenedorParrafos.style.lineHeight = `${tamanioFuente}px`;
    contenedorParrafos.style.transition = 'opacity 0.5s ease';
    contenedorParrafos.style.width = '100%';
    contenedorParrafos.style.border = '1px solid gray';

    marcoContenedorParrafos.appendChild(contenedorParrafos);

    imagen.src = `assets/images/personajes/retratos/${personaje.nombre}.png`;
    imagen.style.height = '100%';
    imagen.style.top = '0px';
    imagen.style.left = '0px';
    imagen.style.position = 'absolute';
    imagen.style.imageRendering = 'pixelated';
    imagen.style.width = '50%';

    fragmentoParrafoNombre.id = 'nombrePersonajeturno';
    fragmentoParrafoNombre.innerHTML = `Turno de: ${personaje.nombre}<br><br>¿que debería hacer ${personaje.nombre}?`;
    fragmentoParrafoNombre.style.top = '0px';
    fragmentoParrafoNombre.style.left = 'calc(0px + 50%)';
    fragmentoParrafoNombre.style.position = 'absolute';

    contenedorParrafos.appendChild(imagen);
    contenedorParrafos.appendChild(fragmentoParrafoNombre);

    return marcoContenedorParrafos;
  }
  
  dibujarTextoBatalla(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario): HTMLDivElement {
     
    const marcoContenedorParrafos: HTMLDivElement = document.createElement('div');
    const contenedorParrafos: HTMLDivElement = document.createElement('div');
    const fragmentoParrafo: HTMLSpanElement = document.createElement('span');

    let alto: number;
    let ancho: number; 
    let coordenadaX: number;
    let coordenadaY: number;

    if (pantallaPC) {

      alto = Math.round((50 / 528) * dimensionesEscenario.alto);
      ancho = Math.round(dimensionesEscenario.ancho - 4); 
      coordenadaX = 2;
      coordenadaY = (dimensionesEscenario.alto - alto - 2);

    } else {

      alto = Math.round((120 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho / 2) - 4);
      coordenadaX = 2;
      coordenadaY = (dimensionesEscenario.alto - alto - 2);
    }

    marcoContenedorParrafos.style.height = `${alto}px`;
    marcoContenedorParrafos.style.width = `${ancho}px`;
    marcoContenedorParrafos.style.top = `${coordenadaY}px`;   
    marcoContenedorParrafos.style.left = `${coordenadaX}px`;

    marcoContenedorParrafos.style.backgroundColor = 'white';
    marcoContenedorParrafos.style.borderRadius = '4px';
    marcoContenedorParrafos.style.border = '2px solid white';
    marcoContenedorParrafos.style.opacity = '1';
    marcoContenedorParrafos.style.position = 'absolute';
    marcoContenedorParrafos.style.transition = 'opacity 0.5s ease';
    marcoContenedorParrafos.style.zIndex = '0';

    contenedorParrafos.style.color = 'white';
    contenedorParrafos.style.backgroundColor = 'blue';
    contenedorParrafos.style.borderRadius = '4px';
    contenedorParrafos.style.fontSize = '20px';
    contenedorParrafos.style.height = '100%';
    contenedorParrafos.style.lineHeight = '20px';
    contenedorParrafos.style.transition = 'opacity 0.5s ease';
    contenedorParrafos.style.width = '100%';
    contenedorParrafos.style.border = '1px solid gray';

    marcoContenedorParrafos.appendChild(contenedorParrafos);

    fragmentoParrafo.id = 'textoBatalla';
    fragmentoParrafo.style.top = '2px';
    fragmentoParrafo.style.left = '2px';
    fragmentoParrafo.style.position = 'absolute';
    
    contenedorParrafos.appendChild(fragmentoParrafo);

    return marcoContenedorParrafos;
  }

  dibujarBotonAtaque(): HTMLButtonElement {
    
    const boton: HTMLButtonElement = document.createElement('button');

    boton.id = 'botonAtaque';
    boton.style.backgroundColor = 'red';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.height = '24%';
    boton.style.margin = 'auto';
    boton.style.opacity = '1';
    boton.style.transition = 'backgroundColor 0.5s ease';
    boton.style.width = '98%';
    boton.style.zIndex = '1';
    boton.textContent = 'Atacar';

    return boton;
  }

  dibujarBotonHabilidadEspecial(): HTMLButtonElement {
    
    const boton: HTMLButtonElement = document.createElement('button');

    boton.id = 'botonHabilidadEspecial';
    boton.style.backgroundColor = 'green';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.height = '24%';
    boton.style.margin = 'auto';
    boton.style.opacity = '1';
    boton.style.transition = 'backgroundColor 0.5s ease';
    boton.style.width = '98%';
    boton.style.zIndex = '1';
    boton.textContent = 'Habilidad Especial';

    return boton;
  }

  dibujarBotonTermianrTurno(): HTMLButtonElement {
    
    const boton: HTMLButtonElement = document.createElement('button');

    boton.id = 'botonTerminarTurno';
    boton.style.backgroundColor = '#FF6A00';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.height = '24%';
    boton.style.margin = 'auto';
    boton.style.opacity = '1';
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = '98%';
    boton.style.zIndex = '1';
    boton.textContent = 'Terminar Turno';

    return boton;
  }

  dibujarBotones(pantallaPC: boolean, pantallaHorizontal: boolean, dimensionesEscenario: DimensionesEscenario): HTMLDivElement {

    const anteriorcontenedor: HTMLDivElement = document.getElementById('contenedorBotones') as HTMLDivElement;

    if (anteriorcontenedor) { anteriorcontenedor.remove(); }

    const contenedorMarco: HTMLDivElement = document.createElement('div');
    const contenedorBotones: HTMLDivElement = document.createElement('div');

    let alto: number;
    let ancho: number; 
    let tamanioFuente: number;
    let coordenadaX: number;
    let coordenadaY: number;

    if (pantallaPC) {

      alto = Math.round((126 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho / 5) - 8); 
      coordenadaX = (ancho + 4); 
      coordenadaY = (dimensionesEscenario.alto - alto - 2);

      if (pantallaHorizontal === false) {

        tamanioFuente = 20;

      } else {

        tamanioFuente = 14;
      }

    } else {

      alto = Math.round((120 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((dimensionesEscenario.ancho / 3) - 4);
      tamanioFuente = 18;
      coordenadaX = (ancho + 4);
      coordenadaY = (dimensionesEscenario.alto - alto - 2);
    }

    contenedorMarco.id = 'contenedorBotones';    
    contenedorMarco.style.backgroundColor = 'white';
    contenedorMarco.style.border = '2px solid white';
    contenedorMarco.style.borderRadius = '4px';
    contenedorMarco.style.height = `${alto}px`;
    contenedorMarco.style.left = `${coordenadaX}px`; 
    contenedorMarco.style.opacity = '1';
    contenedorMarco.style.position = 'absolute';       
    contenedorMarco.style.top = `${coordenadaY}px`;
    contenedorMarco.style.transition = 'opacity 0.5s ease';    
    contenedorMarco.style.width = `${ancho}px`;
    contenedorMarco.style.zIndex = '0';
    
    contenedorBotones.style.alignItems = 'center';
    contenedorBotones.style.backgroundColor = 'blue';    
    contenedorBotones.style.border = '1px solid gray';
    contenedorBotones.style.borderRadius = '4px';
    contenedorBotones.style.color = 'white';
    contenedorBotones.style.display = 'flex';
    contenedorBotones.style.flexDirection = 'column';
    contenedorBotones.style.fontSize = `${tamanioFuente}px`;
    contenedorBotones.style.height = '100%';
    contenedorBotones.style.justifyContent = 'center';
    contenedorBotones.style.lineHeight = `${tamanioFuente}px`;
    contenedorBotones.style.padding = '2px';
    contenedorBotones.style.transition = 'opacity 0.5s ease';
    contenedorBotones.style.width = '100%';

    contenedorMarco.appendChild(contenedorBotones);

    contenedorBotones.textContent = 'Opciones';

    const botonAtaque: HTMLButtonElement = this.dibujarBotonAtaque();
    const botonHabilidadEspecial: HTMLButtonElement = this.dibujarBotonHabilidadEspecial();
    const botonTerminarTurno: HTMLButtonElement = this.dibujarBotonTermianrTurno();

    contenedorBotones.appendChild(botonAtaque);
    contenedorBotones.appendChild(botonHabilidadEspecial);
    contenedorBotones.appendChild(botonTerminarTurno);
    
    return contenedorMarco;
  }
}
