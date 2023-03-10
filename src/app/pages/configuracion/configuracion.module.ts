import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ModalComponent } from './vehiculos/modal/modal.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { ModalColaboradorComponent } from './colaboradores/modal-colaborador/modal-colaborador.component';
import { WebCamComponent } from './colaboradores/web-cam/web-cam.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    VehiculosComponent,
    ModalComponent,
    ColaboradoresComponent,
    ModalColaboradorComponent,
    WebCamComponent,
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgApexchartsModule,
    SimplebarAngularModule,
    WebcamModule
  ]
})
export class ConfiguracionModule { }
