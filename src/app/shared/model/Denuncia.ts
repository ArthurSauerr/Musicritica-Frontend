import { Comentario } from "./Comentario";
import { Usuario } from "./Usuario";

export class Denuncia{
    id:number;
    usuarioReportado: Usuario;
    usuario: Usuario;
    comentario: Comentario;
    status: boolean;
    dt_denuncia: number;

  }
