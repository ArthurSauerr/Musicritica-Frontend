import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao } from '../model/Avaliacao';
import { MusicaSpotify } from '../model/MusicaSpotify';
import { MapeamentoNotas } from '../model/MapeamentoNotas';
import { ListaTracksSpotify } from '../model/ListaTracksSpotify';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private apiUrl = 'http://localhost:8080/avaliacao';  
  private apiMusicaSpotifyUrl = 'http://localhost:8080/musica';  

  constructor(private http: HttpClient) { }

  salvar(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, avaliacao);
  }
  verificarExistenciaDaMusicaPorIdSpotify(id: string): Observable<MusicaSpotify> {
    const url = `${this.apiMusicaSpotifyUrl}/verificar/${id}`;
    console.log("URL enviada: " + url);
    return this.http.get<MusicaSpotify>(url);
  }
  buscarAvaliacaoPorIdComentario(idComentario: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(`${this.apiUrl}/comentario/${idComentario}`);
  }
  buscarMediaPorIdMusica(id_spotify: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/media/${id_spotify}`);
  }
  buscarQuantidadePorNota(id_spotify: string): Observable<MapeamentoNotas[]> {
    return this.http.get<MapeamentoNotas[]>(`${this.apiUrl}/notas/${id_spotify}`);
  }
  buscarAvaliacoesPorIdUsuario(id_usuario: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/avaliacoes/${id_usuario}`);
  }
  buscarMusicasUsuario(id_usuario: number): Observable<ListaTracksSpotify> {
    return this.http.get<ListaTracksSpotify>(`${this.apiUrl}/musicas/usuario/${id_usuario}`);
  }
}
