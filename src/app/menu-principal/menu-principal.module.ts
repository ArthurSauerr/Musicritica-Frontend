import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { FormsModule } from '@angular/forms';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';
import { MusicaDescobrirComponent } from './musica-descobrir/musica-descobrir.component';
import { MusicaRankingComponent } from './musica-ranking/musica-ranking.component';
import { MenuBuscarMusicaComponent } from './menu-buscar-musica/menu-buscar-musica.component';

@NgModule({
  declarations: [
    MusicasListagemComponent,
    MusicaDetalhesComponent,
    MusicaDescobrirComponent,
    MusicaRankingComponent,
    MenuBuscarMusicaComponent,

  ],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    FormsModule,
  ]
})
export class MenuPrincipalModule { }
