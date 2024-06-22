import { Playlist } from './../model/Playlist';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

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

  //cade o metodo do controller
  salvarDescobertas(usuarioId: number, idSpotify: string, idMusicaSpotify: string): Observable<any> {
    const params = new HttpParams()
      .set('idSpotify', idSpotify)
      .set('idMusicaSpotify', idMusicaSpotify)

    return this.httpClient.post<any>(`${this.apiUrl}/descobertas/salvar/${usuarioId}`, null, { params });
  }
  buscarTodasMusicasDaPlaylistDescobertas(usuarioId: number): Observable<ListaTracksSpotify> {
    return this.httpClient.get<ListaTracksSpotify>(`${this.apiUrl}/${usuarioId}/tracks-descobertas`);
  }

  buscarPlaylistDescobertasPorIdUsuario(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(`${this.apiUrl}/descobertas/${id}`);
  }

  atualizarPlaylist(playlist: Playlist): Observable<Playlist> {
    const token = this.getToken();
    if(!token){
      throw new Error('Token de autorização não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<Playlist>(`${this.apiUrl}/atualizar`, playlist, { headers });
  }

  excluirPlaylist(playlistId: number): Observable<Playlist> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token de autorização não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<Playlist>(`${this.apiUrl}/excluir/${playlistId}`, { headers });
  }

  excluirMusicaPlaylist(playlistId: number, idMusicaSpotify: number): Observable<Playlist> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token de autorização não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<Playlist>(`${this.apiUrl}/excluir/musica/${playlistId}/${idMusicaSpotify}`, { headers });
  }

}
