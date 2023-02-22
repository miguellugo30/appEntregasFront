export interface Paquetes {
  id?: number,
  guia_rastreo: string,
  nombre_cliente: string,
  telefono: string,
  correo_electronico: string,
  direccion: string,
  no_exterior: string,
  no_interior: string,
  colonia: string,
  alcaldia_municipio: string,
  codigo_postal: string,
  estado: string,
  referencias: string,
  coord_latitud: string,
  coord_longitud: string,
}

export interface ResponsePaquetes{
  message: string,
  success: boolean,
  data: Paquetes[]
}

export interface PaquetesSalida {
  colaborador_id: string,
  paquetes: paqueteEscaneado[]
}

export interface paqueteEscaneado{
  id?: number,
  guia_rastreo: string,
  nombre_cliente: string
}
