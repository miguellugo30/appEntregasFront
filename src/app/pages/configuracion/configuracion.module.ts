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

@NgModule({
  declarations: [
    VehiculosComponent,
    ModalComponent,
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
    SimplebarAngularModule
  ]
})
export class ConfiguracionModule { }
