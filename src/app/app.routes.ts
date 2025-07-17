import { Routes } from '@angular/router';
import { BatallaComponent } from './components/batalla/batalla.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'batalla', component: BatallaComponent }
];
