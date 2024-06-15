import { MusicaSpotify } from "./MusicaSpotify";
import { Usuario } from "./Usuario";

export class Avaliacao {
  id: number;
  usuario: Usuario;
  musica: MusicaSpotify;
  nota: number;
}
