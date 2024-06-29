import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifySearchResponse } from '../model/SpotifySearchResponse';
import { Item } from '../model/Item';
import { TrackData } from '../model/TrackData';
import { AlbumBuscado } from '../model/AlbumBuscado';
import { ItemBuscado } from '../model/ItemBuscado';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  private apiUrl = 'http://localhost:8080/spotify';

  constructor(private httpClient: HttpClient) { }

  buscarMusica(musica: string): Observable<SpotifySearchResponse> {
    return this.httpClient.get<SpotifySearchResponse>(`${this.apiUrl}/buscar/${musica}`);
  }

  getTopCharts(): Observable<SpotifySearchResponse[]> {
    return this.httpClient.get<SpotifySearchResponse[]>(`${this.apiUrl}/topCharts`);
  }

  getTopChartsYoutube(): Observable<SpotifySearchResponse[]> {
    return this.httpClient.get<SpotifySearchResponse[]>(`${this.apiUrl}/topChartsYoutube`);
  }

  getRecommendation(generoPrimario: string, generoSecundario: string): Observable<TrackData> {
    return this.httpClient.get<TrackData>(`${this.apiUrl}/descobrir/${generoPrimario}/${generoSecundario}`);
  }

  getAlbum(idAlbum: string): Observable<AlbumBuscado> {
    return this.httpClient.get<AlbumBuscado>(`${this.apiUrl}/buscar/album/${idAlbum}`);
  }

  buscarMusicaPorId(id_spotify: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this.apiUrl}/buscar/musica/id/${id_spotify}`);
  }

  getTopChartsDoBanco(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.apiUrl}/topCharts/db`);
  }

  getItemsPlaylistRecomendacao(genero: string): Observable<ItemBuscado[]> {
    return this.httpClient.get<ItemBuscado[]>(`${this.apiUrl}/recomendacoes/${genero}`);
  }

}
