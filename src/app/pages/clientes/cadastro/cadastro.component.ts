import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/shared/models/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  editarPage = false;
  formGroup: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      observacoes: new FormControl('', Validators.required),
      ativo: new FormControl(true),
    });
  }

  ngOnInit(): void {
    const idCliente: number = this.route.snapshot.params['id'];
    if (idCliente) {
      Swal.showLoading();
      this.editarPage = true;
      this.clienteService.pesquisarPorId(idCliente).subscribe({
        next: (cliente) => {
          this.formGroup.patchValue(cliente);
          Swal.close();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao encontrar o cliente!',
          });
          this.router.navigate(['/cliente']);
        },
      });
    }
  }

  registrar() {
    if (this.formGroup.valid) {
      const cliente: ICliente = this.formGroup.value;
      const tipo: 'cadastrar' | 'editar' = this.editarPage
        ? 'editar'
        : 'cadastrar';

      this.clienteService[tipo](cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/cliente']);
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar cliente!',
          });
        },
      });
    }
  }
}
