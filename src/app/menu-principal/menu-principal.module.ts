import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { FormsModule } from '@angular/forms';
import { MusicaDetalhesComponent } from './musica-detalhes/musica-detalhes.component';


@NgModule({
  declarations: [
    MusicasListagemComponent,
    MusicaDetalhesComponent
  ],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    FormsModule
  ]
})
export class MenuPrincipalModule { }
