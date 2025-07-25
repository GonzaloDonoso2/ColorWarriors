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

  verificarPersonajeAtacante(personajes: Personaje[], ataque: Ataque): boolean {
    
    const personajeOriginal = personajes.find(personaje => personaje.identificador === ataque.personajeAtacante.identificador && personaje.saludActual > 0);

    if (personajeOriginal) {

      return true; 

    } else {

      return false;
    }
  }

  verificarPersonajesAtacantes(personajes: Personaje[], ataque: Ataque): boolean {
    
    const personajeOriginal = personajes.find(personaje => personaje.identificador === ataque.personajeAtacante.identificador && personaje.saludActual > 0);

    if (personajeOriginal) {

      return true; 

    } else {

      const personajeNuevo = personajes.find(personaje => personaje.jugador === ataque.personajeAtacante.jugador && personaje.saludActual > 0);

      if (personajeNuevo) {

        return true;

      } else {

        return false;
      }
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
  
  verificarCondicionVictoria(personajes: Personaje[]): Victoria{

    const personajeA = personajes.find(personaje => personaje.jugador === true && personaje.saludActual > 0);
    const personajeB = personajes.find(personaje => personaje.jugador === false && personaje.saludActual > 0);

    if (personajeA && personajeB) {

      const victoria: Victoria = new Victoria(false, false);

      return  victoria;

    } else if (personajeA && !personajeB) {

      const victoria: Victoria = new Victoria(true, true);

      return  victoria;

    } else if (!personajeA && personajeB) {

      const victoria: Victoria = new Victoria(true, false);

      return  victoria;

    } else {

      throw new Error('No es posible un empate entre los dos equipos...'); 
    }
  }

  calcularDanio(personajes: Personaje[], ataque: Ataque): Ataque {

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

        ataque.danio = (personajeAtacante.danioActual + 2);
        ataque.critico = true;

      } else {

        ataque.danio = generarNumeroAleatorio(1, personajeAtacante.danioActual);
        ataque.critico = false;
      }

    } else {

      ataque.danio = 0;
      ataque.critico = false;
    }

    return ataque;
  }

  aplicarDanio(personajes: Personaje[], ataque: Ataque): Personaje {

    const personaje = personajes.find(personaje => personaje.identificador === ataque.personajeDefensor.identificador)!;

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

    return personaje;
  }

  ataquePersonajeNoJugador(personajes: Personaje[], personajeA: Personaje): Ataque {

    const personajesJugadores: Personaje[] = personajes.filter(personaje => personaje.jugador === true);
    const numeroPersonajesJugadores: number = personajesJugadores.length;
    const indicePersonajeJugador: number = generarNumeroAleatorio(0, (numeroPersonajesJugadores - 1));
    const personajeB: Personaje = personajesJugadores[indicePersonajeJugador];
    const ataque: Ataque = new Ataque(personajeA, personajeB, 0, false, 1, 0);

    return ataque;
  }

  resolverAcciones(acciones: Accion[], personajes: Personaje[]): { acciones: Accion[], personajes: Personaje[] } {

    acciones = this.obtenerAccionesOrdenados(acciones);

    acciones.forEach(accion => {

      if (accion.tipo === 1) {

        let ataque: Ataque = accion as Ataque;

        const atacantesVerificados: boolean = this.verificarPersonajesAtacantes(personajes, ataque);

        if (atacantesVerificados) {

          const atacanteVerificado: boolean = this.verificarPersonajeAtacante(personajes, ataque);

          if (atacanteVerificado) {

            let personajeDefensor = this.verificarObjetivoAtaque(personajes, ataque);

            if (personajeDefensor) {

              ataque.personajeDefensor = personajeDefensor;

              ataque = this.calcularDanio(personajes, ataque);
              personajeDefensor = this.aplicarDanio(personajes, ataque);

              const indicePersonaje: number = personajes.findIndex(personaje => personaje.identificador === ataque.personajeDefensor.identificador);

              personajes[indicePersonaje] = personajeDefensor;

              if (personajes[indicePersonaje].saludActual > 0) {

                accion.resultado = 1;

              } else {

                accion.resultado = 2;
              };

            } else {

              ataque.resultado = 4;
            }

          } else {

            ataque.resultado = 3;
          }

        } else {

          ataque.resultado = 4;
        }
      }
    });

    return { acciones, personajes };
  }
}

