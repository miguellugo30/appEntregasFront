import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoPaquetesComponent } from './listado-paquetes/listado-paquetes.component';
import { SalidaPaquetesComponent } from './salida-paquetes/salida-paquetes.component';


const routes: Routes = [
  {
    path: 'salida-paquetes',
   component: SalidaPaquetesComponent
  },
  {
    path: 'listado-paquetes',
   component: ListadoPaquetesComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaquetesRoutingModule { }
