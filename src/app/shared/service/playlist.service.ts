import { Playlist } from './../model/Playlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
