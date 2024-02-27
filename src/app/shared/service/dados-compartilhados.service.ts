import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosCompartilhadosService {

  constructor() { }

  private idAlbumParaProcurar: string;
  private idMusicaKey = 'idMusicaSpotify';

   setIdAlbumParaProcurar(id: string) {
    this.idAlbumParaProcurar = id;
  }

  getIdAlbumParaProcurar(): string {
    return this.idAlbumParaProcurar;
  }

  setIdMusica(id: string) {
    localStorage.setItem(this.idMusicaKey, id); // Salvando o ID no localStorage
  }

  getIdMusica(): string | null {
    const id = localStorage.getItem(this.idMusicaKey); // Obtendo o ID do localStorage
    return id !== null ? id : null; // Retorna o ID se não for nulo
  }


  private musicaProcuradaSource = new BehaviorSubject<string>('');
  musicaProcurada = this.musicaProcuradaSource.asObservable();

  setMusicaProcurada(musicaProcurada: string): void {
    this.musicaProcuradaSource.next(musicaProcurada);
  }
}
