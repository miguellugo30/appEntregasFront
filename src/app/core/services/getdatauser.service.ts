import { Injectable } from '@angular/core';
import { User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class GetdatauserService {

  public dataUser: User;

  constructor() { }

  public getToken() {
    return localStorage.getItem('tokenUser');
  }

  public getNameUser() {
    this.dataUser = JSON.parse( localStorage.getItem('currentUser') );
    return this.dataUser.colaborador.nombre + " " + this.dataUser.colaborador.apellido_paterno + " " + this.dataUser.colaborador.apellido_materno;
  }


}
