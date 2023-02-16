import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Colaboradores, ResponseColaboradores, ResponsePhoto } from 'src/app/core/models/colaboradores';
import { ColaboradoresService } from 'src/app/core/services/colaboradores.service';
import { WebCamComponent } from '../web-cam/web-cam.component';
@Component({
  selector: 'app-modal-colaborador',
  templateUrl: './modal-colaborador.component.html',
  styleUrls: ['./modal-colaborador.component.scss']
})
export class ModalColaboradorComponent implements OnInit {

  @ViewChild(WebCamComponent) child;
  /**
   * Variable para el id del colaborador
   */
  public id :number;
  /**
   * Titulo que contendra el moda
   */
  public title :string = '';
  /**
   * Accion que se realizara
   */
  public accion :string = '';
  /**
   * variable para la creacion del formulario
   */
  public formModal: FormGroup;
   /**
   * variable para regresar el evento
   */
   public event: EventEmitter<any> = new EventEmitter();
  /**
   * Array de roles
   */
  public roles: any[] = [
    {id: '1', name: 'Administrador'},
    {id: '2', name: 'Asistente'},
    {id: '3', name: 'Repartidor'}
  ]
  /**
   * Variable que contendra la imagen que se capture
   */
  public imagenPerfil: string;
  /**
   * Informacion del vehiculo enviada desde vehiculos component
   */
  private data: Colaboradores;

  public constructor (
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    private ColaboradoresService: ColaboradoresService,
  ){

  }

  public ngOnInit(): void {
    this.crearForm();
    this.id = this.data.id;

    if (this.accion == 'editar') {
      this.formModal.get('nombre').setValue(this.data.nombre);
      this.formModal.get('apellido_paterno').setValue(this.data.apellido_paterno);
      this.formModal.get('apellido_materno').setValue(this.data.apellido_materno);
      this.formModal.get('telefono').setValue(this.data.telefono);
      this.formModal.get('rol').setValue(this.data.rol);
      this.formModal.get('correo_electronico').setValue(this.data.correo_electronico);
      this.formModal.get('correo_electronico').disable();
    }
  }

  public imagePerfil($event){
    this.imagenPerfil = $event;
  }
  /**
   * Funcion para cerrar el modal
   */
  public cerrarModal(): void {
    this.bsModalRef.hide();
  }
  /**
   * Funcion para crear el formulario
   * @returns form
   */
  public crearForm(){

    if (this.accion == 'crear') {
      this.formModal = this.formBuilder.group({
        nombre: new FormControl(null, [Validators.required]),
        apellido_paterno: new FormControl(null, [Validators.required]),
        apellido_materno: new FormControl(null, [Validators.required]),
        telefono: new FormControl(null, [Validators.required]),
        correo_electronico: new FormControl(null, [Validators.required]),
        ruta_perfil: new FormControl(null),
        rol: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required ]),
        password_confirmation: new FormControl(null, [Validators.required]),
      });
    } else {
      this.formModal = this.formBuilder.group({
        nombre: new FormControl(null, [Validators.required]),
        apellido_paterno: new FormControl(null, [Validators.required]),
        apellido_materno: new FormControl(null, [Validators.required]),
        telefono: new FormControl(null, [Validators.required]),
        correo_electronico: new FormControl(null, [Validators.required]),
        ruta_perfil: new FormControl(null),
        rol: new FormControl(null, [Validators.required]),
        password: new FormControl(null),
        password_confirmation: new FormControl(null),
      });
    }
  }
  /**
   * Funcion para crear un nuevo colaborador
   */
  public create(){

    let datos = this.dataForm();

    this.ColaboradoresService.create(datos).subscribe(
      (data: ResponseColaboradores) => {
        this.event.emit(data)
      },
      (error) => {
        console.log(error);
      }
    )
  }
  /**
   * Funcion para editar un colaborador
   */
  public edit(){

    let datos = this.dataForm();

    this.ColaboradoresService.update(datos).subscribe(
      (data: ResponseColaboradores) => {
        this.event.emit(data)
      },
      (error) => {
        console.log(error);
      }
    )

  }

  private dataForm(){

    let datos: Colaboradores;

    datos = {
      nombre: this.formModal.controls['nombre'].value,
      apellido_paterno: this.formModal.controls['apellido_paterno'].value,
      apellido_materno: this.formModal.controls['apellido_materno'].value,
      telefono: this.formModal.controls['telefono'].value,
      correo_electronico: this.formModal.controls['correo_electronico'].value,
      ruta_perfil: this.imagenPerfil,
      rol: this.formModal.controls['rol'].value,
      password: this.formModal.controls['password'].value,
      password_confirmation: this.formModal.controls['password_confirmation'].value,
    }

    if (this.accion == 'editar') {
      datos.id = this.data.id;
    }

    return datos;

  }

}
