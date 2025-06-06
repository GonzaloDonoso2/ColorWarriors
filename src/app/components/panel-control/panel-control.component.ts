import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { reproducirSonido } from '../../generarNumeroAleatorio.ts/reproducirSonido';
import { PersonajeService } from '../../services/personaje.service';

@Component({
  selector: 'panel-control',
  standalone: true,
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent  implements AfterViewInit {

  @Input() identificadorPersonajeTurno!: number;
  @Input() nombrePersonajeTurno!: string;
  @Input() saludPersonajeTurno!: number;
  @Input() habilitarPanelControl: boolean = true;

  @Output() atacar: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private personajeService: PersonajeService
  ) { }

  ngAfterViewInit(): void {

    this.personajeService.animarImagenRetratoPersonajes(this.nombrePersonajeTurno);
  }

  botonAtacar(): void {

    reproducirSonido('seleccionar');

    this.atacar.emit();
  }

  deshabilitarBotonesAccion() {

    
    
  }
}
