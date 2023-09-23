import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [ListagemComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ListagemComponent],
})
export class ClientesModule {}
