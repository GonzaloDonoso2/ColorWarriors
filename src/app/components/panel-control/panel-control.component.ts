import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../../models/personaje.model';
import { Aura } from '../../models/aura.model';
import { Salud } from '../../models/salud.model';

@Component({
  selector: 'panel-control',
  standalone: true,
  templateUrl: './panel-control.component.html',
  styleUrl: './panel-control.component.css'
})
export class PanelControlComponent {

  @Input() identificadorPersonajeTurno!: number;
  @Input() nombrePersonajeTurno!: string;
  @Input() saludPersonajeTurno!: number;

  @Output() atacar: EventEmitter<void> = new EventEmitter<void>();

  botonAtacar(): void {

    this.atacar.emit();
  }

  deshabilitarBotonesAccion() {
    
  }
}
