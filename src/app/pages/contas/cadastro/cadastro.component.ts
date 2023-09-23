import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { ICliente } from 'src/app/shared/models/cliente';
import { IContas } from 'src/app/shared/models/contas';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  myControlClientes = new FormControl<string | ICliente>(
    '',
    Validators.required
  );
  filteredOptionsClientes!: Observable<ICliente[]>;
  editarPage = false;
  formGroup: FormGroup;
  clientes: ICliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero: new FormControl('', Validators.required),
      agencia: new FormControl('', Validators.required),
      saldo: new FormControl('', [Validators.required]),
      cliente: this.myControlClientes,
    });
  }

  private _filter(nome: string): ICliente[] {
    const filterValue = nome.toLowerCase();

    return this.clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filterValue)
    );
  }

  listarClientes() {
    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.filteredOptionsClientes = this.myControlClientes.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const nome = typeof value === 'string' ? value : value?.nome;
            return nome ? this._filter(nome as string) : this.clientes.slice();
          })
        );
      },
      error: (err) => console.error(err),
    });
  }

  displayFn(clienteId: number): string {
    return clienteId.toString();
  }

  ngOnInit(): void {
    this.listarClientes();
    const idConta: number = this.route.snapshot.params['id'];
    if (idConta) {
      Swal.showLoading();
      this.editarPage = true;
      this.contaService.pesquisarPorId(idConta).subscribe({
        next: (conta) => {
          this.formGroup.patchValue(conta);
          Swal.close();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao encontrar a conta!',
          });
          this.router.navigate(['/conta']);
        },
      });
    }
  }

  registrar() {
    if (this.formGroup.valid) {
      const conta: IContas = this.formGroup.value;
      const tipo: 'cadastrar' | 'editar' = this.editarPage
        ? 'editar'
        : 'cadastrar';
      Swal.showLoading();

      this.contaService[tipo](conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/conta']);
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar conta!',
          });
        },
      });
    }
  }
}
