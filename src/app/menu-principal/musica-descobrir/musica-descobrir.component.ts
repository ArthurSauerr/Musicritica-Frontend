
import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { AlbumDescobrir } from './../../shared/model/AlbumDescobrir';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Component, OnInit, HostListener, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TrackData } from 'src/app/shared/model/TrackData';
import { AlbumBuscado } from 'src/app/shared/model/AlbumBuscado';
import { SpotifySearchResponse } from 'src/app/shared/model/SpotifySearchResponse';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery'
import { PlaylistService } from 'src/app/shared/service/playlist.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from 'src/app/shared/model/Usuario';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-musica-descobrir',
  templateUrl: './musica-descobrir.component.html',
  styleUrls: ['./musica-descobrir.component.scss']
})
export class MusicaDescobrirComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private spotifyService: MenuPrincipalService,
    private dadosCompartilhadosService: DadosCompartilhadosService,
    private playlistService: PlaylistService,
    private alertaService: AlertaServiceService
  ) { }

  isClicked: boolean = false;
  album: AlbumDescobrir;
  idAlbum: string;
  mostrarDiv = false;
  albumBuscado: AlbumBuscado;
  idMusicaSpotify: string | null = null;
  nomeArtista: string | null = null;
  musicaEartista: string | null = null;
  generoPrimario: string | null;
  generoSecundario: string | null;
  emailParam: string | undefined;
  usuarioLogado: Usuario = new Usuario();

  ngOnInit(): void {

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

  }

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


  getSpotifyEmbedUrl(idMusica: string | null): SafeResourceUrl {
    if (idMusica) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${idMusica}?utm_source=generator`);
    } else {
      return '';
    }
  }

  selecionarGenero(genero: string): void {
    if (this.generoPrimario === genero) {
      this.generoPrimario = null;
    } else if (this.generoSecundario === genero) {
      this.generoSecundario = null;
    } else if (!this.generoPrimario) {
      this.generoPrimario = genero;
    } else if (!this.generoSecundario) {
      this.generoSecundario = genero;
    } else {
      this.generoSecundario = genero;
    }
  }

  descobriMusica(): void {
    console.log("genero 1: " + this.generoPrimario)
    console.log("genero 2: " + this.generoSecundario)

    this.spotifyService.getRecommendation(this.generoPrimario!, this.generoSecundario!).subscribe(
      (data: TrackData) => {
        console.log(data);
        const musicId = data.tracks[0].album.id;
        this.dadosCompartilhadosService.setIdAlbumParaProcurar(musicId);

        this.buscarAlbum();
      },
      (error) => {
        this.alertaService.exibirAlerta('alert18')
        console.error('Ocorreu um erro ao buscar o id do álbum:', error);
      }
    );
  }

  buscarMusica(nomeMusica: string): void {

    nomeMusica = this.albumBuscado.tracks.items[0].name;
    this.nomeArtista = this.albumBuscado.artists[0].name;
    this.musicaEartista = nomeMusica + this.nomeArtista;

    this.spotifyService.buscarMusica(this.musicaEartista).subscribe(

      (data: SpotifySearchResponse) => {
        console.log(data);
        this.idMusicaSpotify = data.tracks.items[0].id;
        console.log("id da primeira musica do album: " + this.albumBuscado.tracks.items[0].id);


        this.enviarMusicaParaDescobertas(this.idMusicaSpotify, this.idMusicaSpotify);
      },
      (error) => {
        this.alertaService.exibirAlerta('alert18')

        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  buscarAlbum(): void {
    this.spotifyService.getAlbum(this.dadosCompartilhadosService.getIdAlbumParaProcurar()).subscribe(
      (data: AlbumBuscado) => {
        console.log("album buscado: " + data);

        this.albumBuscado = data;

        if (data) {
          this.buscarMusica(data.tracks.items[0].id);
        } else {
          console.error('Ocorreu um erro ao buscar a musica');
        }

        this.generoPrimario = "";
        this.generoSecundario = "";

      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o álbum:', error);
      }
    );
  }

  enviarMusicaParaDescobertas(idSpotify: string, idMusicaSpotify: string): void {
    console.log("Id para verificar: " + idMusicaSpotify);

    this.usuarioService.buscarIdPorEmail(this.emailParam).subscribe(
      (idUsuarioAutenticado: number) => {

        console.log("info das musicas descobertas: " + idUsuarioAutenticado, idSpotify, idMusicaSpotify);

        this.playlistService.salvarDescobertas(idUsuarioAutenticado, idSpotify, idMusicaSpotify).subscribe(
          () => {
            console.log('Música enviada para descobertas com sucesso');
            //this.alertaService.exibirAlerta('alert1')
          }, error => {
            console.error('Erro ao salvar uma nova música nas descobertas:', error);
            //this.alertaService.exibirAlerta('alert2')
          });
      }, error => {
        console.error('Usuário não encontrad:', error);
      });
  }
}

