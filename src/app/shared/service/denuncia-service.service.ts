import { Injectable } from '@angular/core';
import { Denuncia } from '../model/Denuncia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciaServiceService {

  constructor(private httpClient: HttpClient) { }


  private denunciaUrl = 'http://localhost:8080/usuario/denuncia';



  enviarReport(denuncia: Denuncia): Observable<Denuncia> {
    return this.httpClient.post<Denuncia>(this.denunciaUrl, Denuncia);
  }
}
