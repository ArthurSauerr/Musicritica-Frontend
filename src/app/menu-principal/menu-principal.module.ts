import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MusicasListagemComponent } from './musicas-listagem/musicas-listagem.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MusicasListagemComponent
  ],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    FormsModule
  ]
})
export class MenuPrincipalModule { }
