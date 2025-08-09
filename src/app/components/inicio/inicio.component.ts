import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { reproducirSonido } from '../../utils/utilidades';

@Component({
  selector: 'inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  @ViewChild('contenedorFormulario') contenedorFomulario!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent) {

    event.preventDefault();  
          
    this.iniciarJuego();           
  }

  mostrarPanelError() {

    Swal.fire({
      allowEscapeKey: false,
      allowOutsideClick: false,
      backdrop: true,
      html: `<div style="font-family: 'VT323';">
      <h1>Falta el nombre del jugador.</h1>
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
        type="button">Volver</button>
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

        document.getElementById('botonVolverInicio')?.addEventListener('click', () => { Swal.close(); });
      }
    });
  }

  iniciarJuego(): void {
    
    reproducirSonido('seleccionar');

    const campoNombreJugador: HTMLInputElement = document.getElementById('nombreJugador') as HTMLInputElement;
    const nombreJugador: string = campoNombreJugador.value;

    if (nombreJugador.trim() !== '') {

      localStorage.setItem('nombre', nombreJugador);

      this.contenedorFomulario.nativeElement.style.opacity = '0';

      setTimeout(() => {

        this.router.navigate(['/batalla']);             

      }, 1000);         

    } else {

      this.mostrarPanelError();
    }
  }
}
