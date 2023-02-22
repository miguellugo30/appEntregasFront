import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaquetesSalida, ResponsePaquetes } from '../models/paquetes';

@Injectable({
  providedIn: 'root'
})
export class PaquetesSalidaService {

  constructor(private http: HttpClient) {

   }
  /**
   * Funcion para obtener todos los paquetes sin asignar
   */
  public getAll(): Observable<ResponsePaquetes>{
    return this.http.get<ResponsePaquetes>(`${environment.apiUrl}/paquetes_salida`);
  }
  /**
   * Funcion para vincular paquetes al colaborador
   */
  public create(datos: PaquetesSalida): Observable<ResponsePaquetes>{
    return this.http.post<ResponsePaquetes>(`${environment.apiUrl}/paquetes_salida`, datos);
  }
}
