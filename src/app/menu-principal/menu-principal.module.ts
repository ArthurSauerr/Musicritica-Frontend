import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { FormsModule } from '@angular/forms';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';
import { MusicaDescobrirComponent } from './musica-descobrir/musica-descobrir.component';
import { MenuBuscarMusicaComponent } from './menu-buscar-musica/menu-buscar-musica.component';
import { DatePipe } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon'; 
import { ChartModule } from 'primeng/chart';
import { RecomendacoesComponent } from './recomendacoes/recomendacoes.component';
import { AlertaComponentComponent } from './alerta-component/alerta-component.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';

@NgModule({
  declarations: [
    MusicasListagemComponent,
    MusicaDetalhesComponent,
    MusicaDescobrirComponent,
    MenuBuscarMusicaComponent,
    RecomendacoesComponent,
    AlertaComponentComponent,
    PoliticaPrivacidadeComponent
  ],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    FormsModule,
    DatePipe,
    CarouselModule,
    MatSliderModule,
    MatIconModule,
    ChartModule
  ]
})
export class MenuPrincipalModule { }
