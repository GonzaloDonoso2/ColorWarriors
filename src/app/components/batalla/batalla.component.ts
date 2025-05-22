import { Component } from '@angular/core';
import { PanelControlComponent } from '../panel-control/panel-control.component';
import { PersonajeService } from '../../services/personaje.service';
import Swal from 'sweetalert2';
import { Aura } from '../../models/aura.model';
import { obtenerPersonajesPrimeraEtapa } from '../../data/personajes1';
import { Personaje } from '../../models/personaje.model';
import { obtenerListaAuras } from '../../data/auras';
import { obtenerListaSalud } from '../../data/salud';
import { Salud } from '../../models/salud.model';

@Component({
    selector: 'batalla',
    standalone: true,
    imports: [PanelControlComponent],
    templateUrl: './batalla.component.html',
    styleUrl: './batalla.component.css'
})
export class BatallaComponent {

    contenedorPrincipal!: HTMLDivElement;
    listaPersonajes: Personaje[] = obtenerPersonajesPrimeraEtapa();
    listaPersonajesOrdenada: Personaje[] = this.obtenerListaPersonajesOrdenada();
    listaPersonajesJugadoresOrdenada: Personaje[] = this.obtenerListaPersonajesJugadoresOrdenada();
    listaAuras: Aura[] = obtenerListaAuras();
    listaSalud: Salud[] = obtenerListaSalud();    
    identificadorPersonajeTurno: number = this.listaPersonajesJugadoresOrdenada[0].identificador;
    nombrePersonajeTurno: string = this.listaPersonajesJugadoresOrdenada[0].nombre;
    saludPersonajeTurno: number = this.listaPersonajesJugadoresOrdenada[0].salud;

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

            const audio = new Audio('assets/audios/movimientoCursor.wav');
            audio.currentTime = 0;
            audio.volume = 0.1;
            audio.play();

            imagenAura.style.opacity = "1";

        } else {

            imagenAura.style.opacity = "0";
        }
    }

    ocultarImagenesAuras(): void {

        for (let i = 0; i < this.listaAuras.length; i++) {

            const imagenAura: HTMLImageElement = document.getElementById(`imagenAura${ this.listaAuras[i].identificador }`) as HTMLImageElement;
            imagenAura.style.opacity = '0';
        }
    }   
    
    seleccionarObjetivo(): void {

        const audio = new Audio('assets/audios/seleccionar.wav');
        audio.currentTime = 0;
        audio.volume = 0.1;
        audio.play();

        this.ocultarImagenesAuras();

        this.personajeService.borrarPersonajes(this.listaPersonajes);
        this.personajeService.dibujarPersonajes(this.listaPersonajes);
        this.personajeService.dibujarAuras(this.listaAuras);        
    }

    terminarTurno(): void {

        const listaProvisoria: Personaje[] = [...this.listaPersonajesJugadoresOrdenada];
        const listaPersonajesJugadoresOrdenada: Personaje[] = listaProvisoria.filter(x => x.salud > 0);

        if (listaPersonajesJugadoresOrdenada.length > 1) {

            const primeroPersonaje: Personaje = listaPersonajesJugadoresOrdenada[0];

            listaPersonajesJugadoresOrdenada[0] = listaPersonajesJugadoresOrdenada[1];
            listaPersonajesJugadoresOrdenada.splice(1, 1);
            listaPersonajesJugadoresOrdenada.push(primeroPersonaje);
        }
        
        this.listaPersonajesJugadoresOrdenada = listaPersonajesJugadoresOrdenada;
        this.identificadorPersonajeTurno = listaPersonajesJugadoresOrdenada[0].identificador;
        this.nombrePersonajeTurno = listaPersonajesJugadoresOrdenada[0].nombre;
        this.saludPersonajeTurno = listaPersonajesJugadoresOrdenada[0].salud;
    }

    atacar(): void {

        for (let i = 0; i < this.listaPersonajes.length; i++) {

            const imagenPersonaje: HTMLImageElement = document.getElementById(`imagenPersonaje${ this.listaPersonajes[i].identificador }`) as HTMLImageElement;

            if (!this.listaPersonajes[i].equipo && this.listaPersonajes[i].salud > 0) {

                imagenPersonaje.style.cursor = 'pointer';
                imagenPersonaje.addEventListener("mouseenter", () => this.mostrarOcultarImagenAura(this.listaPersonajes[i].identificador, true));
                imagenPersonaje.addEventListener("mouseleave", () => this.mostrarOcultarImagenAura(this.listaPersonajes[i].identificador, false));
                imagenPersonaje.addEventListener("click", () => { this.seleccionarObjetivo(), this.terminarTurno() });

            } else {

                imagenPersonaje.style.opacity = '0.5';
            }
        }
    }
}
