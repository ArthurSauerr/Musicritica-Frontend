import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../../shared/service/usuario.service';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.scss']
})
export class UsuarioLoginComponent {
  email: string;
  senha: string;

  constructor(private usuarioService: UsuarioService, private router: Router, private appComponent: AppComponent, private dadosCompartilhadosService: DadosCompartilhadosService) {}

  login() {
    this.usuarioService.login({ email: this.email, senha: this.senha }).subscribe(
      (response) => {
        this.usuarioService.armazenarTokenJWT(response);

        this.router.navigate(['/']);
        console.log('Login bem-sucedido');
        this.appComponent.verificarLogin();
      },
      (error) => {
        console.error('Erro no login', error);
      }
    );
  }

  criarConta(){
    this.router.navigate(['usuario/registrar']);
  }

  esqueceuSenha(){
    this.router.navigate(['usuario/esqueceu-senha']);
  }
}
