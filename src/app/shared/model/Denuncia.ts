import { Comentario } from "./Comentario";
import { Usuario } from "./Usuario";

export class Denuncia{
    id:number;
    descricao: string;
    usuarioReportado: Usuario;
    usuario: Usuario;
    comentario: string;
    status: boolean;
    dt_denuncia: number;

  }
