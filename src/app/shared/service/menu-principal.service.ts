import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifySearchResponse } from '../model/SpotifySearchResponse';
import { LastFmMusica } from '../model/LastFmMusica';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  private apiUrl = 'http://localhost:8080/spotify';
  private lastfmUrl = 'http://localhost:8080/home';

  constructor(private httpClient: HttpClient) { }

  buscarMusica(musica: string): Observable<SpotifySearchResponse> {
    return this.httpClient.get<SpotifySearchResponse>(`${this.apiUrl}/buscar/${musica}`);
  }

  getInfoMusica(artista: string, musica: string): Observable<LastFmMusica> {
    return this.httpClient.get<LastFmMusica>(`${this.lastfmUrl}/${artista}/${musica}`);
  }
}
