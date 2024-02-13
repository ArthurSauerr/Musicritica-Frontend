import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./menu-principal/menu-principal.module').then(m => m.MenuPrincipalModule)
  },
  {
    path: 'usuario',
    loadChildren:() => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
