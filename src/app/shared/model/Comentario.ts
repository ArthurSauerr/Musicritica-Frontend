import { Musica } from "./Musica";
import { Usuario } from "./Usuario";

export class Comentario {
  id: number;
  idSpotify: string;
  comentario: string;
  musica: Musica;
  usuario: Usuario;
  comentarioPai: Comentario
}
