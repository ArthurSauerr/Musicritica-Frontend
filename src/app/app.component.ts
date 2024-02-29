import { DadosCompartilhadosService } from './shared/service/dados-compartilhados.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Musicritica';
  mostrarNavbar: boolean = true;

  constructor(private router: Router, private dadosCompartilhadosService : DadosCompartilhadosService) {
    this.router.events.subscribe((event) => {
      if (this.router.url.includes('/registrar') || this.router.url.includes('/login') || this.router.url.includes('/esqueceu-senha') || this.router.url.includes('/redefinir-senha')) {
        this.mostrarNavbar = false;
      } else {
        this.mostrarNavbar = true;
      }
    });
  }


  musicaProcurada: string = '';


  enviarParametro(): void {
    this.dadosCompartilhadosService.setMusicaProcurada(this.musicaProcurada);
  }
}
