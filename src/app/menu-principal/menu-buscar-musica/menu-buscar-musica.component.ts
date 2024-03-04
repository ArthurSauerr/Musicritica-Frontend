import { Router } from '@angular/router';
import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { MenuPrincipalService } from './../../shared/service/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/model/Item';
import { SpotifySearchResponse } from 'src/app/shared/model/SpotifySearchResponse';

@Component({
  selector: 'app-menu-buscar-musica',
  templateUrl: './menu-buscar-musica.component.html',
  styleUrls: ['./menu-buscar-musica.component.scss']
})
export class MenuBuscarMusicaComponent implements OnInit {

  constructor(private router: Router, private menuPrincipalService: MenuPrincipalService, private dadosCompartilhadosService: DadosCompartilhadosService) { }

  musicaProcurada: string = '';
  musicas: Item[] = [];

  ngOnInit(): void {
    this.dadosCompartilhadosService.musicaProcurada.subscribe(musicaProcurada => {
      if (musicaProcurada) {
        this.musicaProcurada = musicaProcurada;
        this.buscarMusica();
      }
    });
  }

  buscarMusica(): void {
    this.menuPrincipalService.buscarMusica(this.musicaProcurada).subscribe(
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

  avancar(musica: Item): void {
    this.router.navigate(['/detalhes'], { state: { musica: musica } });
  }

}
