import { Injectable } from '@angular/core';
import { DimensionesEscenario } from '../models/dimensiones-escenario.model';
import { Personaje } from '../models/personaje.model';

@Injectable({
  providedIn: 'root'
})
export class GraficosTelefonoService {

  constructor() { }

  dibujarRetratoPersonaje(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {

    const alto = Math.round((60 / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((dimensionesEscenario.ancho - 10) / 4);

    let coordenadaX: number;

    if (personaje.identificador === 1) {

      coordenadaX = (2 + (ancho * (personaje.identificador - 1)));

    } else {

      coordenadaX = ((personaje.identificador * 2) + (ancho * (personaje.identificador - 1)));
    }

    const marcoContenedorParrafos: HTMLDivElement = document.createElement('div');
    const contenedorParrafos: HTMLDivElement = document.createElement('div');
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

    iconoIniciativa.style.height = '20px';
    iconoIniciativa.style.filter = 'brightness(0) saturate(100%) invert(85%) sepia(100%) saturate(5500%) hue-rotate(10deg) brightness(140%) contrast(120%)';
    iconoIniciativa.style.width = '20px';
    iconoIniciativa.src = rutaIconoIniciativa;
    iconoIniciativa.style.top = '22px';
    iconoIniciativa.style.left = 'calc(0px + 10%)';
    iconoIniciativa.style.position = 'absolute';
    //iconoIniciativa.style.border = '1px solid green';

    iconoDefensa.style.height = '20px';
    iconoDefensa.style.filter = 'brightness(0) saturate(100%) invert(29%) sepia(97%) saturate(2736%) hue-rotate(183deg) brightness(100%) contrast(95%)';

    iconoDefensa.style.width = '20px';
    iconoDefensa.src = rutaIconoDefensa;
    iconoDefensa.style.top = '42px';
    iconoDefensa.style.left = 'calc(0px + 10%)';
    iconoDefensa.style.position = 'absolute';
    //iconoDefensa.style.border = '1px solid green';

    iconoSalud.style.height = '20px';
    iconoSalud.style.filter = 'brightness(0) saturate(100%) invert(11%) sepia(97%) saturate(7470%) hue-rotate(358deg) brightness(99%) contrast(113%)';
    iconoSalud.style.width = '20px';
    iconoSalud.src = rutaIconoSalud;
    iconoSalud.style.top = '62px';
    iconoSalud.style.left = 'calc(0px + 10%)';
    iconoSalud.style.position = 'absolute';
    //iconoSalud.style.border = '1px solid white';

    fragmentoParrafoNombre.id = 'nombrePersonajeturno';
    fragmentoParrafoNombre.textContent = `${personaje.nombre}`;
    fragmentoParrafoNombre.style.top = '0px';
    fragmentoParrafoNombre.style.left = 'calc(0px + 25%)';
    fragmentoParrafoNombre.style.position = 'absolute';
    //fragmentoParrafoNombre.style.border = '1px solid green';    

    fragmentoParrafoIniciativa.id = 'iniciativaPersonajeTurno';
    fragmentoParrafoIniciativa.textContent = `${personaje.iniciativaActual}/${personaje.iniciativa}`;
    fragmentoParrafoIniciativa.style.top = '22px';
    fragmentoParrafoIniciativa.style.left = 'calc(0px + 50%)';
    fragmentoParrafoIniciativa.style.position = 'absolute';
    //fragmentoParrafoIniciativa.style.border = '1px solid blue';

    fragmentoParrafoDefensa.id = 'defensaPersonajeTurno';
    fragmentoParrafoDefensa.textContent = `${personaje.defensaActual}/${personaje.defensa}`;
    fragmentoParrafoDefensa.style.top = '42px';
    fragmentoParrafoDefensa.style.left = 'calc(0px + 50%)';
    fragmentoParrafoDefensa.style.position = 'absolute';
    //fragmentoParrafoDefensa.style.border = '1px solid purple';

    fragmentoParrafoSalud.appendChild(iconoSalud);
    fragmentoParrafoSalud.id = 'saludPersonajeTurno';
    fragmentoParrafoSalud.textContent = `${personaje.saludActual}/${personaje.salud}`;
    fragmentoParrafoSalud.style.top = '62px';
    fragmentoParrafoSalud.style.left = 'calc(0px + 50%)';
    fragmentoParrafoSalud.style.position = 'absolute';
    //fragmentoParrafoSalud.style.border = '1px solid white';

    contenedorParrafos.appendChild(iconoIniciativa);
    contenedorParrafos.appendChild(iconoDefensa);
    contenedorParrafos.appendChild(iconoSalud);
    contenedorParrafos.appendChild(fragmentoParrafoNombre);
    contenedorParrafos.appendChild(fragmentoParrafoIniciativa);
    contenedorParrafos.appendChild(fragmentoParrafoDefensa);
    contenedorParrafos.appendChild(fragmentoParrafoSalud);

    return marcoContenedorParrafos;
  }
}
