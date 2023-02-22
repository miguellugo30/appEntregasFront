import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfiguracionModule } from './configuracion/configuracion.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaquetesModule } from './paquetes/paquetes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    PickerModule,
    ConfiguracionModule,
    PaquetesModule,
    ModalModule.forRoot(),
  ],
})
export class PagesModule { }
