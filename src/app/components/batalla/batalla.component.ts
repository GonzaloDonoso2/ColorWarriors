import { AfterViewInit, Component } from '@angular/core';
import { PanelControlComponent } from '../panel-control/panel-control.component';
import { PersonajeService } from '../../services/personaje.service';
import Swal from 'sweetalert2';
import { Aura } from '../../models/aura.model';
import { obtenerPersonajesPrimeraEtapa } from '../../data/personajes1';
import { Personaje } from '../../models/personaje.model';
import { obtenerListaAuras } from '../../data/auras';
import { obtenerListaSalud } from '../../data/salud';
import { Salud } from '../../models/salud.model';
import { generarNumeroAleatorio, reproducirSonido } from '../../utils/utilidades';
import { Accion } from '../../models/accion.model';
import { Ataque } from '../../models/ataque.model';
import { tiempoEsperaAnimacion } from '../../utils/utilidades';

@Component({
    selector: 'batalla',
    standalone: true,
    imports: [PanelControlComponent],
    templateUrl: './batalla.component.html',
    styleUrl: './batalla.component.css'
})
export class BatallaComponent implements AfterViewInit {

    contenedorPrincipal!: HTMLDivElement;
    listaPersonajes: Personaje[] = obtenerPersonajesPrimeraEtapa();
    listaPersonajesOrdenada: Personaje[] = this.obtenerListaPersonajesOrdenada();
    listaPersonajesJugadoresOrdenada: Personaje[] = this.obtenerListaPersonajesJugadoresOrdenada();
    listaAuras: Aura[] = obtenerListaAuras();
    listaSalud: Salud[] = obtenerListaSalud();    
    identificadorPersonajeTurno: number = this.listaPersonajesJugadoresOrdenada[0].identificador;
    nombrePersonajeTurno: string = this.listaPersonajesJugadoresOrdenada[0].nombre;
    saludPersonajeTurno: number = this.listaPersonajesJugadoresOrdenada[0].salud;
    numeroAcciones: number = 0;
    listaAcciones: Accion[] = [];
    habilitarPanelControl: boolean = true;
    
    constructor(
        private personajeService: PersonajeService
    ) { }

    async ngAfterViewInit(): Promise<void> {

        this.contenedorPrincipal = document.getElementById("contenedorPrincipal") as HTMLDivElement;
        this.contenedorPrincipal.style.opacity = "1";
        this.contenedorPrincipal.style.transform = "translateY(0)";

        /*const reproductorAudio: HTMLAudioElement = document.getElementById("reproductorAudio") as HTMLAudioElement;
        reproductorAudio.volume = 0.1;*/

        setTimeout(() => {

            //this.reproducirMusica(); 

            this.personajeService.dibujarPersonajes(this.listaPersonajes);
            this.personajeService.dibujarAuras(this.listaAuras);
            this.personajeService.dibujarSalud(this.listaSalud);

            Swal.close();

        }, 500);
    }

    reproducirMusica(): void {

        const reproductorAudio: HTMLAudioElement = document.getElementById("reproductorAudio") as HTMLAudioElement;
        const segundosRestantes: number = 3;

        reproductorAudio.addEventListener("timeupdate", () => {

            if (reproductorAudio.duration - reproductorAudio.currentTime < segundosRestantes) {

                reproductorAudio.currentTime = 0;
                reproductorAudio.play();
            }
        });
    } 

    obtenerListaPersonajesOrdenada(): Personaje[] {

        const listaProvisoria: Personaje[] = [...this.listaPersonajes];
        const listaPersonajesOrdenada: Personaje[] = listaProvisoria.sort((a, b) => b.iniciativa - a.iniciativa);    

        return listaPersonajesOrdenada;
    }

    obtenerListaPersonajesJugadoresOrdenada(): Personaje[] {

        const listaProvisoria: Personaje[] = this.listaPersonajes.filter(x => x.equipo);
        const listaPersonajesJugadoresOrdenada: Personaje[] = listaProvisoria.sort((a, b) => b.iniciativa - a.iniciativa);

        return listaPersonajesJugadoresOrdenada;
    }
    
    mostrarOcultarImagenAura(identificadorPersonaje: number, mostrarImagenAura: boolean): void {

        const imagenAura: HTMLImageElement = document.getElementById(`imagenAura${ identificadorPersonaje }`) as HTMLImageElement;

        if (mostrarImagenAura) {

            reproducirSonido('movimientoCursor');
            
            imagenAura.style.opacity = "1";

        } else {

            imagenAura.style.opacity = "0";
        }
    }

    calcularResultadoAtaque(identificadorAtacante: number, identificadorDefensor: number): number {

        const indicePersonajeAtacante: number = this.listaPersonajes.findIndex(personaje => personaje.identificador === identificadorAtacante);
        const indicePersonajeDefensor: number = this.listaPersonajes.findIndex(personaje => personaje.identificador === identificadorDefensor);

        if (this.listaPersonajes[indicePersonajeDefensor].salud > 0) {

            const puntuacionAtaque: number = this.listaPersonajes[indicePersonajeAtacante].ataque;
            const puntuacionDefensa: number = this.listaPersonajes[indicePersonajeDefensor].defensa;
            const numeroAleatorio: number = generarNumeroAleatorio(1, 100);
            const puntuacionTotal: number = (puntuacionAtaque + puntuacionDefensa);
            const probabilidadDefensa: number = Math.round((puntuacionDefensa * 100) / puntuacionTotal);        

            if (numeroAleatorio > probabilidadDefensa) {

                const puntuacionDanio: number = generarNumeroAleatorio(1, this.listaPersonajes[indicePersonajeAtacante].danio);
                const nuevaPuntuacionDefensa: number = (this.listaPersonajes[indicePersonajeDefensor].defensa--);

                if (nuevaPuntuacionDefensa > 0) {

                    this.listaPersonajes[indicePersonajeDefensor].defensa = nuevaPuntuacionDefensa;

                } else {

                    this.listaPersonajes[indicePersonajeDefensor].defensa = 0;
                }

                return puntuacionDanio;

            } else {

                return 0;
            }

        } else {

            return 0;
        }
    }

    ocultarImagenesAuras(): void {

        for (let i = 0; i < this.listaAuras.length; i++) {

            const imagenAura: HTMLImageElement = document.getElementById(`imagenAura${ this.listaAuras[i].identificador }`) as HTMLImageElement;

            imagenAura.style.opacity = '0';
        }
    }   
    
    seleccionarObjetivo(identificadorPersonaje: number, nombrePersonaje: string): void {

        reproducirSonido('seleccionar');

        const puntuacionDanio: number = this.calcularResultadoAtaque(this.identificadorPersonajeTurno, identificadorPersonaje);
        const ataque: Ataque = new Ataque(this.identificadorPersonajeTurno, this.nombrePersonajeTurno, identificadorPersonaje, nombrePersonaje, puntuacionDanio, 1);

        this.listaAcciones.push(ataque);        

        this.ocultarImagenesAuras();

        this.personajeService.borrarPersonajes(this.listaPersonajes);
        this.personajeService.dibujarPersonajes(this.listaPersonajes);
    }

    seleccionarObjetivos(): void {

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ this.listaPersonajes[i].identificador }`) as HTMLImageElement;

            if (!this.listaPersonajes[i].equipo && this.listaPersonajes[i].salud > 0) {

                imagenPersonaje.style.cursor = 'pointer';
                imagenPersonaje.addEventListener("mouseenter", () => this.mostrarOcultarImagenAura(this.listaPersonajes[i].identificador, true));
                imagenPersonaje.addEventListener("mouseleave", () => this.mostrarOcultarImagenAura(this.listaPersonajes[i].identificador, false));
                imagenPersonaje.addEventListener("click", () => { this.seleccionarObjetivo(this.listaPersonajes[i].identificador, this.listaPersonajes[i].nombre), this.terminarTurno() });

            } else {

                imagenPersonaje.style.opacity = '0.5';
            }
        }
    }
    
    async ejecutarAcciones(): Promise<void> {

        let numeroPersonajesJugadores: number = 0;

        for (let i = 0; i < this.listaPersonajesJugadoresOrdenada.length; i++) {
            
            if (this.listaPersonajesJugadoresOrdenada[i].salud > 0) {

                numeroPersonajesJugadores++
            }
        }

        if (numeroPersonajesJugadores === this.numeroAcciones) {

            this.personajeService.borrarAnimacionPersonajes();

            this.personajeService.borrarAnimacionReatroPersonaje();

            this.habilitarPanelControl = false;

            for (let i = 0; i < this.listaAcciones.length; i++) {

                if (this.listaAcciones[i].tipo === 1) {

                    const ataque: Ataque = this.listaAcciones[i] as Ataque;

                    this.personajeService.animarAtaque(this.listaPersonajes, ataque);
                    this.personajeService.animarDefensaHerido(ataque);

                    await this.personajeService.animarDefensaSalud(ataque);

                    await tiempoEsperaAnimacion(2000);                       
                }                
            }

            this.personajeService.borrarPersonajes(this.listaPersonajes);
            this.personajeService.dibujarPersonajes(this.listaPersonajes);

        } else {

            this.personajeService.animarImagenRetratoPersonajes(this.nombrePersonajeTurno);
            this.habilitarPanelControl = true;
        }
    }

    terminarTurno(): void {

        const listaProvisoria: Personaje[] = [...this.listaPersonajesJugadoresOrdenada];
        const listaPersonajesJugadoresOrdenada: Personaje[] = listaProvisoria.filter(x => x.salud > 0);

        if (listaPersonajesJugadoresOrdenada.length > 1) {

            const primeroPersonaje: Personaje = listaPersonajesJugadoresOrdenada[0];

            listaPersonajesJugadoresOrdenada[0] = listaPersonajesJugadoresOrdenada[1];
            listaPersonajesJugadoresOrdenada.splice(1, 1);
            listaPersonajesJugadoresOrdenada.push(primeroPersonaje);

            this.listaPersonajesJugadoresOrdenada = listaPersonajesJugadoresOrdenada;
            this.identificadorPersonajeTurno = listaPersonajesJugadoresOrdenada[0].identificador;
            this.nombrePersonajeTurno = listaPersonajesJugadoresOrdenada[0].nombre;
            this.saludPersonajeTurno = listaPersonajesJugadoresOrdenada[0].salud;            
        }

        this.numeroAcciones++

        this.ejecutarAcciones();
    }
}
