import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ItemBuscado } from 'src/app/shared/model/ItemBuscado';
import { interval } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Item } from 'src/app/shared/model/Item';

@Component({
  selector: 'app-recomendacoes',
  templateUrl: './recomendacoes.component.html',
  styleUrls: ['./recomendacoes.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      state('enter', style({
        opacity: 1,
        transform: 'translateX(0%)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.3s ease-out')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ])
    ])
  ]
})
export class RecomendacoesComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private spotifyService: MenuPrincipalService) { }

  itensRecomendadosGenero1: ItemBuscado[] = [];
  itensRecomendadosGenero2: ItemBuscado[] = [];
  itensRecomendadosGenero3: ItemBuscado[] = [];

  musicaParaNavegar: Item[] = [];

  genero1: string = '';
  genero2: string = '';
  genero3: string = '';

  private intervalId: any;
  private readonly duration = 24 * 60 * 60;

  currentIndexPlaylist1 = 0;
  currentIndexPlaylist2 = 0;
  currentIndexPlaylist3 = 0;

  currentSection1 = 1;
  currentSection2 = 1;
  currentSection3 = 1;

  generosBrasileiros: string[] = [
    "bossanova",
    "brazil",
    "forro",
    "mpb",
    "pagode",
    "samba",
    "sertanejo"
  ];

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

  moveCarousel(type: string, direction: number): void {
    const step = 5;

    if (type === 'currentIndexPlaylist1') {
      this.currentIndexPlaylist1 = this.calculateNewIndex(this.currentIndexPlaylist1, direction, this.itensRecomendadosGenero1.length, step);
    } else if (type === 'currentIndexPlaylist2') {
      this.currentIndexPlaylist2 = this.calculateNewIndex(this.currentIndexPlaylist2, direction, this.itensRecomendadosGenero2.length, step);
    } else if (type === 'currentIndexPlaylist3') {
      this.currentIndexPlaylist3 = this.calculateNewIndex(this.currentIndexPlaylist3, direction, this.itensRecomendadosGenero3.length, step);
    }

    this.updateCurrentSection();
  }


  private calculateNewIndex(currentIndex: number, direction: number, length: number, step: number): number {
    let newIndex = currentIndex + (direction * step);

    if (newIndex < 0) {
      newIndex = length - Math.abs(newIndex);
    } else {
      newIndex = newIndex % length;
    }

    return newIndex;
  }


  updateCurrentSection(): void {
    if (this.currentIndexPlaylist1 < 5) {
      this.currentSection1 = 1;
    } else if (this.currentIndexPlaylist1 >= 5 && this.currentIndexPlaylist1 < 10) {
      this.currentSection1 = 2;
    }
    if (this.currentIndexPlaylist2 < 5) {
      this.currentSection2 = 1;
    } else if (this.currentIndexPlaylist2 >= 5 && this.currentIndexPlaylist2 < 10) {
      this.currentSection2 = 2;
    }
    if (this.currentIndexPlaylist3 < 5) {
      this.currentSection3 = 1;
    } else if (this.currentIndexPlaylist3 >= 5 && this.currentIndexPlaylist3 < 10) {
      this.currentSection3 = 2;
    }
  }


  animationStarted(event: any): void {
    console.log('Animação iniciada:', event);
  }

  animationDone(event: any): void {
    console.log('Animação concluída:', event);
  }


  ngOnInit(): void {

    this.carregarGenerosDoLocalStorage();

    console.log(this.genero1, this.genero2, this.genero3)

    this.startCountdownFromLastTimestamp();

    if (this.loadFromCache()) {
      console.log("Dados carregados do cache");
    } else {
      this.atualizarRecomendacoes();
    }

    //10000
    //86400000
    interval(86400000).subscribe(() => {
      this.atualizarRecomendacoes();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdownFromLastTimestamp(): void {
    const timestamp = localStorage.getItem('cacheTimestamp');
    if (timestamp) {
      const currentTime = new Date().getTime();
      const cacheTime = parseInt(timestamp, 10);
      const elapsedTime = Math.floor((currentTime - cacheTime) / 1000);
      const timeRemaining = this.duration - elapsedTime;

      if (timeRemaining > 0) {
        this.startCountdown(timeRemaining);
      } else {
        this.startCountdown(this.duration);
      }
    } else {
      this.startCountdown(this.duration);
    }
  }

  startCountdown(timeRemaining: number): void {
    this.updateTimerDisplay(timeRemaining);

    this.intervalId = setInterval(() => {
      timeRemaining--;

      this.updateTimerDisplay(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  updateTimerDisplay(timeRemaining: number): void {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (hoursElement) {
      hoursElement.innerText = this.formatTimeUnit(hours);
    }
    if (minutesElement) {
      minutesElement.innerText = this.formatTimeUnit(minutes);
    }
    if (secondsElement) {
      secondsElement.innerText = this.formatTimeUnit(seconds);
    }
  }

  formatTimeUnit(unit: number): string {
    return unit < 10 ? `0${unit}` : unit.toString();
  }

  atualizarRecomendacoes(): void {
    const [genero1, genero2, genero3] = this.sortearGeneros(this.generosBrasileiros);
    this.genero1 = genero1;
    this.genero2 = genero2;
    this.genero3 = genero3;

    this.salvarGenerosNoLocalStorage();

    console.log("Genero 1: " + this.genero1);
    console.log("Genero 2: " + this.genero2);
    console.log("Genero 3: " + this.genero3);

    this.getItemsPlaylistRecomendacao1(this.genero1);
    this.getItemsPlaylistRecomendacao2(this.genero2);
    this.getItemsPlaylistRecomendacao3(this.genero3);
  }

  salvarGenerosNoLocalStorage(): void {
    localStorage.setItem('genero1', this.genero1);
    localStorage.setItem('genero2', this.genero2);
    localStorage.setItem('genero3', this.genero3);
  }

  carregarGenerosDoLocalStorage(): void {
    const genero1 = localStorage.getItem('genero1');
    const genero2 = localStorage.getItem('genero2');
    const genero3 = localStorage.getItem('genero3');

    if (genero1 && genero2 && genero3) {
      this.genero1 = genero1;
      this.genero2 = genero2;
      this.genero3 = genero3;
    } else {
      this.atualizarRecomendacoes();
    }
  }

  sortearGeneros(array: string[]): [string, string, string] {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    const uniqueGenres = Array.from(new Set(shuffled)).slice(0, 3);
    return [uniqueGenres[0], uniqueGenres[1], uniqueGenres[2]];
  }

  getItemsPlaylistRecomendacao1(genero: string) {
    this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data);
        this.itensRecomendadosGenero1 = data;
        this.saveToCache();
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  getItemsPlaylistRecomendacao2(genero: string) {
    this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data);
        this.itensRecomendadosGenero2 = data;
        this.saveToCache();
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  getItemsPlaylistRecomendacao3(genero: string) {
    this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data);
        this.itensRecomendadosGenero3 = data;
        this.saveToCache();
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  saveToCache() {
    const timestamp = new Date().getTime();
    localStorage.setItem('itensRecomendadosGenero1', JSON.stringify(this.itensRecomendadosGenero1));
    localStorage.setItem('itensRecomendadosGenero2', JSON.stringify(this.itensRecomendadosGenero2));
    localStorage.setItem('itensRecomendadosGenero3', JSON.stringify(this.itensRecomendadosGenero3));
    localStorage.setItem('cacheTimestamp', timestamp.toString());
  }

  loadFromCache(): boolean {
    const timestamp = localStorage.getItem('cacheTimestamp');
    if (timestamp) {
      const currentTime = new Date().getTime();
      const cacheTime = parseInt(timestamp, 10);
      const hours = (currentTime - cacheTime) / (1000 * 60 * 60);

      if (hours < 24) {
        const itensRecomendadosGenero1 = localStorage.getItem('itensRecomendadosGenero1');
        const itensRecomendadosGenero2 = localStorage.getItem('itensRecomendadosGenero2');
        const itensRecomendadosGenero3 = localStorage.getItem('itensRecomendadosGenero3');

        if (itensRecomendadosGenero1 && itensRecomendadosGenero2 && itensRecomendadosGenero3) {
          this.itensRecomendadosGenero1 = JSON.parse(itensRecomendadosGenero1);
          this.itensRecomendadosGenero2 = JSON.parse(itensRecomendadosGenero2);
          this.itensRecomendadosGenero3 = JSON.parse(itensRecomendadosGenero3);
          return true;
        }
      }
    }
    return false;
  }

  buscarMusicaPorId(id_spotify: string): void {
    this.spotifyService.buscarMusicaPorId(id_spotify).subscribe(
      (data: Item) => {
        this.avancar(data);
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