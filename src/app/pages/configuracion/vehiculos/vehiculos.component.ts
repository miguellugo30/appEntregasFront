import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { ResponseVehiculos, Vehiculos } from 'src/app/core/models/vehiculos';
import { VehiculosService } from 'src/app/core/services/vehiculos.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  /**
   * Variable que contendra la informacion de vehiculos
   */
  public dataVehiculos: Vehiculos[] = [];

  public listaDatos: any[] = [];

  constructor(
    public toastr: ToastrService,
    private VehiculosService: VehiculosService,
    public bsModalRe: BsModalRef,
    public modalService: BsModalService,
    ) {}
  /**
   * Funcion para inicializar
   */
  public ngOnInit(): void {
    this.getAll();
  }
  /**
   * Funcion para obtener todos los registros de vehiculos
   */
  public getAll(){
    this.VehiculosService.getAll().subscribe(
      (data: ResponseVehiculos) => {
        if (data.success) {
          this.dataVehiculos = data.data;
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
   * Funcion para abrir el modal de crear un vehiculo
   */
  public create(){
    this.openModal([], 'crear', 'Crear Vehiculo')
  }
  /**
   * Funcion para abrir el modal de editar un vehiculo
   * @param vehiculo : vehiculo
   */
  public edit(vehiculo: Vehiculos) {
    this.openModal(vehiculo, 'editar', 'Editar Vehiculo');
  }
  /**
   * Funcion para eliminar un vehiculo
   * @param vehiculo : vehiculo
   */
  public delete(vehiculo: Vehiculos) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'En verdad deseas eliminar el registro seleccionado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si, eliminiar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.VehiculosService.delete(vehiculo).subscribe(
          (data: ResponseVehiculos) => {
            if (data.success) {
              this.alertError(data.message, data.success);
              this.getAll();
            } else {
              this.alertError(data.message, data.success);
            }
          },
          (error) => {
            this.alertError(error, false);
          }
        );
      }
    });
  }
  /**
   * Funcion para mostrar una alerta de error
   * @param message mensaje que se mostrara
   */
  public alertError(message: string, type:boolean){
    if (type) {
      this.toastr.success(message, 'Confirmación');
    } else {
      this.toastr.error(message, 'Ha ocurrido un error');
    }
  }
  /**
   * funcion para mostrar el modal con el formulario
   * @param data []: informacion del vehiculo
   * @param accion string: accion a realizar crear o editar
   * @param title :string titulo del modal
   */
  public openModal( data: any, accion: string, title: string){

    const initialState: ModalOptions = {
      initialState: {
        data: data,
        title: title,
        accion: accion
      }
    };
    this.bsModalRe = this.modalService.show(ModalComponent,initialState );
    this.bsModalRe.content.closeBtnName = 'Close';

    this.bsModalRe.content.event.subscribe((res: ResponseVehiculos) => {
      if (res.success) {
        this.bsModalRe.hide();
        this.getAll();
        this.alertError(res.message, res.success)
      }else{
        this.alertError(res.message, false)
      }
    });
  }
}
