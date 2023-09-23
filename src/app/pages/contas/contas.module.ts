import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ListagemComponent, CadastroComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContasModule {}
