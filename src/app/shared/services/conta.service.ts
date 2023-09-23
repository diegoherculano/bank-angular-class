import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IContas } from '../models/IContas';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  url = environment.apiUrl + '/contas/';

  constructor(private http: HttpClient) {}

  cadastrar(conta: IContas): Observable<IContas> {
    return this.http.post<IContas>(this.url, conta);
  }

  editar(conta: IContas): Observable<IContas> {
    return this.http.put<IContas>(this.url + conta.id, conta);
  }

  listar(): Observable<IContas[]> {
    return this.http.get<IContas[]>(this.url);
  }

  listarPaginado(page: number, pageSize: number): Observable<IContas[]> {
    return this.http.get<IContas[]>(
      `${this.url}?page=${page}&pageSize=${pageSize}`
    );
  }

  deletar(idConta: number): Observable<object> {
    return this.http.delete(`${this.url}${idConta}`);
  }

  pesquisarPorId(idConta: number): Observable<IContas> {
    return this.http.get<IContas>(`${this.url}${idConta}`);
  }
}
