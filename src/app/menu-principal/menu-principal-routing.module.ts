import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';

const routes: Routes = [
  {path: "", component: MusicasListagemComponent},
  {path: "detalhes", component: MusicaDetalhesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
