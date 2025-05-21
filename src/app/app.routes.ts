import { Routes } from '@angular/router';
import { InicioComponent } from '../components/inicio/inicio.component';
import { BatallaComponent } from '../components/batalla/batalla.component';

export const routes: Routes = [
    { path: "", component: InicioComponent },
    { path: "batalla", component: BatallaComponent }
];
