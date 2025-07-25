import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { obtenerPersonajesPrimeraEtapa } from '../../data/personajes1';
import { Accion } from '../../models/accion.model';
import { Ataque } from '../../models/ataque.model';
import { DimensionesEscenario } from '../../models/dimensiones-escenario.model';
import { Personaje } from '../../models/personaje.model';
import { Victoria } from '../../models/victoria.model';
import { AnimacionesService } from '../../services/animaciones.service';
import { GraficosService } from '../../services/graficos.service';
import { MecanicasService } from '../../services/mecanicas.service';
import { reproducirSonido, tiempoEspera } from '../../utils/utilidades';

@Component({
    selector: 'batalla',
    standalone: true,
    templateUrl: './batalla.component.html',
    styleUrl: './batalla.component.css'
})
export class BatallaComponent implements AfterViewInit {

    @ViewChild('reproductorMusicaBatalla') reproductorMusicaBatalla!: ElementRef<HTMLAudioElement>;
    @ViewChild('contenedorPrincipal') contenedorPrincipal!: ElementRef<HTMLDivElement>;
    @ViewChild('contenedorEscenario') contenedorEscenario!: ElementRef<HTMLDivElement>;

    personajes: Personaje[] = obtenerPersonajesPrimeraEtapa();
    personajesOrdenados: Personaje[] = this.mecanicasService.obtenerPersonajesOrdenados(this.personajes);
    personajesJugadoresOrdenados: Personaje[] = this.mecanicasService.obtenerPersonajesJugadoresOrdenados(this.personajesOrdenados);
    acciones: Accion[] = [];  

    constructor(        
        private router: Router,
        private mecanicasService: MecanicasService,        
        private graficosService: GraficosService,
        private animacionesService: AnimacionesService
    ) { }

    ngAfterViewInit(): void {

        setTimeout(() => {

            this.contenedorPrincipal.nativeElement.style.opacity = '1';
            this.contenedorPrincipal.nativeElement.style.transform = 'translateY(0)';
            this.reproductorMusicaBatalla.nativeElement.volume = 0.05; 
            this.reproductorMusicaBatalla.nativeElement.play();

            this.reproducirMusica();
            this.dibujarPersonajesAurasContenedorAnimaciones();
            this.dibujarRetratosPersonajes();
            this.dibujarBotones();
            
            this.animacionesService.animarPersonajesPosturaInicial(this.personajesOrdenados);
            this.animacionesService.animarAurasInicial(this.personajesOrdenados);
            
        }, 1000);
    }

    reproducirMusica(): void {

        const segundosRestantes: number = 0;

        this.reproductorMusicaBatalla.nativeElement.addEventListener("timeupdate", () => {

            if (this.reproductorMusicaBatalla.nativeElement.duration - this.reproductorMusicaBatalla.nativeElement.currentTime < segundosRestantes) {

                this.reproductorMusicaBatalla.nativeElement.currentTime = 0;
                this.reproductorMusicaBatalla.nativeElement.volume = 0.05;
                this.reproductorMusicaBatalla.nativeElement.play();
            }
        });
    }

    obtenerDimensionesContenedorEscenario(): DimensionesEscenario {

        const dimensionesEscenario: DimensionesEscenario = new DimensionesEscenario (this.contenedorEscenario.nativeElement.clientHeight, this.contenedorEscenario.nativeElement.clientWidth);
        
        return dimensionesEscenario;
    }

    dibujarPersonajesAurasContenedorAnimaciones(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        this.personajesOrdenados.forEach(personaje => {

            const imagenPersonaje: HTMLImageElement = this.graficosService.dibujarPersonaje(dimensionesEscenario, personaje);
            const imagenAura: HTMLImageElement = this.graficosService.dibujarAura(dimensionesEscenario, personaje);
            const contenedorAnimacion: HTMLDivElement = this.graficosService.dibujarContenedorAnimacion(dimensionesEscenario, personaje);

            this.contenedorEscenario.nativeElement.appendChild(imagenPersonaje);
            this.contenedorEscenario.nativeElement.appendChild(imagenAura);
            this.contenedorEscenario.nativeElement.appendChild(contenedorAnimacion);
        });
    }

    dibujarRetratosPersonajes(): void {

        this.personajesJugadoresOrdenados.forEach(personaje => {

            const retratoPersonaje: HTMLDivElement = this.graficosService.dibujarRetratoPersonaje(personaje);

            this.contenedorEscenario.nativeElement.appendChild(retratoPersonaje);
        });
    }

    dibujarPersonajes(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        this.personajesOrdenados.forEach(personaje => {

            const imagenPersonaje: HTMLImageElement = this.graficosService.dibujarPersonaje(dimensionesEscenario, personaje);

            this.contenedorEscenario.nativeElement.appendChild(imagenPersonaje);
        });
    }

    seleccionarObjetivoEnemigo(personajeDefensor: Personaje, personajeAtacante: Personaje): void {

        this.animacionesService.borraPersonajes(this.personajesOrdenados);
        this.animacionesService.mostrarOcultarAura(this.personajesOrdenados, personajeDefensor.identificador, false);

        this.dibujarPersonajes()

        const ataque: Ataque = new Ataque(personajeAtacante, personajeDefensor, 0, false, 1, 0);

        this.acciones.push(ataque);

        reproducirSonido('seleccionar');
    }

    seleccionarObjetivosEnemigos(personajes: Personaje[], personajeAtacante: Personaje): void {

        this.animacionesService.borrarBotones();

        personajes.forEach(personajeDefensor => {

            const identificadorImagenPersonaje: string = `personaje${personajeDefensor.identificador}`;
            const imagenPersonaje: HTMLImageElement = document.getElementById(identificadorImagenPersonaje) as HTMLImageElement;

            if (!personajeDefensor.jugador && personajeDefensor.saludActual > 0) {

                imagenPersonaje.style.cursor = 'pointer';
                imagenPersonaje.addEventListener('mouseenter', () => this.animacionesService.mostrarOcultarAura(personajes, personajeDefensor.identificador, true));
                imagenPersonaje.addEventListener('mouseleave', () => this.animacionesService.mostrarOcultarAura(personajes, personajeDefensor.identificador, false));
                imagenPersonaje.addEventListener('click', () => { this.seleccionarObjetivoEnemigo(personajeDefensor, personajeAtacante), this.terminarTurno() });

            } else if (personajeDefensor.jugador && personajeDefensor.saludActual > 0) {

                imagenPersonaje.style.opacity = '0.5';
            }
        });
    }

    dibujarBotones() {

        this.animacionesService.animarRetratoPersonaje(this.personajesJugadoresOrdenados[0]);

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();
        const botonAtaque: HTMLButtonElement = this.graficosService.dibujarBotonAtaque(dimensionesEscenario, this.personajesJugadoresOrdenados[0]);
        //const botonHabilidadEspecial: HTMLButtonElement = this.graficosService.dibujarBotonHabilidadEspecial(dimensionesEscenario, this.personajesJugadoresOrdenados[0]);
        //const botonTerminarTurno: HTMLButtonElement = this.graficosService.dibujarBotonTerminarTurno(dimensionesEscenario, this.personajesJugadoresOrdenados[0]);

        this.contenedorEscenario.nativeElement.appendChild(botonAtaque);
        //this.contenedorEscenario.nativeElement.appendChild(botonHabilidadEspecial);
        //this.contenedorEscenario.nativeElement.appendChild(botonTerminarTurno);

        botonAtaque.addEventListener('click', async () => {

           reproducirSonido('seleccionar');    
           
           botonAtaque.style.opacity = '0';
           //botonHabilidadEspecial.style.opacity = '0';
           //botonTerminarTurno.style.opacity = '0';

           this.seleccionarObjetivosEnemigos(this.personajesOrdenados, this.personajesJugadoresOrdenados[0]);
        });     
    }

    async mostrarPanelVictoriaDerrota(victoria: Victoria): Promise<void> {

        this.reproductorMusicaBatalla.nativeElement.pause();        
        this.reproductorMusicaBatalla.nativeElement.currentTime = 0;
        this.reproductorMusicaBatalla.nativeElement.src = 'assets/audios/victoria.wav';
        this.reproductorMusicaBatalla.nativeElement.play();
        this.contenedorPrincipal.nativeElement.style.opacity = '0';        

        const nombreJugador = localStorage.getItem('nombre');

        await tiempoEspera(1000);

        if (victoria.jugador) { 

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'Volver a Jugar',
                html: `<h1 style="font-family: 'FuenteTextos';">VICTORIA</h4><h1 style="font-family: 'FuenteTextos';">Felicidades ${nombreJugador}</h4>`,
                showCancelButton: false,
                showCloseButton: false,
                showConfirmButton: true
            }).then((result) => {

                if (result.isConfirmed) { 

                    this.reproductorMusicaBatalla.nativeElement.pause();        
                    this.reproductorMusicaBatalla.nativeElement.currentTime = 0;
                    this.router.navigate(['']); 
                }
            });

        } else {

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                confirmButtonColor: 'red',
                confirmButtonText: 'Volver a Jugar',
                html: `<h1 style="font-family: 'FuenteTextos';">DERROTA</h1>`,
                showCancelButton: false,
                showCloseButton: false,
                showConfirmButton: true
            }).then((result) => {

                if (result.isConfirmed) { this.router.navigate(['']); }
            });
        }
    }

    async ejecutarAcciones(): Promise<void> {

        this.animacionesService.borrarBotones();
        this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);
        this.dibujarRetratosPersonajes();

        let numeroPersonajesJugadoresActivos: number = 0;

        this.personajesJugadoresOrdenados.forEach(personaje => { if (personaje.saludActual > 0) { numeroPersonajesJugadoresActivos++ } });

        if (this.acciones.length === numeroPersonajesJugadoresActivos) {

            this.animacionesService.animarPersonajes = false;

            this.personajesOrdenados.forEach(personaje => {

                if (personaje.jugador === false && personaje.saludActual > 0) {

                    const ataque: Ataque = this.mecanicasService.ataquePersonajeNoJugador(this.personajesOrdenados, personaje);

                    this.acciones.push(ataque);
                }
            });

            const resultadoAcciones = this.mecanicasService.resolverAcciones(this.acciones, this.personajesOrdenados);
            this.acciones = resultadoAcciones.acciones;
            this.personajesOrdenados = resultadoAcciones.personajes;

            for (let i = 0; i < this.acciones.length; i++) {

                if (this.acciones[i].tipo === 1) {

                    const dimensiones = this.obtenerDimensionesContenedorEscenario();
                    const ataque: Ataque = this.acciones[i] as Ataque;

                    if (this.acciones[i].resultado === 1) {

                        await this.animacionesService.animarAtaque(dimensiones.alto, dimensiones.ancho, this.personajesOrdenados, ataque);
                        await this.animacionesService.animarSaludDefensa(this.personajesOrdenados, ataque);

                        if (ataque.personajeDefensor.jugador === true) {

                            this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);

                            this.dibujarRetratosPersonajes();
                        }
                        
                    } else if (this.acciones[i].resultado === 2) {

                        await this.animacionesService.animarAtaque(dimensiones.alto, dimensiones.ancho, this.personajesOrdenados, ataque);
                        await this.animacionesService.animarSaludDefensa(this.personajesOrdenados, ataque);
                        await this.animacionesService.animarInconcienciaPersonaje(ataque.personajeDefensor);

                        if (ataque.personajeDefensor.jugador === true) {

                            this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);

                            this.dibujarRetratosPersonajes();
                        }

                    } else if (this.acciones[i].resultado === 3) {

                        if (ataque.personajeAtacante.saludActual === 0) {

                            await this.animacionesService.animarMuertePersonaje(ataque.personajeAtacante.identificador);
                        }

                        if (ataque.personajeDefensor.saludActual === 0) {

                            await this.animacionesService.animarMuertePersonaje(ataque.personajeDefensor.identificador);
                        }

                    } else if (this.acciones[i].resultado === 4) {

                        const victoria: Victoria = this.mecanicasService.verificarCondicionVictoria(this.personajesOrdenados);

                        if (victoria.estado) { this.mostrarPanelVictoriaDerrota(victoria); }

                        return
                    }
                }

                await tiempoEspera(1000);
            }

            this.acciones = [];
            this.personajesOrdenados = this.mecanicasService.obtenerPersonajesOrdenados(this.personajesOrdenados);
            this.personajesJugadoresOrdenados = this.mecanicasService.obtenerPersonajesJugadoresOrdenados(this.personajesOrdenados);
            
            this.animacionesService.animarPersonajes = true;
            this.animacionesService.animarPersonajesPosturaInicial(this.personajesOrdenados);
            this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);

            this.dibujarRetratosPersonajes();
            this.dibujarBotones();

        } else {

            this.dibujarBotones();
        }
    }

    terminarTurno(): void {

        const copiaPersonajesJugadoresOrdenados: Personaje[] = [...this.personajesJugadoresOrdenados];
        const personajesJugadoresOrdenados: Personaje[] = copiaPersonajesJugadoresOrdenados.filter(personaje => personaje.saludActual > 0);

        if (personajesJugadoresOrdenados.length > 1) {

            const primerPersonaje: Personaje = personajesJugadoresOrdenados[0];

            personajesJugadoresOrdenados[0] = personajesJugadoresOrdenados[1];
            personajesJugadoresOrdenados.splice(1, 1);
            personajesJugadoresOrdenados.push(primerPersonaje);

            this.personajesJugadoresOrdenados = personajesJugadoresOrdenados;
        }

        this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);

        this.dibujarRetratosPersonajes();
        this.dibujarBotones();
        this.ejecutarAcciones();
    }
}
