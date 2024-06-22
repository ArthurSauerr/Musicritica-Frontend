import { Injectable } from '@angular/core';
import { Denuncia } from '../model/Denuncia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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


}
