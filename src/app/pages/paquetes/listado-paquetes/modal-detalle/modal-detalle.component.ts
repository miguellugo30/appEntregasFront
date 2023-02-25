import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Paquetes } from 'src/app/core/models/paquetes';
import { latLng, tileLayer, circle, polygon, marker, icon, Layer } from 'leaflet';
import { ListadoPaquetesService } from 'src/app/core/services/listado-paquetes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.scss']
})
export class ModalDetalleComponent implements OnInit {

  /**
   * Titulo que contendra el moda
   */
  public title :string = '';
  /**
   * Informacion del paquete
   */
  public paquete: Paquetes;
  /**
   * Detalle paquete
   */
  public colaborador : any;
  public estatus : any;

  options = {
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      )
    ],
    zoom: 14,
    center: latLng(19.285666,-99.023945)
  };

  public constructor (
    public bsModalRef: BsModalRef,
    private listaPaquetesService: ListadoPaquetesService,
    public toastr: ToastrService,
  ){}

  public ngOnInit(): void {
    this.get();
  }

  /**
   * Funcion para cerrar el modal
   */
  public cerrarModal(): void {
    this.bsModalRef.hide();
  }
  /**
   * Funcion para obtener mas detalle del paquete
   */
  public get(){
    this.listaPaquetesService.get(this.paquete.id).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.colaborador = data.data.colaborador[0];
          this.estatus = data.data.estatus;
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

}
