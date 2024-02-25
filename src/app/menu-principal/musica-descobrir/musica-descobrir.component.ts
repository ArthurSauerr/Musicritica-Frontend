import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { AlbumDescobrir } from './../../shared/model/AlbumDescobrir';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { TrackData } from 'src/app/shared/model/TrackData';
import { AlbumBuscado } from 'src/app/shared/model/AlbumBuscado';

@Component({
  selector: 'app-musica-descobrir',
  templateUrl: './musica-descobrir.component.html',
  styleUrls: ['./musica-descobrir.component.scss']
})
export class MusicaDescobrirComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private spotifyService: MenuPrincipalService, private dadosCompartilhadosService: DadosCompartilhadosService) { }

  isClicked: boolean = false;
  album: AlbumDescobrir;
  idAlbum: string;
  albumBuscado: AlbumBuscado;

  generoPrimario: string;
  generoSecundario: string;

  handleClick() {
    this.isClicked = true;
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
  buscarAlbum(): void {
    this.spotifyService.getAlbum(this.dadosCompartilhadosService.getIdAlbumParaProcurar()).subscribe(
      (data: AlbumBuscado) => {
        console.log("album buscado: " + data);
        this.albumBuscado = data;

        this.generoPrimario = "";
        this.generoSecundario = "";

      },
      (error) => {
        console.error('Ocorreu um erro ao buscar o álbum:', error);
      }
    );
  }
}
