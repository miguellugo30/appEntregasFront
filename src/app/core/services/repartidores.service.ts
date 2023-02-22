import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseColaboradores } from '../models/colaboradores';

@Injectable({
  providedIn: 'root'
})
export class RepartidoresService {

  constructor(private http: HttpClient) { }


  /**
   * Funcion para obtener todos los registros de Colaboradores
   * @returns
   */
  public getAll(): Observable<ResponseColaboradores>{
    return this.http.get<ResponseColaboradores>(`${environment.apiUrl}/repartidores`);
  }

}
