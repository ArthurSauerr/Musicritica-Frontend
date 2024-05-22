import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/model/Item';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-recomendacoes',
  standalone: true,
  imports: [],
  templateUrl: './recomendacoes.component.html',
  styleUrl: './recomendacoes.component.scss'
})
export class RecomendacoesComponent implements OnInit {
  constructor (private router: Router, private spotifyService: MenuPrincipalService) {}

  topCharts: Item[] = [];
  topChartsYoutube: Item[] = [];
  cachedImages: { [url: string]: HTMLImageElement } = {};


  customOptions: OwlOptions = {
    loop: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000, 
    autoplaySpeed: 600, 
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: false
  };

  customOptions2: OwlOptions = {
    loop: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000, 
    autoplaySpeed: 600, 
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 5
      }
    },
    nav: false
  };

  ngOnInit(): void {
    
   
  }

  

  getTopChartsYoutube(): void {
    this.spotifyService.getTopChartsYoutube().subscribe(
      (data: any[]) => {
        console.log(data);
        this.topChartsYoutube = data.flatMap(response => response.tracks.items);
        console.log(this.topChartsYoutube);
        sessionStorage.setItem('topChartsYoutube', JSON.stringify(this.topChartsYoutube));
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
