import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { Item } from './../../shared/model/Item';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicaSearch } from 'src/app/shared/model/MusicaSearch';
import { LastFmMusica } from 'src/app/shared/model/LastFmMusica';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpotifySearchResponse } from 'src/app/shared/model/SpotifySearchResponse';

@Component({
  selector: 'app-musica-detalhes',
  templateUrl: './musica-detalhes.component.html',
  styleUrls: ['./musica-detalhes.component.scss']
})
export class MusicaDetalhesComponent implements OnInit {


  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private menuPrincipalService: MenuPrincipalService, private dadosCompartilhadosService: DadosCompartilhadosService) { }

  artista: string;
  musica: Item;

  idMusica: string;

  nomeMusica: string;
  nomeArtista: string;
  musicaEartista: string;
  idMusicaSpotify: string;
  track: SpotifySearchResponse;


  ngOnInit(): void {
    this.musica = history.state.musica;
    this.artista = this.musica.album.artists[0].name;
    console.log('música:', this.artista);
    this.buscarMusica()

  }

  buscarMusica() {
    const idMusica = this.dadosCompartilhadosService.getIdMusica();
    if (idMusica !== null) {
      this.idMusica = idMusica;
      this.buscarIdMusica();


      this.getSpotifyEmbedUrl(this.musica.id);

      console.log("ID PORRA: " + this.musica.id);
    } else {
      console.log("O ID da música não foi encontrado no cache.");

      this.getSpotifyEmbedUrl(this.idMusica);
      console.log("ID PORRA: " + this.idMusica);
    }
  }


  getSpotifyEmbedUrl(idMusica: string | null): SafeResourceUrl {
    if (idMusica) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${idMusica}?utm_source=generator&theme=0`);
    } else {
      return '';
    }
  }

  buscarIdMusica(): void {

    this.nomeMusica = this.musica.name
    this.nomeArtista = this.musica.album.artists[0].name;

    this.musicaEartista = this.nomeMusica + this.nomeArtista;


    this.menuPrincipalService.buscarMusica(this.musicaEartista).subscribe(
      (data: SpotifySearchResponse) => {
        console.log(data);
        this.idMusicaSpotify = data.tracks.items[0].id;
        console.log("idddddddddd :" + this.idMusicaSpotify);
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }
}
