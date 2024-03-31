import { Usuario } from "./Usuario";
import { MusicaSpotify } from "./MusicaSpotify";

export class Playlist {
  id: number;
  nome: string;
  musicaSpotifyList: MusicaSpotify[];
  usuario: Usuario;
}
