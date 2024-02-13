import { UsuarioService } from './../../shared/service/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.scss']
})
export class UsuarioLoginComponent {
  email: string;
  senha: string;

  constructor(private usuarioService: UsuarioService) {}

  login() {
    this.usuarioService.login({ email: this.email, senha: this.senha }).subscribe(
      (response) => {
        // Login bem-sucedido, redirecione ou faça algo com o token JWT
        console.log('Login bem-sucedido', response);
      },
      (error) => {
        console.error('Erro no login', error);
      }
    );
  }
}
