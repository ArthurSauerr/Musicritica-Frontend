import { Artists } from "./Artists";
import { TrackBuscada } from "./TrackBuscada";
import { Image } from "./Image";

export class AlbumBuscado {
  name: string;
  artists: Artists[];
  tracks: TrackBuscada;
  images: Image[];
}
