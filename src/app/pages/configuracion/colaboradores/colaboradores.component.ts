import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Colaboradores, ResponseColaboradores } from 'src/app/core/models/colaboradores';
import { ColaboradoresService } from 'src/app/core/services/colaboradores.service';
import Swal from 'sweetalert2';
import { ModalColaboradorComponent } from './modal-colaborador/modal-colaborador.component';


@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit{

  /**
   * Variable que contendra la informacion de vehiculos
   */
  public dataColaboradores: Colaboradores[] = [];

  public constructor(
    public toastr: ToastrService,
    private ColaboradoresService: ColaboradoresService,
    public bsModalRe: BsModalRef,
    public modalService: BsModalService,
  ){}

  public ngOnInit(): void {
    this.getAll();
  }

  /**
   * Funcion para obtener todos los registros de vehiculos
   */
  public getAll(){
    this.ColaboradoresService.getAll().subscribe(
      (data: ResponseColaboradores) => {
        if (data.success) {
          this.dataColaboradores = data.data;
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
  /**
   * Funcion para abrir el modal de crear un colaborador
   */
  public create(){
    this.openModal([], 'crear', 'Crear colaborador');
  }
  /**
   * Funcion para abrir el modal de editar un colaborador
   * @param colaborador : colaborador
  */
 public edit(colaborador: Colaboradores) {
    this.openModal(colaborador, 'editar', 'Editar colaborador');
  }
  /**
   * Funcion para eliminar un colaborador
   * @param colaborador : colaborador
   */
  public delete(colaborador: Colaboradores) {
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
        this.ColaboradoresService.delete(colaborador).subscribe(
          (data: ResponseColaboradores) => {
            if (data.success) {
              this.alertError(data.message, data.success);
              this.getAll();
            } else {
              this.alertError(data.message, data.success, data.data);
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
    this.bsModalRe = this.modalService.show(ModalColaboradorComponent,initialState );
    this.bsModalRe.content.closeBtnName = 'Close';

    this.bsModalRe.content.event.subscribe((res: ResponseColaboradores) => {
      if (res.success) {
        this.bsModalRe.hide();
        this.getAll();
        this.alertError(res.message, res.success)
      }else{
        this.alertError(res.message, res.success, res.data)
      }
    });
  }

}
