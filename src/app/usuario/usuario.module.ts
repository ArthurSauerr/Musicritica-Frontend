import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { FormsModule } from '@angular/forms';
import { UsuarioRegistrarComponent } from './usuario-registrar/usuario-registrar.component';
import { UsuarioEsqueceuSenhaComponent } from './usuario-esqueceu-senha/usuario-esqueceu-senha.component';
import { UsuarioRedefinirSenhaComponent } from './usuario-redefinir-senha/usuario-redefinir-senha.component';


@NgModule({
  declarations: [
    UsuarioLoginComponent,
    UsuarioRegistrarComponent,
    UsuarioEsqueceuSenhaComponent,
    UsuarioRedefinirSenhaComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule
  ]
})
export class UsuarioModule { }
