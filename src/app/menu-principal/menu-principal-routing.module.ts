import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';
import { MusicaRankingComponent } from './musica-ranking/musica-ranking.component';
import { MusicaDescobrirComponent } from './musica-descobrir/musica-descobrir.component';
import { MenuBuscarMusicaComponent } from './menu-buscar-musica/menu-buscar-musica.component';
import { AdmDenunciaComponent } from './adm-denuncia/adm-denuncia.component';


const routes: Routes = [
  {path: "", component: MusicasListagemComponent},
  {path: "buscar", component: MenuBuscarMusicaComponent},
  {path: "ranking", component: MusicaRankingComponent},
  {path: "descobrir", component: MusicaDescobrirComponent},
  {path: "detalhes", component: MusicaDetalhesComponent},
  {path: "denuncia", component: AdmDenunciaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
