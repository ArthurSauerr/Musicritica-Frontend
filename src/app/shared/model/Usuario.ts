import { CargoUsuario } from "./CargoUsuario";

export class Usuario{
  id:number;
  nome: String;
  email: String;
  senha: String;
  imagem_perfil: File;
  imagem_background: File;
  dt_cadastro: String;
  role: CargoUsuario;
}
