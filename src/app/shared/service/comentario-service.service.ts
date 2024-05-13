import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  buscarRespostas(id: number): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(`${this.apiUrl}/respostas/${id}`);
  }
  buscarQuantidadeComentarios(id: string): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/comentarios/${id}`);
  }
  deletarComentario(usuarioId: number, comentarioId: number): Observable<string> {
    const url = `${this.apiUrl}/${usuarioId}/${comentarioId}`;
    return this.httpClient.delete<string>(url);
  }
  atualizarComentario(usuarioId: number, comentarioId: number ,novoComentario: string): Observable<string> {
    const url = `${this.apiUrl}/${usuarioId}/${comentarioId}`;
    return this.httpClient.put<string>(url, novoComentario);
  }
}
