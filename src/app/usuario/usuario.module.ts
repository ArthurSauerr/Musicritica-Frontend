import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { FormsModule } from '@angular/forms';
import { UsuarioRegistrarComponent } from './usuario-registrar/usuario-registrar.component';
import { UsuarioEsqueceuSenhaComponent } from './usuario-esqueceu-senha/usuario-esqueceu-senha.component';


@NgModule({
  declarations: [
    UsuarioLoginComponent,
    UsuarioRegistrarComponent,
    UsuarioEsqueceuSenhaComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule
  ]
})
export class UsuarioModule { }
