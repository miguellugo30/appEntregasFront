export class Vehiculos {
  id?: number;
  marca: string;
  modelo: string;
  anio: string;
  placas: string;
  tipo: string;
}

export class ResponseVehiculos {
  data: Vehiculos[];
  message: string;
  success: boolean;
}
