import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IContas } from 'src/app/shared/models/contas';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  editarPage = false;
  formGroup: FormGroup;

  constructor(
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero: new FormControl('', Validators.required),
      agencia: new FormControl('', Validators.required),
      saldo: new FormControl('', [Validators.required]),
      cliente: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
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
      const cliente: IContas = this.formGroup.value;
      const tipo: 'cadastrar' | 'editar' = this.editarPage
        ? 'editar'
        : 'cadastrar';
      Swal.showLoading();

      this.contaService[tipo](cliente).subscribe({
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
