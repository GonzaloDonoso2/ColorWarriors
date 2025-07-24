import { Injectable } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { generarNumeroAleatorio } from '../utils/utilidades';
import { Ataque } from '../models/ataque.model';
import { Accion } from '../models/accion.model';
import { Victoria } from '../models/victoria.model';

@Injectable({
  providedIn: 'root'
})
export class MecanicasService {

  constructor() { }

  obtenerPersonajesOrdenados(personajes: Personaje[]): Personaje[] {

    const copiaPersonajes: Personaje[] = [...personajes];
    const personajesOrdenados: Personaje[] = copiaPersonajes.sort((a, b) => b.iniciativaActual - a.iniciativaActual);

    return personajesOrdenados;
  }

  obtenerPersonajesJugadoresOrdenados(personajes: Personaje[]): Personaje[] {

    const copiaPersonajes: Personaje[] = personajes.filter(x => x.jugador);
    const personajesJugadoresOrdenados: Personaje[] = copiaPersonajes.sort((a, b) => b.iniciativaActual - a.iniciativaActual);

    return personajesJugadoresOrdenados;
  }

  obtenerAccionesOrdenados(acciones: Accion[]): Accion[] {

    const copiaAcciones: Accion[] = [...acciones];
    const accionesOrdenados: Accion[] = copiaAcciones.sort((a, b) => {

      const ataqueA = a as Ataque;
      const ataqueB = b as Ataque;

      return ataqueB.personajeAtacante.iniciativaActual - ataqueA.personajeAtacante.iniciativaActual;
    });

    return accionesOrdenados;
  }

  verificarCondicionVictoria(personajes: Personaje[]): Victoria{

    const personajeA = personajes.find(personaje => personaje.jugador === true && personaje.saludActual > 0);
    const personajeB = personajes.find(personaje => personaje.jugador === false && personaje.saludActual > 0);

    if (personajeA && personajeB) {

      const victoria: Victoria = new Victoria(false, false, 2);

      return  victoria;

    } else if (personajeA && !personajeB) {

      const victoria: Victoria = new Victoria(true, true, 2);

      return  victoria;

    } else if (!personajeA && personajeB) {

      const victoria: Victoria = new Victoria(true, false, 2);

      return  victoria;

    } else {

      throw new Error('No es posible un empate entre los dos equipos...'); 
    }
  }

  verificarObjetivoAtaque(personajes: Personaje[], ataque: Ataque): Personaje | null {
    
    const personajeOriginal = personajes.find(personaje => personaje.identificador === ataque.personajeDefensor.identificador)!;

    if (personajeOriginal.saludActual > 0) {

      return personajeOriginal; 

    } else {

      const personajeNuevo = personajes.find(personaje => personaje.jugador === personajeOriginal.jugador && personaje.saludActual > 0);

      if (personajeNuevo) {

        return personajeNuevo;

      } else {

        return null;
      }
    }
  }

  calcularDanio(personajes: Personaje[], ataque: Ataque): { danio: number, critico: boolean } {

    const personajeAtacante = personajes.find(personaje => personaje.identificador === ataque.personajeAtacante.identificador)!;
    const personajeDefensor = personajes.find(personaje => personaje.identificador === ataque.personajeDefensor.identificador)!;
    const puntuacionAtaque: number = personajeAtacante.ataqueActual;
    const puntuacionDefensa: number = personajeDefensor.defensaActual;
    const puntuacionTotal: number = (puntuacionAtaque + puntuacionDefensa);
    const probabilidadDefensa: number = Math.round((puntuacionDefensa * 100) / puntuacionTotal);
    const probabilidadAtaque: number = generarNumeroAleatorio(1, 100);

    if (probabilidadAtaque > probabilidadDefensa) {

      const probabilidadCritico: number = generarNumeroAleatorio(1, 100);

      if (probabilidadCritico > 79) {

        const puntuacionDanio: number = (personajeAtacante.danioActual + 2);

        return { danio: puntuacionDanio, critico: true };

      } else {

        const puntuacionDanio: number = generarNumeroAleatorio(1, personajeAtacante.danioActual);

        return { danio: puntuacionDanio, critico: false };
      }

    } else {

      return { danio: 0, critico: false };
    }
  }

  aplicarDanio(personajes: Personaje[], ataque: Ataque): void {

    const personaje = personajes.find(personaje => personaje.identificador === ataque.personajeDefensor.identificador)!;

    if (personaje) {

      if (ataque.danio > 0) {

        const nuevaPuntuacionSalud: number = (personaje.saludActual - ataque.danio);

        if (nuevaPuntuacionSalud > 0) {

          personaje.saludActual = nuevaPuntuacionSalud;

        } else {

          personaje.saludActual = 0;
        }

        const nuevaPuntuacionIniciativa: number = (personaje.iniciativaActual - 2);

        if (nuevaPuntuacionIniciativa > 0) {

          personaje.iniciativaActual = nuevaPuntuacionIniciativa;

        } else {

          personaje.iniciativaActual = 0;
        }

      } else {

        const nuevaPuntuacionDefensa: number = (personaje.defensaActual - 2);

        if (nuevaPuntuacionDefensa > 0) {

          personaje.defensaActual = nuevaPuntuacionDefensa;

        } else {

          personaje.defensaActual = 0
        }
      }
    }
  }

  ataquePersonajeNoJugador(personajes: Personaje[], personajeA: Personaje): Ataque {

    const personajesJugadores: Personaje[] = personajes.filter(personaje => personaje.jugador === true);
    const numeroPersonajesJugadores: number = personajesJugadores.length;
    const indicePersonajeJugador: number = generarNumeroAleatorio(0, (numeroPersonajesJugadores - 1));
    const personajeB: Personaje = personajesJugadores[indicePersonajeJugador];
    const ataque: Ataque = new Ataque(personajeA, personajeB, 0, false, 1);

    return ataque;
  }

  /*ataquePersonajeNoJugador(personajes: Personaje[], personajeA: Personaje): Ataque {

    const personajeB = personajes.find(personaje => personaje.jugador === true && personaje.saludActual > 0)!;
    const ataque: Ataque = new Ataque(personajeA, personajeB, 0, false, 1);

    return ataque;
  }*/
}
