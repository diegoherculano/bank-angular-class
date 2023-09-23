import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICliente } from 'src/app/shared/models/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listar().subscribe((clientes) => {
      // this.dataSource = clientes;
    });
  }
}
