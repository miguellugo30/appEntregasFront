import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PaquetesRoutingModule } from './paquetes-routing.module';
import { SalidaPaquetesComponent } from './salida-paquetes/salida-paquetes.component';

@NgModule({
  declarations: [
    SalidaPaquetesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgApexchartsModule,
    SimplebarAngularModule,
    PaquetesRoutingModule,
  ]
})
export class PaquetesModule { }
