import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioRegistrarComponent } from './usuario-registrar/usuario-registrar.component';
import { UsuarioEsqueceuSenhaComponent } from './usuario-esqueceu-senha/usuario-esqueceu-senha.component';

const routes: Routes = [
  {path: 'login', component: UsuarioLoginComponent},
  {path: 'registrar', component: UsuarioRegistrarComponent},
  {path: 'esqueceu-senha',component: UsuarioEsqueceuSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
