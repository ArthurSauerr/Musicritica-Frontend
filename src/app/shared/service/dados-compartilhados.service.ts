import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosCompartilhadosService {

  constructor() { }

  private idAlbumParaProcurar: string;
  private idMusicaKey = 'idMusicaSpotify';

  private pageIdSource = new BehaviorSubject<string | null>(null);
  pageId$ = this.pageIdSource.asObservable();

  setPageId(pageId: string | null): void {
    this.pageIdSource.next(pageId);
  }

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
    const id = localStorage.getItem(this.idMusicaKey);
    return id !== null ? id : null;
  }


  private musicaProcuradaSource = new BehaviorSubject<string>('');
  musicaProcurada = this.musicaProcuradaSource.asObservable();

  setMusicaProcurada(musicaProcurada: string): void {
    this.musicaProcuradaSource.next(musicaProcurada);
  }
}
