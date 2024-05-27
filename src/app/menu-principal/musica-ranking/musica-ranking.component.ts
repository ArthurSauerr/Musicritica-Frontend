import { Component, OnInit } from '@angular/core';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-musica-ranking',
  templateUrl: './musica-ranking.component.html',
  styleUrls: ['./musica-ranking.component.scss']
})
export class MusicaRankingComponent implements OnInit {

  rating: number = 0;
  stars: number[] = [1]; 

  rate(stars: number) {
    this.rating = stars;
  }

  constructor(private alertaService: AlertaServiceService) { }

  sucessoAdicionarMusicaNaPlaylist(): void {
    this.alertaService.exibirAlerta('alert2'); 
  }
  erroAdicionarNaPlaylist(): void {
    this.alertaService.exibirAlerta('alert1'); 
  }

  ngOnInit(): void {
  }
}
