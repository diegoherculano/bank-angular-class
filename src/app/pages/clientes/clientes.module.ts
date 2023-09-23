import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListagemComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientesModule {}
