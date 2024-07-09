import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.scss'],
})
export class UsuarioRegistrarComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  dt_cadastro: string;
  senhaInvalida: boolean = false;

  maxLengthNome: number = 20;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alertaService: AlertaServiceService
  ) { }

  get characterCountNome(): string {
    return `${this.nome.length}/${this.maxLengthNome}`;
  }

  registrar() {
    if (this.nome && this.email && this.senha) {
      if(this.nome.length > this.maxLengthNome){
        this.alertaService.exibirAlerta('alertaCadastro');
      } else {
        if (this.validarEmail(this.email) && this.validarSenha(this.senha)) {
          this.senhaInvalida = false;
          this.usuarioService.registrar({ nome: this.nome, email: this.email, senha: this.senha })
            .subscribe(
              (response) => {
                console.log(response.message);
                this.router.navigate(['usuario/login']);
              },
              (error) => {
                this.alertaService.exibirAlerta('alertaCadastro');
                console.error('Erro no registro', error);
              }
            );
        } else {
          this.senhaInvalida = true;
        }
      }
    }
  }

  validarEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValido = emailPattern.test(email);
    if (!emailValido) {
      console.error('Email inválido');
    }
    return emailValido;
  }

  validarSenha(senha: string): boolean {
    const senhaValida = senha.length >= 6;
    if (!senhaValida) {
      console.error('Senha inválida: deve ter pelo menos 6 caracteres.');
    }
    return senhaValida;
  }

  emailValido(): boolean {
    return this.validarEmail(this.email);
  }

  fazerLogin() {
    this.router.navigate(['usuario/login']);
  }
}
