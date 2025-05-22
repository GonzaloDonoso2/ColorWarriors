import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  contenedorPrincipal!: HTMLDivElement;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.contenedorPrincipal = document.getElementById("contenedorPrincipal") as HTMLDivElement;
  }

  animarRetratos(): void {

    const retratoPersonaje1: HTMLImageElement = document.getElementById("retratoPersonaje1") as HTMLImageElement;
    const retratoPersonaje2: HTMLImageElement = document.getElementById("retratoPersonaje2") as HTMLImageElement;
    const retratoPersonaje3: HTMLImageElement = document.getElementById("retratoPersonaje3") as HTMLImageElement;
    const retratoPersonaje4: HTMLImageElement = document.getElementById("retratoPersonaje4") as HTMLImageElement;

    let numeroRetrato: number = 1;

    setInterval(() => {

      retratoPersonaje1.src = `assets/images/personajes/posturas/inicial/Amarillo${ numeroRetrato }.png`;
      retratoPersonaje2.src = `assets/images/personajes/posturas/inicial/Azul${ numeroRetrato }.png`;
      retratoPersonaje3.src = `assets/images/personajes/posturas/inicial/Rojo${ numeroRetrato }.png`;
      retratoPersonaje4.src = `assets/images/personajes/posturas/inicial/Verde${ numeroRetrato }.png`;

      if (numeroRetrato === 4) {

        numeroRetrato = 1;

      } else {

        numeroRetrato++
      }
      
    }, 250);
  }

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

  mostrarPanelTransicion() {
    
    Swal.fire({
      allowEscapeKey: false,   
      allowOutsideClick: false,    
      backdrop: true, 
      icon: "success",
      html: `<h1 style="font-family: 'FuenteTextos';">Espere por favor...</h1>`, 
      showCancelButton: false,
      showCloseButton: false,
      showConfirmButton: false,
      didOpen: () => {

        Swal.showLoading();

        this.contenedorPrincipal.style.opacity = "0";

        setTimeout(() => {

          this.router.navigate(["/batalla"]);
          

        }, 1000);        
      },
    })
  }

  iniciarJuego(): void {

    const campoNombreJugador: HTMLInputElement = document.getElementById("nombreJugador") as HTMLInputElement;
    const nombreJugador: string = campoNombreJugador.value;

    if (nombreJugador.trim() !== "") {

      this.mostrarPanelTransicion();

    } else {

      this.mostrarPanelError();
    }
  }
}
