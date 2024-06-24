import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/Usuario';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'src/app/shared/service/playlist.service';
import { Playlist } from 'src/app/shared/model/Playlist';
import { ListaTracksSpotify } from 'src/app/shared/model/ListaTracksSpotify';
import { DadosCompartilhadosService } from 'src/app/shared/service/dados-compartilhados.service';
import { ChangeDetectorRef } from '@angular/core';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';
import { AvaliacaoService } from 'src/app/shared/service/avaliacao.service';
import { Avaliacao } from 'src/app/shared/model/Avaliacao';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss'],
})
export class UsuarioPerfilComponent implements OnInit {
  usuario: Usuario;
  imagemPerfil: string | ArrayBuffer | null;
  imagemBackground: string | ArrayBuffer | null;
  playlist: Playlist;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private playListService: PlaylistService,
    private dadosCompartilhadosService: DadosCompartilhadosService,
    private cdr: ChangeDetectorRef,
    private alertaService: AlertaServiceService,
    private avaliacaoService: AvaliacaoService,
  ) {}

  conteudoSelecionado: string | null = null;
  novaPlaylist: Playlist = new Playlist();
  playlistsDoUsuario: Playlist[];
  avaliacoes: Avaliacao[];
  musicasAvaliadas =  new ListaTracksSpotify();
  playlistDescobertas = new Playlist();

  mostrarDropdown: { [key: number]: boolean } = {};
  mostrarDropdownMusicas: { [key: number]: boolean } = {};


  primeirasMusicasDasPlaylists: { [key: number]: string } = {};

  musicasDaPlaylist: ListaTracksSpotify = new ListaTracksSpotify();
  musicasDaPlaylistDescobertas: ListaTracksSpotify = new ListaTracksSpotify();
  musicasDasAvaliacoes: ListaTracksSpotify = new ListaTracksSpotify();


  exibirEditButtons: boolean = false;
  isModalOpen: boolean;
  isModalPlaylistOpen: boolean;
  isModalPlaylistExcluirOpen: boolean;
  isModalMusicaExcluirOpen: boolean;
  novoNome: string;
  novaImagemPerfil: File;
  novaImagemBackground: File;

  pageId: string | null;

  novoNomePlaylist: string;

  playlistSelecionada: Playlist | null = null;
  idPlaylistSelecionada: number;
  trackIdSelecionada: string;

  ngOnInit(): void {
    this.usuarioService.getToken();
    this.route.paramMap.subscribe((params) => {
      this.pageId = params.get('id');
      if (this.pageId) {

        this.buscarUsuario(+this.pageId);
        this.buscarPlaylistsPorIdUsuario(+this.pageId);
        this.buscarPlaylistDescobertas(+this.pageId);
        this.buscarAvaliacoesPorIdUsuario(+this.pageId);
        this.buscarMusicasUsuario(+this.pageId);

        this.dadosCompartilhadosService.setPageId(this.pageId);
      }
      console.log('Id da pagina:', this.pageId);
    });
  }

  ngAfterViewInit() {
    this.esconderBotoes();
  }

  esconderBotoes() {
    const idUsuario = this.dadosCompartilhadosService.getIdUsuario();
    if (this.pageId && idUsuario) {
      if (idUsuario != +this.pageId) {
        const botoesPlaylistId = ['dropdown-playlist', 'excluir-musica'];

        botoesPlaylistId.forEach(id => {
          const element = document.getElementById(id);
          if(element){
            element.style.visibility = 'hidden';
          }
        })

      }
    }
  }

  mostrarConteudo(opcao: string): void {
    this.conteudoSelecionado = opcao;
  }

  buscarUsuario(idUsuario: number): void {
    this.usuarioService.buscarUsuarioPorId(idUsuario).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        console.log('Usuario buscado:', usuario);
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    );
  }

  formatarData(data: String) {
    return data.replace(/-/g, '/');
  }

  buscarPlaylistsPorIdUsuario(idUsuario: number): void {
    this.playListService.buscarPlaylistsPorIdUsuario(idUsuario).subscribe(
      (data: Playlist[]) => {
        this.playlistsDoUsuario = data;
        this.playlistsDoUsuario.forEach((playlist) => {
          this.buscarTodasMusicasDaPlaylist(playlist.id);
        });
        console.log(data);
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  buscarPlaylistDescobertas(idUsuario: number): void {
    this.playListService
      .buscarPlaylistDescobertasPorIdUsuario(idUsuario)
      .subscribe(
        (data: Playlist) => {
          this.playlistDescobertas = data;
          this.buscarTodasMusicasDaPlaylistDescobertas(idUsuario);
          console.log(data);
        },
        (error) => {
          console.error(
            'Ocorreu um erro ao buscar as musicas de descobertas:',
            error
          );
        }
      );
  }

  buscarAvaliacoesPorIdUsuario(idUsuario: number): void {
    this.avaliacaoService.buscarAvaliacoesPorIdUsuario(idUsuario).subscribe(
        (data: Avaliacao[]) => {
          this.avaliacoes = data;
        },
        (error) => {
          console.error(
            'Ocorreu um erro ao buscar as musicas de descobertas:',
            error
          );
        }
      );
  }

  buscarMusicasUsuario(idUsuario: number): void {
    this.avaliacaoService.buscarMusicasUsuario(idUsuario).subscribe(
        (data: ListaTracksSpotify) => {
          this.musicasAvaliadas = data;
          console.log("musicas avaliadas: " + this.musicasAvaliadas)
        },
        (error) => {
          console.error(
            'Ocorreu um erro ao buscar as musicas de descobertas:',
            error
          );
        }
      );
  }

  buscarTodasMusicasDaPlaylist(id: number): void {
    this.playListService.buscarTodasMusicasDaPlaylist(id).subscribe(
      (data: ListaTracksSpotify) => {
        if (data.tracks && data.tracks.length > 0) {
          const primeiraMusica = data.tracks[0];
          const imageUrl =
            primeiraMusica.album.images.length > 0
              ? primeiraMusica.album.images[0].url
              : '';
          this.primeirasMusicasDasPlaylists[id] = imageUrl;
        }
        this.musicasDaPlaylist = data;
        this.idPlaylistSelecionada = id;
      },
      (error) => {
        console.error(
          'Ocorreu um erro ao buscar o as músicas do álbum:',
          error
        );
      }
    );
  }

  buscarTodasMusicasDaPlaylistDescobertas(usuarioId: number): void {
    this.playListService
      .buscarTodasMusicasDaPlaylistDescobertas(usuarioId)
      .subscribe(
        (data: ListaTracksSpotify) => {
          if (data.tracks && data.tracks.length > 0) {
            const primeiraMusica = data.tracks[0];
            const imageUrl =
              primeiraMusica.album.images.length > 0
                ? primeiraMusica.album.images[0].url
                : '';
            //this.primeirasMusicasDasPlaylists[id] = imageUrl;
          }
          this.musicasDaPlaylistDescobertas = data;
        },
        (error) => {
          console.error(
            'Ocorreu um erro ao buscar o as músicas do álbum:',
            error
          );
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

  toggleDropdownMusica(index: number, event: Event): void {
    event.stopPropagation();
    // Fechar todos os dropdowns antes de abrir o atual
    this.mostrarDropdownMusicas = {};
    // Abrir o dropdown da música clicada
    this.mostrarDropdownMusicas[index] = true;
  }

  fecharTodosDropdowns(): void {
    this.playlistsDoUsuario.forEach((playlist) => {
      this.mostrarDropdown[playlist.id] = false;
    });
  }

  editarNome(): void {
    this.isModalOpen = true;
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.isModalPlaylistOpen = false;
    this.isModalPlaylistExcluirOpen = false;
    this.isModalMusicaExcluirOpen = false;
    this.novoNomePlaylist = '';
  }

  editarNomePlaylistModal(playlist: Playlist, event: Event) {
    event.stopPropagation();
    this.playlistSelecionada = playlist;
    this.novoNomePlaylist = playlist.nome;
    this.isModalPlaylistOpen = true;
  }

  excluirPlaylistModal(playlist: Playlist, event: Event) {
    event.stopPropagation();
    this.playlistSelecionada = playlist;
    this.isModalPlaylistExcluirOpen = true;
  }

  excluirMusicaModal(trackId: string, event: Event) {
    event.stopPropagation();
    this.trackIdSelecionada = trackId;
    this.isModalMusicaExcluirOpen = true;
  }

  excluirMusicaPlaylist() {
    let idPlaylist: number = this.idPlaylistSelecionada;
    let id_spotify: string = this.trackIdSelecionada;
    console.log("Id da playlist: " + idPlaylist + "id da musica: " + id_spotify)

    this.playListService.excluirMusicaPlaylist(idPlaylist, id_spotify).subscribe({
      next: (response) => {
        console.log(response);
        // Adicione a lógica para remover a música da lista localmente, se necessário
      },
      error: (error) => {
        console.error('Erro ao excluir música:', error);
      }
    });
  }

  salvarNome(): void {
    if (this.novoNome) {
      this.usuarioService.atualizarUsuario(this.novoNome).subscribe(
        (response) => {
          this.usuario.nome = this.novoNome;
          this.fecharModal();
          this.alertaService.exibirAlerta('alert17');
          console.log('Nome atualizado com sucesso');
        },
        (error) => {
          this.alertaService.exibirAlerta('alert18');
          console.error('Erro ao atualizar nome:', error);
        }
      );
    } else {
      this.alertaService.exibirAlerta('alert18');
      console.error('Novo nome não fornecido');
    }
  }

  salvarNomePlaylist(): void {
    if (this.playlistSelecionada) {
      this.playlistSelecionada.nome = this.novoNomePlaylist;
      this.playListService.atualizarPlaylist(this.playlistSelecionada).subscribe(
        (response) => {
          this.fecharModal();
          console.log('Nome da playlist atualizado com sucesso');
          this.alertaService.exibirAlerta('alert17');
        },
        (error) => {
          this.alertaService.exibirAlerta('alert18');
          console.error('Erro ao atualizar nome da playlist:', error);
        }
      );
    } else {
      this.alertaService.exibirAlerta('alert18');
      console.error('Playlist ou propriedade nome está indefinida');
    }
  }

  excluirPlaylist(): void {
    if(this.playlistSelecionada) {
      this.playListService.excluirPlaylist(this.playlistSelecionada.id).subscribe(
        (response) => {
          this.fecharModal();
          this.alertaService.exibirAlerta('playlistExcluirSucesso');
          console.log('Playlist excluida com sucesso');
        },
        (error) => {
          this.alertaService.exibirAlerta('playlistExcluirErro');
          console.error('Erro ao excluir playlist:', error);
        }
      );
    } else {
      this.alertaService.exibirAlerta('playlistExcluirErro');
      console.error('Playlist está indefinida');
    }
  }

  alterarImagem(tipo: string): void {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if(validTypes.includes(file.type)){
          if (tipo === 'perfil') {
            this.novaImagemPerfil = file;
            this.previsualizarImagem('perfil', file);
          } else if (tipo === 'background') {
            this.novaImagemBackground = file;
            this.previsualizarImagem('background', file);
          }
        } else {
          this.alertaService.exibirAlerta('alertaImgErro');
        }
      } else {
        this.alertaService.exibirAlerta('alertaImgErro2');
      }
    });
    inputElement.click();
  }

  previsualizarImagem(tipo: string, file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (tipo === 'perfil') {
        this.imagemPerfil = e.target.result;
        this.atualizarImagemPerfil();
      } else if (tipo === 'background') {
        this.imagemBackground = e.target.result;
        this.atualizarImagemBackground();
      }
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  atualizarImagemPerfil(): void {
    if (this.novaImagemPerfil) {
      this.usuarioService
        .atualizarUsuario(undefined, this.novaImagemPerfil, undefined)
        .subscribe(
          (response) => {
            this.alertaService.exibirAlerta('alertaImg');
            console.log('Imagem alterada com sucesso');
          },
          (error) => {
            this.alertaService.exibirAlerta('alertaImgErro2');
            console.error('Erro ao atualizar imagem:', error);
          }
        );
    }
  }

  atualizarImagemBackground(): void {
    if (this.novaImagemBackground) {
      this.usuarioService
        .atualizarUsuario(undefined, undefined, this.novaImagemBackground)
        .subscribe(
          (response) => {
            console.log('Imagem alterada com sucesso');
          },
          (error) => {
            console.error('Erro ao atualizar imagem:', error);
          }
        );
    }
  }
}
