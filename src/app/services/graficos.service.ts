import { Injectable } from '@angular/core';
import { DimensionesEscenario } from '../models/dimensiones-escenario.model';
import { Personaje } from '../models/personaje.model';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor() { }

  dibujarPersonaje(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLImageElement {

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);
    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);

    let coordenadaY: number;

    if (pantallaPC) { 

      coordenadaY = Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto);

    } else {

      coordenadaY = Math.round(((personaje.coordenadaY - 74) / 528) * dimensionesEscenario.alto);
    } 
    
    const imagenPersonaje: HTMLImageElement = document.createElement('img');

    let opacidad: string = '';
    let trasnformador: string = '';

    if (personaje.saludActual > 0) { opacidad = '1'; } else { opacidad = '0'; }

    if (!personaje.jugador) { trasnformador = 'scaleX(-1)'; }

    imagenPersonaje.id = `personaje${personaje.identificador}`;
    imagenPersonaje.src = personaje.imagen;
    imagenPersonaje.style.height = `${alto}px`;
    imagenPersonaje.style.imageRendering = 'pixelated';
    imagenPersonaje.style.left = `${coordenadaX}px`;
    imagenPersonaje.style.opacity = opacidad;
    imagenPersonaje.style.position = 'absolute';
    imagenPersonaje.style.top = `${coordenadaY}px`;
    imagenPersonaje.style.transform = trasnformador;
    imagenPersonaje.style.transition = 'opacity 0.5s ease';
    imagenPersonaje.style.width = `${ancho}px`;
    imagenPersonaje.style.zIndex = '1';

    return imagenPersonaje;
  }

  dibujarAura(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLImageElement {

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);

    let coordenadaX: number;
    let coordenadaY: number;

    if (personaje.jugador) {

      coordenadaX = Math.round(((personaje.coordenadaX - 4) / 528) * dimensionesEscenario.ancho);

    } else {

      coordenadaX = Math.round(((personaje.coordenadaX + 4) / 528) * dimensionesEscenario.ancho);
    }

    if (pantallaPC) { 
      
      coordenadaY =  Math.round(((personaje.coordenadaY + 8) / 528) * dimensionesEscenario.alto);

    } else {

      coordenadaY = Math.round(((personaje.coordenadaY - 66) / 528) * dimensionesEscenario.alto);
    } 

    const imagenAura: HTMLImageElement = document.createElement('img');

    imagenAura.id = `aura${personaje.identificador}`;
    imagenAura.src = 'assets/images/auras/amarillo/1.png';
    imagenAura.style.height = `${alto}px`;
    imagenAura.style.imageRendering = 'pixelated';
    imagenAura.style.left = `${coordenadaX}px`;
    imagenAura.style.opacity = '0';
    imagenAura.style.pointerEvents = 'none';
    imagenAura.style.position = 'absolute';
    imagenAura.style.top = `${coordenadaY}px`;
    imagenAura.style.transition = 'opacity 0.5s ease';
    imagenAura.style.width = `${ancho}px`;
    imagenAura.style.zIndex = '0';

    return imagenAura;
  }

  dibujarContenedorAnimacion(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {

    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);

    let alto: number;
    let ancho: number;
    let coordenadaY: number;

    if (pantallaPC) {

      alto = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
      ancho = Math.round((personaje.alto / 528) * dimensionesEscenario.ancho);
      coordenadaY = Math.round(((personaje.coordenadaY - 32) / 528) * dimensionesEscenario.alto);

    } else {

      alto = Math.round((30 / 528) * dimensionesEscenario.alto);
      ancho = Math.round((80 / 528) * dimensionesEscenario.ancho);
      coordenadaY = Math.round((((personaje.coordenadaY - 74) - 16) / 528) * dimensionesEscenario.alto);
    }

    const contenedorAnimacion: HTMLDivElement = document.createElement('div');

    contenedorAnimacion.id = `animacion${personaje.identificador}`;
    contenedorAnimacion.style.fontSize = '40px';
    contenedorAnimacion.style.fontWeight = 'bold';
    contenedorAnimacion.style.height = `${alto}px`;
    contenedorAnimacion.style.left = `${coordenadaX}px`;
    contenedorAnimacion.style.lineHeight = '40px';
    contenedorAnimacion.style.opacity = '1';
    contenedorAnimacion.style.pointerEvents = 'none';
    contenedorAnimacion.style.position = 'absolute';
    

    contenedorAnimacion.style.display = 'flex';
    contenedorAnimacion.style.alignItems = 'center';
    contenedorAnimacion.style.justifyContent = 'center';

    contenedorAnimacion.style.textAlign = 'left';
    contenedorAnimacion.style.top = `${coordenadaY}px`;
    contenedorAnimacion.style.transition = 'opacity 0.5s ease';
    contenedorAnimacion.style.width = `${ancho}px`;
    contenedorAnimacion.style.zIndex = '2';
    //contenedorAnimacion.style.border = '1px solid red';    

    return contenedorAnimacion;
  } 

  dibujarRetratoPersonaje(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {
   
    const alto = Math.round((90 / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round(((dimensionesEscenario.ancho / 2) - 10) / 4);    
    let coordenadaX: number;

    if (personaje.identificador === 1) {

      coordenadaX = (2 + (ancho * (personaje.identificador - 1)));

    } else {

      coordenadaX = ((personaje.identificador * 2) + (ancho * (personaje.identificador - 1)));
    }

    const marcoContenedorParrafos: HTMLDivElement = document.createElement('div');
    const contenedorParrafos: HTMLDivElement = document.createElement('div');
    const imagen: HTMLImageElement = document.createElement('img');
    const iconoIniciativa: HTMLImageElement = document.createElement('img');
    const iconoDefensa: HTMLImageElement = document.createElement('img');
    const iconoSalud: HTMLImageElement = document.createElement('img');
    const rutaIconoIniciativa: string = `assets/images/icons/Iniciativa.ico`;
    const rutaIconoDefensa: string = `assets/images/icons/Escudo.ico`;
    const rutaIconoSalud: string = `assets/images/icons/Corazon.ico`;
    const fragmentoParrafoNombre: HTMLSpanElement = document.createElement('span');
    const fragmentoParrafoIniciativa: HTMLSpanElement = document.createElement('span');
    const fragmentoParrafoDefensa: HTMLSpanElement = document.createElement('span');
    const fragmentoParrafoSalud: HTMLSpanElement = document.createElement('span');

    let opacidad: string = '0';

    if (personaje.saludActual > 0) { opacidad = '0.5' } else { opacidad = '0.1' }

    marcoContenedorParrafos.style.height = `${alto}px`;
    marcoContenedorParrafos.style.width = `${ancho}px`;
    marcoContenedorParrafos.style.top = '2px';

    marcoContenedorParrafos.style.left = `${coordenadaX}px`;

    marcoContenedorParrafos.id = `retratoPersonaje${personaje.identificador}`;
    marcoContenedorParrafos.style.backgroundColor = 'white';
    marcoContenedorParrafos.style.borderRadius = '4px';
    marcoContenedorParrafos.style.border = '2px solid white';
    marcoContenedorParrafos.style.opacity = opacidad;
    marcoContenedorParrafos.style.position = 'absolute';
    marcoContenedorParrafos.style.transition = 'opacity 0.5s ease';
    marcoContenedorParrafos.style.zIndex = '0';

    contenedorParrafos.style.color = 'white';
    contenedorParrafos.style.backgroundColor = 'blue';
    contenedorParrafos.style.borderRadius = '4px';
    contenedorParrafos.style.fontSize = '1rem';
    contenedorParrafos.style.height = '100%';
    contenedorParrafos.style.lineHeight = '1rem';
    contenedorParrafos.style.transition = 'opacity 0.5s ease';
    contenedorParrafos.style.width = '100%';
    contenedorParrafos.style.border = '1px solid gray';

    marcoContenedorParrafos.appendChild(contenedorParrafos);

    imagen.src = `assets/images/personajes/retratos/${personaje.nombre}.png`;;
    imagen.style.height = '100%';
    imagen.style.top = '0px';
    imagen.style.left = '0px';
    imagen.style.position = 'absolute';
    imagen.style.imageRendering = 'pixelated';
    imagen.style.width = '50%';
    //imagen.style.border = '1px solid gray';

    iconoIniciativa.style.height = '20px';
    iconoIniciativa.style.filter = 'brightness(0) saturate(100%) invert(85%) sepia(100%) saturate(5500%) hue-rotate(10deg) brightness(140%) contrast(120%)';
    iconoIniciativa.style.width = '20px';
    iconoIniciativa.src = rutaIconoIniciativa;
    iconoIniciativa.style.top = '22px';
    iconoIniciativa.style.left = 'calc(0px + 50%);'
    iconoIniciativa.style.position = 'absolute';
    //iconoIniciativa.style.border = '1px solid green';

    iconoDefensa.style.height = '20px';
    iconoDefensa.style.filter = 'brightness(0) saturate(100%) invert(29%) sepia(97%) saturate(2736%) hue-rotate(183deg) brightness(100%) contrast(95%)';

    iconoDefensa.style.width = '20px';
    iconoDefensa.src = rutaIconoDefensa;
    iconoDefensa.style.top = '42px';
    iconoDefensa.style.left = 'calc(0px + 50%)'
    iconoDefensa.style.position = 'absolute';
    //iconoDefensa.style.border = '1px solid green';

    iconoSalud.style.height = '20px';
    iconoSalud.style.filter = 'brightness(0) saturate(100%) invert(11%) sepia(97%) saturate(7470%) hue-rotate(358deg) brightness(99%) contrast(113%)';
    iconoSalud.style.width = '20px';
    iconoSalud.src = rutaIconoSalud;
    iconoSalud.style.top = '62px';
    iconoSalud.style.left = 'calc(0px + 50%)';
    iconoSalud.style.position = 'absolute';
    //iconoSalud.style.border = '1px solid white';

    fragmentoParrafoNombre.id = 'nombrePersonajeturno';
    fragmentoParrafoNombre.textContent = `${personaje.nombre}`;
    fragmentoParrafoNombre.style.top = '0px';
    fragmentoParrafoNombre.style.left = 'calc(0px + 50%)';
    fragmentoParrafoNombre.style.position = 'absolute';
    //fragmentoParrafoNombre.style.border = '1px solid green';     

    fragmentoParrafoIniciativa.id = 'iniciativaPersonajeTurno';
    fragmentoParrafoIniciativa.textContent = `${personaje.iniciativaActual}/${personaje.iniciativa}`;
    fragmentoParrafoIniciativa.style.top = '22px';
    fragmentoParrafoIniciativa.style.left = 'calc(0px + 70%)';
    fragmentoParrafoIniciativa.style.position = 'absolute';
    //fragmentoParrafoIniciativa.style.border = '1px solid blue';

    fragmentoParrafoDefensa.id = 'defensaPersonajeTurno';
    fragmentoParrafoDefensa.textContent = `${personaje.defensaActual}/${personaje.defensa}`;
    fragmentoParrafoDefensa.style.top = '42px';
    fragmentoParrafoDefensa.style.left = 'calc(0px + 70%)';
    fragmentoParrafoDefensa.style.position = 'absolute';
    //fragmentoParrafoDefensa.style.border = '1px solid purple';

    fragmentoParrafoSalud.appendChild(iconoSalud);
    fragmentoParrafoSalud.id = 'saludPersonajeTurno';
    fragmentoParrafoSalud.textContent = `${personaje.saludActual}/${personaje.salud}`;
    fragmentoParrafoSalud.style.top = '62px';
    fragmentoParrafoSalud.style.left = 'calc(0px + 70%)';
    fragmentoParrafoSalud.style.position = 'absolute';
    //fragmentoParrafoSalud.style.border = '1px solid white';

    contenedorParrafos.appendChild(iconoIniciativa);
    contenedorParrafos.appendChild(iconoDefensa);
    contenedorParrafos.appendChild(iconoSalud);
    contenedorParrafos.appendChild(imagen);
    contenedorParrafos.appendChild(fragmentoParrafoNombre);
    contenedorParrafos.appendChild(fragmentoParrafoIniciativa);
    contenedorParrafos.appendChild(fragmentoParrafoDefensa);
    contenedorParrafos.appendChild(fragmentoParrafoSalud);

    return marcoContenedorParrafos;
  }

  dibujarBotonAtaque(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLButtonElement {

    let alto: number;
    let ancho: number;
    let coordenadaX: number;
    let coordenadaY: number;    
    let altoIcono: number;
    let anchoIcono: number;

    if (pantallaPC) {

      alto = 50;
      ancho = 50;
      coordenadaX = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) + 104);
      coordenadaY = (Math.round(((personaje.coordenadaY - 60) / 528) * dimensionesEscenario.alto));  
      altoIcono = 40;
      anchoIcono = 40;    

    } else {

      alto = 40;
      ancho = 40;
      coordenadaX = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) + 44);
      coordenadaY = (Math.round(((personaje.coordenadaY - 114) / 528) * dimensionesEscenario.alto));     
      altoIcono = 30;
      anchoIcono = 30;  
    }
    
    const boton: HTMLButtonElement = document.createElement('button');
    const icono: HTMLImageElement = document.createElement('img');

    icono.src = `assets/images/icons/Espada.ico`;
    icono.style.filter = 'invert(1)';
    icono.style.height = `${altoIcono}px`;
    icono.style.width = `${anchoIcono}px`;

    boton.appendChild(icono);

    boton.id = 'botonAtaque';

    boton.style.display = 'flex';
    boton.style.alignItems = 'center';
    boton.style.justifyContent = 'center';

    boton.style.backgroundColor = 'red';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.height = `${alto}px`;
    boton.style.left = `${coordenadaX}px`;
    boton.style.opacity = '1';
    boton.style.position = 'absolute';
    boton.style.top = `${coordenadaY}px`;
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = `${ancho}px`;
    boton.style.zIndex = '2';

    return boton;
  }

  dibujarBotonHabilidadEspecial(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLButtonElement {

    let alto: number;
    let ancho: number;
    let coordenadaX: number;
    let coordenadaY: number;
    let altoIcono: number;
    let anchoIcono: number;

    if (pantallaPC) {

      alto = 50;
      ancho = 50;
      coordenadaX = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) + 52);
      coordenadaY = (Math.round(((personaje.coordenadaY - 60) / 528) * dimensionesEscenario.alto));
      altoIcono = 40;
      anchoIcono = 40;            

    } else {

      alto = 40;
      ancho = 40;
      coordenadaX = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) + 2);
      coordenadaY = (Math.round(((personaje.coordenadaY - 114) / 528) * dimensionesEscenario.alto));   
      altoIcono = 30;
      anchoIcono = 30;    
    }
    
    const boton: HTMLButtonElement = document.createElement('button');
    const icono: HTMLImageElement = document.createElement('img');

    icono.src = `assets/images/icons/Critico.ico`;
    icono.style.filter = 'invert(1)';
    icono.style.height = `${altoIcono}px`;
    icono.style.width = `${anchoIcono}px`;

    boton.appendChild(icono);

    boton.id = 'botonHabilidadEspecial';

    boton.style.display = 'flex';
    boton.style.alignItems = 'center';
    boton.style.justifyContent = 'center';
    boton.style.backgroundColor = 'gray';

    //boton.style.backgroundColor = 'green';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.height = `${alto}px`;
    boton.style.left = `${coordenadaX}px`;
    boton.style.opacity = '1';
    boton.style.position = 'absolute';
    boton.style.top = `${coordenadaY}px`;
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = `${ancho}px`;
    boton.style.zIndex = '2';

    return boton;
  }

  dibujarBotonTerminarTurno(pantallaPC: boolean, dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLButtonElement {

    let alto: number;
    let ancho: number;
    let coordenadaX: number;
    let coordenadaY: number;    
    let altoIcono: number;
    let anchoIcono: number;

    if (pantallaPC) {

      alto = 50;
      ancho = 50;
      coordenadaX = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);
      coordenadaY = (Math.round(((personaje.coordenadaY - 60) / 528) * dimensionesEscenario.alto));  
      altoIcono = 40;
      anchoIcono = 40;    

    } else {

      alto = 40;
      ancho = 40;
      coordenadaX = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) - 40);
      coordenadaY = (Math.round(((personaje.coordenadaY - 114) / 528) * dimensionesEscenario.alto));  
      altoIcono = 30;
      anchoIcono = 30;     
    }
    
    const boton: HTMLButtonElement = document.createElement('button');
    const icono: HTMLImageElement = document.createElement('img');

    icono.src = `assets/images/icons/TerminarTurno.ico`;
    icono.style.filter = 'invert(1)';
    icono.style.height = `${altoIcono}px`;
    icono.style.width = `${anchoIcono}px`;

    boton.appendChild(icono);

    boton.id = 'botonTerminarTurno';

    boton.style.display = 'flex';
    boton.style.alignItems = 'center';
    boton.style.justifyContent = 'center';
    boton.style.backgroundColor = 'gray';

    //boton.style.backgroundColor = 'orange';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.height = `${alto}px`;
    boton.style.left = `${coordenadaX}px`;
    boton.style.opacity = '1';
    boton.style.position = 'absolute';
    boton.style.top = `${coordenadaY}px`;
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = `${ancho}px`;
    boton.style.zIndex = '2';

    return boton;
  }

  borrarContenedorAnimacion(): void {}
}
