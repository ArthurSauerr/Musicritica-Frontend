import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { SpotifySearchResponse } from './../../shared/model/SpotifySearchResponse';
import { Component, Input, OnInit } from '@angular/core';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Item } from 'src/app/shared/model/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musicas-listagem',
  templateUrl: './musicas-listagem.component.html',
  styleUrls: ['./musicas-listagem.component.scss']
})
export class MusicasListagemComponent implements OnInit {

  constructor(private router: Router, private spotifyService: MenuPrincipalService, private dadosCompartilhadosService: DadosCompartilhadosService) { }

  musicas: Item[] = [];
  musicaProcurada: string = '';

  ngOnInit(): void {
      this.dadosCompartilhadosService.musicaProcurada.subscribe(musicaProcurada => {
      if (musicaProcurada) {
        this.musicaProcurada = musicaProcurada;
        this.buscarMusica();
      }
    });
  }

  buscarMusica(): void {
    this.spotifyService.buscarMusica(this.musicaProcurada).subscribe(
      (data: SpotifySearchResponse) => {
        console.log(data);
        this.musicas = data.tracks.items;
        console.log(this.musicas);
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }
  avancar(musica : Item): void {
    this.router.navigate(['/detalhes'], { state: { musica: musica } });
  }
}
