import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../../shared/service/usuario.service';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.scss']
})
export class UsuarioLoginComponent {
  email: string;
  senha: string;

  mostrarSenha: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private appComponent: AppComponent,
    private dadosCompartilhadosService: DadosCompartilhadosService,
    private alertaService: AlertaServiceService
  ) { }

  login() {
    this.usuarioService.login({ email: this.email, senha: this.senha }).subscribe(
      (response) => {
        if (response.token) {
          this.usuarioService.armazenarTokenJWT(response.token);
          this.router.navigate(['/']);
          console.log('Login bem-sucedido');

          this.appComponent.verificarLogin();
        } else {
          this.alertaService.exibirAlerta('alertaLogin');
          console.error('Resposta de login inválida', response);
        }
      },
      (error) => {
        this.alertaService.exibirAlerta('alertaLogin');
        console.error('Erro no login', error);
      }
    );
  }

  criarConta() {
    this.router.navigate(['usuario/registrar']);
  }

  esqueceuSenha() {
    this.router.navigate(['usuario/esqueceu-senha']);
  }

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
