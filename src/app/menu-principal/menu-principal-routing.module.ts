import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';

const routes: Routes = [
  {path: "menu", component: MusicasListagemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
