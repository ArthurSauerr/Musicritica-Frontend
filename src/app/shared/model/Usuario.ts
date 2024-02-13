import { CargoUsuario } from "./CargoUsuario";

export class Usuario{
  id:number;
  nome: String;
  email: String;
  senha: String;
  imagem_perfil: String;
  imagem_background: String;
  dt_cadastro: String;
  role: CargoUsuario;
}
