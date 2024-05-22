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
  constructor (private router: Router, private spotifyService: MenuPrincipalService) {}

  itensRecomendados: ItemBuscado[] = [];
  genero: string = 'mpb';

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
    this.getItemsPlaylistRecomendacao(this.genero);
  }


getItemsPlaylistRecomendacao(genero: string) {
   this.spotifyService.getItemsPlaylistRecomendacao(genero).subscribe(
      (data) => {
        console.log(data)
        this.itensRecomendados = data;
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
