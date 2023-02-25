import { Component, OnInit } from '@angular/core';
import { ListadoPaquetesService } from 'src/app/core/services/listado-paquetes.service';
import { Paquetes, ResponsePaquetes } from '../../../core/models/paquetes';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-paquetes',
  templateUrl: './listado-paquetes.component.html',
  styleUrls: ['./listado-paquetes.component.scss']
})
export class ListadoPaquetesComponent implements OnInit{

  public listadoPaquetes: Paquetes[];

  public constructor (
    private listaPaquetesService: ListadoPaquetesService,
    public bsModalRe: BsModalRef,
    public modalService: BsModalService,
    public toastr: ToastrService,
  ){}

  public ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtenemos todos los paquetes
   */
  public getAll(){

    this.listaPaquetesService.getAll().subscribe(
      (data: ResponsePaquetes) => {
        if (data.success) {
          this.listadoPaquetes = data.data;
        } else {
          this.alertError(data.message, data.success);
        }
      },
      (error) => {
        this.alertError(error, false);
      }
    );
  }
  /**
   * Funcion para ver el detalle del paquete
   */
  public viewDetail(paquete: Paquetes){
    const initialState: ModalOptions = {
      initialState: {
        paquete: paquete,
        title: "Detalle de paquete: " + paquete.guia_rastreo,
      },
      class: 'modal-lg'
    };
    this.bsModalRe = this.modalService.show(ModalDetalleComponent,initialState );
    this.bsModalRe.content.closeBtnName = 'Close';

  }

  /**
   * Funcion para mostrar una alerta de error
   * @param message mensaje que se mostrara
   */
  public alertError(message: string, type:boolean, info=[]){

    if (type) {
      this.toastr.success(message, 'Confirmación');
    } else {
      if (info.length > 0) {
        this.toastr.error(message, 'Ha ocurrido un error');
      } else {
        let mess: string;
        for (const property in info) { mess = `${info[property]}` + "\n"; }
        this.toastr.error(mess, message);
      }
    }
  }

}
