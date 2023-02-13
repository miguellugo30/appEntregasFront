import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ResponseVehiculos, Vehiculos } from 'src/app/core/models/vehiculos';

import { VehiculosService } from 'src/app/core/services/vehiculos.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
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
   * Array de tipo de vehiculos
   */
  public tipos: any[] = [
    {id: '1', name: 'Sedán'},
    {id: '2', name: 'Motocicleta'},
    {id: '3', name: 'Van'}
  ]
  /**
   * variable para regresar el evento
   */
  public event: EventEmitter<any> = new EventEmitter();
  /**
   * Informacion del vehiculo enviada desde vehiculos component
   */
  private data: Vehiculos;

  public constructor(
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    private VehiculosService: VehiculosService,
    )
    {}

  public ngOnInit(): void {
    this.crearForm();
    if (this.accion == 'editar') {
      this.formModal.get('marca').setValue(this.data.marca);
      this.formModal.get('modelo').setValue(this.data.modelo);
      this.formModal.get('anio').setValue(this.data.anio);
      this.formModal.get('placas').setValue(this.data.placas);
      this.formModal.get('tipo').setValue(this.data.tipo);
    }
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
    return new Promise((resolve, reject) => {
      this.formModal = this.formBuilder.group({
        marca: new FormControl(null, [Validators.required]),
        modelo: new FormControl(null, [Validators.required]),
        anio: new FormControl(null, [Validators.required]),
        placas: new FormControl(null, [Validators.required]),
        tipo: new FormControl(null, [Validators.required]),
      });
      resolve(true);
    });
  }
  /**
   * Funcion para crear un nuevo vehiculo
   */
  public create(){

    let datos: Vehiculos;

    datos = {
      marca: this.formModal.controls['marca'].value,
      modelo: this.formModal.controls['modelo'].value,
      anio: this.formModal.controls['anio'].value,
      placas: this.formModal.controls['placas'].value,
      tipo: this.formModal.controls['tipo'].value,
    }
    this.VehiculosService.create(datos).subscribe(
      (data: ResponseVehiculos) => {
        this.event.emit(data)
      },
      (error) => {
        console.log(error);
      }
    )
  }
  /**
   * Funcion para ediytar un nuevo vehiculo
   */
  public edit() {

    let datos: Vehiculos;

    datos = {
      id: this.data.id,
      marca: this.formModal.controls['marca'].value,
      modelo: this.formModal.controls['modelo'].value,
      anio: this.formModal.controls['anio'].value,
      placas: this.formModal.controls['placas'].value,
      tipo: this.formModal.controls['tipo'].value,
    }

    this.VehiculosService.update(datos).subscribe(
      (data: ResponseVehiculos) => {
        this.event.emit(data)
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
