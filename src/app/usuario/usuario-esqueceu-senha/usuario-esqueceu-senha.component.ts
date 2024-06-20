import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-usuario-esqueceu-senha',
  templateUrl: './usuario-esqueceu-senha.component.html',
  styleUrls: ['./usuario-esqueceu-senha.component.scss']
})
export class UsuarioEsqueceuSenhaComponent {

  email: string;
  nome: string;
  senha: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alertaService: AlertaServiceService) { }

  esqueceuSenha() {
    this.usuarioService.esqueceuSenha({ email: this.email, nome: this.nome, senha: this.senha }).subscribe(
      (response) => {
        this.alertaService.exibirAlerta('alert15')
        console.log(response);
      },
      (error) => {
        this.alertaService.exibirAlerta('alert16')
        console.log(error);
      }

    )
  }

  voltar() {
    this.router.navigate(['usuario/login']);
  }

}
