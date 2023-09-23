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
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email'];
  dataSource = [
    { id: 1, nome: 'Hydrogen', cpf: 1.0079, email: 'H' },
    { id: 2, nome: 'Helium', cpf: 4.0026, email: 'He' },
    { id: 3, nome: 'Lithium', cpf: 6.941, email: 'Li' },
    { id: 4, nome: 'Beryllium', cpf: 9.0122, email: 'Be' },
    { id: 5, nome: 'Boron', cpf: 10.811, email: 'B' },
    { id: 6, nome: 'Carbon', cpf: 12.0107, email: 'C' },
    { id: 7, nome: 'Nitrogen', cpf: 14.0067, email: 'N' },
    { id: 8, nome: 'Oxygen', cpf: 15.9994, email: 'O' },
    { id: 9, nome: 'Fluorine', cpf: 18.9984, email: 'F' },
    { id: 10, nome: 'Neon', cpf: 20.1797, email: 'Ne' },
  ];

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
