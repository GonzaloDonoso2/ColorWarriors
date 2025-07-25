import { Injectable } from '@angular/core';
import { DimensionesEscenario } from '../models/dimensiones-escenario.model';
import { Personaje } from '../models/personaje.model';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor() { }

  dibujarPersonaje(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLImageElement {

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);
    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);
    const coordenadaY: number = Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto);
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

  dibujarAura(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLImageElement {

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);
    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);
    const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto) + 8);
    const imagenAura: HTMLImageElement = document.createElement('img');

    imagenAura.id = `aura${personaje.identificador}`;
    imagenAura.src = 'assets/images/auras/1.png';
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

  dibujarContenedorAnimacion(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLDivElement {

    const alto: number = Math.round((personaje.alto / 528) * dimensionesEscenario.alto);
    const ancho: number = Math.round((personaje.ancho / 528) * dimensionesEscenario.ancho);
    const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho);
    const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto) - 32);
    const contenedorAnimacion: HTMLDivElement = document.createElement('div');

    contenedorAnimacion.id = `animacion${personaje.identificador}`;
    contenedorAnimacion.style.borderRadius = '4px';
    contenedorAnimacion.style.fontFamily = 'Monaco';
    contenedorAnimacion.style.fontSize = '40px';
    contenedorAnimacion.style.fontWeight = 'bold';
    contenedorAnimacion.style.height = `${alto}px`;
    contenedorAnimacion.style.left = `${coordenadaX}px`;
    contenedorAnimacion.style.lineHeight = '40px';
    contenedorAnimacion.style.opacity = '0';
    contenedorAnimacion.style.pointerEvents = 'none';
    contenedorAnimacion.style.position = 'absolute';
    contenedorAnimacion.style.textAlign = 'left';
    contenedorAnimacion.style.top = `${coordenadaY}px`;
    contenedorAnimacion.style.transition = 'opacity 0.5s ease';
    contenedorAnimacion.style.width = `${ancho}px`;
    contenedorAnimacion.style.zIndex = '1';

    return contenedorAnimacion;
  } 

  dibujarRetratoPersonaje(personaje: Personaje): HTMLDivElement {

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

    let coordenadaX: number = 0;
    let opacidad: string = '0';

    if (personaje.identificador === 1) { coordenadaX = 2; }
    else if (personaje.identificador === 2) { coordenadaX = 148; }
    else if (personaje.identificador === 3) { coordenadaX = 294; }
    else if (personaje.identificador === 4) { coordenadaX = 440; }

    if (personaje.saludActual > 0) { opacidad = '0.5' } else { opacidad = '0.1' }

    marcoContenedorParrafos.id = `retratoPersonaje${personaje.identificador}`;
    marcoContenedorParrafos.style.backgroundColor = 'white';
    marcoContenedorParrafos.style.borderRadius = '4px';
    marcoContenedorParrafos.style.border = '2px solid white';
    marcoContenedorParrafos.style.left = `${coordenadaX}px`;
    marcoContenedorParrafos.style.opacity = opacidad;
    marcoContenedorParrafos.style.position = 'absolute';
    marcoContenedorParrafos.style.transition = 'opacity 0.5s ease';
    marcoContenedorParrafos.style.top = '2px';
    marcoContenedorParrafos.style.zIndex = '0';

    contenedorParrafos.style.color = 'white';
    contenedorParrafos.style.backgroundColor = 'blue';
    contenedorParrafos.style.borderRadius = '4px';
    contenedorParrafos.style.fontFamily = 'Monaco';
    contenedorParrafos.style.fontSize = '20px';
    contenedorParrafos.style.height = '90px';
    contenedorParrafos.style.lineHeight = '20px';

    contenedorParrafos.style.transition = 'opacity 0.5s ease';
    contenedorParrafos.style.width = '140px';
    contenedorParrafos.style.border = '1px solid gray';

    marcoContenedorParrafos.appendChild(contenedorParrafos);

    imagen.src = `assets/images/personajes/retratos/${personaje.nombre}.png`;;
    imagen.style.height = '81px';
    imagen.style.top = '4px';
    imagen.style.left = '0px';
    imagen.style.position = 'absolute';
    imagen.style.imageRendering = 'pixelated';
    imagen.style.width = '69px';
    //imagen.style.border = '1px solid gray';

    iconoIniciativa.style.height = '20px';
    iconoIniciativa.style.filter = 'brightness(0) saturate(100%) invert(85%) sepia(100%) saturate(5500%) hue-rotate(10deg) brightness(140%) contrast(120%)';
    iconoIniciativa.style.width = '20px';
    iconoIniciativa.src = rutaIconoIniciativa;
    iconoIniciativa.style.top = '22px';
    iconoIniciativa.style.left = '69px';
    iconoIniciativa.style.position = 'absolute';
    //iconoIniciativa.style.border = '1px solid green';

    iconoDefensa.style.height = '20px';
    iconoDefensa.style.filter = 'brightness(0) saturate(100%) invert(29%) sepia(97%) saturate(2736%) hue-rotate(183deg) brightness(100%) contrast(95%)';

    iconoDefensa.style.width = '20px';
    iconoDefensa.src = rutaIconoDefensa;
    iconoDefensa.style.top = '42px';
    iconoDefensa.style.left = '69px';
    iconoDefensa.style.position = 'absolute';
    //iconoDefensa.style.border = '1px solid green';

    iconoSalud.style.height = '20px';
    iconoSalud.style.filter = 'brightness(0) saturate(100%) invert(11%) sepia(97%) saturate(7470%) hue-rotate(358deg) brightness(99%) contrast(113%)';
    iconoSalud.style.width = '20px';
    iconoSalud.src = rutaIconoSalud;
    iconoSalud.style.top = '62px';
    iconoSalud.style.left = '69px';
    iconoSalud.style.position = 'absolute';
    //iconoSalud.style.border = '1px solid white';

    fragmentoParrafoNombre.id = 'nombrePersonajeturno';
    fragmentoParrafoNombre.textContent = `${personaje.nombre}`;
    fragmentoParrafoNombre.style.top = '0px';
    fragmentoParrafoNombre.style.left = '69px';
    fragmentoParrafoNombre.style.position = 'absolute';
    //fragmentoParrafoNombre.style.border = '1px solid green';    

    fragmentoParrafoIniciativa.id = 'iniciativaPersonajeTurno';
    fragmentoParrafoIniciativa.textContent = `${personaje.iniciativa}/${personaje.iniciativaActual}`;
    fragmentoParrafoIniciativa.style.top = '22px';
    fragmentoParrafoIniciativa.style.left = '89px';
    fragmentoParrafoIniciativa.style.position = 'absolute';
    //fragmentoParrafoIniciativa.style.border = '1px solid blue';

    fragmentoParrafoDefensa.id = 'defensaPersonajeTurno';
    fragmentoParrafoDefensa.textContent = `${personaje.defensa}/${personaje.defensaActual}`;
    fragmentoParrafoDefensa.style.top = '42px';
    fragmentoParrafoDefensa.style.left = '89px';
    fragmentoParrafoDefensa.style.position = 'absolute';
    //fragmentoParrafoDefensa.style.border = '1px solid purple';

    fragmentoParrafoSalud.appendChild(iconoSalud);
    fragmentoParrafoSalud.id = 'saludPersonajeTurno';
    fragmentoParrafoSalud.textContent = `${personaje.salud}/${personaje.saludActual}`;
    fragmentoParrafoSalud.style.top = '62px';
    fragmentoParrafoSalud.style.left = '89px';
    fragmentoParrafoSalud.style.position = 'absolute';
    //fragmentoParrafoSalud.style.border = '1px solid white';

    contenedorParrafos.appendChild(imagen);
    contenedorParrafos.appendChild(iconoIniciativa);
    contenedorParrafos.appendChild(iconoDefensa);
    contenedorParrafos.appendChild(iconoSalud);
    contenedorParrafos.appendChild(fragmentoParrafoNombre);
    contenedorParrafos.appendChild(fragmentoParrafoIniciativa);
    contenedorParrafos.appendChild(fragmentoParrafoDefensa);
    contenedorParrafos.appendChild(fragmentoParrafoSalud);

    return marcoContenedorParrafos;
  }

  dibujarBotonAtaque(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLButtonElement {

    const coordenadaX: number = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) + 36);
    const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto) - 32);
    const boton: HTMLButtonElement = document.createElement('button');

    boton.id = 'botonAtaque';
    boton.textContent = 'Atacar';
    boton.style.backgroundColor = 'red';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.fontFamily = 'Monaco';
    boton.style.fontSize = '24px';
    boton.style.height = '30px';
    boton.style.left = `${coordenadaX}px`;
    boton.style.lineHeight = '24px';
    boton.style.opacity = '1';
    boton.style.position = 'absolute';
    boton.style.top = `${coordenadaY}px`;
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = '120px';
    boton.style.zIndex = '2';

    return boton;
  }

  dibujarBotonHabilidadEspecial(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLButtonElement {

    const coordenadaX: number = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) + 128);
    const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto) + 32);
    const boton: HTMLButtonElement = document.createElement('button');

    boton.id = 'botonHabilidadEspecial';
    boton.textContent = 'Habilidad Especial';
    boton.style.backgroundColor = 'green';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.fontFamily = 'Monaco';
    boton.style.fontSize = '20px';
    boton.style.height = '30px';
    boton.style.left = `${coordenadaX}px`;
    boton.style.lineHeight = '20px';
    boton.style.opacity = '1';
    boton.style.position = 'absolute';
    boton.style.top = `${coordenadaY}px`;
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = '120px';
    boton.style.zIndex = '2';

    return boton;
  }

  dibujarBotonTerminarTurno(dimensionesEscenario: DimensionesEscenario, personaje: Personaje): HTMLButtonElement {

    const coordenadaX: number = (Math.round((personaje.coordenadaX / 528) * dimensionesEscenario.ancho) - 96);
    const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * dimensionesEscenario.alto) + 32);
    const boton: HTMLButtonElement = document.createElement('button');

    boton.id = 'botonTerminarTurno';
    boton.textContent = 'Terminar Turno';
    boton.style.backgroundColor = '#9F7B00';
    boton.style.borderColor = 'white';
    boton.style.borderRadius = '4px';
    boton.style.color = 'white';
    boton.style.fontFamily = 'Monaco';
    boton.style.fontSize = '20px';
    boton.style.height = '30px';
    boton.style.left = `${coordenadaX}px`;
    boton.style.lineHeight = '20px';
    boton.style.opacity = '1';
    boton.style.position = 'absolute';
    boton.style.top = `${coordenadaY}px`;
    boton.style.transition = 'opacity 0.5s ease';
    boton.style.width = '120px';
    boton.style.zIndex = '2';

    return boton;
  }
}
