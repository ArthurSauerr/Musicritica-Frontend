import { Component, OnInit } from '@angular/core';

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

  
  constructor() { }

  ngOnInit(): void {
  }
}
