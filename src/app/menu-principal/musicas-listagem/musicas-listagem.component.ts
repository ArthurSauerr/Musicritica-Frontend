import { SpotifySearchResponse } from './../../shared/model/SpotifySearchResponse';
import { Component, Input, OnInit } from '@angular/core';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Item } from 'src/app/shared/model/Item';
import { Router } from '@angular/router';
import { Image } from 'src/app/shared/model/Image';

@Component({
  selector: 'app-musicas-listagem',
  templateUrl: './musicas-listagem.component.html',
  styleUrls: ['./musicas-listagem.component.scss']


})


export class MusicasListagemComponent implements OnInit {

  constructor(private router: Router, private spotifyService: MenuPrincipalService) { }

  topCharts: Item[] = [];

  url1: string;
  url2: string;
  url3: string;
  url4: string;
  url5: string;

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('topCharts');
    //const today = new Date();
    //const dayOfWeek = today.getDay();

    if (storedData) {
      this.topCharts = JSON.parse(storedData);
    } else {
      this.getTopCharts();
    }


  }

  getTopCharts(): void {
    this.spotifyService.getTopCharts().subscribe(
      (data: any[]) => {
        console.log(data);
        this.topCharts = data.flatMap(response => response.tracks.items);
        console.log(this.topCharts);
        sessionStorage.setItem('topCharts', JSON.stringify(this.topCharts));
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }




  getItemPreDefinidos(): Item[] {
    return [];
  }

  avancar(musica: Item): void {
    this.router.navigate(['/detalhes'], { state: { musica: musica } });
  }
}
