import { RegistroDTO } from './../model/RegistroDTO';
import { LoginDTO } from '../model/LoginDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioDTO } from '../model/UsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  private readonly usuarioUrl = 'http://localhost:8080/usuario';

  armazenarTokenJWT(token: string) {
    localStorage.setItem('token', token);
    console.log(token)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  deleteToken(){
    return localStorage.removeItem('token');
  }

  buscarUsuarioPeloNome(nome: string): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.usuarioUrl}/buscar/nome/${nome}`);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.usuarioUrl}/login`, loginDTO);
  }

  registrar(registroDTO: RegistroDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.usuarioUrl}/registrar`, registroDTO);
  }

  esqueceuSenha(usuarioDTO: UsuarioDTO): Observable<any> {
    return this.httpClient.post<any>(`${this.usuarioUrl}/esqueceuSenha`, usuarioDTO)
  }

  redefinirSenha(token: string, novaSenha: string): Observable<any> {
    return this.httpClient.post<any>(`${this.usuarioUrl}/redefinirSenha/${token}`, { senha: novaSenha });
  }

  buscarIdPorEmail(email: String | undefined): Observable<number> {
    return this.httpClient.get<number>(`${this.usuarioUrl}/buscar/${email}`);
  }

  buscarUsuarioPorId(id: Number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.usuarioUrl}/${id}`);
  }

  atualizarUsuario(nome?: string, imagem_perfil?: File, imagem_background?: File): Observable<any>{
    const token = this.getToken();
    if (!token) {
      throw new Error('Token de autorização não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData: FormData = new FormData();
    if (nome) {
      formData.append('nome', nome);
    }
    if (imagem_perfil) {
      formData.append('imagem_perfil', imagem_perfil);
    }
    if (imagem_background) {
      formData.append('imagem_background', imagem_background);
    }
    return this.httpClient.put<any>(`${this.usuarioUrl}/atualizar`, formData, { headers });
  }
}
