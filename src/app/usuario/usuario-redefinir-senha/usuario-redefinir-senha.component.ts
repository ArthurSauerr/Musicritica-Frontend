import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-usuario-redefinir-senha',
  templateUrl: './usuario-redefinir-senha.component.html',
  styleUrls: ['./usuario-redefinir-senha.component.scss']
})
export class UsuarioRedefinirSenhaComponent {

  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;

  constructor(private usuarioService : UsuarioService, private router : Router){}

  redefinirSenha(){
    if(this.senha == this.confirmarSenha){
      this.usuarioService.redefinirSenha({email: this.email, nome: this.nome, senha: this.senha}).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
  
      )
    } else{
      console.log("Senhas não batem");
    }
  }

}
