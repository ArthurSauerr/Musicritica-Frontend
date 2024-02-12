import { Wiki } from "./Wiki";

export interface LastFmMusica {
  id: number;
  nome: string;
  url: string;
  artista: string;
  duracao?: string;
  wiki: Wiki;
}
