import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponsePaquetes } from '../models/paquetes';

@Injectable({
  providedIn: 'root'
})
export class ListadoPaquetesService {

  constructor(
    private http: HttpClient
  )
  {  }
  /**
    * Funcion para obtener todos los paquetes sin asignar
    */
  public getAll(): Observable<ResponsePaquetes>{
    return this.http.get<ResponsePaquetes>(`${environment.apiUrl}/paquetes`);
  }
  /**
    * Funcion para obtener todos los paquetes sin asignar
    */
  public get(id: number): Observable<ResponsePaquetes>{
    return this.http.get<ResponsePaquetes>(`${environment.apiUrl}/paquetes/`+id);
  }
}
