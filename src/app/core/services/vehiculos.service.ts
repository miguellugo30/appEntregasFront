import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseVehiculos, Vehiculos } from '../models/vehiculos';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(private http: HttpClient) { }

  /**
   * Funcion para obtener todos los registros de vehiculos
   * @returns
   */
  public getAll(): Observable<ResponseVehiculos>{
    return this.http.get<ResponseVehiculos>(`${environment.apiUrl}/vehiculos`);
  }
  /**
   * Funcion para crear un nuevo vehiculo
   */
  public create(datos: Vehiculos): Observable<ResponseVehiculos>{
    return this.http.post<ResponseVehiculos>(`${environment.apiUrl}/vehiculos`, datos);
  }
  /**
   * Función para eliminar un vehiculo
   */
  public delete(datos: Vehiculos): Observable<ResponseVehiculos>{
    return this.http.delete<ResponseVehiculos>(`${environment.apiUrl}/vehiculos/`+datos.id);
  }
  /**
   * Funcion para editar un vehiculo
   */
  public update(datos: Vehiculos): Observable<ResponseVehiculos>{
    return this.http.put<ResponseVehiculos>(`${environment.apiUrl}/vehiculos/`+datos.id, datos)
  }


}
