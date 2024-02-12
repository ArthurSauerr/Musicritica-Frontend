import { Image } from "./Image";
import { Artists } from "./Artists";

export class Album {
  name: string;
  release_date: string;
  images: Image[];
  artists: Artists[];
}
