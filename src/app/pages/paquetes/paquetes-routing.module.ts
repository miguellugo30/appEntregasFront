import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalidaPaquetesComponent } from './salida-paquetes/salida-paquetes.component';


const routes: Routes = [
  {
    path: 'salida-paquetes',
   component: SalidaPaquetesComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaquetesRoutingModule { }
