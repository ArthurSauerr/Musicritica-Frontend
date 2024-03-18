import { RegistroDTO } from './../model/RegistroDTO';
import { LoginDTO } from '../model/LoginDTO';
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
  private readonly usuarioUrl = 'http://localhost:8080/usuario';

  armazenarTokenJWT(token: string) {
    const tokenObj = { token };
    localStorage.setItem('token', JSON.stringify(tokenObj));
    console.log(token)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  deleteToken(){
    return localStorage.removeItem('token');
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, loginDTO);
  }

  registrar(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/registrar`, formData);
  }

  esqueceuSenha(usuarioDTO: UsuarioDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/esqueceuSenha`, usuarioDTO)
  }

  redefinirSenha(usuarioDTO: UsuarioDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/redefinirSenha/{token}`, usuarioDTO)
  }

  buscarIdPorEmail(email: String | undefined): Observable<number> {
    return this.httpClient.get<number>(`${this.usuarioUrl}/buscar/${email}`);
  }

  buscarUsuarioPorId(id: Number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.usuarioUrl}/${id}`);
  }
}
