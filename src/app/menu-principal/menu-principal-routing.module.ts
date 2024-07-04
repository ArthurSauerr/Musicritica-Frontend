import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';
import { MusicaDescobrirComponent } from './musica-descobrir/musica-descobrir.component';
import { MenuBuscarMusicaComponent } from './menu-buscar-musica/menu-buscar-musica.component';
import { RecomendacoesComponent } from './recomendacoes/recomendacoes.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';

const routes: Routes = [
  {path: "", component: MusicasListagemComponent},
  {path: "buscar", component: MenuBuscarMusicaComponent},
  {path: "descobrir", component: MusicaDescobrirComponent},
  {path: "detalhes", component: MusicaDetalhesComponent},
  {path: "recomendacoes", component: RecomendacoesComponent},
  {path: "politica-privacidade", component: PoliticaPrivacidadeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
