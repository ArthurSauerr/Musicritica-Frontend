import { DadosCompartilhadosService } from './shared/service/dados-compartilhados.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Musicritica';

  constructor (private dadosCompartilhadosService : DadosCompartilhadosService) { }

  musicaProcurada: string = '';

  enviarParametro(): void {
    this.dadosCompartilhadosService.setMusicaProcurada(this.musicaProcurada);
  }
}
