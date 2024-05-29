import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPrincipalService } from 'src/app/shared/service/menu-principal.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ItemBuscado } from 'src/app/shared/model/ItemBuscado';

@Component({
  selector: 'app-recomendacoes',
  templateUrl: './recomendacoes.component.html',
  styleUrl: './recomendacoes.component.scss'
})
export class RecomendacoesComponent implements OnInit {
  constructor(private router: Router, private spotifyService: MenuPrincipalService) { }

  itensRecomendadosGenero1: ItemBuscado[] = [];
  itensRecomendadosGenero2: ItemBuscado[] = [];
  itensRecomendadosGenero3: ItemBuscado[] = [];

  genero1: string = '';
  genero2: string = '';
  genero3: string = '';

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

  ngOnInit(): void {
    const [genero1, genero2, genero3] = this.sortearGeneros(this.generosBrasileiros);
    this.genero1 = genero1;
    this.genero2 = genero2;
    this.genero3 = genero3;

    console.log("Genero 1: " + this.genero1);
    console.log("Genero 1: " + this.genero3);
    console.log("Genero 1: " + this.genero1);

    //this.getItemsPlaylistRecomendacao1(this.genero1);
    //this.getItemsPlaylistRecomendacao2(this.genero2);
    //this.getItemsPlaylistRecomendacao3(this.genero3);
  }

  sortearGeneros(array: string[]): [string, string, string] {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    const uniqueGenres = Array.from(new Set(shuffled)).slice(0, 3);
    return [uniqueGenres[0], uniqueGenres[1], uniqueGenres[2]];
  }
  
  
  getItemsPlaylistRecomendacao1(genero: string) {
    this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data)
        this.itensRecomendadosGenero1 = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }
  getItemsPlaylistRecomendacao2(genero: string) {
    this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data)
        this.itensRecomendadosGenero2 = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }
  getItemsPlaylistRecomendacao3(genero: string) {
    this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data)
        this.itensRecomendadosGenero3 = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as músicas:', error);
      }
    );
  }

  // avancar(musica: Item): void {
  //   this.router.navigate(['/detalhes'], { state: { musica: musica } });
  // }
}
