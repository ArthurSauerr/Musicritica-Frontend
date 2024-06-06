import { Comentario } from "./Comentario";
import { Usuario } from "./Usuario";

export class Denuncia{
    id:number;
    descricao: String;
    usuarioReportado: Usuario;
    usuario: Usuario;
    comentario: Comentario;
    status: boolean;
    dt_denuncia: String;
    
  }