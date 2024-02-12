import { Item } from './../../shared/model/Item';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicaSearch } from 'src/app/shared/model/MusicaSearch';
import { LastFmMusica } from 'src/app/shared/model/LastFmMusica';

@Component({
  selector: 'app-musica-detalhes',
  templateUrl: './musica-detalhes.component.html',
  styleUrls: ['./musica-detalhes.component.scss']
})
export class MusicaDetalhesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private menuPrincipalService: MenuPrincipalService) { }

  musicaLastFM: LastFmMusica;

  artista: string;

  musica: Item;

  ngOnInit(): void {
    this.musica = history.state.musica;
    this.artista = this.musica.album.artists[0].name;
    console.log('música:', this.artista);
    this.buscarMusica()

    console.log(this.musicaLastFM);
  }

  buscarMusica() {
    this.menuPrincipalService.getInfoMusica(this.artista, this.musica.name).subscribe(
      (data: LastFmMusica) => {
        console.log(data);
        this.musicaLastFM = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }
}
