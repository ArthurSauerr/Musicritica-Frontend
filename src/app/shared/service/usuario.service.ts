import { RegistroDTO } from './../model/RegistroDTO';
import { LoginDTO} from '../model/LoginDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioDTO } from '../model/UsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  private readonly apiUrl = 'http://localhost:8080/auth';

  login(loginDTO: LoginDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, loginDTO);
  }

  registrar(registroDTO: RegistroDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/registrar`, registroDTO);
  }

  esqueceuSenha(usuarioDTO: UsuarioDTO): Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/esqueceuSenha`, usuarioDTO)
  }
}
