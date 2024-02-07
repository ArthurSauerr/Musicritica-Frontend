import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';


@NgModule({
  declarations: [
    MusicasListagemComponent
  ],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule
  ]
})
export class MenuPrincipalModule { }
