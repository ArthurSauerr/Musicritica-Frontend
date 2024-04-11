import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { FormsModule } from '@angular/forms';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';
import { MusicaDescobrirComponent } from './musica-descobrir/musica-descobrir.component';
import { MusicaRankingComponent } from './musica-ranking/musica-ranking.component';
import { MenuBuscarMusicaComponent } from './menu-buscar-musica/menu-buscar-musica.component';
import { DatePipe } from '@angular/common';
import { AdmDenunciaComponent } from './adm-denuncia/adm-denuncia.component';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [
    MusicasListagemComponent,
    MusicaDetalhesComponent,
    MusicaDescobrirComponent,
    MusicaRankingComponent,
    MenuBuscarMusicaComponent,
    AdmDenunciaComponent,

  ],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    FormsModule,
    DatePipe,
    CarouselModule
    
  ]
})
export class MenuPrincipalModule { }
