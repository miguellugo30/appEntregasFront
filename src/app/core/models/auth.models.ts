import { Colaboradores } from "./colaboradores";

export class User {
    id: number;
    name: string;
    token?: string;
    email: string;
    colaborador: Colaboradores
}

export class ResponseLogin{
  data: User;
  success: boolean;
  message: string;
  token: string
}


