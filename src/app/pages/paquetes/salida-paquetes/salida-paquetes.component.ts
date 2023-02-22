import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Colaboradores, ResponseColaboradores } from 'src/app/core/models/colaboradores';
import { ColaboradoresService } from 'src/app/core/services/colaboradores.service';
import { PaquetesSalidaService } from 'src/app/core/services/paquetesSalida.service';
import { RepartidoresService } from 'src/app/core/services/repartidores.service';
import { Paquetes, PaquetesSalida, ResponsePaquetes } from 'src/app/core/models/paquetes';

@Component({
  selector: 'app-salida-paquetes',
  templateUrl: './salida-paquetes.component.html',
  styleUrls: ['./salida-paquetes.component.scss']
})

export class SalidaPaquetesComponent implements OnInit {

  public colaborador: string;
  /**
   * Listado de paquetes a asignar
   */
  public paquetesAAsignar: Paquetes[] = [];
  /**
   * Listado de repartidores
   */
  public dataRepartidores: Colaboradores[];
  /**
   * Listado de paquetes
   */
  public dataPaquetes: Paquetes[];
  /**
   * Paquete Escaneado
   */
  public paqueteEscaneado: string;

  public constructor(
    private paquetesService: PaquetesSalidaService,
    private repartidorService: RepartidoresService,
    public toastr: ToastrService,
  ){

  }

  public ngOnInit(): void {
    this.paquetesAAsignar = [];
    this.getAllRepartidores();
    this.getAllPaquetes();
  }
  /**
   * Funcion para obtener los colaboradores repartidores
   */
  public getAllRepartidores(){
    this.repartidorService.getAll().subscribe(
      (data: ResponseColaboradores) => {
        if (data.success) {
          this.dataRepartidores = data.data;
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
   * Funcion para obtener los colaboradores repartidores
   */
  public getAllPaquetes(){
    this.paquetesService.getAll().subscribe(
      (data: ResponsePaquetes) => {
        if (data.success) {
          this.dataPaquetes = data.data;
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
   * Funcion para obtener el paquete escaneado y validar si estan la BD
   * de paquetes
   */
  public capturarPaquete($event: any){

    this.paqueteEscaneado = $event.target.value;

    if ( this.paqueteEscaneado !== null && this.paqueteEscaneado.length > 0) {
      let paquete = this.buscarPaquete( this.paqueteEscaneado, this.dataPaquetes );

      if ( paquete === undefined) {
        Swal.fire({
          title: '¡Tenemos un problema!',
          text: 'El paquete escaneado no existe en la Base de Datos o ya fue asignado',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#34c38f',
          confirmButtonText: 'Aceptar!',
        });
        this.paqueteEscaneado = '';
        return;
      }
      let paqueteDuplicado = this.buscarPaquete(this.paqueteEscaneado, this.paquetesAAsignar);

      if ( paqueteDuplicado === undefined ) {
        this.paquetesAAsignar.push(paquete);
      }
    }
    this.paqueteEscaneado = '';
  }

  public asignarPaquetes(){

    if ( this.colaborador === undefined || this.colaborador === '' || this.paquetesAAsignar.length == 0) {

      Swal.fire({
        title: '¡Tenemos un problema!',
        text: 'Debes elegir un colaborador y al menos haber escaneado un paquete',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#34c38f',
        confirmButtonText: 'Aceptar!',
      });
      return
    }

    let datos: PaquetesSalida;

    datos = {
      colaborador_id: this.colaborador,
      paquetes: this.paquetesAAsignar,
    }

    this.paquetesService.create(datos).subscribe(
      (data: ResponsePaquetes) => {
        console.log(data);
        if (data.success) {

          this.alertError(data.message, data.success);
          this.getAllPaquetes();
          this.paquetesAAsignar = [];
          this.colaborador = '';

        } else {

        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  /**
   * Funcion para buscar paquetes
   */
  private buscarPaquete(guia_rastreo: string, arrayPaquetes: any[]) {

    return arrayPaquetes.find( function (paquete) {
      return guia_rastreo === paquete.guia_rastreo;
    });

  }
}
