import { Injectable } from '@angular/core';
import { Denuncia } from '../model/Denuncia';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Musica } from '../model/Musica';
import { MusicaSpotify } from '../model/MusicaSpotify';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  constructor(private httpClient: HttpClient) { }


  private denunciaUrl = 'http://localhost:8080/denuncia';



  enviarReport(idComentarioSelecionado: number, idUsuarioAutenticado: number): Observable<any> {
    const url = `${this.denunciaUrl}/${idUsuarioAutenticado}/${idComentarioSelecionado}`;
    return this.httpClient.post<any>(url, {});
  }
  listarDenuncias(): Observable<Array<Denuncia>> {
    return this.httpClient.get<Array<Denuncia>>(`${this.denunciaUrl}/listarTodos`);

  }
  buscarDenunciaPorNome(nome: String): Observable<Denuncia[]> {
    return this.httpClient.get<Denuncia[]>(`${this.denunciaUrl}/buscar/${nome}`);
  }
  buscarDenunciaPorData(dataInicio: string, dataFim: string): Observable<Denuncia[]> {
    return this.httpClient.get<Denuncia[]>(`${this.denunciaUrl}/buscarPorData/${dataInicio}/${dataFim}`);
  }
  fecharDenuncia(denunciaId: number): Observable<any> {
    return this.httpClient.put(`${this.denunciaUrl}/fechar/${denunciaId}`, {});
  }
  buscarMusicaComMedia4(): Observable<MusicaSpotify[]> {
    return this.httpClient.get<MusicaSpotify[]>(`${this.denunciaUrl}/buscarPorMedia4`);
  }
}
