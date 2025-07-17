import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PanelControlComponent } from '../panel-control/panel-control.component';
import Swal from 'sweetalert2';
import { Aura } from '../../models/aura.model';
import { obtenerPersonajesPrimeraEtapa } from '../../data/personajes1';
import { Personaje } from '../../models/personaje.model';
import { obtenerListaAuras } from '../../data/auras';
import { reproducirSonido } from '../../utils/utilidades';
import { Accion } from '../../models/accion.model';
import { Ataque } from '../../models/ataque.model';
import { tiempoEspera } from '../../utils/utilidades';
import { AnimacionesService } from '../../services/animaciones.service';
import { MecanicasService } from '../../services/mecanicas.service';

@Component({
    selector: 'batalla',
    standalone: true,
    imports: [PanelControlComponent],
    templateUrl: './batalla.component.html',
    styleUrl: './batalla.component.css'
})
export class BatallaComponent implements AfterViewInit {

    //@ViewChild('reproductorAudio') reproductorAudio!: ElementRef<HTMLAudioElement>;
    @ViewChild('contenedorPrincipal') contenedorPrincipal!: ElementRef<HTMLDivElement>;
    @ViewChild('contenedorEscenario') contenedorEscenario!: ElementRef<HTMLDivElement>;

    personajes: Personaje[] = obtenerPersonajesPrimeraEtapa();
    personajesOrdenados: Personaje[] = this.mecanicasService.obtenerPersonajesJugadoresOrdenados(this.personajes);
    personajesJugadoresOrdenados: Personaje[] = this.mecanicasService.obtenerPersonajesJugadoresOrdenados(this.personajes);
    auras: Aura[] = obtenerListaAuras();
    identificadorPersonajeTurno: number = this.personajesJugadoresOrdenados[0].identificador;
    nombrePersonajeTurno: string = this.personajesJugadoresOrdenados[0].nombre;
    saludPersonajeTurno: number = this.personajesJugadoresOrdenados[0].salud;
    defensaPersonajeTurno: number = this.personajesJugadoresOrdenados[0].defensa;
    numeroAcciones: number = 0;
    acciones: Accion[] = [];
    habilitarPanelControl: boolean = true;
    
    constructor(        
        private mecanicasService: MecanicasService,
        private animacionesService: AnimacionesService
    ) { }

    ngAfterViewInit(): void {

        setTimeout(() => {

            this.contenedorPrincipal.nativeElement.style.opacity = '1';
            this.contenedorPrincipal.nativeElement.style.transform = 'translateY(0)';

            //this.reproducirMusica();
            this.dibujarPersonajesAuras(this.personajes, true);
            this.dibujarPersonajesAuras(this.auras, false);
            this.dibujarContenedorSaludDefensa('salud', 'Corazon');
            this.dibujarContenedorSaludDefensa('defensa', 'Escudo');
            this.dibujarContenedorAnimaciones();

            this.animacionesService.animarPersonajesPosturaInicial(this.personajes);
            this.animacionesService.animarAurasInicial(this.auras);
            
        }, 1000);
    }
    
    /*reproducirMusica(): void {

        const segundosRestantes: number = 3;

        this.reproductorAudio.nativeElement.addEventListener("timeupdate", () => {

            if (this.reproductorAudio.nativeElement.duration - this.reproductorAudio.nativeElement.currentTime < segundosRestantes) {

                this.reproductorAudio.nativeElement.currentTime = 0;
                this.reproductorAudio.nativeElement.play();
            }
        });
    }*/ 

    obtenerDimensionesContenedorEscenario(): { alto: number, ancho: number } {

        const alto: number = this.contenedorEscenario.nativeElement.clientHeight;
        const ancho: number = this.contenedorEscenario.nativeElement.clientWidth;
        const dimensiones = { alto: alto, ancho: ancho };

        return dimensiones;
    }

    dibujarPersonajesAuras(lista: any[], personaje: boolean): void {

        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;

        lista.forEach((x: Personaje | Aura) => {

            const alto: number = Math.round((x.alto / 340) * altoContenedor);
            const ancho: number = Math.round((x.ancho / 528) * anchoContenedor);
            const coordenadaX: number = Math.round((x.coordenadaX / 528) * anchoContenedor);
            const coordenadaY: number = Math.round((x.coordenadaY / 340) * altoContenedor);
            const imagen: HTMLImageElement = document.createElement('img');

            let identificador: string;
            let opacidad: string;
            let trasnformador: string = '';
            let profunidad: string;
            let cursor: string = '';

            if (personaje) {

                const personaje: Personaje = x as Personaje;

                identificador = `personaje${x.identificador}`; 
                profunidad = '1';                

                if (personaje.saludActual > 0) { opacidad = '1'; } else { opacidad = '0'; }

                if (!personaje.jugador) { trasnformador = 'scaleX(-1)'; }

            } else {

                identificador = `aura${x.identificador}`;                
                opacidad = '0';
                profunidad = '0';
                cursor = 'none';
            }

            imagen.id = identificador;
            imagen.src = x.imagen;
            imagen.style.height = `${alto}px`;
            imagen.style.imageRendering = 'pixelated';
            imagen.style.left = `${coordenadaX}px`;
            imagen.style.opacity = opacidad;            
            imagen.style.pointerEvents = cursor; 
            imagen.style.position = 'absolute';
            imagen.style.top = `${coordenadaY}px`;
            imagen.style.transform = trasnformador;
            imagen.style.transition = 'opacity 0.5s ease';  
            imagen.style.width = `${ancho}px`;
            imagen.style.zIndex = profunidad;

            this.contenedorEscenario.nativeElement.appendChild(imagen);
        });
    }

    dibujarContenedorSaludDefensa(saludDefensa: string, icono: string): void {

        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;

        this.personajes.forEach(personaje => {

            const contenedor: HTMLDivElement = document.createElement('div');           
                        
            let texto: string;
            let provisoriaCoordenadaX: number = (personaje.coordenadaX);
            let provisoriaCoordenadaY: number;
            let color: string;
            let filtro: string;
            

            if (saludDefensa === 'salud') {

                texto = `${personaje.salud}/${personaje.saludActual}`;
                provisoriaCoordenadaY = (personaje.coordenadaY - 42);
                color = '#23B700';
                filtro = 'brightness(0) saturate(100%) invert(49%) sepia(91%) saturate(2231%) hue-rotate(75deg)';

            } else {

                texto = `${personaje.defensa}/${personaje.defensaActual}`;
                provisoriaCoordenadaY = (personaje.coordenadaY - 22);
                color = '#0F70CE';
                filtro = 'brightness(0) saturate(100%) invert(30%) sepia(86%) saturate(1120%) hue-rotate(186deg)';
            }

            const coordenadaX: number = Math.round((provisoriaCoordenadaX / 528) * anchoContenedor);
            const coordenadaY: number = Math.round((provisoriaCoordenadaY / 340) * altoContenedor);
            const fragmentoParrafo: HTMLSpanElement = document.createElement('span');
            const imagen: HTMLImageElement = document.createElement('img');
            const rutaImagen: string = `assets/images/icons/${icono}.ico`; 

            contenedor.id = `${saludDefensa}${personaje.identificador}`;
            contenedor.style.borderRadius = '4px';
            contenedor.style.color = color;
            contenedor.style.fontFamily = 'Monaco';
            contenedor.style.fontSize = '20px';
            contenedor.style.fontWeight = 'bold';            
            contenedor.style.height = '20px';
            contenedor.style.left = `${coordenadaX}px`;
            contenedor.style.lineHeight = '20px';
            contenedor.style.opacity = '1';
            contenedor.style.position = 'absolute';    
            contenedor.style.textAlign = 'left';        
            contenedor.style.top = `${coordenadaY}px`;
            contenedor.style.transition = 'opacity 0.5s ease';            
            contenedor.style.width = '100px';
            contenedor.style.zIndex = '0';             
            fragmentoParrafo.id = `${saludDefensa}FragmentoParrafo${personaje.identificador}`;
            fragmentoParrafo.textContent = texto;
            imagen.src = rutaImagen;
            imagen.style.height = '75%';
            imagen.style.width = '25%';
            imagen.style.filter = filtro;

            contenedor.appendChild(imagen);
            contenedor.appendChild(fragmentoParrafo);

            this.contenedorEscenario.nativeElement.appendChild(contenedor);
        });
    }  

    dibujarContenedorAnimaciones(): void {

        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;

        this.personajes.forEach(personaje => {

            const contenedor: HTMLDivElement = document.createElement('div');  
            const alto: number = Math.round((personaje.alto / 340) * altoContenedor);
            const ancho: number = Math.round((personaje.ancho / 528) * anchoContenedor);           

            let coordenadaX: number;
            let coordenadaY: number;

            if (personaje.jugador) {

                coordenadaX = Math.round(((personaje.coordenadaX + 64) / 528) * anchoContenedor);
                coordenadaY = Math.round(((personaje.coordenadaY + 64) / 340) * altoContenedor);

            } else { 

                coordenadaX = Math.round(((personaje.coordenadaX - 32) / 528) * anchoContenedor);
                coordenadaY = Math.round((personaje.coordenadaY / 340) * altoContenedor);
            }

            contenedor.id = `animacion${personaje.identificador}`;
            contenedor.style.borderRadius = '4px';
            contenedor.style.fontFamily = 'Monaco';
            contenedor.style.fontSize = '40px';
            contenedor.style.fontWeight = 'bold';            
            contenedor.style.height = `${alto}px`;
            contenedor.style.left = `${coordenadaX}px`;
            contenedor.style.lineHeight = '40px';
            contenedor.style.opacity = '1';
            contenedor.style.pointerEvents = 'none'; 
            contenedor.style.position = 'absolute';    
            contenedor.style.textAlign = 'left';        
            contenedor.style.top = `${coordenadaY}px`;
            contenedor.style.transition = 'opacity 0.5s ease';            
            contenedor.style.width = `${ancho}px`;
            contenedor.style.zIndex = '1';   

            this.contenedorEscenario.nativeElement.appendChild(contenedor);
        });
    }  

    async mostrarPanelVictoriaDerrota(jugador: boolean) {

        this.contenedorPrincipal.nativeElement.style.opacity = '0';

        tiempoEspera(1000);

        if (jugador) { 

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                icon: 'success',
                html: `<h1 style="font-family: 'FuenteTextos';">VICTORIA</h1>`,
                showCancelButton: false,
                showCloseButton: true,
                showConfirmButton: false
            })

        } else {

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                icon: 'error',
                html: `<h1 style="font-family: 'FuenteTextos';">DERROTA</h1>`,
                showCancelButton: false,
                showCloseButton: true,
                showConfirmButton: false
            });
        }
    }

    seleccionarObjetivo(identificadorPersonaje: number, nombrePersonaje: string): void {        

        this.animacionesService.borraPersonajes(this.personajes);
        
        this.auras.forEach(aura => { this.animacionesService.mostrarOcultarAura(this.personajes, aura.identificador, false) });

        this.dibujarPersonajesAuras(this.personajes, true);

        const ataque: Ataque = new Ataque(this.identificadorPersonajeTurno, this.nombrePersonajeTurno, identificadorPersonaje, nombrePersonaje, 0, false, 1);
        
        this.acciones.push(ataque);       
        
        reproducirSonido('seleccionar');
    }

    async ejecutarAcciones(): Promise<void> {

        let numeroPersonajesJugadores: number = 0;

        this.personajesJugadoresOrdenados.forEach(personaje => {

            if (personaje.saludActual > 0) {

                numeroPersonajesJugadores++
            }
        });        

        if (numeroPersonajesJugadores === this.numeroAcciones) {

            this.habilitarPanelControl = false;

            this.personajes.forEach(x => {
                
                if (x.jugador === false && x.saludActual > 0) {

                    const ataque: Ataque = this.mecanicasService.ataquePersonajeNoJugador(this.personajesOrdenados, x);

                    this.acciones.push(ataque);
                }    
            });
            
            for (let i = 0; i < this.acciones.length; i++) {

                if (this.acciones[i].tipo === 1) {

                    const ataque: Ataque = this.acciones[i] as Ataque;

                    const personajeObjetivoAtaque = this.mecanicasService.verificarObjetivoAtaque(this.personajes, ataque);

                    if (personajeObjetivoAtaque === null) {

                        const condicionVictoria = this.mecanicasService.verificarCondicionVictoria(this.personajes);

                        this.mostrarPanelVictoriaDerrota(condicionVictoria.jugador);

                        return

                    } else { 

                        const personajeDefensor: Personaje = personajeObjetivoAtaque;

                        ataque.identificadorDefensor = personajeDefensor.identificador;

                        const resultadoAtaque = this.mecanicasService.calcularDanio(this.personajes, ataque);

                        ataque.danio = resultadoAtaque.danio;
                        ataque.critico = resultadoAtaque.critico;

                        const dimensiones = this.obtenerDimensionesContenedorEscenario();

                        await this.animacionesService.animarAtaque(dimensiones.alto, dimensiones.ancho, this.personajes, ataque);           

                        this.mecanicasService.aplicarDanio(this.personajes, ataque);

                        await this.animacionesService.animarSaludDefensa(this.personajes, ataque);

                        if (personajeDefensor.saludActual === 0) { this.animacionesService.animarMuertePersonaje(personajeDefensor.identificador) }

                        const condicionVictoria = this.mecanicasService.verificarCondicionVictoria(this.personajes);

                        if (condicionVictoria.victoria) { this.mostrarPanelVictoriaDerrota(condicionVictoria.jugador); return }
                    }                    

                    await tiempoEspera(1000);
                }
            }

            this.animacionesService.animarPersonajes = true;

            this.acciones = [];

            this.numeroAcciones = 0;

            this.habilitarPanelControl = true;

        } else {

            this.habilitarPanelControl = true;
        }
    }

    terminarTurno(): void {

        const copiaPersonajesJugadoresOrdenados: Personaje[] = [...this.personajesJugadoresOrdenados];
        const personajesJugadoresOrdenados: Personaje[] = copiaPersonajesJugadoresOrdenados.filter(x => x.salud > 0);

        if (personajesJugadoresOrdenados.length > 1) {

            const primerPersonaje: Personaje = personajesJugadoresOrdenados[0];

            personajesJugadoresOrdenados[0] = personajesJugadoresOrdenados[1];
            personajesJugadoresOrdenados.splice(1, 1);
            personajesJugadoresOrdenados.push(primerPersonaje);

            this.personajesJugadoresOrdenados = personajesJugadoresOrdenados;
            this.identificadorPersonajeTurno = this.personajesJugadoresOrdenados[0].identificador;
            this.nombrePersonajeTurno = this.personajesJugadoresOrdenados[0].nombre;
            this.saludPersonajeTurno = this.personajesJugadoresOrdenados[0].salud;
            this.defensaPersonajeTurno = this.personajesJugadoresOrdenados[0].defensa;
        }

        this.numeroAcciones++

        this.ejecutarAcciones();
    }

    seleccionarObjetivos(): void {

        this.habilitarPanelControl = false;

        this.personajes.forEach(personaje => {

            const identificadorImagenPersonaje: string = `personaje${personaje.identificador}`;
            const imagenPersonaje: HTMLImageElement = document.getElementById(identificadorImagenPersonaje) as HTMLImageElement;

            if (!personaje.jugador && personaje.salud > 0) {

                imagenPersonaje.style.cursor = 'pointer';
                imagenPersonaje.addEventListener('mouseenter', () => this.animacionesService.mostrarOcultarAura(this.personajes, personaje.identificador, true));
                imagenPersonaje.addEventListener('mouseleave', () => this.animacionesService.mostrarOcultarAura(this.personajes, personaje.identificador, false));
                imagenPersonaje.addEventListener('click', () => { this.seleccionarObjetivo(personaje.identificador, personaje.nombre), this.terminarTurno() });

            } else {

                imagenPersonaje.style.opacity = '0.5';
            }
        });
    }
}
