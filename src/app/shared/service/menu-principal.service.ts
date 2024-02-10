import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicaSearch } from '../model/MusicaSearch';
import { Item } from '../model/Item';
import { SpotifySearchResponse } from '../model/SpotifySearchResponse';

@Injectable({
  providedIn: 'root'
})
export class MenuPrincipalService {

  private apiUrl = 'http://localhost:8080/spotfy';

  constructor(private httpClient: HttpClient) { }

  buscarMusica(musica: string): Observable<SpotifySearchResponse> {
    return this.httpClient.get<SpotifySearchResponse>(`${this.apiUrl}/buscar/${musica}`);
  }
}
