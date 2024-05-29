import { UsuarioService } from './shared/service/usuario.service';
import { DadosCompartilhadosService } from './shared/service/dados-compartilhados.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from './shared/model/Usuario';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil/usuario-perfil.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'Musicritica';
  mostrarNavbar: boolean = true;
  emailParam: string | undefined;
  idUsuario: number;
  usuario: Usuario;
  isDropdownOpen = false;
  exibirEditButtons: boolean = false;

  urlId: number;

  constructor(
    private router: Router,
    private dadosCompartilhadosService: DadosCompartilhadosService,
    private usuarioService: UsuarioService
  ) {
    this.router.events.subscribe((event) => {
      if (
        this.router.url.includes('/registrar') ||
        this.router.url.includes('/login') ||
        this.router.url.includes('/esqueceu-senha') ||
        this.router.url.includes('/redefinir-senha')
      ) {
        this.mostrarNavbar = false;
      } else {
        this.mostrarNavbar = true;
      }
    });
  }

  ngOnInit(): void{
    this.verificarLogin();
    this.isUsuarioLogado();

    this.dadosCompartilhadosService.pageId$.subscribe(pageId => {
      console.log('ID da pagina recebido no AppComponent:', pageId);
      if(pageId){
        this.urlId = +pageId;
      }
    });
  }

  musicaProcurada: string = '';

  enviarParametro(): void {
    this.dadosCompartilhadosService.setMusicaProcurada(this.musicaProcurada);
    this.router.navigate(['/buscar']);
  }

  verificarLogin() {
    const token = this.usuarioService.getToken();

    if (token) {
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub;
      this.emailParam = email;
      console.log('Email do usuario logado: ' + email);
      this.buscarUsuarioLogado(email);
    } else {
      console.log('Token não encontrado.');
    }
  }

  isUsuarioLogado(): boolean {
    return !!this.usuarioService.getToken();
  }

  buscarUsuarioLogado(email: string | undefined) {
    this.usuarioService
      .buscarIdPorEmail(email)
      .subscribe((idUsuario: number) => {
        this.usuarioService.buscarUsuarioPorId(idUsuario).subscribe(
          (usuario: Usuario) => {
            this.usuario = usuario;
            this.idUsuario = this.usuario.id;
            console.log('Usuario buscado:', usuario);
          },
          (error) => {
            console.error('Usuario não está logado no sistema!');
          }
        );
      });
  }

  verPerfilUsuario(){
    if (this.idUsuario !== undefined && this.idUsuario !== null) {
      this.router.navigate(['usuario/perfil', this.idUsuario]);
    } else {
      console.error('ID do usuário não está definido.');
    }
  }

  exibirEdicao(): void {
    this.exibirEditButtons = !this.exibirEditButtons;

    if (this.idUsuario === +this.urlId){
      const modoEdicaoIds = ['editar-nome', 'editar-img-bg', 'editar-img-perfil', 'overlay-bg', 'overlay-profile'];
      const modoEdicaoEsconder = ['div-musicas', 'playlists-btn', 'avaliacoes-btn', 'descobertas-btn'];

      modoEdicaoIds.forEach(id => {
        const element = document.getElementById(id);
        if(element){
          element.style.visibility = this.exibirEditButtons ? "visible" : "hidden";
        }
      });

      modoEdicaoEsconder.forEach(id => {
        const element = document.getElementById(id);
        if(element){
          element.style.visibility = this.exibirEditButtons ? "hidden" : "visible";
        }
      })
    }
  }

  logout(){
    this.usuarioService.deleteToken();
    this.router.navigate(['usuario/login']);
    console.log("Usuário deslogado!")
  }

  login(){
    this.router.navigate(['usuario/login']);
  }

  toggleDropdown(state: boolean) {
    setTimeout(() => {
      this.isDropdownOpen = state;
    }, 200)
  }

}
