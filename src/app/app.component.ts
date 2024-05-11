import { UsuarioService } from './shared/service/usuario.service';
import { DadosCompartilhadosService } from './shared/service/dados-compartilhados.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from './shared/model/Usuario';

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
      // Navegar para a URL com o ID do usuário logado
      this.router.navigate(['usuario/perfil', this.idUsuario]);
    } else {
      console.error('ID do usuário não está definido.');
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

showDropdownMenu() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownMenu) {
    dropdownMenu.classList.remove('hidden');
  }
}

hideDropdownMenu() {
  setTimeout(() => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu && !dropdownMenu.matches(':hover')) {
      dropdownMenu.classList.add('hidden');
    }
  }, 500); // Ajuste o valor conforme necessário (em milissegundos)
}

}
