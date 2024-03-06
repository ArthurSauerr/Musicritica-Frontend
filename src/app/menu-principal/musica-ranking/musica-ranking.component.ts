import { DadosCompartilhadosService } from './../../shared/service/dados-compartilhados.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-musica-ranking',
  templateUrl: './musica-ranking.component.html',
  styleUrls: ['./musica-ranking.component.scss']
})
export class MusicaRankingComponent implements OnInit {


  constructor(private dadosCompartilhadosService: DadosCompartilhadosService) { }

  musicId: String;

  ngOnInit(): void {

    this.musicId = this.dadosCompartilhadosService.getIdAlbumParaProcurar();
    console.log('ID da música obtido:', this.musicId);

  }

}
