import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { reproducirSonido } from '../../utils/utilidades';
import { AnimacionesService } from '../../services/animaciones.service';

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
  @Input() defensaPersonajeTurno!: number;
  @Input() habilitarPanelControl: boolean = true;

  @Output() seleccionarObjetivos: EventEmitter<void> = new EventEmitter<void>();

  constructor(private animacionesService: AnimacionesService) { }

  ngAfterViewInit(): void {

    this.animacionesService.animarRetratoPersonaje(this.nombrePersonajeTurno);
  }

  botonAtacar(): void {

    reproducirSonido('seleccionar');

    this.seleccionarObjetivos.emit();
  }
}
