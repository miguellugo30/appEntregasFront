export interface Colaboradores {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  correo_electronico: string;
  ruta_perfil: string;
  rol?: Rol;
  password?: string;
  password_confirmation?: string,
  vehiculo?: number
}

export class ResponseColaboradores {
  data: Colaboradores[];
  message: string;
  success: boolean;
}

export class ResponsePhoto {
  data: string;
  message: string;
  success: boolean;
}

export class Rol{
  id: number;
  nombre: string;
}
