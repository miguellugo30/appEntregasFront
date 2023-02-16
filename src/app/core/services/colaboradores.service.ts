import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseColaboradores, Colaboradores, ResponsePhoto } from '../models/colaboradores';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  constructor(private http: HttpClient) { }

  /**
   * Funcion para obtener todos los registros de Colaboradores
   * @returns
   */
  public getAll(): Observable<ResponseColaboradores>{
    return this.http.get<ResponseColaboradores>(`${environment.apiUrl}/colaboradores`);
  }
  /**
   * Funcion para obtener todos los registros de Colaboradores
   * @returns
   */
  public getPhoto(id): Observable<ResponsePhoto>{
    return this.http.get<ResponsePhoto>(`${environment.apiUrl}/colaboradores/`+id);
  }
  /**
   * Funcion para crear un nuevo vehiculo
   */
  public create(datos: Colaboradores): Observable<ResponseColaboradores>{
    return this.http.post<ResponseColaboradores>(`${environment.apiUrl}/colaboradores`, datos);
  }
  /**
   * Función para eliminar un vehiculo
   */
  public delete(datos: Colaboradores): Observable<ResponseColaboradores>{
    return this.http.delete<ResponseColaboradores>(`${environment.apiUrl}/colaboradores/`+datos.id);
  }
  /**
   * Funcion para editar un vehiculo
   */
  public update(datos: Colaboradores): Observable<ResponseColaboradores>{
    return this.http.put<ResponseColaboradores>(`${environment.apiUrl}/colaboradores/`+datos.id, datos)
  }
}
