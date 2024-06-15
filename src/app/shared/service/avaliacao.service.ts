import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao } from '../model/Avaliacao';
import { MusicaSpotify } from '../model/MusicaSpotify';

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
  
  
}
