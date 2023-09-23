import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IContas } from 'src/app/shared/models/IContas';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'numero',
    'agencia',
    'saldo',
    'cliente',
    'funcoes',
  ];
  dataSource = new MatTableDataSource<IContas>();
  page = 1;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contasService: ContaService) {}

  ngAfterViewInit(): void {
    this.listarContas(this.page, this.pageSize);
  }

  listarContas(page: number, pageSize: number) {
    Swal.showLoading();

    this.contasService.listarPaginado(page, pageSize).subscribe({
      next: (contas) => {
        this.dataSource.data = contas;
        Swal.close();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao listar as contas!',
        });
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.dataSource = new MatTableDataSource<IContas>();
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.listarContas(pageIndex, pageSize);
  }

  deletarConta(idConta: number) {
    this.contasService.deletar(idConta).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Conta deletada com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listarContas(this.page, this.pageSize);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao deletar conta!',
        });
      },
    });
  }

  modalDeletarConta(idConta: number) {
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
        this.deletarConta(idConta);
      }
    });
  }
}
