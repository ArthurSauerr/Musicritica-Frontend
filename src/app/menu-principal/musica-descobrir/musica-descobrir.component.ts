
import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { AlbumDescobrir } from './../../shared/model/AlbumDescobrir';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Component, OnInit, HostListener, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { TrackData } from 'src/app/shared/model/TrackData';
import { AlbumBuscado } from 'src/app/shared/model/AlbumBuscado';
import { SpotifySearchResponse } from 'src/app/shared/model/SpotifySearchResponse';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery'

@Component({
  selector: 'app-musica-descobrir',
  templateUrl: './musica-descobrir.component.html',
  styleUrls: ['./musica-descobrir.component.scss']
})
export class MusicaDescobrirComponent implements OnInit {

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer, private spotifyService: MenuPrincipalService, private dadosCompartilhadosService: DadosCompartilhadosService) { }

  isClicked: boolean = false;
  album: AlbumDescobrir;
  idAlbum: string;
  mostrarDiv = false;
  albumBuscado: AlbumBuscado;
  idMusicaSpotify: string | null = null;
  nomeArtista: string | null = null;
  musicaEartista: string | null = null;
  generoPrimario: string;
  generoSecundario: string;

  ngOnInit(): void {

    $(document).ready(function(){
      $(window).scroll(function() {
          $('.box').each(function() {
              var offset = $(this).offset();
              if (offset) {
                  var position: number = offset.top;
                  var scrollPosition: any = $(window).scrollTop();
                  var windowHeight: any = $(window).height();

                  if (position < scrollPosition + windowHeight) {
                      $(this).addClass('animate__animated animate__fadeInUp');
                      $(this).css('opacity', '1');
                  }
              }
          });
      });
  });
  }

  getSpotifyEmbedUrl(idMusica: string | null): SafeResourceUrl {
    if (idMusica) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${idMusica}?utm_source=generator`);
    } else {
      return '';
    }
  }

  @ViewChild('animatedElement') animatedElement: ElementRef;
  isVisible: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    const scrollPosition = window.pageYOffset;
    const elementPosition = this.animatedElement.nativeElement.offsetTop;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight > elementPosition) {
      this.renderer.addClass(this.animatedElement.nativeElement, 'active');
    }
  }


  selecionarGenero(genero: string): void {
    if (!this.generoPrimario) {
      this.generoPrimario = genero;
    } else if (!this.generoSecundario) {
      this.generoSecundario = genero;
    } else {
    }
  }

  descobriMusica(): void {
    console.log("genero 1: " + this.generoPrimario)
    console.log("genero 2: " + this.generoSecundario)

    this.spotifyService.getRecommendation(this.generoPrimario, this.generoSecundario).subscribe(
      (data: TrackData) => {
        console.log(data);
        const musicId = data.tracks[0].album.id;
        this.dadosCompartilhadosService.setIdAlbumParaProcurar(musicId);

        this.buscarAlbum();
      },
      (error) => {
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
      },
      (error) => {
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
}

