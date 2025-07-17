import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  mostrarPanelError() {
    
    Swal.fire({
      allowEscapeKey: false,   
      allowOutsideClick: false,    
      backdrop: true, 
      icon: "error",
      html: `<h1 style="font-family: 'FuenteTextos';">Error</h1><p style="font-family: 'FuenteTextos';, font-size: '2rem';">Falta el nombre del jugador.</p>`, 
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false
    })
  }

  iniciarJuego(): void {
    
    reproducirSonido('seleccionar');

    const campoNombreJugador: HTMLInputElement = document.getElementById("nombreJugador") as HTMLInputElement;
    const nombreJugador: string = campoNombreJugador.value;

    if (nombreJugador.trim() !== "") {

      this.contenedorFomulario.nativeElement.style.opacity = "0";

      setTimeout(() => {

        this.router.navigate(["/batalla"]);             

      }, 1000);         

    } else {

      this.mostrarPanelError();
    }
  }
}
