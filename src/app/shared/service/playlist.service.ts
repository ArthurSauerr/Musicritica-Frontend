import { Playlist } from './../model/Playlist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaTracksSpotify } from '../model/ListaTracksSpotify';
import { MusicaSpotify } from '../model/MusicaSpotify';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiUrl = 'http://localhost:8080/playlist';

  constructor(private httpClient: HttpClient) { }

  buscarPlaylistsPorIdUsuario(id: number): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(`${this.apiUrl}/todas/${id}`);
  }

  salvarNovaPlaylist(novaPlaylist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(this.apiUrl, novaPlaylist);
  }

  verificarEInserirMusicaSpotify(idSpotify: string, idMusicaSpotify: string, idPlaylist: number): Observable<any> {
    const url = `${this.apiUrl}/verificar?idSpotify=${idSpotify}&idMusicaSpotify=${idMusicaSpotify}&idPlaylist=${idPlaylist}`;
    return this.httpClient.post<any>(url, {});
  }

  buscarTodasMusicasDaPlaylist(id: number): Observable<ListaTracksSpotify> {
    return this.httpClient.get<ListaTracksSpotify>(`${this.apiUrl}/${id}/tracks`);
  }

  salvarDescobertas(usuarioId: number, idSpotify: string, idMusicaSpotify: string): Observable<any> {
    const params = new HttpParams()
      .set('idSpotify', idSpotify)
      .set('idMusicaSpotify', idMusicaSpotify)
      .set('idPlaylist', usuarioId.toString());

    return this.httpClient.post<any>(`${this.apiUrl}/verificar`, null, { params });
  }
  buscarTodasMusicasDaPlaylistDescobertas(usuarioId: number): Observable<ListaTracksSpotify> {
    return this.httpClient.get<ListaTracksSpotify>(`${this.apiUrl}/${usuarioId}/tracks-descobertas`);
  }

  buscarPlaylistDescobertasPorIdUsuario(id: number): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(`${this.apiUrl}/descobertas/${id}`);
  }

}
