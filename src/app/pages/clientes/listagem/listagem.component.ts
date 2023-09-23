import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICliente } from 'src/app/shared/models/ICliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'email',
    'status',
    'funcoes',
  ];
  dataSource = new MatTableDataSource<ICliente>();
  page = 1;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clienteService: ClienteService) {}

  ngAfterViewInit(): void {
    this.listarClientes(this.page, this.pageSize);
  }

  listarClientes(page: number, pageSize: number) {
    Swal.showLoading();

    this.clienteService.listarPaginado(page, pageSize).subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
        Swal.close();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao listar cliente!',
        });
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.dataSource = new MatTableDataSource<ICliente>();
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.listarClientes(pageIndex, pageSize);
  }

  deletarCliente(idCliente: number) {
    this.clienteService.deletar(idCliente).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Cliente deletado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listarClientes(this.page, this.pageSize);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao deletar cliente!',
        });
      },
    });
  }

  modalDeletarCliente(idCliente: number) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: 'Não tem como reverter essa ação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Deletar',
    }).then((res) => {
      if (res.isConfirmed) {
        this.deletarCliente(idCliente);
      }
    });
  }
}
