import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
export class BatallaComponent implements AfterViewInit,  OnInit {   

    @ViewChild('reproductorMusicaBatalla') reproductorMusicaBatalla!: ElementRef<HTMLAudioElement>;
    @ViewChild('contenedorPrincipal') contenedorPrincipal!: ElementRef<HTMLDivElement>;
    @ViewChild('contenedorEscenario') contenedorEscenario!: ElementRef<HTMLDivElement>;

    pantallaPC: boolean = true;
    pantallaHorizontal: boolean = false;
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
    
    ngOnInit(): void {
        
        if (window.innerWidth <= 768) { 
            
            this.pantallaPC = false;

        } else if (window.innerHeight <= 450) {

            this.pantallaHorizontal = true;
        }
    }

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
            this.dibujarRetratoPersonajeTurno();
            //this.dibujarTextoBatalla();
            

            this.animacionesService.animarPersonajes = true;
            this.animacionesService.animarAuras = true;
            this.animacionesService.animarPersonajePosturaObjetivo = false;            
            this.animacionesService.animarPersonajesPosturaInicial(this.personajesOrdenados);
            this.animacionesService.animarAurasInicial(this.personajesOrdenados);
            
        }, 1000);
    }

    @HostListener('window:resize')
    onResize(): void {

        this.redimencionarDibujos();        
    }

    redimencionarDibujos(): void {

        if (window.innerWidth <= 768) {

            this.pantallaPC = false;

        } else if (window.innerHeight <= 800) {

            this.pantallaHorizontal = true;
        }

        this.dibujarPersonajesAurasContenedorAnimaciones();
        this.dibujarRetratosPersonajes();
        this.dibujarBotones();
        this.dibujarRetratoPersonajeTurno();
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

        const dimensionesEscenario: DimensionesEscenario = new DimensionesEscenario(this.contenedorEscenario.nativeElement.clientHeight, this.contenedorEscenario.nativeElement.clientWidth);

        return dimensionesEscenario;
    }

    dibujarPersonajesAurasContenedorAnimaciones(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        this.personajesOrdenados.forEach(personaje => {

            const imagenPersonaje: HTMLImageElement = this.graficosService.dibujarPersonaje(dimensionesEscenario, personaje);
            const imagenAura: HTMLImageElement = this.graficosService.dibujarAura(dimensionesEscenario, personaje);
            const contenedorAnimacion: HTMLDivElement = this.graficosService.dibujarDanio(dimensionesEscenario, personaje);

            this.contenedorEscenario.nativeElement.appendChild(imagenPersonaje);
            this.contenedorEscenario.nativeElement.appendChild(imagenAura);
            this.contenedorEscenario.nativeElement.appendChild(contenedorAnimacion);
        });
    }

    dibujarRetratosPersonajes(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        this.personajesJugadoresOrdenados.forEach(personaje => {

            const retratoPersonaje: HTMLDivElement = this.graficosService.dibujarRetratoPersonaje(this.pantallaPC, this.pantallaHorizontal, dimensionesEscenario, personaje);

            this.contenedorEscenario.nativeElement.appendChild(retratoPersonaje);
        });
    }

    dibujarRetratoPersonajeTurno(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();
        
        const retratoPersonajeTurno: HTMLDivElement = this.graficosService.dibujarRetratoPersonajeTurno(this.pantallaPC, this.pantallaHorizontal, dimensionesEscenario, this.personajesJugadoresOrdenados[0]);

        this.contenedorEscenario.nativeElement.appendChild(retratoPersonajeTurno);
    }

    dibujarTextoBatalla(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        const textoBatalla: HTMLDivElement = this.graficosService.dibujarTextoBatalla(this.pantallaPC, dimensionesEscenario);

        this.contenedorEscenario.nativeElement.appendChild(textoBatalla);
    }

    dibujarPersonajes(): void {

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        this.personajesOrdenados.forEach(personaje => {

            const imagenPersonaje: HTMLImageElement = this.graficosService.dibujarPersonaje(dimensionesEscenario, personaje);

            this.contenedorEscenario.nativeElement.appendChild(imagenPersonaje);
        });
    }

    seleccionarObjetivoEnemigo(personajeDefensor: Personaje, personajeAtacante: Personaje): void {

        this.animacionesService.animarPersonajePosturaObjetivo = false;
        this.animacionesService.borraPersonajes(this.personajesOrdenados);       

        this.dibujarPersonajes()

        const ataque: Ataque = new Ataque(personajeAtacante, personajeDefensor, 0, false, 1, 0);

        this.acciones.push(ataque);

        reproducirSonido('seleccionar');
    }

    async seleccionarObjetivosEnemigos(personajes: Personaje[], personajeAtacante: Personaje): Promise<void> {     

        for (let i = 0; i < personajes.length; i++) {

            const identificadorImagenPersonaje: string = `personaje${personajes[i].identificador}`;
            const imagenPersonaje: HTMLImageElement = document.getElementById(identificadorImagenPersonaje) as HTMLImageElement;
            this.animacionesService.animarPersonajePosturaObjetivo = true;

            if (!personajes[i].jugador && personajes[i].saludActual > 0) {

                this.animacionesService.animarObjetivoAtaque(personajes[i]);

                imagenPersonaje.style.cursor = 'pointer';
                //imagenPersonaje.addEventListener('mouseenter', () => this.animacionesService.mostrarOcultarAura(personajes, personajeDefensor.identificador, true));
                //imagenPersonaje.addEventListener('mouseleave', () => this.animacionesService.mostrarOcultarAura(personajes, personajeDefensor.identificador, false));
                imagenPersonaje.addEventListener('click', () => { this.seleccionarObjetivoEnemigo(personajes[i], personajeAtacante), this.terminarTurno() });

            } else if (personajes[i].jugador && personajes[i].saludActual > 0) {

                imagenPersonaje.style.opacity = '0.5';
            }
        }
    }

    abiliatarBotones(): void {

        const botonAtaque: HTMLButtonElement = document.getElementById('botonAtaque') as HTMLButtonElement;
        const botonHabilidadEspecial: HTMLButtonElement = document.getElementById('botonHabilidadEspecial') as HTMLButtonElement;
        const botonTerminarTurno: HTMLButtonElement = document.getElementById('botonTerminarTurno') as HTMLButtonElement;

        botonAtaque.style.backgroundColor = 'red';
        botonAtaque.disabled = false;
        botonHabilidadEspecial.style.backgroundColor = 'green';
        botonHabilidadEspecial.disabled = false;
        botonTerminarTurno.style.backgroundColor = '#FF6A00';
        botonTerminarTurno.disabled = false;
    }

    desahabiliatarBotones(): void {

        const botonAtaque: HTMLButtonElement = document.getElementById('botonAtaque') as HTMLButtonElement;
        const botonHabilidadEspecial: HTMLButtonElement = document.getElementById('botonHabilidadEspecial') as HTMLButtonElement;
        const botonTerminarTurno: HTMLButtonElement = document.getElementById('botonTerminarTurno') as HTMLButtonElement;

        botonAtaque.style.backgroundColor = 'gray';
        botonAtaque.disabled = true;
        botonHabilidadEspecial.style.backgroundColor = 'gray';
        botonHabilidadEspecial.disabled = true;
        botonTerminarTurno.style.backgroundColor = 'gray';
        botonTerminarTurno.disabled = true;
    }

    dibujarBotones() {

        this.animacionesService.animarRetratoPersonaje(this.personajesJugadoresOrdenados[0]);

        const dimensionesEscenario: DimensionesEscenario = this.obtenerDimensionesContenedorEscenario();

        const contenedorBotones : HTMLDivElement = this.graficosService.dibujarBotones(this.pantallaPC, this.pantallaHorizontal, dimensionesEscenario);

        this.contenedorEscenario.nativeElement.appendChild(contenedorBotones);

        const botonAtaque: HTMLButtonElement = document.getElementById('botonAtaque') as HTMLButtonElement;
        const botonHabilidadEspecial: HTMLButtonElement = document.getElementById('botonHabilidadEspecial') as HTMLButtonElement;
        const botonTerminarTurno: HTMLButtonElement = document.getElementById('botonTerminarTurno') as HTMLButtonElement;


        botonAtaque.addEventListener('click', async () => {

           reproducirSonido('seleccionar');    
           
           this.desahabiliatarBotones();

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
                html: `<div style="font-family: 'VT323';">
                  <h1>Felicidades ${nombreJugador}.</h1>
                  <br><br>
                  <button 
                  id="botonVolverInicio"
                  style="
                    background-color: green;
                    border-color: white;
                    border-radius: 4px;          
                    color: white;
                    height: 40px;
                    width: 50%;
                    type="button">Volver a Jugar</button>
                  </div>`,
                showConfirmButton: false,
                padding: 0,
                width: 'min(90dvw, 750px)',
                didOpen: () => {
                    const popup = Swal.getPopup()!;
                    Object.assign(popup.style, {
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '2px solid white',
                        height: 'min(90dvh, 200px)',
                        opacity: '1',
                        transition: 'opacity 0.5s ease',
                        zIndex: '0'
                    });

                    const html = Swal.getHtmlContainer()!;
                    Object.assign(html.style, {
                        color: 'white',
                        backgroundColor: 'blue',
                        borderRadius: '4px',
                        fontSize: '20px',
                        height: '100%',
                        lineHeight: '20px',
                        transition: 'opacity 0.5s ease',
                        width: '100%',
                        border: '1px solid gray'
                    });

                    document.getElementById('botonVolverInicio')?.addEventListener('click', () => {
                        
                        this.reproductorMusicaBatalla.nativeElement.pause();
                        this.reproductorMusicaBatalla.nativeElement.currentTime = 0;
                        Swal.close();
                        this.router.navigate(['']);
                    });
                }
            });

        } else {

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                html: `<div style="font-family: 'VT323';">
                  <h1>Has sido derrotado ${nombreJugador}.</h1>
                  <br><br>
                  <button 
                  id="botonVolverInicio"
                  style="
                    background-color: green;
                    border-color: white;
                    border-radius: 4px;          
                    color: white;
                    height: 40px;
                    width: 50%;
                    type="button">Volver al Inicio</button>
                  </div>`,
                showConfirmButton: false,
                padding: 0,
                width: 'min(90dvw, 750px)',
                didOpen: () => {
                    const popup = Swal.getPopup()!;
                    Object.assign(popup.style, {
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '2px solid white',
                        height: 'min(90dvh, 200px)',
                        opacity: '1',
                        transition: 'opacity 0.5s ease',
                        zIndex: '0'
                    });

                    const html = Swal.getHtmlContainer()!;
                    Object.assign(html.style, {
                        color: 'white',
                        backgroundColor: 'blue',
                        borderRadius: '4px',
                        fontSize: '20px',
                        height: '100%',
                        lineHeight: '20px',
                        transition: 'opacity 0.5s ease',
                        width: '100%',
                        border: '1px solid gray'
                    });

                    document.getElementById('botonVolverInicio')?.addEventListener('click', () => {

                        this.reproductorMusicaBatalla.nativeElement.pause();
                        this.reproductorMusicaBatalla.nativeElement.currentTime = 0;
                        this.router.navigate(['']);
                    });
                }
            });
        }
    }

    async ejecutarAcciones(): Promise<void> {

        this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);
        this.dibujarRetratosPersonajes();
        this.desahabiliatarBotones();
        const x: HTMLDivElement = document.getElementById('interiorRetratoPersonajeTurno') as HTMLDivElement;
        x.innerHTML = '';

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

                        await this.animacionesService.animarAtaque(dimensiones, this.personajesOrdenados, ataque);
                        await this.animacionesService.animarDanio(this.personajesOrdenados, ataque);

                        if (ataque.personajeDefensor.jugador === true) {

                            this.animacionesService.borrarRetratosPersonajes(this.personajesJugadoresOrdenados);

                            this.dibujarRetratosPersonajes();
                        }
                        
                    } else if (this.acciones[i].resultado === 2) {

                        await this.animacionesService.animarAtaque(dimensiones, this.personajesOrdenados, ataque);
                        await this.animacionesService.animarDanio(this.personajesOrdenados, ataque);
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
            this.dibujarRetratoPersonajeTurno();
            this.abiliatarBotones();

        } else {

            this.dibujarRetratoPersonajeTurno();
            this.abiliatarBotones();
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
        this.abiliatarBotones();
        this.ejecutarAcciones();
    }
}
