import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifySearchResponse } from '../model/SpotifySearchResponse';
import { LastFmMusica } from '../model/LastFmMusica';
import { Item } from '../model/Item';
import { TrackData } from '../model/TrackData';
import { AlbumBuscado } from '../model/AlbumBuscado';

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

  getTopCharts(): Observable<SpotifySearchResponse[]> {
    return this.httpClient.get<SpotifySearchResponse[]>(`${this.apiUrl}/topCharts`);
  }
  getRecommendation(generoPrimario: string, generoSecundario: string): Observable<TrackData> {
    return this.httpClient.get<TrackData>(`${this.apiUrl}/descobrir/${generoPrimario}/${generoSecundario}`);
  }
  getAlbum(idAlbum: string): Observable<AlbumBuscado> {
    return this.httpClient.get<AlbumBuscado>(`${this.apiUrl}/buscar/album/${idAlbum}`);
  }

  getTopChartsDoBanco(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.apiUrl}/topCharts/db`);
  }

}
