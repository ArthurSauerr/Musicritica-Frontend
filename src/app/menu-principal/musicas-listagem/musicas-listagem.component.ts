import { SpotifySearchResponse } from './../../shared/model/SpotifySearchResponse';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { Item } from 'src/app/shared/model/Item';
import { Router } from '@angular/router';
import { Image } from 'src/app/shared/model/Image';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-musicas-listagem',
  templateUrl: './musicas-listagem.component.html',
  styleUrls: ['./musicas-listagem.component.scss']

})

export class MusicasListagemComponent implements OnInit {

  constructor(private router: Router, private spotifyService: MenuPrincipalService) { }

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


  

  ngOnInit(): void {
    
    const storedData = sessionStorage.getItem('topCharts');
    const storedDataYoutube = sessionStorage.getItem('topChartsYoutube');

    //const today = new Date();
    //const dayOfWeek = today.getDay();

    if (storedData && storedDataYoutube) {
      this.topCharts = JSON.parse(storedData);
      this.topChartsYoutube = JSON.parse(storedDataYoutube);

    } else {
      this.getTopCharts();
      this.getTopChartsYoutube();
    }

    const cachedImages = sessionStorage.getItem('cachedImages');
    if (cachedImages) {
      this.cachedImages = JSON.parse(cachedImages);
    }
  }

  onCarouselInitialized(): void {
    const owlElement = document.querySelector('.owl-carousel');
    if (owlElement) {
      const slides = owlElement.querySelectorAll('.owl-item');
      slides.forEach((slide: Element) => {
        const slideHTMLElement = slide as HTMLElement;
        slideHTMLElement.style.marginLeft = '0';
        slideHTMLElement.style.marginRight = '0';
      });
    }
  }

  cacheImages(): void {
    const imagesToCache = document.querySelectorAll('.owl-item img');
    imagesToCache.forEach((element: Element) => {
      const img = element as HTMLImageElement;
      const imgUrl = img.src;
      if (!this.cachedImages[imgUrl]) {
        const cachedImage = new Image();
        cachedImage.src = imgUrl;
        this.cachedImages[imgUrl] = cachedImage;
      }
    });
    sessionStorage.setItem('cachedImages', JSON.stringify(this.cachedImages));
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
