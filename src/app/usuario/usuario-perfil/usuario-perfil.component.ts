import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/shared/model/Usuario';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent {

  usuario: Usuario;
  imagemPerfil: number[];

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private sanitizer: DomSanitizer){}

  ngOnInit(): void{
    this.usuarioService.getToken();
    this.route.params.subscribe(params => {
      const idUsuario = +params['id'];
      this.buscarUsuario(idUsuario);
    });
  }


  buscarUsuario(idUsuario: number): void {
    this.usuarioService.buscarUsuarioPorId(idUsuario).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        console.log("Usuario buscado:", usuario);
      },
      (error) => {
        console.error("Erro ao buscar usuário:", error);
      }
    );
  }


}
