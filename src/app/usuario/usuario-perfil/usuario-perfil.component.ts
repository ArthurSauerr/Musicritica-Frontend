import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/Usuario';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'src/app/shared/service/playlist.service';
import { Playlist } from 'src/app/shared/model/Playlist';
import { ListaTracksSpotify } from 'src/app/shared/model/ListaTracksSpotify';



@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss'],

})
export class UsuarioPerfilComponent implements OnInit{

  usuario: Usuario;
  imagemPerfil: number[];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private playListService: PlaylistService
  ) { }

  conteudoSelecionado: string | null = null;
  novaPlaylist: Playlist = new Playlist();
  playlistsDoUsuario: Playlist[];

  mostrarDropdown: { [key: number]: boolean } = {};

  primeirasMusicasDasPlaylists: { [key: number]: string } = {};


  musicasDaPlaylist: ListaTracksSpotify = new ListaTracksSpotify();

  ngOnInit(): void {
    this.usuarioService.getToken();
    this.route.params.subscribe(params => {
      const idUsuario = +params['id'];
      this.buscarUsuario(idUsuario);
    });
    this.buscarPlaylistsPorIdUsuario();

  }

  mostrarConteudo(opcao: string): void {
    this.conteudoSelecionado = opcao;

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

  buscarPlaylistsPorIdUsuario(): void {
    this.playListService.buscarPlaylistsPorIdUsuario(this.usuario.id).subscribe(
      (data: Playlist[]) => {
        this.playlistsDoUsuario = data;
        this.playlistsDoUsuario.forEach(playlist => {
          this.buscarTodasMusicasDaPlaylist(playlist.id); 
        });
        console.log(data);
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  buscarTodasMusicasDaPlaylist(id: number): void {
    this.playListService.buscarTodasMusicasDaPlaylist(id).subscribe(
      (data: ListaTracksSpotify) => {
        if (data.tracks && data.tracks.length > 0) {
          const primeiraMusica = data.tracks[0]; 
          const imageUrl = primeiraMusica.album.images.length > 0 ? primeiraMusica.album.images[0].url : ''; 
          this.primeirasMusicasDasPlaylists[id] = imageUrl;
        }
        this.musicasDaPlaylist = data;

      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o as músicas do álbum:', error);
      }
    );
  }

  toggleDropdown(playlist: Playlist, event: Event): void {
    event.stopPropagation();
    if (!this.mostrarDropdown[playlist.id]) {
      this.fecharTodosDropdowns();
    }
    this.mostrarDropdown[playlist.id] = !this.mostrarDropdown[playlist.id];
  }

  fecharTodosDropdowns(): void {
    this.playlistsDoUsuario.forEach(playlist => {
      this.mostrarDropdown[playlist.id] = false;
    });
  }
}
