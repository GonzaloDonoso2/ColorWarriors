import { Injectable } from '@angular/core';
import { Personaje } from '../models/personaje.model';
import { generarNumeroAleatorio } from '../utils/utilidades';
import { Ataque } from '../models/ataque.model';

@Injectable({
  providedIn: 'root'
})
export class MecanicasService {

  constructor() { }

  obtenerPersonajesOrdenados(personajes: Personaje[]): Personaje[] {

    const copiaPersonajes: Personaje[] = [...personajes];
    const personajesOrdenados: Personaje[] = copiaPersonajes.sort((a, b) => b.iniciativa - a.iniciativa);

    return personajesOrdenados;
  }

  obtenerPersonajesJugadoresOrdenados(personajes: Personaje[]): Personaje[] {

    const copiaPersonajes: Personaje[] = personajes.filter(x => x.jugador);
    const personajesJugadoresOrdenados: Personaje[] = copiaPersonajes.sort((a, b) => b.iniciativaActual - a.iniciativaActual);

    return personajesJugadoresOrdenados;
  }

  verificarCondicionVictoria(personajes: Personaje[]): { victoria: boolean, jugador: boolean } {

    const personajeA = personajes.find(x => x.jugador === true && x.saludActual > 0);
    const personajeB = personajes.find(x => x.jugador === false && x.saludActual > 0);

    if (personajeA && personajeB) {

      const condicionVictoria = { victoria: false, jugador: false };

      return  condicionVictoria;

    } else if (personajeA && !personajeB) {

      const condicionVictoria = { victoria: true, jugador: true };

      return  condicionVictoria;

    } else if (!personajeA && personajeB) {

      const condicionVictoria = { victoria: true, jugador: false };

      return  condicionVictoria;

    } else {

      throw new Error('No es posible un empate entre los dos equipos...'); 
    }
  }

  verificarObjetivoAtaque(personajes: Personaje[], ataque: Ataque): Personaje | null {
    
    const personajeOriginal = personajes.find(x => x.identificador === ataque.identificadorDefensor)!;

    //console.log('PERSONAJE OBJETIVO DEL ATAQUE ORIGINAL: ' + personajeOriginal.nombre)

    if (personajeOriginal.saludActual > 0) {

      //console.log('NO CAMBIO EL PERSONAJE OBJETIVO DEL ATAQUE...')

      return personajeOriginal; 

    } else {

      const personajeNuevo = personajes.find(x => x.jugador === personajeOriginal.jugador &&  x.saludActual > 0);

      if (personajeNuevo) {

        //console.log('PERSONAJE OBJETIVO DEL ATAQUE ORIGINAL: ' + personajeOriginal.nombre)

        return personajeNuevo;

      } else {

        //console.log('PERSONAJE OBJETIVO DEL ATAQUE ORIGINAL: ' + personajeOriginal.nombre)

        return null;
      }
    }
  }

  calcularDanio(personajes: Personaje[], ataque: Ataque): { danio: number, critico: boolean } {

    console.log('PERSONAJE ATACANTE: ' + ataque.nombreAtacante + ataque.identificadorAtacante);
    console.log('PERSONAJE DEFENSOR: ' + ataque.nombreDefensor);

    const personajeAtacante = personajes.find(x => x.identificador === ataque.identificadorAtacante)!;
    const personajeDefensor = personajes.find(x => x.identificador === ataque.identificadorDefensor)!;
    const puntuacionAtaque: number = personajeAtacante.ataqueActual;
    const puntuacionDefensa: number = personajeDefensor.defensaActual;
    const puntuacionTotal: number = (puntuacionAtaque + puntuacionDefensa);
    const probabilidadDefensa: number = Math.round((puntuacionDefensa * 100) / puntuacionTotal);
    const probabilidadAtaque: number = generarNumeroAleatorio(1, 100);

    console.log('PUNTUACION DE ATAQUE: ' + personajeAtacante.ataqueActual);
    console.log('PUNTUACION DE DEFENSA: ' + personajeDefensor.defensaActual);
    console.log('PUNTUACION TOTAL: ' + puntuacionTotal);
    console.log('PROBABILIDAD DE DEFENSA: ' + probabilidadDefensa);
    console.log('PROBABILIDAD DE ATAQUE: ' + probabilidadAtaque);

    if (probabilidadAtaque > probabilidadDefensa) {

      const probabilidadCritico: number = generarNumeroAleatorio(1, 100);

      if (probabilidadCritico > 79) {

        const puntuacionDanio: number = (personajeAtacante.danioActual + 2);

        console.log('PUNTUACION DE DAÑO: ' + puntuacionDanio);

        return { danio: puntuacionDanio, critico: true };

      } else {

        const puntuacionDanio: number = generarNumeroAleatorio(1, personajeAtacante.danioActual);

        console.log('PUNTUACION DE DAÑO: ' + puntuacionDanio);

        return { danio: puntuacionDanio, critico: false };
      }

    } else {

      console.log('PUNTUACION DE DAÑO: ' + 0);

      return { danio: 0, critico: false };
    }
  }

  aplicarDanio(personajes: Personaje[], ataque: Ataque): void {

    const personaje = personajes.find(x => x.identificador === ataque.identificadorDefensor)!;

    if (personaje) {

      if (ataque.danio > 0) {

        const nuevaPuntuacionSalud: number = (personaje.saludActual - ataque.danio);

        if (nuevaPuntuacionSalud > 0) {

          personaje.saludActual = nuevaPuntuacionSalud;

        } else {

          personaje.saludActual = 0;
        }

      } else {

        let nuevaPuntuacionDefensa: number;

        if (ataque.danio >= 8) {

          nuevaPuntuacionDefensa = (personaje.defensaActual - 2);

        } else {

          nuevaPuntuacionDefensa = (personaje.defensaActual - 1);
        }

        if (nuevaPuntuacionDefensa > 0) {

          personaje.defensaActual = nuevaPuntuacionDefensa;

        } else {

          personaje.defensaActual = 0
        }
      }
    }
  }

  ataquePersonajeNoJugador(personajes: Personaje[], personajeA: Personaje): Ataque {

    const personajeB = personajes.find(x => x.jugador === true && x.saludActual > 0)!;
    const ataque: Ataque = new Ataque(personajeA.identificador, personajeA.nombre, personajeB.identificador, personajeB.nombre, 0, false, 1);

    return ataque;
  }
}
