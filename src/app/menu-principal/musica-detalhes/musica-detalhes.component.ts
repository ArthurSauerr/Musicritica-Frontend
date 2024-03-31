import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComentarioServiceService } from 'src/app/shared/service/comentario-service.service';
import { Item } from './../../shared/model/Item';
import { Comentario } from './../../shared/model/Comentario';
import { Musica } from 'src/app/shared/model/Musica';
import { Usuario } from 'src/app/shared/model/Usuario';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { PlaylistService } from 'src/app/shared/service/playlist.service';
import { Playlist } from 'src/app/shared/model/Playlist';
import { MusicaSpotify } from 'src/app/shared/model/MusicaSpotify';

@Component({
  selector: 'app-musica-detalhes',
  templateUrl: './musica-detalhes.component.html',
  styleUrls: ['./musica-detalhes.component.scss']
})
export class MusicaDetalhesComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private comentarioService: ComentarioServiceService,
    private usuarioService: UsuarioService,
    private datePipe: DatePipe,
    private playlistService: PlaylistService
  ) { }

  artista: string;
  musica: Item;

  novoComentario: Comentario = new Comentario();
  novaPlaylist: Playlist = new Playlist();
  comentario: string = '';
  resposta: string = '';
  musicaParaEnviar: Musica = new Musica();
  usuarioParaEnviar: Usuario = new Usuario();
  idComentarioPai: number;
  comentarioPaiParaEnviar: Comentario = new Comentario();
  comentarioPai: Comentario;
  spotifyUrl: SafeResourceUrl;
  comentariosBuscados: Comentario[];
  respostasBuscadas: Comentario[];
  playlistsDoUsuario: Playlist[];
  listaDeMusicasParaEnviar: MusicaSpotify[] = [];
  emailParam: string | undefined;

  novaMusicaSpotify: MusicaSpotify = new MusicaSpotify();

  mostrarTextarea: boolean = false;
  comentario1: string = '';
  showRepliesId: number | null = null;

  totalDeComentarios: number;

  mostrarDropdown: { [key: number]: boolean } = {};
  mostrarTextArea: { [key: number]: boolean } = {};

  showCreatePlaylistInput = false;
  nomePlaylistNova: string = "";

  ngOnInit(): void {
    this.musica = history.state.musica;
    this.artista = this.musica.album.artists[0].name;
    console.log('música:', this.artista);
    this.spotifyUrl = this.getSpotifyEmbedUrl(this.musica.id);
    this.buscarComentarios();
    this.buscarQuantidadeComentarios();

    const token = this.usuarioService.getToken();

    if (token) {
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub;
      this.emailParam = email;
      console.log("email do usuario: " + email);
    } else {
      console.log("Token não encontrado.");
    }

  }

  buscarRespostas(id: number): void {
    if (this.showRepliesId === id) {
      this.showRepliesId = null;
    } else {
      this.showRepliesId = id;
      this.comentarioService.buscarRespostas(id).subscribe(
        (data: Comentario[]) => {
          console.log(data);
          this.respostasBuscadas = data;
        },
        (error) => {
          console.error('Ocorreu um erro ao buscar as respostas:', error);
        }
      );
    }
  }

  buscarComentarios(): void {
    this.comentarioService.buscarComentarioPorIdMusica(this.musica.id).subscribe(
      (data: Comentario[]) => {
        this.comentariosBuscados = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  buscarQuantidadeComentarios(): void {
    this.comentarioService.buscarQuantidadeComentarios(this.musica.id).subscribe(
      (data: number) => {
        this.totalDeComentarios = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }


  enviarComentario(): void {
    if (this.comentario.trim() !== '') {
      console.log("comentario: " + this.comentario);

      //remover
      this.musicaParaEnviar.id = 1;

      this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
        (data: number) => {

          this.usuarioParaEnviar.id = data;

          this.novoComentario.comentario = this.comentario;
          this.novoComentario.musica = this.musicaParaEnviar;
          this.novoComentario.idSpotify = this.musica.id;
          this.novoComentario.usuario = this.usuarioParaEnviar;
          this.novoComentario.dt_publicacao = Date.now();

          this.comentarioService.enviarComentario(this.novoComentario).subscribe(
            (comentarioSalvo) => {
              console.log('Comentário enviado com sucesso: ', comentarioSalvo);
              this.comentario = '';
              this.buscarComentarios();
            }, error => {
              console.error('Erro ao enviar o comentário:', error);
            });
        },
        (error) => {
          console.error('Ocorreu um erro ao buscar o ID do usuário:', error);
        }
      );
    } else {
      console.error('Nenhum comentário digitado.');
    }
    this.buscarQuantidadeComentarios();
  }

  enviarResposta(): void {
    if (this.resposta.trim() !== '') {
      console.log("comentario: " + this.comentario);

      this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
        (data: number) => {

          this.usuarioParaEnviar.id = data;

          this.novoComentario.comentario = this.resposta;
          this.novoComentario.idSpotify = this.musica.id;
          this.novoComentario.usuario = this.usuarioParaEnviar;
          this.novoComentario.dt_publicacao = Date.now();
          this.novoComentario.comentarioPai = this.comentarioPaiParaEnviar;

          this.comentarioPaiParaEnviar.id = this.idComentarioPai;
          this.comentarioPaiParaEnviar.comentario = this.comentario;
          this.comentarioPaiParaEnviar.idSpotify = this.musica.id;
          this.comentarioPaiParaEnviar.usuario = this.usuarioParaEnviar;
          this.comentarioPaiParaEnviar.dt_publicacao = Date.now();


          this.comentarioService.enviarComentario(this.novoComentario).subscribe(
            (comentarioSalvo) => {
              console.log('Comentário enviado com sucesso: ', comentarioSalvo);
              this.resposta = '';
              this.buscarComentarios();
            }, error => {
              console.error('Erro ao enviar o comentário:', error);
            });
        },
        (error) => {
          console.error('Ocorreu um erro ao buscar o ID do usuário:', error);
        }
      );
    } else {
      console.error('Nenhum comentário digitado.');
    }
  }

  getSpotifyEmbedUrl(idMusica: string | null): SafeResourceUrl {
    if (idMusica) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${idMusica}?utm_source=generator&theme=0`);
    } else {
      return '';
    }
  }

  enviarPlaylist(): void {
    this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
      (data: number) => {

        this.usuarioParaEnviar.id = data;
        this.novaPlaylist.usuario = this.usuarioParaEnviar;

        const idMusica = this.musica.id;
        this.novaMusicaSpotify.id_spotify = idMusica;
        const nomePlaylist = this.nomePlaylistNova;
        this.listaDeMusicasParaEnviar.push(this.novaMusicaSpotify)

        console.log("Lista de músicas: " + this.listaDeMusicasParaEnviar);
        console.log("nome da playlist: " + nomePlaylist);
        console.log("usuario da playlist: " + this.usuarioParaEnviar.id);

        this.novaPlaylist.nome = this.nomePlaylistNova;

        this.novaPlaylist.musicaSpotifyList = this.listaDeMusicasParaEnviar;

        this.playlistService.salvarNovaPlaylist(this.novaPlaylist).subscribe(
          (playlistSalva) => {
            console.log('Playlist enviada com sucesso: ', playlistSalva);
            this.nomePlaylistNova = '';
          }, error => {
            console.error('Erro ao salvar uma nova playlist:', error);
          });
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o usuário pelo ID:', error);
      }
    );

  }


  buscarPlaylistsPorIdUsuario(): void {
    this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
      (id: number) => {
        const idUsuario: number = id;
        this.playlistService.buscarPlaylistsPorIdUsuario(idUsuario).subscribe(
          (data: Playlist[]) => {
            this.playlistsDoUsuario = data;
            console.log("id do usuario logado: " + idUsuario);
            console.log(data);
          },
          (error) => {
            console.error('Ocorreu um erro ao buscar as músicas:', error);
          }
        );
      }
    );
  }

  toggleDropdown(comentario: Comentario): void {
    if (!this.mostrarDropdown[comentario.id]) {
      this.fecharTodosDropdowns();
    }
    this.mostrarDropdown[comentario.id] = !this.mostrarDropdown[comentario.id];
  }

  fecharTodosDropdowns(): void {
    this.comentariosBuscados.forEach(comentario => {
      this.mostrarDropdown[comentario.id] = false;
    });
  }

  toggleReply(comentario: Comentario): void {
    if (!this.mostrarTextArea[comentario.id]) {
      this.fecharTodosTexAreas();
    }
    this.idComentarioPai = comentario.id;
    this.mostrarTextArea[comentario.id] = !this.mostrarTextArea[comentario.id];
  }

  fecharTodosTexAreas(): void {
    this.comentariosBuscados.forEach(comentario => {
      this.mostrarTextArea[comentario.id] = false;
    });
  }
  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
    this.showCreatePlaylistInput = false
    this.buscarPlaylistsPorIdUsuario();
  }
  toggleCreatePlaylistInput() {
    this.showCreatePlaylistInput = !this.showCreatePlaylistInput;
  }
}
