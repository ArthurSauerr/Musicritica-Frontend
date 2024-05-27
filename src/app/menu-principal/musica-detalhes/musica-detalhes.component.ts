import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Component, HostListener, OnInit, numberAttribute, ElementRef, Input } from '@angular/core';
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
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

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
    private playlistService: PlaylistService,
    private elementRef: ElementRef,
    private alertaService: AlertaServiceService
  ) { }

  artista: string;
  comentario: string = '';
  resposta: string = '';
  emailParam: string | undefined;

  mostrarTextarea: boolean = false;
  showRepliesId: number | null = null;
  showCreatePlaylistInput = false;
  showModal: boolean = false;
  showModalEditarComentario: boolean = false;
  comentarioSelecionado: string;
  idComentarioSelecionado: number;
  playlistSelecionada: boolean = false;

  novoComentario: Comentario = new Comentario();
  comentarioPaiParaEnviar: Comentario = new Comentario();
  comentarioPai: Comentario;
  novaPlaylist: Playlist = new Playlist();
  musicaParaEnviar: Musica = new Musica();
  usuarioParaEnviar: Usuario = new Usuario();
  usuarioLogado: Usuario = new Usuario();
  novaMusicaSpotify: MusicaSpotify = new MusicaSpotify();

  idComentarioPai: number;
  spotifyUrl: SafeResourceUrl;
  totalDeComentarios: number;
  nomePlaylistNova: string = "";
  idPlaylistSelecionada: number;

  musica: Item;
  comentariosBuscados: Comentario[];
  respostasBuscadas: Comentario[];
  playlistsDoUsuario: Playlist[];
  listaDeMusicasParaEnviar: MusicaSpotify[] = [];

  mostrarDropdown: { [key: number]: boolean } = {};
  mostrarTextArea: { [key: number]: boolean } = {};

  rating: number = 2;
  stars: number[] = [5];


  rate(stars: number) {
    this.rating = stars;
  }

  data: any;
  options: any;

  

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Nota 1', 'Nota 2', 'Nota 3', 'Nota 5', 'Nota 5'],
      datasets: [
        {
          label: 'Avaliações',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          yAxisID: 'y1',
          tension: 0.3,
          data: [28, 48, 40, 19, 86, 27, 90]

        }
      ]
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },

        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary
          },

        }
      }
    }



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
    this.buscarIdUsuarioLogado();
  };

  buscarIdUsuarioLogado() {
    this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
      (data: number) => {
        this.usuarioLogado.id = data;
        console.log("id usuario logado: " + this.usuarioLogado.id)
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o ID do usuário:', error);
      }
    );
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
              this.alertaService.exibirAlerta('alert3')
            }, error => {
              console.error('Erro ao enviar o comentário:', error);
              this.alertaService.exibirAlerta('alert4')
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

  atualizarComentario(comentarioId: number): void {
    console.log("comentario: " + this.comentario);
    this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
      (usuarioId: number) => {
        this.comentarioSelecionado
        this.comentarioService.atualizarComentario(usuarioId, comentarioId, this.comentarioSelecionado).subscribe(
          (comentarioSalvo) => {
            console.log('Comentário enviado com sucesso: ', comentarioSalvo);
            this.comentario = '';
            this.alertaService.exibirAlerta('alert5')
          }, error => {
            this.buscarComentarios();
            console.error('Erro ao enviar o comentário:', error);
            this.alertaService.exibirAlerta('alert6')
          });
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o ID do usuário:', error);
      }
    );
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
              this.alertaService.exibirAlerta('alert3')
            }, error => {
              console.error('Erro ao enviar o comentário:', error);
              this.alertaService.exibirAlerta('alert4')
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

  deletarComentario(comentarioId: number): void {
    this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
      (usuarioId: number) => {
        this.comentarioService.deletarComentario(usuarioId, comentarioId).subscribe(
          (response) => {
            console.log('Comentário deletado com sucesso');
            this.alertaService.exibirAlerta('alert7')
          },
          (error) => {
            this.buscarComentarios();
            console.error('Erro ao deletar comentário:', error);
            this.alertaService.exibirAlerta('alert8')
          }
        );
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o ID do usuário:', error);
      }
    );
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
            this.alertaService.exibirAlerta('alert3')
            this.nomePlaylistNova = '';
          }, error => {
            console.error('Erro ao salvar uma nova playlist:', error);
            this.alertaService.exibirAlerta('alert4')
          });
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o usuário pelo ID:', error);
      }
    );

  }

  enviarMusicaParaPlaylist(): void {
    const idSpotify: string = this.musica.id;
    const idMusicaSpotify: string = this.musica.id;
    const idPlaylist: number = this.idPlaylistSelecionada;

    console.log("Id para verificar: " + idMusicaSpotify);
    console.log("Id da playlist para salvar: " + idPlaylist);

    this.playlistService.verificarEInserirMusicaSpotify(idSpotify, idMusicaSpotify, idPlaylist).subscribe(
      () => {
        console.log('Música enviada para a playlist com sucesso');
        this.alertaService.exibirAlerta('alert1')
      }, error => {
        console.error('Erro ao salvar uma nova música na playlist:', error);
        this.alertaService.exibirAlerta('alert2')
      });
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

  capturarIdPlaylist(idPlaylist: number): void {
    this.idPlaylistSelecionada = idPlaylist;
    console.log("id da playlist clicada: " + this.idPlaylistSelecionada);
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

  toggleModal() {
    this.showModal = !this.showModal;
    this.showCreatePlaylistInput = false
    this.buscarPlaylistsPorIdUsuario();
  }
  fecharModal(event: MouseEvent): void {
    const modalElement = document.querySelector('#modal');
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.toggleModal();
    }
  }

  checkPlaylistSelected(event: any) {
    this.playlistSelecionada = event.target.checked;
  }

  toggleCreatePlaylistInput() {
    this.showCreatePlaylistInput = !this.showCreatePlaylistInput;
  }

  openModal(comentarioTexto: Comentario) {
    this.comentarioSelecionado = comentarioTexto.comentario;
    this.idComentarioSelecionado = comentarioTexto.id;
    this.showModalEditarComentario = true;
    this.fecharTodosDropdowns();
  }

  closeModal() {
    this.showModalEditarComentario = false;
  }
}
