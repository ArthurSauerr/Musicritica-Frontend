import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../model/Comentario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioServiceService {

  private apiUrl = 'http://localhost:8080/comentario';

  constructor(private httpClient: HttpClient) { }

  enviarComentario(comentario: Comentario): Observable<Comentario> {
    return this.httpClient.post<Comentario>(this.apiUrl, comentario);
  }

  buscarComentarioPorIdMusica(id: String): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(`${this.apiUrl}/${id}`);
  }
}
