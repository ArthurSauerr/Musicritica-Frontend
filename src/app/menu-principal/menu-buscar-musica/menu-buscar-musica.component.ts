import { Router } from '@angular/router';
import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { MenuPrincipalService } from './../../shared/service/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/model/Item';
import { SpotifySearchResponse } from 'src/app/shared/model/SpotifySearchResponse';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Usuario } from 'src/app/shared/model/Usuario';

@Component({
  selector: 'app-menu-buscar-musica',
  templateUrl: './menu-buscar-musica.component.html',
  styleUrls: ['./menu-buscar-musica.component.scss']
})
export class MenuBuscarMusicaComponent implements OnInit {

  constructor(
    private router: Router,
    private menuPrincipalService: MenuPrincipalService,
    private dadosCompartilhadosService: DadosCompartilhadosService,
    private usuarioService: UsuarioService
  ) { }

  parametroDePesquisa: string = '';

  musicas: Item[] = [];
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.dadosCompartilhadosService.musicaProcurada.subscribe(musicaProcurada => {
      if (musicaProcurada) {
        this.parametroDePesquisa = musicaProcurada;
        this.buscarMusica();
        this.buscarUsuarios();
      }
    });
  }

  buscarMusica(): void {
    this.menuPrincipalService.buscarMusica(this.parametroDePesquisa).subscribe(
      (data: SpotifySearchResponse) => {
        console.log(data);
        this.musicas = data.tracks.items;
        console.log(this.musicas);
        console.log(data.tracks.items[0].id)
        this.dadosCompartilhadosService.setIdMusica(data.tracks.items[0].id);
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }
  buscarUsuarios(): void {
    this.usuarioService.buscarUsuarioPeloNome(this.parametroDePesquisa).subscribe(
      (data: Usuario[]) => {
        console.log(data);
        this.usuarios = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar usuários:', error);
      }
    );
  }

  verPerfilUsuario(id: number) {
    this.router.navigate(['/usuario/perfil/', id])
  }

  avancar(musica: Item): void {
    this.router.navigate(['/detalhes'], { state: { musica: musica } });
  }
}
