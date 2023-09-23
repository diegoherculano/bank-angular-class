import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './pages/clientes/listagem/listagem.component';
import { ListagemComponent as ListagemComponentContas } from './pages/contas/listagem/listagem.component';
import { CadastroComponent } from './pages/clientes/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: 'conta',
    children: [
      {
        path: '',
        component: ListagemComponentContas,
      },
    ],
  },
  {
    path: 'cliente',
    children: [
      {
        path: '',
        component: ListagemComponent,
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'editar/:id',
        component: CadastroComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'cliente',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
