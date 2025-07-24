import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerPersonajesPrimeraEtapa } from '../../data/personajes1';
import { Personaje } from '../../models/personaje.model';
import { reproducirSonido } from '../../utils/utilidades';
import { Accion } from '../../models/accion.model';
import { Ataque } from '../../models/ataque.model';
import { tiempoEspera } from '../../utils/utilidades';
import { AnimacionesService } from '../../services/animaciones.service';
import { MecanicasService } from '../../services/mecanicas.service';
import { Victoria } from '../../models/victoria.model';
import { Router } from '@angular/router';

@Component({
    selector: 'batalla',
    standalone: true,
    templateUrl: './batalla.component.html',
    styleUrl: './batalla.component.css'
})
export class BatallaComponent implements AfterViewInit {

    //@ViewChild('reproductorAudio') reproductorAudio!: ElementRef<HTMLAudioElement>;
    @ViewChild('contenedorPrincipal') contenedorPrincipal!: ElementRef<HTMLDivElement>;
    @ViewChild('contenedorEscenario') contenedorEscenario!: ElementRef<HTMLDivElement>;

    personajes: Personaje[] = obtenerPersonajesPrimeraEtapa();
    personajesOrdenados: Personaje[] = this.mecanicasService.obtenerPersonajesOrdenados(this.personajes);
    personajesJugadoresOrdenados: Personaje[] = this.mecanicasService.obtenerPersonajesJugadoresOrdenados(this.personajesOrdenados);
    acciones: Accion[] = [];  

    constructor(        
        private router: Router,
        private mecanicasService: MecanicasService,
        private animacionesService: AnimacionesService
    ) { }

    ngAfterViewInit(): void {

        setTimeout(() => {

            this.contenedorPrincipal.nativeElement.style.opacity = '1';
            this.contenedorPrincipal.nativeElement.style.transform = 'translateY(0)';

            //this.reproducirMusica();
            this.dibujarPersonajes(this.personajesOrdenados);
            this.dibujarAuras(this.personajesOrdenados);
            this.dibujarContenedorAnimaciones(this.personajesOrdenados);

            this.personajesJugadoresOrdenados.forEach(personaje => { this.dibujarRetratoPersonaje(personaje) });
            
            this.dibujarBotonAtaque(this.personajesJugadoresOrdenados[0], this.personajesOrdenados);
            
            this.animacionesService.animarPersonajesPosturaInicial(this.personajesOrdenados);
            this.animacionesService.animarAurasInicial(this.personajesOrdenados);
            
        }, 1000);
    }
    
    /*reproducirMusica(): void {

        const segundosRestantes: number = 2;

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

    dibujarPersonajes(personajes: Personaje[]): void {

        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;

        personajes.forEach(personaje => {

            const alto: number = Math.round((personaje.alto / 528) * altoContenedor);
            const ancho: number = Math.round((personaje.ancho / 528) * anchoContenedor);
            const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * anchoContenedor);
            const coordenadaY: number = Math.round((personaje.coordenadaY / 528) * altoContenedor);
            const imagen: HTMLImageElement = document.createElement('img');

            let opacidad: string = '';
            let trasnformador: string = '';

            if (personaje.saludActual > 0) { opacidad = '1'; } else { opacidad = '0'; }

            if (!personaje.jugador) { trasnformador = 'scaleX(-1)'; }

            imagen.id = `personaje${personaje.identificador}`;
            imagen.src = personaje.imagen;
            imagen.style.height = `${alto}px`;
            imagen.style.imageRendering = 'pixelated';
            imagen.style.left = `${coordenadaX}px`;
            imagen.style.opacity = opacidad;    
            imagen.style.position = 'absolute';
            imagen.style.top = `${coordenadaY}px`;
            imagen.style.transform = trasnformador;
            imagen.style.transition = 'opacity 0.5s ease';  
            imagen.style.width = `${ancho}px`;
            imagen.style.zIndex = '1';

            this.contenedorEscenario.nativeElement.appendChild(imagen);
        });
    }

    dibujarAuras(personajes: Personaje[]): void {

        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;

        personajes.forEach(personaje => {

            const alto: number = Math.round((personaje.alto / 528) * altoContenedor);
            const ancho: number = Math.round((personaje.ancho / 528) * anchoContenedor);
            const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * anchoContenedor);
            const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * altoContenedor) + 9);
            const imagen: HTMLImageElement = document.createElement('img');

            imagen.id = `aura${personaje.identificador}`;
            imagen.src = 'assets/images/auras/1.png';
            imagen.style.height = `${alto}px`;
            imagen.style.imageRendering = 'pixelated';
            imagen.style.left = `${coordenadaX}px`;
            imagen.style.opacity = '0';
            imagen.style.pointerEvents = 'none';
            imagen.style.position = 'absolute';
            imagen.style.top = `${coordenadaY}px`;
            imagen.style.transition = 'opacity 0.5s ease';
            imagen.style.width = `${ancho}px`;
            imagen.style.zIndex = '0';

            this.contenedorEscenario.nativeElement.appendChild(imagen);
        });
    }

    dibujarContenedorAnimaciones(personajes: Personaje[]): void {

        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;

        personajes.forEach(personaje => {

            const contenedor: HTMLDivElement = document.createElement('div');  
            const alto: number = Math.round((personaje.alto / 528) * altoContenedor);
            const ancho: number = Math.round((personaje.ancho / 528) * anchoContenedor);           
            const coordenadaX: number = Math.round((personaje.coordenadaX / 528) * anchoContenedor);
            const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * altoContenedor) - 32);

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

    async mostrarPanelVictoriaDerrota(victoria: Victoria): Promise<void> {

        this.contenedorPrincipal.nativeElement.style.opacity = '0';

        const nombreJugador = localStorage.getItem('nombre');

        await tiempoEspera(1000);

        if (victoria.jugador) { 

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'volver a Jugar',
                icon: 'success',
                html: `<h1 style="font-family: 'FuenteTextos';">VICTORIA</h4><h1 style="font-family: 'FuenteTextos';">Felicidades ${nombreJugador}</h4>`,
                showCancelButton: false,
                showCloseButton: false,
                showConfirmButton: true
            }).then((result) => {

                if (result.isConfirmed) { this.router.navigate(['']); }
            });

        } else {

            Swal.fire({
                allowEscapeKey: false,
                allowOutsideClick: false,
                backdrop: true,
                confirmButtonColor: 'green',
                confirmButtonText: 'Volver a Jugar',
                icon: 'error',
                html: `<h1 style="font-family: 'FuenteTextos';">DERROTA</h1>`,
                showCancelButton: false,
                showCloseButton: false,
                showConfirmButton: true
            }).then((result) => {

                if (result.isConfirmed) { this.router.navigate(['']); }
            });
        }
    }

    seleccionarObjetivo(personajeDefensor: Personaje, personajeAtacante: Personaje): void {  

        this.animacionesService.borraPersonajes(this.personajesOrdenados);
        this.animacionesService.mostrarOcultarAura(this.personajesOrdenados, personajeDefensor.identificador, false);

        this.dibujarPersonajes(this.personajesOrdenados);

        const ataque: Ataque = new Ataque(personajeAtacante, personajeDefensor, 0, false, 1, 0);
        
        this.acciones.push(ataque);
        
        reproducirSonido('seleccionar');
    }

    async ejecutarAcciones(): Promise<void> {

        const botonAtaque: HTMLButtonElement = document.getElementById('botonAtaque') as HTMLButtonElement;

        botonAtaque.remove();

        let numeroPersonajesJugadoresActivos: number = 0;

        this.personajesJugadoresOrdenados.forEach(personaje => { if (personaje.saludActual > 0) { numeroPersonajesJugadoresActivos++ } }); 

        if (this.acciones.length === numeroPersonajesJugadoresActivos) {
       
            this.animacionesService.animarPersonajes = false;

            this.personajes.forEach(personaje => {
                
                if (personaje.jugador === false && personaje.saludActual > 0) {

                    const ataque: Ataque = this.mecanicasService.ataquePersonajeNoJugador(this.personajesOrdenados, personaje);

                    this.acciones.push(ataque);
                }    
            });

            this.acciones = this.mecanicasService.obtenerAccionesOrdenados(this.acciones);
            
            this.acciones.forEach(accion => {

                if (accion.tipo === 1) {

                    let ataque: Ataque = accion as Ataque;
                    let personajeDefensor = this.mecanicasService.verificarObjetivoAtaque(this.personajesOrdenados, ataque); 

                    if (personajeDefensor) {

                        ataque.personajeDefensor = personajeDefensor;

                        if (ataque.personajeAtacante.saludActual > 0) {

                            ataque = this.mecanicasService.calcularDanio(this.personajesOrdenados, ataque);
                            personajeDefensor = this.mecanicasService.aplicarDanio(this.personajesOrdenados, ataque);

                            const indicePersonaje: number = this.personajesOrdenados.findIndex(personaje => personaje.identificador === ataque.personajeDefensor.identificador);

                            this.personajesOrdenados[indicePersonaje] = personajeDefensor;

                            if (this.personajesOrdenados[indicePersonaje].saludActual > 0) { 
                                
                                accion.resultado = 1;
                            
                            } else {

                                accion.resultado = 2;
                            };

                        } else {

                            ataque.resultado = 3;
                        }

                    } else {

                        ataque.resultado = 4;
                    }
                }
            });

            for (let i = 0; i < this.acciones.length; i++) {

                if (this.acciones[i].tipo === 1) {

                    console.log('resultado de la accion: ' + this.acciones[i].resultado);

                    const dimensiones = this.obtenerDimensionesContenedorEscenario();
                    const ataque: Ataque = this.acciones[i] as Ataque;

                    if (this.acciones[i].resultado === 1) {

                        await this.animacionesService.animarAtaque(dimensiones.alto, dimensiones.ancho, this.personajesOrdenados, ataque);
                        await this.animacionesService.animarSaludDefensa(this.personajesOrdenados, ataque);

                    } else if (this.acciones[i].resultado === 2) {

                        await this.animacionesService.animarAtaque(dimensiones.alto, dimensiones.ancho, this.personajesOrdenados, ataque);
                        await this.animacionesService.animarSaludDefensa(this.personajesOrdenados, ataque);

                        await this.animacionesService.animarInconcienciaPersonaje(ataque.personajeDefensor);

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
            this.personajesJugadoresOrdenados = this.mecanicasService.obtenerPersonajesJugadoresOrdenados(this.personajesJugadoresOrdenados);

            this.personajesJugadoresOrdenados.forEach(personaje => {

                const identificadorRetratoPersonaje: string = `retratoPersonaje${personaje.identificador}`;
                const retratoPersonaje: HTMLDivElement = document.getElementById(identificadorRetratoPersonaje) as HTMLDivElement;

                retratoPersonaje.remove();

                this.dibujarRetratoPersonaje(personaje);
            });

            this.animacionesService.animarPersonajes = true;
            this.animacionesService.animarPersonajesPosturaInicial(this.personajesOrdenados);

            this.dibujarBotonAtaque(this.personajesJugadoresOrdenados[0], this.personajesOrdenados);

        } else {

            this.dibujarBotonAtaque(this.personajesJugadoresOrdenados[0], this.personajesOrdenados);
        }
    }

    terminarTurno(): void {

        const copiaPersonajesJugadoresOrdenados: Personaje[] = [...this.personajesJugadoresOrdenados];
        const personajesJugadoresOrdenados: Personaje[] = copiaPersonajesJugadoresOrdenados.filter(x => x.saludActual > 0);

        if (personajesJugadoresOrdenados.length > 1) {

            const primerPersonaje: Personaje = personajesJugadoresOrdenados[0];

            personajesJugadoresOrdenados[0] = personajesJugadoresOrdenados[1];
            personajesJugadoresOrdenados.splice(1, 1);
            personajesJugadoresOrdenados.push(primerPersonaje);

            this.personajesJugadoresOrdenados = personajesJugadoresOrdenados;
        }

        this.personajesJugadoresOrdenados.forEach(personaje => { 

            const identificadorRetratoPersonaje: string = `retratoPersonaje${personaje.identificador}`;
            const retratoPersonaje: HTMLDivElement = document.getElementById(identificadorRetratoPersonaje) as HTMLDivElement;

            retratoPersonaje.remove();
            
            this.dibujarRetratoPersonaje(personaje);        
        });

        this.dibujarBotonAtaque(this.personajesJugadoresOrdenados[0], this.personajesJugadoresOrdenados);
        this.ejecutarAcciones();
    }

    seleccionarObjetivos(personajes: Personaje[], personajeAtacante: Personaje): void {

        const botonAtaque: HTMLButtonElement = document.getElementById('botonAtaque') as HTMLButtonElement;

        botonAtaque.remove();

        personajes.forEach(personajeDefensor => {

            const identificadorImagenPersonaje: string = `personaje${personajeDefensor.identificador}`;
            const imagenPersonaje: HTMLImageElement = document.getElementById(identificadorImagenPersonaje) as HTMLImageElement;

            if (!personajeDefensor.jugador && personajeDefensor.saludActual > 0) {

                imagenPersonaje.style.cursor = 'pointer';
                imagenPersonaje.addEventListener('mouseenter', () => this.animacionesService.mostrarOcultarAura(personajes, personajeDefensor.identificador, true));
                imagenPersonaje.addEventListener('mouseleave', () => this.animacionesService.mostrarOcultarAura(personajes, personajeDefensor.identificador, false));
                imagenPersonaje.addEventListener('click', () => { this.seleccionarObjetivo(personajeDefensor, personajeAtacante), this.terminarTurno() });

            } else if (personajeDefensor.jugador && personajeDefensor.saludActual > 0) {

                imagenPersonaje.style.opacity = '0.5';
            }
        });
    }
    
    dibujarRetratoPersonaje(personaje: Personaje): void {    

        let coordenadaX: number = 0;

        switch (personaje.identificador) {

            case 1:

                coordenadaX = 2;

                break;

            case 2:

                coordenadaX = 148;

                break;

            case 3:

                coordenadaX = 294;

                break;

            case 4:

                coordenadaX = 440;

                break;
        }
        
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

        let opacidad: string = '0';
        
        if (personaje.saludActual > 0) { opacidad = '0.5' } else { opacidad = '0.1' }
        
        marcoContenedorParrafos.id = `retratoPersonaje${personaje.identificador}`;    
        marcoContenedorParrafos.style.backgroundColor = 'white';
        marcoContenedorParrafos.style.borderRadius = '4px';
        marcoContenedorParrafos.style.border = '2px solid white'; 
        marcoContenedorParrafos.style.left = `${coordenadaX}px`;        
        marcoContenedorParrafos.style.opacity = opacidad;
        marcoContenedorParrafos.style.position = 'absolute';
        marcoContenedorParrafos.style.transition = 'opacity 0.5s ease';
        marcoContenedorParrafos.style.top = `2px`;
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
        
        this.contenedorEscenario.nativeElement.appendChild(marcoContenedorParrafos);
    }

    dibujarBotonAtaque(personaje: Personaje, personajes: Personaje[]): void {

        const idetnficadorRetratoPersonaje: string = `retratoPersonaje${personaje.identificador}`;
        const retratoPersonaje: HTMLDivElement = document.getElementById(idetnficadorRetratoPersonaje) as HTMLDivElement;
        const dimensiones: { alto: number, ancho: number } = this.obtenerDimensionesContenedorEscenario();        
        const altoContenedor: number = dimensiones.alto;
        const anchoContenedor: number = dimensiones.ancho;
        const coordenadaX: number = (Math.round((personaje.coordenadaX / 528) * anchoContenedor) + 36);
        const coordenadaY: number = (Math.round((personaje.coordenadaY / 528) * altoContenedor) - 32);
        const boton: HTMLButtonElement = document.createElement('button');

        retratoPersonaje.style.opacity = '1';
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
        boton.style.width = '100px';
        boton.style.zIndex = '2';

        this.contenedorEscenario.nativeElement.appendChild(boton);

        boton.addEventListener('click', async () => {

           reproducirSonido('seleccionar');    
           
           boton.style.opacity = '0';

           this.seleccionarObjetivos(personajes, personaje);
        });        
    }
}
