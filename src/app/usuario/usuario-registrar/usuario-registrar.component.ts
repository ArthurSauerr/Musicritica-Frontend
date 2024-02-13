import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.scss']
})
export class UsuarioRegistrarComponent {
  nome: string;
  email: string;
  senha: string;
  dt_cadastro: string;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar(){
    this.usuarioService.registrar({nome: this.nome, email: this.email, senha: this.senha, dt_cadastro: this.dt_cadastro}).subscribe(
      (response) => {
        this.router.navigate(['usuario/login']);
        console.log('Registro bem-sucedido');
      },
      (error) => {
        console.error('Erro no registro', error);
      }
    );


  }
}
