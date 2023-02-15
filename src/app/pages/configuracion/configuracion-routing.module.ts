import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';

const routes: Routes = [

    {
      path: 'vehiculos',
     component: VehiculosComponent
    },
    {
      path: 'colaboradores',
     component: ColaboradoresComponent
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
