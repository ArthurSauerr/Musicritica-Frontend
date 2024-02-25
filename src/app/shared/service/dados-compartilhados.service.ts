import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosCompartilhadosService {

  constructor() { }

  private idAlbumParaProcurar: string;

   setIdAlbumParaProcurar(id: string) {
    this.idAlbumParaProcurar = id;
  }

  getIdAlbumParaProcurar(): string {
    return this.idAlbumParaProcurar;
  }


  private musicaProcuradaSource = new BehaviorSubject<string>('');
  musicaProcurada = this.musicaProcuradaSource.asObservable();

  setMusicaProcurada(musicaProcurada: string): void {
    this.musicaProcuradaSource.next(musicaProcurada);
  }
}
