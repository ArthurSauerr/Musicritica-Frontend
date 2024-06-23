import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { AlertaComponentComponent } from 'src/app/menu-principal/alerta-component/alerta-component.component';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-usuario-redefinir-senha',
  templateUrl: './usuario-redefinir-senha.component.html',
  styleUrls: ['./usuario-redefinir-senha.component.scss']
})
export class UsuarioRedefinirSenhaComponent implements OnInit {

  token: string;
  senha: string;
  confirmarSenha: string;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertaService: AlertaServiceService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    this.token = token !== null ? token : ''; 
  }

  redefinirSenha(): void {
    if (this.senha === this.confirmarSenha) {
      this.usuarioService.redefinirSenha(this.token, this.senha).subscribe(
        (response) => {
          this.router.navigate(['usuario/login']);
          console.log(response.message);
        },
        (error) => {
          console.error('Erro ao redefinir senha:', error);
        }
      );
    } else {
      console.log('Senhas não correspondem.');
    }
  }
}
